//components
import Button from '@mui/material/Button'
import Title from './Title'

import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../services/api/logout'

export default function Header({ isLoggedIn }) {
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

  return (
    <>
      <div className="my-8 flex justify-between">
        <Title />
        <div>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              style={logoutButtonStyles}
              size="large"
              variant="outlined"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                style={buttonStyles}
                size="large"
                variant="outlined"
                onClick={() => navigate('Signin')}
              >
                Login
              </Button>
              <Button
                style={buttonStyles}
                size="large"
                variant="outlined"
                onClick={() => navigate('Signup')}
              >
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

//styles
const buttonStyles = {
  color: 'white',
  backgroundColor: '#2e8b57',
  borderRadius: '14px',
  fontWeight: 600,
  fontSize: '16px',
  boxShadow: '0 6px 12px rgba(113,63,255,.25)',
  margin: '0 5px',
}
const logoutButtonStyles = {
  color: 'white',
  backgroundColor: '#ff6f61', // A different color for logout button
  borderRadius: '14px',
  fontWeight: 600,
  fontSize: '16px',
  boxShadow: '0 6px 12px rgba(255,111,97,.25)', // Adjusting the shadow color
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  // Add other prop types as needed
}
