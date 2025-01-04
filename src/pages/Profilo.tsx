import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/shared/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';

export const Profilo = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
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
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      await updateProfile(currentUser, {
        displayName: formData.displayName
      });

      setSuccess('Profilo aggiornato con successo!');
    } catch (err) {
      setError('Errore durante l\'aggiornamento del profilo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await updatePassword(currentUser, passwordData.newPassword);
      setSuccess('Password aggiornata con successo!');
      setShowPasswordForm(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Errore durante l\'aggiornamento della password. Prova a rieffettuare il login.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <PageHeader 
        title="Il Mio Profilo" 
        subtitle="Gestisci i tuoi dati personali"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 text-green-500 p-4 rounded-lg mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
                <p className="text-sm text-gray-500 mt-1">
                  L'email non può essere modificata
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Aggiornamento...' : 'Aggiorna Profilo'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Password</h3>
              <button
                type="button"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-amber-600 hover:text-amber-700"
              >
                {showPasswordForm ? 'Annulla' : 'Modifica Password'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nuova Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Conferma Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
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
                  {loading ? 'Aggiornamento...' : 'Aggiorna Password'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 