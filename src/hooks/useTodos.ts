'use client';

import { useCallback } from 'react';
import { useApi } from './useApi';
import { api } from '@/services/api';

export function useTodos(userId?: string) {
  const fetchTodos = useCallback(() => api.getTodos(userId), [userId]);
  return useApi(fetchTodos);
}

