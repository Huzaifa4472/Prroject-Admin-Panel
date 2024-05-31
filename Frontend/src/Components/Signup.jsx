import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/login');
    } catch (err) {
      console.log(err.message);
      if (err.message.includes('already-in-use')) {
        setError('This email exists already, Try logging in');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="h-screen  flex flex-col items-center justify-center p-3 ">
      <div className="overflow-auto w-full md:w-3/5">
        <h1 className="font-bold text-3xl  mb-2">Sign Up</h1>
        <form
          onSubmit={handleAdd}
          className="flex flex-col w-full border border-[#ccc] py-3 rounded-lg px-4 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="">Email:</label>
            <input
              type="text"
              name="email"
              onChange={(e) => handleInput(e)}
              className="bg-[#ebedef] p-3  rounded-lg "
              placeholder="youremail@example.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="">Password:</label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
              className="bg-[#ebedef] p-3  rounded-lg "
              placeholder="Password"
            />
          </div>
          <div className="flex text-sm items-center gap-1">
            <p>Have an account?</p>
            <Link
              className="text-blue-700 border-b border-blue-700"
              to="/sign-in"
            >
              Sign In
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-md bg-slate-950 hover:bg-slate-800 transition-all duration-150 ease-in-out py-2 px-4  rounded-md  text-white font-bold text-md  "
          >
            Sign Up
          </button>
          {error && <span className="text-red-600">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
