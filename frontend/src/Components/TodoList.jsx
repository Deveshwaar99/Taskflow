import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import TodoItem from './ui/TodoItem'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import ShowModal from './ui/ShowModal'
import { useAddTodoMutation } from '../Store'

import { useGetTodoQuery } from '../Store'
function TodoList() {
  const [open, setOpen] = useState(false)
  const [addTodo] = useAddTodoMutation()
  const { data, error, isFetching } = useGetTodoQuery()

  const callDispatch = taskObject => {
    addTodo(taskObject)
  }
  const buttonStyles = {
    color: 'white',
    backgroundColor: '#713fff',
    borderRadius: '14px',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 6px 12px rgba(113,63,255,.25)',
  }
  let renderedList

  if (isFetching) {
    renderedList = (
      <div className=" my-5 max-w-full">
        <Skeleton variant="rounded" width="100%" height={100} />
        <br />
        <Skeleton variant="rounded" width="100%" height={100} />
        <br />
        <Skeleton variant="rounded" width="100%" height={100} />
        <br />
      </div>
    )
  } else if (error) {
    // console.log('Error in Fetching list')

    renderedList = (
      <div className="my-4 bg-red-200 text-red-800 p-4 rounded-lg">
        <p>
          It seems there is an issue fetching the data. Please refresh the page
          or try again later.
        </p>
      </div>
    )
  } else if (data.length === 0)
    renderedList = (
      <div className="m-4 p-4 bg-gray-100 text-gray-600 rounded-lg">
        <p>No Todos available.</p>
      </div>
    )
  else {
    renderedList = data.map(item => (
      <div key={item._id}>
        <TodoItem
          title={item.title}
          priority={item.priority}
          description={item?.description || 'No Description'}
          id={item._id}
        />
      </div>
    ))
  }

  return (
    <>
      <div>
        <div className="flex justify-end ">
          <div className="mt-0">
            <Button
              style={buttonStyles}
              size="large"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Task
            </Button>
          </div>
        </div>
        {renderedList}
        <ShowModal
          open={open || false}
          setOpen={setOpen}
          callDispatch={callDispatch}
          currentTask=""
          currentPriority="high"
        />
      </div>
    </>
  )
}
export default TodoList
