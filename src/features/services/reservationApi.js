import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // const token = localStorage.getItem("access_token");

            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`);

            //     return headers;
            // }

            // const API_KEY = process.env.REACT_APP_API_KEY;

            headers.set('X-API-KEY', `p2lbgWkFrykA4QyUmpHihzmc5BNzIABq`);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: '/api/reservations/init/form'
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = reservationApi;
