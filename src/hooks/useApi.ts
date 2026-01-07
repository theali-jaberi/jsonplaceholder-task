'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiState } from '@/types';

export function useApi<T>(
  fetchFn: () => Promise<T>,
  immediate: boolean = true
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, [fetchFn]);

  useEffect(() => {
    if (!immediate) return;
  
    const t = setTimeout(() => {
      void fetchData();
    }, 0);
  
    return () => clearTimeout(t);
  }, [immediate, fetchData]);

  return { ...state, refetch: fetchData };
}

