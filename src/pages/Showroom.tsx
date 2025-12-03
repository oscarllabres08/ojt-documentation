import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '../components/Header';
import { VehicleFilters } from '../components/VehicleFilters';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleModal } from '../components/VehicleModal';
import { LoginModal } from '../components/LoginModal';
import { useVehicles } from '../hooks/useVehicles';
import { Vehicle } from '../lib/supabase';

export function Showroom() {
  const { vehicles, loading } = useVehicles();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.make))).sort();
    return ['All', ...uniqueBrands];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const categoryMatch =
        selectedCategory === 'All' || vehicle.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' || vehicle.make === selectedBrand;
      const searchMatch =
        searchQuery.trim() === '' ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.year.toString().includes(searchQuery);
      // Show both available and sold vehicles; status is indicated on the card
      return categoryMatch && brandMatch && searchMatch;
    });
  }, [vehicles, selectedCategory, selectedBrand, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onAdminClick={() => setShowLoginModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8 space-y-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Our Inventory</h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Browse our extensive collection of quality vehicles.
            </p>
          </div>

          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by brand, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <VehicleFilters
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          brands={brands}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setSelectedBrand}
        />

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
                onViewDetails={setSelectedVehicle}
              />
            ))}
          </div>
        )}
      </main>

      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
