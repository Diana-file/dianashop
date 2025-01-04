import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/shared/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Le password non coincidono');
    }

    if (formData.password.length < 6) {
      return setError('La password deve essere di almeno 6 caratteri');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });
      navigate('/');
    } catch (err: any) {
      console.error('Errore durante la registrazione:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email già registrata. Prova ad accedere.');
      } else {
        setError('Errore durante la registrazione. Riprova.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <PageHeader 
        title="Registrazione" 
        subtitle="Crea il tuo account"
      />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cognome</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                minLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimo 6 caratteri
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Conferma Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Registrazione in corso...' : 'Registrati'}
            </button>

            <p className="mt-4 text-center text-gray-600">
              Hai già un account?{' '}
              <Link to="/login" className="text-amber-600 hover:text-amber-700">
                Accedi
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}; 