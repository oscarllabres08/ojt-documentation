import { useState } from 'react';
import { LogOut, Plus, FileText } from 'lucide-react';
import { Header } from '../components/Header';
import { DocumentationCard } from '../components/DocumentationCard';
import { DocumentationFormModal } from '../components/DocumentationFormModal';
import { DocumentationViewModal } from '../components/DocumentationViewModal';
import { useAuth } from '../contexts/AuthContext';
import { useDocumentations } from '../hooks/useDocumentations';
import { supabase, OJTDocumentation } from '../lib/supabase';

export function UserDashboard() {
  const { user, signOut } = useAuth();
  const { documentations, loading, refetch } = useDocumentations();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<OJTDocumentation | null>(null);
  const [viewingDoc, setViewingDoc] = useState<OJTDocumentation | null>(null);

  const handleAddDocumentation = async (data: Partial<OJTDocumentation>) => {
    if (!user) return;

    const { error } = await supabase
      .from('ojt_documentations')
      .insert([{ ...data, user_id: user.id }]);

    if (error) {
      console.error('Error adding documentation:', error);
      alert('Failed to add documentation');
    } else {
      setShowAddModal(false);
      refetch();
    }
  };

  const handleUpdateDocumentation = async (data: Partial<OJTDocumentation>) => {
    if (!editingDoc) return;

    const { error } = await supabase
      .from('ojt_documentations')
      .update(data)
      .eq('id', editingDoc.id);

    if (error) {
      console.error('Error updating documentation:', error);
      alert('Failed to update documentation');
    } else {
      setEditingDoc(null);
      refetch();
    }
  };

  const handleDeleteDocumentation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this documentation?')) return;

    const { error } = await supabase
      .from('ojt_documentations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting documentation:', error);
      alert('Failed to delete documentation');
    } else {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Header
        onAdminClick={() => {}}
        showAdminButton={false}
        rightSlot={
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm sm:text-base flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Out</span>
          </button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-300 mb-2">My OJT Documentation</h2>
            <p className="text-slate-200 text-base sm:text-lg">
              Welcome back! Document your OJT journey day by day.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Documentation</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-emerald-200">Loading documentations...</p>
            </div>
          </div>
        ) : documentations.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-100 text-lg mb-2">No documentation yet</p>
            <p className="text-slate-300 text-sm mb-6">
              Start documenting your OJT journey by adding your first entry
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Documentation</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {documentations.map((doc) => (
              <DocumentationCard
                key={doc.id}
                documentation={doc}
                showActions
                onEdit={setEditingDoc}
                onDelete={handleDeleteDocumentation}
                onView={setViewingDoc}
              />
            ))}
          </div>
        )}
      </main>

      {showAddModal && (
        <DocumentationFormModal
          documentation={null}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddDocumentation}
        />
      )}

      {editingDoc && (
        <DocumentationFormModal
          documentation={editingDoc}
          onClose={() => setEditingDoc(null)}
          onSubmit={handleUpdateDocumentation}
        />
      )}

      {viewingDoc && (
        <DocumentationViewModal
          documentation={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}
