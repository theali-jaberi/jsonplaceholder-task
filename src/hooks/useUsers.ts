'use client';

import { useCallback } from 'react';
import { useApi } from './useApi';
import { api } from '@/services/api';

export function useUsers() {
  const fetchUsers = useCallback(() => api.getUsers(), []);
  return useApi(fetchUsers);
}

