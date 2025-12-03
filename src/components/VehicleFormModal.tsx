import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Vehicle } from '../lib/supabase';

const MAKES = ['Toyota', 'Honda', 'Ford', 'Hyundai', 'Mitsubishi', 'Suzuki', 'Nissan', 'Mazda', 'Chevrolet'];
const CATEGORIES = ['Sedan', 'Hatchback', 'SUV', 'Van', 'Pick up'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

interface VehicleFormModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSubmit: (data: Partial<Vehicle>) => Promise<void>;
}

export function VehicleFormModal({ vehicle, onClose, onSubmit }: VehicleFormModalProps) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: '',
    category: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        category: vehicle.category,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        image_url: vehicle.image_url
      });
    }
  }, [vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl max-w-3xl w-full my-8">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-400 mt-1">
            {vehicle ? 'Update the vehicle details below.' : 'Enter the details for the new vehicle.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Make</label>
              <select
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Make</option>
                {MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Camry"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1990"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Mileage</label>
              <input
                type="text"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 5,000 km"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {TRANSMISSIONS.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Fuel Type</label>
              <select
                value={formData.fuel_type}
                onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {FUEL_TYPES.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.pexels.com/..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
}
