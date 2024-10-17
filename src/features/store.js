import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reservationReducer from "./slices/reservationSlice";
import vehicleReducer from "./slices/vehicleSlice";
import driverReducer from "./slices/driverSlice";
// import userReducer from './slices/user/userSlice';
import { systemApi } from "./services/systemApi";
import { authApi } from "./services/authApi";
import { reservationApi } from "./services/reservationApi";
import { vehicleApi } from "./services/vehicleApi";
import { driverApi } from "./services/driverApi";
// import { userApi } from "./services/user/userApi";

export default configureStore({
    reducer: {
        [systemApi.reducerPath]: systemApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [driverApi.reducerPath]: driverApi.reducer,
        // [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
        reservation: reservationReducer,
        vehicle: vehicleReducer,
        driver: driverReducer,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            systemApi.middleware,
            authApi.middleware,
            reservationApi.middleware,
            vehicleApi.middleware,
            driverApi.middleware,
            // userApi.middleware,
        ),
});
