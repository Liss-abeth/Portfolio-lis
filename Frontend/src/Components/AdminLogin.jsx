import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cosmic background effect using CSS
const cosmicBgStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    overflow: "hidden",
    pointerEvents: "none",
};

function CosmicBackground() {
    // Simple animated stars using CSS
    return (
        <div style={cosmicBgStyle} aria-hidden="true">
            <svg width="100%" height="100%">
                {[...Array(60)].map((_, i) => (
                    <circle
                        key={i}
                        cx={Math.random() * 100 + "%"}
                        cy={Math.random() * 100 + "%"}
                        r={Math.random() * 1.5 + 0.5}
                        fill="white"
                        opacity={Math.random() * 0.7 + 0.3}
                    >
                        <animate
                            attributeName="opacity"
                            values="0.3;1;0.3"
                            dur={`${Math.random() * 3 + 2}s`}
                            repeatCount="indefinite"
                            begin={`${Math.random() * 2}s`}
                        />
                    </circle>
                ))}
            </svg>
        </div>
    );
}

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://portfolio-backend-xnzh.onrender.com/admin/admin-login", {
            email,
            password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/admin-dashboard"); // ✅ corrected
    } catch (err) {
        console.error(err.response?.data || err.message);
        setError(err.response?.data?.message || "Login failed. Try again.");
    }
};


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
            <CosmicBackground />
            <form
                onSubmit={handleLogin}
                className="relative z-10 bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md mx-4 sm:mx-8"
            >
                <h2 className="text-xl mb-4 font-bold text-center">Admin Login</h2>
                <input
                    className="w-full mb-3 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <input
                    className="w-full mb-4 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 w-full p-2 rounded hover:bg-blue-500 transition-colors font-semibold"
                >
                    Login
                </button>
                {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
            </form>
        </div>
    );
}

export default AdminLogin;
