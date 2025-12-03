import { useState, useMemo } from 'react';
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
      const availableMatch = vehicle.status === 'available';
      return categoryMatch && brandMatch && availableMatch;
    });
  }, [vehicles, selectedCategory, selectedBrand]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onAdminClick={() => setShowLoginModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Our Inventory</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Browse our extensive collection of quality vehicles.
          </p>
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
