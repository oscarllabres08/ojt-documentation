import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['All', 'Sedan', 'Hatchback', 'SUV', 'Van', 'Pick up'];

interface VehicleFiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  brands: string[];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
}

export function VehicleFilters({
  selectedCategory,
  selectedBrand,
  brands,
  onCategoryChange,
  onBrandChange
}: VehicleFiltersProps) {
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <span className="text-gray-300 font-medium text-sm sm:text-base">Type:</span>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <span className="text-gray-300 font-medium text-sm sm:text-base">Brand:</span>
        <div className="relative">
          <button
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors min-w-[140px] justify-between w-full sm:w-auto"
          >
            <span className="truncate">{selectedBrand}</span>
            {selectedBrand !== 'All' ? (
              <X
                className="w-4 h-4 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onBrandChange('All');
                  setShowBrandDropdown(false);
                }}
              />
            ) : (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            )}
          </button>

          {showBrandDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    onBrandChange(brand);
                    setShowBrandDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors ${
                    selectedBrand === brand ? 'bg-blue-600 text-white' : 'text-gray-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
