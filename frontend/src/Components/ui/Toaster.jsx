import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToasterError() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      limit={1}
    />
  )
}

export function ToasterInfo() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      limit={1}
    />
  )
}
