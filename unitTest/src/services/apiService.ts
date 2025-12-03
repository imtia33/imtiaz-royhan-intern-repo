import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the User type
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// API functions
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export default {
  fetchUsers,
  fetchUserById,
};