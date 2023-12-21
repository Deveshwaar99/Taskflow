import PropTypes from 'prop-types'
// import { useContext } from 'react'
// import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const authToken = window.localStorage.getItem('token')
  if (!authToken) {
    return <Navigate to={'/Signin'} />
  }
  return <>{children}</>
}

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
export default RequireAuth
