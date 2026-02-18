import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          { name, password, email }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { password, email }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
        <div className='flex flex-col gap-3 p-8 border rounded-lg shadow-sm'>

          <p className='text-2xl font-medium'>
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>

          <p className='text-sm text-gray-500'>
            Please {state === 'Sign Up' ? 'create an account' : 'login'} to book appointment
          </p>

          {state === 'Sign Up' && (
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border px-3 py-2 rounded'
            />
          )}

          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border px-3 py-2 rounded'
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border px-3 py-2 rounded'
          />

          <button className='bg-primary text-white py-2 rounded'>
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

          <p
            className='text-sm text-primary cursor-pointer text-center'
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up'
              ? 'Already have an account? Login'
              : 'Create a new account'}
          </p>

        </div>
      </form>
    </>
  )
}

export default Login
