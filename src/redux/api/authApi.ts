import { apiSlice } from './index';
import {
  User,
} from '@/types/queries';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<
      User, { email: string; password: string }
    >({
      query: (body) => ({
        url: `login`,
        body,
        method: "post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      providesTags: ['User'],
    }),
    registerVisitor: builder.mutation<
      User, {
        name: string
        email: string;
        password: string,
        password_confirmation: string,
        country_id: number,
        role: "visitor" | "company"
      }
    >({
      query: ({ name, email, password, password_confirmation, country_id, role }) => ({
        url: `register`,
        params: { name, email, password, password_confirmation, country_id, role },
        method: "post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<
      User, any
    >({
      query: (body) => ({
        url: `user/${body.id}`,
        body,
        method: "put",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useRegisterVisitorMutation,
  useUpdateUserMutation
} = authApi;
