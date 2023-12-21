import PropTypes from 'prop-types'
import { useState } from 'react'
import authContext from './authContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const login = (logInUser) => {
    setUser(logInUser)
  }
  const logout = () => {
    setUser(null)
  }
  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
export { AuthProvider }
