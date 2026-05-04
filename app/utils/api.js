// API utility for making HTTP requests
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
      } catch (e) {
        // If we can't parse error response, just use status text
        errorMessage += ` - ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Request URL:', url);
    console.error('Request config:', config);
    throw error;
  }
};

// Specific methods for common operations
export const api = {
  get: (url, options = {}) => apiRequest(url, { method: 'GET', ...options }),
  post: (url, data, options = {}) => apiRequest(url, { 
    method: 'POST', 
    body: JSON.stringify(data), 
    ...options 
  }),
  put: (url, data, options = {}) => apiRequest(url, { 
    method: 'PUT', 
    body: JSON.stringify(data), 
    ...options 
  }),
  delete: (url, options = {}) => apiRequest(url, { method: 'DELETE', ...options }),
};
