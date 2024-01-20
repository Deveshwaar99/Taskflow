//components
import { ToasterInfo } from '../Components/ui/Toaster'
import TodoList from '../Components/TodoList'
import Header from '../Components/ui/Header/Header'
import TodoItem from '../Components/ui/TodoItem'
//context
import { useContext } from 'react'
import authContext from '../Context/authContext'

function Profile() {
  const { user } = useContext(authContext)
  return (
    <>
      <div className=" flex justify-center h-screen">
        <div className=" w-4/5 ">
          <Header isLoggedIn={!!user} />
          {user ? (
            <TodoList />
          ) : (
            <TodoItem
              title="Exercise"
              description="Go for a jog, do some yoga, or hit the gym for a workout."
              priority="HIGH"
              id="123"
            />
          )}
        </div>
      </div>
      <ToasterInfo />
    </>
  )
}
export default Profile
