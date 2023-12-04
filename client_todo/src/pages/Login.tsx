import { BaseSyntheticEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../axios/api";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const formSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await loginUser(user).then((data) => {
      login(data?.access_token);
    });
  };
  return (
    <div className="flex flex-col items-center min-h-screen mx-96 mt-10">
      <h1 className="font-bold text-3xl">Sign In</h1>

      <div className="w-full">
        <form
          className="flex flex-col gap-3 mx-32 px-10 py-5"
          onSubmit={formSubmission}
        >
          <label htmlFor="email" className="flex flex-col ">
            Email:
            <input
              className="border border-1 border-black rounded"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email..."
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password" className="flex flex-col ">
            Password:
            <input
              className="border border-1 border-black rounded"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password..."
              onChange={handleInputChange}
            />
          </label>

          <div className="flex justify-center">
            <button
              id="myButton"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div>
            <Link className="text-blue-500 underline" to="/register">
              If New User, please Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
