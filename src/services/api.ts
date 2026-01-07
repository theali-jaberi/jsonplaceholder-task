import { User, Post, Todo } from '@/types';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new ApiError(
      `Failed to fetch ${endpoint}: ${response.statusText}`,
      response.status
    );
  }
  
  return response.json();
}

export const api = {
  // Fetch all users
  getUsers: (): Promise<User[]> => fetchFromApi<User[]>('/users'),
  
  // Fetch a single user by ID
  getUser: (id: number | string): Promise<User> => fetchFromApi<User>(`/users/${id}`),
  
  // Fetch all posts
  getPosts: (userId?: number | string): Promise<Post[]> => fetchFromApi<Post[]>(`/posts${userId ? `?userId=${userId}` : ''}`),
  
  // Fetch a single post by ID
  getPost: (id: number | string): Promise<Post> => fetchFromApi<Post>(`/posts/${id}`),
  
  // Fetch all todos
  getTodos: (userId?: number | string): Promise<Todo[]> => fetchFromApi<Todo[]>(`/todos${userId ? `?userId=${userId}` : ''}`),
  
};

export { ApiError };

