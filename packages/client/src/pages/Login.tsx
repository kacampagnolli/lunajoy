import React from "react";

const Login: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-[rgb(254,252,238)]"
    >
      <div className="bg-[rgb(51,87,84)] p-8 rounded-lg shadow-lg flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-30 h-20 mb-4" />
        <h1 className="text-white text-2xl font-bold mb-6">
          Welcome to Daily Log Health
        </h1>
        <a
          href="http://localhost:3000/auth/google"
          className="bg-[rgb(255,178,30)] text-white px-6 py-3 rounded hover:bg-[rgb(255,165,0)] transition"
        >
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
