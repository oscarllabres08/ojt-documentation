import { useState, useMemo } from 'react';
import { Car, LogOut, Plus, Search, ChevronDown } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleFormModal } from '../components/VehicleFormModal';
import { useAuth } from '../contexts/AuthContext';
import { useVehicles } from '../hooks/useVehicles';
import { supabase, Vehicle } from '../lib/supabase';

const CATEGORIES = ['All Categories', 'Sedan', 'Hatchback', 'SUV', 'Van', 'Pick up'];
const STATUSES = ['All Status', 'available', 'sold'];

export function AdminDashboard() {
  const { signOut } = useAuth();
  const { vehicles, loading } = useVehicles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchMatch =
        searchQuery === '' ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategory === 'All Categories' || vehicle.category === selectedCategory;
      const statusMatch =
        selectedStatus === 'All Status' || vehicle.status === selectedStatus;
      return searchMatch && categoryMatch && statusMatch;
    });
  }, [vehicles, searchQuery, selectedCategory, selectedStatus]);

  const handleAddVehicle = async (data: Partial<Vehicle>) => {
    const { error } = await supabase.from('vehicles').insert([data]);
    if (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle');
    } else {
      setShowAddModal(false);
    }
  };

  const handleUpdateVehicle = async (data: Partial<Vehicle>) => {
    if (!editingVehicle) return;
    const { error } = await supabase
      .from('vehicles')
      .update(data)
      .eq('id', editingVehicle.id);
    if (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle');
    } else {
      setEditingVehicle(null);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  const handleToggleStatus = async (vehicle: Vehicle) => {
    const nextStatus = vehicle.status === 'sold' ? 'available' : 'sold';

    const { error } = await supabase
      .from('vehicles')
      .update({ status: nextStatus })
      .eq('id', vehicle.id);

    if (error) {
      console.error('Error updating vehicle status:', error);
      alert('Failed to update vehicle status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate">VELOCITY MOTORS</h1>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Admin</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2">Admin Dashboard</h2>
            <p className="text-gray-400 text-base sm:text-lg">Manage your vehicle inventory.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <div className="flex-1 w-full sm:min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors min-w-[150px] justify-between"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors ${
                      selectedStatus === status ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors min-w-[170px] justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors ${
                      selectedCategory === category ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading vehicles...</p>
            </div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No vehicles found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={() => {}}
                showActions
                onEdit={setEditingVehicle}
                onDelete={handleDeleteVehicle}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {showAddModal && (
        <VehicleFormModal
          vehicle={null}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddVehicle}
        />
      )}

      {editingVehicle && (
        <VehicleFormModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSubmit={handleUpdateVehicle}
        />
      )}
    </div>
  );
}
