// Authentication utility functions

export const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.access_token;
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getAuthHeadersForFormData = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.access_token;
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return !!user.access_token;
};

export const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};
