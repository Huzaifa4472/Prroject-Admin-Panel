import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          dispatch({ type: 'LOGIN', payload: user });
        }
        navigate('/');
        toast.success('Login successful!');
      })
      .catch((error) => {
        setError(true);
        toast.error(error);
      });
  };

  return (
    <div className=" border h-screen w-full flex items-center justify-center p-3 ">
      <div className="overflow-auto w-full md:w-3/5">
        <h1 className="text-3xl font-bold self-start mb-2">Sign in</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col  border border-[#ccc] py-3 rounded-lg px-4 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#ebedef] p-3 rounded-lg" // Use the same class as for the password input field
              placeholder="youremail@example.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#ebedef] p-3 rounded-lg"
              placeholder="Password"
            />
          </div>
          <div className="flex text-sm items-center gap-1">
            <p>Do not have an account?</p>
            <Link
              className="text-blue-700 border-b border-blue-700"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
          <button
            type="submit"
            className="btn bg-slate-950 hover:bg-slate-800 transition-all duration-150 ease-in-out py-2 px-4  rounded-md  text-white font-bold text-md btn-md"
          >
            Sign In
          </button>

          {error && (
            <span className="text-red-600">Wrong email or password!</span>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
