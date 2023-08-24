import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { logInWithGoogle } from "../firebase/firebase";
import { useAuthProvider } from "../context/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, getUser } = useAuthProvider();

  const navigate = useNavigate();

  const handleLogin = () => {
    logInWithGoogle().then((res) => {
      getUser(res);
    });
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center flex-col gap-4 h-screen w-full px-5">
      <h1 className="text-2xl font-semibold text-primary text-center">
        Simply login with your google account.
      </h1>
      <button
        type="button"
        className="flex gap-4 items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:scale-110 focus:scale-90 transition-all duration-300"
        onClick={handleLogin}
      >
        <FcGoogle className="text-xl" />
        log in with google
      </button>
    </div>
  );
};

export default Login;
