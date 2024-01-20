import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const todoListApi = createApi({
  reducerPath: 'todoList',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/users/profile',
    prepareHeaders: headers => {
      const token = window.localStorage.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  endpoints(builder) {
    return {
      getTodo: builder.query({
        query: () => {
          return {
            url: '/task',
            method: 'GET',
          }
        },
        providesTags: ['Todo'],
      }),

      addTodo: builder.mutation({
        query: item => {
          return {
            url: '/task',
            method: 'POST',
            body: {
              title: item.title,
              priority: item.priority,
              description: item.description,
            },
          }
        },
        invalidatesTags: ['Todo'],
      }),

      editTodo: builder.mutation({
        query: item => {
          return {
            url: `/task/${item.id}`,
            method: 'PATCH',
            body: {
              title: item.title,
              priority: item.priority,
              description: item.description,
            },
          }
        },
        invalidatesTags: ['Todo'],
      }),

      deleteTodo: builder.mutation({
        query: id => {
          return {
            url: `/task/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Todo'],
      }),
    }
  },
})

export const { useGetTodoQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation } =
  todoListApi
export { todoListApi }
