import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [error, setError] = useState('');   // ✅ ADDED
  const [success, setSuccess] = useState(''); // ✅ ADDED
  const [showPassword, setShowPassword] = useState(false); // ✅ NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');     // ✅ ADDED
    setSuccess('');   // ✅ ADDED
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.emailOrUsername || !form.password) {
      setError('⚠ You must not leave any field blank');  // ✅ ADDED
      setSuccess('');                            // ✅ ADDED
      return;
    }

    setError('');                                // ✅ ADDED
    setSuccess('✅ Login successful!');          // ✅ ADDED
    console.log('Logging in with:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-full max-w-md shadow-lg space-y-6 border border-indigo-400/30"
      >
        <h2 className="text-2xl font-bold text-indigo-200 text-center">Ready to sign in?</h2>

        {/* ✅ ADDED: Feedback messages */}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}

        <input
          type="text"
          name="emailOrUsername"
          placeholder="Email or Username"
          value={form.emailOrUsername}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
{/* 
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        /> */}

         {/* ✅ Password Input with toggleable type */}
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* ✅ Show Password toggle */}
        <label className="flex items-center space-x-2 text-white text-sm">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="accent-indigo-400"
          />
          <span>Show password</span>
        </label>  
        
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition font-semibold"
        >
          Sign me in!
        </button>
      </form>
    </div>
  );
}
