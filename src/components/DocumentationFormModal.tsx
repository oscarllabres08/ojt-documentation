import { X, Upload, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { OJTDocumentation, supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface DocumentationFormModalProps {
  documentation: OJTDocumentation | null;
  onClose: () => void;
  onSubmit: (data: Partial<OJTDocumentation>) => Promise<void>;
}

const MAX_IMAGES = 5;

export function DocumentationFormModal({
  documentation,
  onClose,
  onSubmit
}: DocumentationFormModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (documentation) {
      setFormData({
        title: documentation.title,
        date: documentation.date,
        description: documentation.description
      });
      const urls = documentation.image_urls || [];
      setExistingImageUrls(urls);
      setImagePreviews(urls);
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setExistingImageUrls([]);
      setImagePreviews([]);
    }
    setImageFiles([]);
  }, [documentation]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    
    if (files.length > remainingSlots) {
      setError(`You can only upload up to ${MAX_IMAGES} images. ${remainingSlots} slot(s) remaining.`);
      return;
    }

    const newFiles = files.slice(0, remainingSlots);
    setImageFiles([...imageFiles, ...newFiles]);
    
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setError('');
  };

  const removeImage = (index: number) => {
    const preview = imagePreviews[index];
    const isExistingImage = existingImageUrls.includes(preview);
    
    if (isExistingImage) {
      // Remove from existing images
      const newExisting = existingImageUrls.filter(url => url !== preview);
      setExistingImageUrls(newExisting);
    } else {
      // Remove from new files and revoke object URL
      const fileIndex = index - existingImageUrls.length;
      const newFiles = [...imageFiles];
      URL.revokeObjectURL(preview);
      newFiles.splice(fileIndex, 1);
      setImageFiles(newFiles);
    }
    
    // Update previews
    const newPreviews = [...imagePreviews];
    if (!isExistingImage) {
      URL.revokeObjectURL(preview);
    }
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) {
        setError('You must be logged in to submit documentation');
        setLoading(false);
        return;
      }

      const imageUrls: string[] = [];

      // Upload new image files
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `ojt-documentations/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('ojt-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          setError('Failed to upload one or more images. Please try again.');
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('ojt-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrlData.publicUrl);
      }

      // Combine existing image URLs (that weren't removed) with new ones
      const allImageUrls = [...existingImageUrls, ...imageUrls];

      await onSubmit({
        ...formData,
        image_urls: allImageUrls
      });

      // Clean up object URLs for uploaded files
      imageFiles.forEach((_, index) => {
        const previewIndex = existingImageUrls.length + index;
        if (previewIndex < imagePreviews.length) {
          const preview = imagePreviews[previewIndex];
          if (preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
          }
        }
      });
    } catch (err) {
      console.error('Error submitting documentation:', err);
      setError('Failed to submit documentation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreviews]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-3xl w-full my-8 shadow-xl border border-emerald-500/30">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-emerald-200">
              {documentation ? 'Edit Documentation' : 'Add Documentation'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>
          <p className="text-slate-300 mt-1">
            {documentation
              ? 'Update your documentation details below.'
              : 'Document your OJT activities for this day.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-slate-200 mb-2 font-medium">Title (Day Number)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Day 1, Day 2"
                required
              />
            </div>

            <div>
              <label className="block text-slate-200 mb-2 font-medium">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-200 mb-2 font-medium">What did you do today?</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-lg border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[120px] resize-y"
                placeholder="Describe your activities, tasks, and learnings for this day..."
                required
              />
            </div>

            <div>
              <label className="block text-slate-200 mb-2 font-medium">
                Upload Images (up to {MAX_IMAGES} images)
              </label>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {imagePreviews.length < MAX_IMAGES && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-500/60 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors bg-slate-900">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-emerald-400" />
                    <p className="text-sm text-slate-200">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {imagePreviews.length} / {MAX_IMAGES} images
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              )}
              {imagePreviews.length >= MAX_IMAGES && (
                <p className="text-sm text-slate-300 text-center py-4">
                  Maximum {MAX_IMAGES} images reached
                </p>
              )}
            </div>
          </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/60 border border-red-500 rounded-lg text-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/60 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : documentation ? 'Update Documentation' : 'Add Documentation'}
          </button>
        </form>
      </div>
    </div>
  );
}
