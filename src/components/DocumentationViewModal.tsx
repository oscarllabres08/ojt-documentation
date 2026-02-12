import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useState } from 'react';
import { OJTDocumentation } from '../lib/supabase';

interface DocumentationViewModalProps {
  documentation: OJTDocumentation;
  onClose: () => void;
}

export function DocumentationViewModal({
  documentation,
  onClose
}: DocumentationViewModalProps) {
  const images = documentation.image_urls || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;

  const handlePrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = async () => {
    if (!hasImages) return;
    const url = images[currentIndex];

    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `ojt-image-${currentIndex + 1}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download image', error);
      // Fallback: open in new tab if download fails
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 sm:items-center">
      <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl border border-emerald-500/30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-700">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-200 truncate">
              {documentation.title}
            </h2>
            <p className="text-slate-400 text-sm mt-1 truncate">
              {new Date(documentation.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {hasImages && (
            <>
              <div className="relative bg-slate-50">
                <div className="aspect-video bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={images[currentIndex]}
                    alt={`${documentation.title} image ${currentIndex + 1}`}
                    className="max-h-[60vh] w-full object-contain bg-slate-50"
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentIndex ? 'bg-slate-900' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4DA8DA] hover:bg-[#3b92c3] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </>
          )}

          <div className="px-4 sm:px-6 py-4">
            <h3 className="text-emerald-200 font-semibold mb-2 text-lg">Details</h3>
            <p className="text-slate-200 whitespace-pre-wrap break-words">
              {documentation.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

