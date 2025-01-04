import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ChiSiamo } from './pages/ChiSiamo';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Contatti } from './pages/Contatti';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { FAQ } from './pages/FAQ';
import { Shipping } from './pages/Shipping';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { ConfermaOrdine } from './pages/ConfermaOrdine';
import { Register } from './pages/Register';
import { Profilo } from './pages/Profilo';
import { OrdiniUtente } from './pages/OrdiniUtente';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminDashboard } from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chi-siamo" element={<ChiSiamo />} />
                <Route path="/prodotti" element={<Shop />} />
                <Route path="/prodotto/:id" element={<ProductDetails />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/termini" element={<Terms />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/spedizioni" element={<Shipping />} />
                <Route path="/carrello" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/conferma-ordine" element={<ConfermaOrdine />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profilo" element={
                  <ProtectedRoute>
                    <Profilo />
                  </ProtectedRoute>
                } />
                <Route path="/ordini" element={
                  <ProtectedRoute>
                    <OrdiniUtente />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;