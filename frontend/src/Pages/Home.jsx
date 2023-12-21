import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import './styles.css'

function Home() {
  const navigate = useNavigate()

  const titleStyles = 'text-4xl font-bold text-gray-800 mb-4 rainbow-text'

  const buttonStyles =
    'bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300'
  const signUpButtonStyles =
    'bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300'

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={titleStyles}>TASKFLOW</h1>

      <p className="text-lg text-gray-600 mb-6">
        TaskFlow is your all-in-one task management solution. Stay organized,
        manage your tasks effortlessly, and boost your productivity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside">
            <li>Task organization</li>
            <li>User authentication</li>
            <li>Efficient task tracking</li>
            <li>Customizable task lists</li>
          </ul>
        </div>

        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Get Started</h2>
          <p>Ready to manage your tasks efficiently?</p>
          <Button
            onClick={() => navigate('Signin')}
            className={buttonStyles}
            size="large"
            variant="outlined"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate('Signup')}
            className={signUpButtonStyles}
            size="large"
            variant="outlined"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
