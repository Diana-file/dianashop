import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import type { Order } from '../../types/order';
import { Download } from 'lucide-react';

export const AdminOrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, filters]);

  const loadOrders = async () => {
    try {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (err) {
      setError('Errore nel caricamento degli ordini');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let result = [...orders];

    // Filtro per stato
    if (filters.status !== 'all') {
      result = result.filter(order => order.status === filters.status);
    }

    // Filtro per data
    const now = new Date();
    if (filters.dateRange === 'today') {
      result = result.filter(order => {
        const orderDate = order.createdAt.toDate();
        return orderDate.toDateString() === now.toDateString();
      });
    } else if (filters.dateRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter(order => order.createdAt.toDate() >= weekAgo);
    } else if (filters.dateRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      result = result.filter(order => order.createdAt.toDate() >= monthAgo);
    }

    // Filtro per ricerca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(order => 
        order.shippingDetails.email.toLowerCase().includes(searchLower) ||
        order.shippingDetails.firstName.toLowerCase().includes(searchLower) ||
        order.shippingDetails.lastName.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(result);
  };

  const exportToCSV = () => {
    const headers = [
      'Data',
      'Cliente',
      'Email',
      'Indirizzo',
      'Prodotti',
      'Totale',
      'Stato'
    ];

    const csvData = filteredOrders.map(order => [
      new Date(order.createdAt.toDate()).toLocaleDateString(),
      `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
      order.shippingDetails.email,
      `${order.shippingDetails.address}, ${order.shippingDetails.city} (${order.shippingDetails.postalCode})`,
      order.items.map(item => `${item.name} x${item.quantity}`).join('; '),
      `€${order.totalAmount.toFixed(2)}`,
      order.status
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ordini_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Ordini Recenti</h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={loadOrders}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Aggiorna
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Esporta CSV
          </button>
        </div>
      </div>

      {/* Filtri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stato
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">Tutti gli stati</option>
            <option value="new">Nuovo</option>
            <option value="processing">In Lavorazione</option>
            <option value="shipped">Spedito</option>
            <option value="delivered">Consegnato</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodo
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">Tutti</option>
            <option value="today">Oggi</option>
            <option value="week">Ultima settimana</option>
            <option value="month">Ultimo mese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cerca
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            placeholder="Email, nome cliente..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Tabella ordini esistente ma usa filteredOrders invece di orders */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prodotti
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Totale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(order.createdAt.toDate()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                  <div className="text-xs text-gray-500">
                    {order.shippingDetails.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  €{order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="text-sm border rounded p-1"
                  >
                    <option value="new">Nuovo</option>
                    <option value="processing">In Lavorazione</option>
                    <option value="shipped">Spedito</option>
                    <option value="delivered">Consegnato</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => {/* Implementare visualizzazione dettagli */}}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    Dettagli
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Mostrando {filteredOrders.length} ordini su {orders.length} totali
      </div>
    </div>
  );
}; 