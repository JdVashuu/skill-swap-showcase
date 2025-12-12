// API Configuration
// Change this to your Flask backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// API methods
export const api = {
  // Listings
  getListings: (search?: string) => 
    apiFetch<any[]>(`/listings${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  
  getListing: (id: string) => 
    apiFetch<any>(`/listings/${id}`),
  
  createListing: (data: any) => 
    apiFetch<any>('/listings', { method: 'POST', body: JSON.stringify(data) }),

  // Conversations & Messages
  getConversations: (userId = 'user-1') => 
    apiFetch<any[]>(`/conversations?userId=${userId}`),
  
  getMessages: (conversationId: string) => 
    apiFetch<any[]>(`/conversations/${conversationId}/messages`),
  
  sendMessage: (data: { conversationId: string; content: string; senderId?: string }) => 
    apiFetch<any>('/messages', { method: 'POST', body: JSON.stringify(data) }),

  // Proposals
  getProposals: (userId = 'user-1') => 
    apiFetch<{ received: any[]; sent: any[] }>(`/proposals?userId=${userId}`),
  
  updateProposal: (id: string, data: { status: string }) => 
    apiFetch<any>(`/proposals/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Profile
  getProfile: (userId = 'user-1') => 
    apiFetch<any>(`/profile?userId=${userId}`),
  
  updateProfile: (userId: string, data: any) => 
    apiFetch<any>(`/profile?userId=${userId}`, { method: 'PATCH', body: JSON.stringify(data) }),
};
