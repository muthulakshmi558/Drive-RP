import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { endpoints } from "../api/api";
import loginImg from "../assets/images/bike.png";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(endpoints.login, loginData);
      setMessage(res.data.message || "Login successful");

      if (res.status === 200) {
        // ✅ Save user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ username: loginData.username })
        );

        // ✅ Redirect to home
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  // ✅ Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(endpoints.register, registerData);
      setMessage(res.data.message || "Registration successful");

      if (res.status === 201) {
        // ✅ After register, go to login page
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Image */}
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-b">
        <img
          src={loginImg}
          alt="Bike"
          className="w-3/4 h-auto rounded-xl shadow-2xl transform transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-[#07435C] text-center tracking-wide">
            {isLogin ? "Login" : "Register"}
          </h2>

          {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

          {isLogin ? (
            // ---------------- LOGIN FORM ----------------
            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#07435C] text-white font-semibold rounded-xl shadow-lg"
              >
                Login
              </button>
              <p className="text-center text-gray-500 mt-2">
                New user?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-[#07435C] cursor-pointer font-medium hover:underline"
                >
                  Register now
                </span>
              </p>
            </form>
          ) : (
            // ---------------- REGISTER FORM ----------------
            <form onSubmit={handleRegister} className="space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={registerData.confirm_password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirm_password: e.target.value,
                  })
                }
                required
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#07435C]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#07435C] text-white font-semibold rounded-xl shadow-lg"
              >
                Register now
              </button>
              <p className="text-center text-gray-500 mt-2">
                Already a user?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-[#07435C] cursor-pointer font-medium hover:underline"
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
