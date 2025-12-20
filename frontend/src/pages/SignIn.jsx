import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ❌ STOP if backend returns error
      if (!res.ok || data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      // ✅ SUCCESS
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        
        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className="font-semibold space-x-2 text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              endris
            </span>
            <span className="self-center text-sm sm:text-xl font-semibold">
              Blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 
                         text-white font-medium py-2 rounded-lg
                         disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <OAuth />
          </form>

          <div className="flex gap-4 text-sm mt-5">
            <span>Don’t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
