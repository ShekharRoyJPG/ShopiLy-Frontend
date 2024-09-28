import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/feature/auth/authApi";

const Register = () => {
  const [message, setMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await registerUser(data).unwrap();
      // console.log(response);
      navigation("/login");
      alert("Registration successfully");
    } catch (error) {
      setMessage("Registration failed");
    }
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5 text-center ">Register</h2>
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />

          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message} </p>}
          <button
            type="submit"
            className="w-full mt-5 bg-primary hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account? Please
          <Link to="/login" className="text-red-700 px-1 underline ">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
