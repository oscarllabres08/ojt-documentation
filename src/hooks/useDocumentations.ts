import { useEffect, useState } from 'react';
import { supabase, OJTDocumentation } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useDocumentations() {
  const { user } = useAuth();
  const [documentations, setDocumentations] = useState<OJTDocumentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDocumentations([]);
      setLoading(false);
      return;
    }

    fetchDocumentations();

    const channel = supabase
      .channel('documentations-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ojt_documentations', filter: `user_id=eq.${user.id}` },
        () => {
          fetchDocumentations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchDocumentations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ojt_documentations')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setDocumentations(data || []);
    } catch (error) {
      console.error('Error fetching documentations:', error);
    } finally {
      setLoading(false);
    }
  };

  return { documentations, loading, refetch: fetchDocumentations };
}
