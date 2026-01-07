'use client';

import { useCallback } from 'react';
import { useApi } from './useApi';
import { api } from '@/services/api';

export function usePosts(userId?: string) {
  const fetchPosts = useCallback(() => api.getPosts(userId), [userId]);
  return useApi(fetchPosts);
}

