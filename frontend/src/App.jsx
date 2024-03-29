import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider'

// import Home from './Pages/Home'
import Profile from './Pages/Profile'
const SignUp = lazy(() => import('./Pages/SignUp'))
const SignIn = lazy(() => import('./Pages/SignIn'))
// const RequireAuth = lazy(() => import('./Components/RequireAuth'))
const Error = lazy(() => import('./Pages/Error'))

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route
          path="/Signup"
          element={
            <Suspense fallback="Loading ....">
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/Signin"
          element={
            <Suspense fallback="Loading ....">
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="Loading ....">
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
