import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
//import { addTodo, deleteTodo, editTodo } from "./Slice/listSlice"
import { todoListApi } from './apis/todoListApi'
import { userApi } from './apis/userApi'
const store = configureStore({
  reducer: {
    [todoListApi.reducerPath]: todoListApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      todoListApi.middleware,
      userApi.middleware
    )
  },
})

setupListeners(store.dispatch)

export {
  useGetTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from './apis/todoListApi'
export { useSignupMutation, useLoginUserMutation } from './apis/userApi'
export default store
