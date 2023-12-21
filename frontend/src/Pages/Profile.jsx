import Header from '../Components/ui/Header'
import TodoList from '../Components/TodoList'

function Profile() {
  return (
    <div className=" bg-slate-100 flex justify-center h-screen">
      <div className=" w-4/5 ">
        <Header />
        <TodoList />
      </div>
    </div>
  )
}
export default Profile
