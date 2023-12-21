import { toast } from 'react-toastify'
import { useState } from 'react'
import {
  userSchemaValidate,
  loginSchemaValidate,
} from '../services/schema/userValidate'
import { useLoginUserMutation, useSignupMutation } from '../Store'
import { useNavigate } from 'react-router-dom'

function useFormInputHandler(emptyUser) {
  const [user, setUser] = useState(emptyUser)
  const [inputError, setInputError] = useState(null)
  // const [serverError, setServerError] = useState(null)
  //Using RTK
  const [loginUser] = useLoginUserMutation()
  const [signup] = useSignupMutation()
  let authToken = null
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    console.log(user)
  }

  //Create an account
  const handleSignUpSubmit = async (event) => {
    event.preventDefault()
    setInputError(null)
    const { error: validationError } = userSchemaValidate(user)
    if (validationError && validationError.details) {
      return setInputError({
        [validationError.details[0].path]: validationError.details[0].message,
      })
    }
    try {
      const { data, error } = await signup(user)
      console.log({ data, error })
      if (error) {
        return toast.error(error.data.error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
      const { token } = data
      if (token) {
        window.localStorage.setItem('token', token)
        navigate('/todo')
      }
    } catch (error) {
      console.error(error)
    }
  }

  //Log In to an account
  const handleSignInSubmit = async (event) => {
    event.preventDefault()
    setInputError(null)
    const { error: validationError } = loginSchemaValidate(user)
    if (validationError && validationError.details) {
      return setInputError({
        [validationError.details[0].path]: validationError.details[0].message,
      })
    }
    try {
      const { data, error } = await loginUser(user)
      console.log({ data, error })
      if (error) {
        return toast.error(error.data.error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
      const { token } = data
      if (token) {
        window.localStorage.setItem('token', token)
        navigate('/todo')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    user,
    inputError,
    // serverError,
    authToken,
    handleChange,
    handleSignInSubmit,
    handleSignUpSubmit,
  }
}
export default useFormInputHandler
