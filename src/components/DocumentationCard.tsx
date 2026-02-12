import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { OJTDocumentation } from '../lib/supabase';

interface DocumentationCardProps {
  documentation: OJTDocumentation;
  onEdit?: (doc: OJTDocumentation) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function DocumentationCard({
  documentation,
  onEdit,
  onDelete,
  showActions = false
}: DocumentationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
      {documentation.image_urls && documentation.image_urls.length > 0 && (
        <div className="relative">
          <img
            src={documentation.image_urls[0]}
            alt={documentation.title}
            className="w-full h-48 sm:h-56 object-cover"
          />
          {documentation.image_urls.length > 1 && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-slate-700 text-white text-sm font-medium rounded-full">
                +{documentation.image_urls.length - 1} more
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-white truncate mb-1">
              {documentation.title}
            </h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(documentation.date)}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-3">
          {documentation.description}
        </p>

        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(documentation)}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(documentation.id)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
