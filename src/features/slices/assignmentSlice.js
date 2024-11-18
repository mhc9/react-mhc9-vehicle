import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    assigment: null,
    assigments: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getAssignments = createAsyncThunk("assigment/getAssignments", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAssignment = createAsyncThunk("assigment/getAssignment", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/reservation-assigments/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("assigment/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("assigment/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservation-assigments/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("assigment/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservation-assigments/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssignments.pending, (state) => {
                state.assigments = [];
                state.pager = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAssignments.fulfilled, (state, { payload }) => {
                const { data, ...pager } = payload;

                state.assigments = data;
                state.pager = pager;
                state.isLoading = false
            })
            .addCase(getAssignments.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    //     [getAssignment.pending, (state) => {
    //         state.assigment = null;
    //         state.isLoading = true;
    //         // state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [getAssignment.fulfilled, (state, { payload }) => {
    //         state.assigment = payload;
    //         state.isLoading = false
    //         // state.isSuccess = true;
    //     },
    //     [getAssignment.rejected, (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
        .addCase(store.pending, (state) => {
            state.isSuccess = false;
            state.assigment = null;
            state.error = null;
        })
        .addCase(store.fulfilled, (state, { payload }) => {
            const { status, message, assigment } = payload;
            
            if (status === 1) {
                state.isSuccess = true;
                state.assigment = assigment;
            } else {
                state.error = { message };
            }
        })
        .addCase(store.rejected, (state, { payload }) => {
            state.error = payload;
        })
        .addCase(update.pending, (state) => {
            state.isSuccess = false;
            state.assigment = null;
            state.error = null;
        })
        .addCase(update.fulfilled, (state, { payload }) => {
            const { status, message, assigment } = payload;
            
            if (status === 1) {
                state.isSuccess = true;
                state.assigment = assigment;
            } else {
                state.error = { message };
            }
        })
        .addCase(update.rejected, (state, { payload }) => {
            state.isLoading = false;
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
    }
});

export default assignmentSlice.reducer;

export const { resetSuccess, resetUploaded } = assignmentSlice.actions;
