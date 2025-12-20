import React from 'react'
import { Link } from 'react-router-dom'
import  { Button, Label, TextInput }  from 'flowbite-react'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
           <Link to="/" className="font-semibold dark:text-white space-x-2 text-4xl">
                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                    endris
                  </span>
                  <span className="self-center text-sm sm:text-xl font-semibold dark:text-white">
                    Blog
                  </span>
                </Link>
                <p className='text-sm mt-5'>this is demo project . you can signup with your email and password</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='your username'/>
              <TextInput type='text' placeholder='username' id='username'/>
            </div>
            <div>
              <Label value='your email'/>
              <TextInput type='text' placeholder='email' id='email'/>
            </div>
            <div>
              <Label value='your password'/>
              <TextInput type='text' placeholder='password' id='password'/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'> Sign up</Button>
          </form>

          <div className='flex gap-4 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in'></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp