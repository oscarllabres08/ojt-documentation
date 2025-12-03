import { Gauge, Fuel, Settings } from 'lucide-react';
import { Vehicle } from '../lib/supabase';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  showActions?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (vehicle: Vehicle) => void;
}

export function VehicleCard({
  vehicle,
  onViewDetails,
  showActions = false,
  onEdit,
  onDelete,
  onToggleStatus
}: VehicleCardProps) {
  const isSold = vehicle.status === 'sold';

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
      <div className="relative">
        <img
          src={vehicle.image_url}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="px-3 py-1 bg-slate-700 text-white text-sm font-medium rounded-full">
            {vehicle.category}
          </span>
          {isSold && (
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
              SOLD
            </span>
          )}
        </div>

        {isSold && !showActions && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-6 py-3 border-2 border-red-500 text-red-500 text-2xl font-extrabold tracking-[0.3em] uppercase bg-black/80 rounded-lg">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-white truncate">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">{vehicle.year}</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-blue-500 flex-shrink-0">
            ₱{vehicle.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">{vehicle.mileage}</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
            <Fuel className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">{vehicle.fuel_type}</span>
          </div>
        </div>

        {!showActions ? (
          <button
            onClick={() => onViewDetails(vehicle)}
            className="w-full py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
          >
            View Details
          </button>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onEdit?.(vehicle)}
                className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete?.(vehicle.id)}
                className="py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => onToggleStatus?.(vehicle)}
              className={`w-full py-2 rounded-lg transition-colors ${
                isSold
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSold ? 'Mark as Available' : 'Mark as Sold'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
