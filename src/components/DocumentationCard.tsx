import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { OJTDocumentation } from '../lib/supabase';

interface DocumentationCardProps {
  documentation: OJTDocumentation;
  onEdit?: (doc: OJTDocumentation) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  onView?: (doc: OJTDocumentation) => void;
}

export function DocumentationCard({
  documentation,
  onEdit,
  onDelete,
  showActions = false,
  onView
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
    <div className="bg-black/70 rounded-xl overflow-hidden hover:shadow-lg border border-emerald-500/20 transition-all text-left w-full">
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
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-200 truncate mb-1">
              {documentation.title}
            </h3>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(documentation.date)}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-200 text-sm sm:text-base mb-4 line-clamp-3">
          {documentation.description}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onView ? () => onView(documentation) : undefined}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-lg transition-colors text-sm"
          >
            View details
          </button>

          {showActions && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(documentation)}
                  className="w-full sm:flex-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-100 rounded-lg border border-slate-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(documentation.id)}
                  className="w-full sm:flex-1 px-3 py-2 bg-red-900/60 hover:bg-red-700 text-red-100 rounded-lg border border-red-500/60 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
