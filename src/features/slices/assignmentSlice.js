import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    assignment: null,
    assignments: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getAssignments = createAsyncThunk("assignment/getAssignments", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAssignment = createAsyncThunk("assignment/getAssignment", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/reservation-assignments/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("assignment/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservations`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("assignment/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservation-assignments/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("assignment/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/reservation-assignments/${id}/delete`);

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
                state.assignments = [];
                state.pager = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAssignments.fulfilled, (state, { payload }) => {
                const { data, ...pager } = payload;

                state.assignments = data;
                state.pager = pager;
                state.isLoading = false
            })
            .addCase(getAssignments.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    //     [getAssignment.pending, (state) => {
    //         state.assignment = null;
    //         state.isLoading = true;
    //         // state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [getAssignment.fulfilled, (state, { payload }) => {
    //         state.assignment = payload;
    //         state.isLoading = false
    //         // state.isSuccess = true;
    //     },
    //     [getAssignment.rejected, (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
        .addCase(store.pending, (state) => {
            state.isSuccess = false;
            state.assignment = null;
            state.error = null;
        })
        .addCase(store.fulfilled, (state, { payload }) => {
            const { status, message, assignment } = payload;
            
            if (status === 1) {
                state.isSuccess = true;
                state.assignment = assignment;
            } else {
                state.error = { message };
            }
        })
        .addCase(store.rejected, (state, { payload }) => {
            state.error = payload;
        })
        .addCase(update.pending, (state) => {
            state.isSuccess = false;
            state.assignment = null;
            state.error = null;
        })
        .addCase(update.fulfilled, (state, { payload }) => {
            const { status, message, assignment } = payload;
            
            if (status === 1) {
                state.isSuccess = true;
                state.assignment = assignment;
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
