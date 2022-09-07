import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice= createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    tagTypes: ['todos'],
    endpoints: (builder)=>({
        //CRUD operations on posts:

        getToDos: builder.query({//would also work if we mentionned the url and the method inside the builder.
            query: ()=>('/todos'),
            providesTags: ['todos'],
            transformResponse: response=> response.sort((a, b)=> a.id < b.id)
        }),
        
        addToDo: builder.mutation({
            query: (todo)=>({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['todos']
        }),

        updateToDo: builder.mutation({
            query: (todo)=>({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['todos']
        }),

        deleteToDo: builder.mutation({
            query: ({id})=>({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['todos']
        })
    })
})

export const { useGetToDosQuery, useAddToDoMutation, useUpdateToDoMutation, useDeleteToDoMutation }= apiSlice