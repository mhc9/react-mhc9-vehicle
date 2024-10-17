import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    vehicle: null,
    vehicles: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getVehicles = createAsyncThunk("vehicle/getVehicles", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getVehicle = createAsyncThunk("vehicle/getVehicle", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/vehicles/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("vehicle/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/vehicles`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("vehicle/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/vehicles/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("vehicle/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/vehicles/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("vehicle/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/vehicles/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.vehicle = { ...state.vehicle, img_url: payload };
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getVehicles.pending, (state) => {
            state.vehicles = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        })
        .addCase(getVehicles.fulfilled, (state, { payload }) => {
            const { data, ...pager } = payload;

            state.vehicles = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        })
        .addCase(getVehicles.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
    //     [getVehicle.pending]: (state) => {
    //         state.vehicle = null;
    //         state.isLoading = true;
    //         // state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [getVehicle.fulfilled]: (state, { payload }) => {
    //         state.vehicle = payload;
    //         state.isLoading = false
    //         // state.isSuccess = true;
    //     },
    //     [getVehicle.rejected]: (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
    //     [store.pending]: (state) => {
    //         state.isLoading = true;
    //         state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [store.fulfilled]: (state, { payload }) => {
    //         state.isLoading = false
    //         state.isSuccess = true;
    //     },
    //     [store.rejected]: (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
    //     [update.pending]: (state) => {
    //         state.isLoading = true;
    //         state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [update.fulfilled]: (state, { payload }) => {
    //         state.isLoading = false
    //         state.isSuccess = true;
    //     },
    //     [update.rejected]: (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
    //     [destroy.pending]: (state) => {
    //         state.isLoading = true;
    //         state.isSuccess = false;
    //         state.error = null;
    //     },
    //     [destroy.fulfilled]: (state, { payload }) => {
    //         state.isLoading = false
    //         state.isSuccess = true;
    //     },
    //     [destroy.rejected]: (state, { payload }) => {
    //         state.isLoading = false;
    //         state.error = payload;
    //     },
    //     [upload.pending]: (state) => {
    //         state.isUploaded = false;
    //         state.error = null;
    //     },
    //     [upload.fulfilled]: (state, { payload }) => {
    //         const { status, message } = payload;

    //         if (status === 1) {
    //             state.isUploaded = true;
    //         } else {
    //             state.isUploaded = false;
    //             state.error = { message };
    //         }
    //     },
    //     [upload.rejected]: (state, { payload }) => {
    //         state.error = payload;
    //     },
    }
});

export default vehicleSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = vehicleSlice.actions;
