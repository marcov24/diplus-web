import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect
  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#E0E1E1] overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E2231A]/20 to-transparent blur-3xl p-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E2231A]/30 to-transparent blur-3xl p-0"></div>

      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 z-10 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E2231A] to-red-400">
            DEMO ACCESS
          </h2>
          <p className="text-gray-500 mt-2">Visor Dashboard & Tracking</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUser className="text-gray-400 group-focus-within:text-[#E2231A] transition-colors" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition-all outline-none"
              placeholder="Username"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-gray-400 group-focus-within:text-[#E2231A] transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition-all outline-none"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#E2231A] to-[#ff5556] text-white font-bold rounded-xl shadow-lg hover:shadow-[#E2231A]/30 hover:scale-[1.02] transform transition-all flex justify-center items-center gap-2"
          >
            ENTRAR
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Cualquier credencial es aceptada en modo demo.
          </p>
        </form>
      </div>
    </div>
  );
}
