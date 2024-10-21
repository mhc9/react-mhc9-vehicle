import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    driver: null,
    drivers: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getDrivers = createAsyncThunk("driver/getDrivers", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getDriver = createAsyncThunk("driver/getDriver", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/drivers/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("driver/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/drivers`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("driver/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/drivers/${id}/update`, data);

        dispatch(getDrivers({ url: '/api/drivers' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("driver/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/drivers/${id}/delete`);

        dispatch(getDrivers({ url: '/api/drivers' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("driver/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/drivers/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.driver = { ...state.driver, img_url: payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDrivers.pending, (state) => {
                state.drivers = [];
                state.pager = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDrivers.fulfilled, (state, { payload }) => {
                const { data, ...pager } = payload;

                state.drivers = data;
                state.pager = pager;
                state.isLoading = false;
            })
            .addCase(getDrivers.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getDriver.pending, (state) => {
                state.isLoading = true;
                state.driver = null;
                state.error = null;
            })
            .addCase(getDriver.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.driver = payload;
            })
            .addCase(getDriver.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
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

export default driverSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = driverSlice.actions;
