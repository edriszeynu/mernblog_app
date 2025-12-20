import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Label, Spinner, TextInput } from 'flowbite-react';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage('please fill out all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // ✅ FIXED

      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
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
            this is demo project . you can signin with your email and password
          </p>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="your email" />
              <TextInput type="text" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="your password" />
              <TextInput type="password" id="password" onChange={handleChange} />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 rounded-lg"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="flex gap-4 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/sign-up">Sign Up</Link>
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
