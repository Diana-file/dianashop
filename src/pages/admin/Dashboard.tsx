import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/shared/PageHeader';
import { useAuth } from '../../contexts/AuthContext';
import { AdminOrderList } from '../../components/admin/AdminOrderList';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();

  // In futuro qui controlleremo se l'utente è admin
  if (!currentUser?.email?.includes('admin')) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          Non hai i permessi per accedere a questa pagina.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <PageHeader 
        title="Dashboard Admin" 
        subtitle="Gestione Ordini e Prodotti"
      />
      
      <div className="container mx-auto px-4 py-16">
        <AdminOrderList />
      </div>
    </div>
  );
}; 