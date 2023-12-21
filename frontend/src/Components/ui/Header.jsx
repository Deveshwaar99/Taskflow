import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/api/logout'

function Header() {
  const navigate = useNavigate()
  async function handleLogout() {
    try {
      await logoutUser()
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/', { replace: true })
      localStorage.removeItem('token')
    }
  }
  const logoutButtonStyles = {
    color: 'white',
    backgroundColor: '#ff6f61', // A different color for logout button
    borderRadius: '14px',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 6px 12px rgba(255,111,97,.25)', // Adjusting the shadow color
  }
  return (
    <>
      <div className="my-8 flex justify-between">
        <h1 className="font-bold text-4xl mx-1">Task List</h1>
        <div>
          <Button
            onClick={handleLogout}
            style={logoutButtonStyles}
            size="large"
            variant="outlined"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
export default Header
