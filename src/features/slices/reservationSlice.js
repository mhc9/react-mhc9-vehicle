import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    reservation: null,
    reservations: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getReservations = createAsyncThunk("reservation/getReservations", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getReservation = createAsyncThunk("reservation/getReservation", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/reservations/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getEvents = createAsyncThunk("reservation/getEvents", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("reservation/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("reservation/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("reservation/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("reservation/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assign = createAsyncThunk("reservation/assign", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/assign`, data);

        dispatch(updateReservations(res.data.reservation));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const cancel = createAsyncThunk("reservation/cancel", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/status`, data);

        dispatch(updateReservations(res.data.reservation));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const finish = createAsyncThunk("reservation/finish", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations/${id}/status`, data);

        dispatch(updateReservations(res.data.reservation));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateReservations: (state, { payload }) => {
            const updatedData = state.reservations.map(reservation => {
                if (reservation.id === payload.id) return payload;

                return reservation;
            });

            state.reservations = updatedData;
        },
        updateAssignments: (state, { payload }) => {
            const { id, assignment } = payload;

            /** ดึงข้อมูล assignments จาก reservations */
            const assignments = state.reservations.find(res => res.id === id)?.assignments;

            /** อัพเดตข้อมูล assignments */
            let updatedAssignments = [];
            if (assignments.length > 0) {
                updatedAssignments = assignments.map(ass => {
                    if (ass.id === assignment.id) return assignment;
                    
                    return ass;
                });
            }

            /** อัพเดตข้อมูล reservations */
            const updatedData = state.reservations.map(reservation => {
                if (reservation.id === id) return ({ ...reservation, assignments: updatedAssignments });

                return reservation;
            });

            state.reservations = updatedData;
        },
        updateImage: (state, { payload }) => {
            state.reservation = { ...state.reservation, img_url: payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReservations.pending, (state) => {
                state.reservations = [];
                state.pager = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getReservations.fulfilled, (state, { payload }) => {
                const { data, ...pager } = payload;

                state.reservations = data;
                state.pager = pager;
                state.isLoading = false
            })
            .addCase(getReservations.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getReservation.pending, (state) => {
                state.reservation = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getReservation.fulfilled, (state, { payload }) => {
                state.reservation = payload;
                state.isLoading = false;
            })
            .addCase(getReservation.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getEvents.pending, (state) => {
                state.reservations = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getEvents.fulfilled, (state, { payload }) => {
                state.reservations = payload;
                state.isLoading = false
            })
            .addCase(getEvents.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(store.pending, (state) => {
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(store.fulfilled, (state, { payload }) => {
                const { status, message, reservation } = payload;
                
                if (status === 1) {
                    state.isSuccess = true;
                    state.reservation = reservation;
                } else {
                    state.error = { message };
                }
            })
            .addCase(store.rejected, (state, { payload }) => {
                state.error = payload;
            })
            .addCase(update.pending, (state) => {
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(update.fulfilled, (state, { payload }) => {
                const { status, message, reservation } = payload;

                if (status === 1) {
                    state.isSuccess = true;
                    state.reservation = reservation;
                } else {
                    state.error = { message };
                }
            })
            .addCase(update.rejected, (state, { payload }) => {
                state.error = payload;
            })
        //     [destroy.pending, (state) => {
        //         state.isLoading = true;
        //         state.isSuccess = false;
        //         state.error = null;
        //     },
        //     [destroy.fulfilled, (state, { payload }) => {
        //         state.isLoading = false
        //         state.isSuccess = true;
        //     },
        //     [destroy.rejected, (state, { payload }) => {
        //         state.isLoading = false;
        //         state.error = payload;
        //     },
        //     [upload.pending, (state) => {
        //         state.isUploaded = false;
        //         state.error = null;
        //     },
        //     [upload.fulfilled, (state, { payload }) => {
        //         const { status, message } = payload;

        //         if (status === 1) {
        //             state.isUploaded = true;
        //         } else {
        //             state.isUploaded = false;
        //             state.error = { message };
        //         }
        //     },
        //     [upload.rejected, (state, { payload }) => {
        //         state.error = payload;
        //     },
            .addCase(assign.pending, (state) => {
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(assign.fulfilled, (state, { payload }) => {
                const { status, message, reservation } = payload;
                
                if (status === 1) {
                    state.isSuccess = true;
                    state.reservation = reservation;
                } else {
                    state.error = { message };
                }
            })
            .addCase(assign.rejected, (state, { payload }) => {
                state.error = payload;
            })
            .addCase(cancel.pending, (state) => {
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(cancel.fulfilled, (state, { payload }) => {
                const { status, message } = payload;
                
                if (status === 1) {
                    state.isSuccess = true;
                } else {
                    state.error = { message };
                }
            })
            .addCase(cancel.rejected, (state, { payload }) => {
                state.error = payload;
            })
            .addCase(finish.pending, (state) => {
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(finish.fulfilled, (state, { payload }) => {
                const { status, message } = payload;
                
                if (status === 1) {
                    state.isSuccess = true;
                } else {
                    state.error = { message };
                }
            })
            .addCase(finish.rejected, (state, { payload }) => {
                state.error = payload;
            })
    }
});

export default reservationSlice.reducer;

export const { resetSuccess, resetUploaded, updateReservations, updateAssignments, updateImage } = reservationSlice.actions;
