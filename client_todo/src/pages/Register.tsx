import { BaseSyntheticEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/global_type";
import { registerUser } from "../axios/api";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState<User>(initialState);

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const formSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await registerUser(user).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen mx-96 mt-10">
      <h1 className="font-bold text-3xl">Sign Up</h1>

      <div className="w-full">
        <form className="flex flex-col gap-3 mx-32 px-10 py-5" onSubmit={formSubmission}>
          <label htmlFor="username" className="flex flex-col ">
            Username:
            <input
              className="border border-1 border-black rounded"
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username..."
              onChange={handleInputChange}
            />
          </label>
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
            <Link className="text-blue-500 underline" to="/login">
              Already Signed UP?, then Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
