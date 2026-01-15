// lib/logout.ts
export const logout = () => {
  // Remove auth token or session-related data
  localStorage.removeItem('token'); // or whatever key you use

  // Redirect to login page
  window.location.href = '/login';
};
