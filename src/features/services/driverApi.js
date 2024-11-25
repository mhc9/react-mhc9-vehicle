import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const driverApi = createApi({
    reducerPath: 'driverApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // const token = localStorage.getItem("access_token");

            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`);

            //     return headers;
            // }

            /** Use API Key */
            const API_KEY = process.env.REACT_APP_API_KEY;

            headers.set('X-API-KEY', API_KEY);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: '/api/drivers/init/form'
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = driverApi;
