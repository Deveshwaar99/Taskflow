import Profile from './Profile'
import { AuthProvider } from '../Context/AuthProvider'

function Home() {
  return (
    <>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </>
  )
}
export default Home
