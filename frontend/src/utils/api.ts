const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// URL Shortener Types
interface ShortenUrlRequest {
  longUrl: string;
  customSlug?: string;
}

interface ShortenUrlResponse {
  shortUrl: string;
}

// Auth Types
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface ProfileResponse {
  _id: string;
  name: string;
  email: string;
}

interface ApiError {
  error: string;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  // Check if the response is JSON
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (!response.ok) {
    if (isJson) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || 'API request failed');
    } else {
      // Handle non-JSON error responses
      try {
        const text = await response.text();
        console.error('Non-JSON error response:', text);
        throw new Error('Server error: The server returned an invalid response');
      } catch (textError) {
        throw new Error('Server error: Unable to connect to the server');
      }
    }
  }

  if (!isJson) {
    try {
      const text = await response.text();
      console.error('Expected JSON but got:', text);
      throw new Error('Server error: Expected JSON response but received something else');
    } catch (textError) {
      throw new Error('Server error: The response format was invalid');
    }
  }

  try {
    return await response.json();
  } catch (jsonError) {
    console.error('JSON parsing error:', jsonError);
    throw new Error('Server error: Could not parse the server response');
  }
}

// URL Shortener API
export async function shortenUrl(data: ShortenUrlRequest): Promise<ShortenUrlResponse> {
  try {
    const token = localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user') || '{}').token 
      : null;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/api/url/shorten`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse<ShortenUrlResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while connecting to the server');
  }
}

// Get user's URLs
export async function getUserUrls(): Promise<any[]> {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/url/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    return handleResponse<any[]>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while connecting to the server');
  }
}

// Auth API
export async function registerUser(data: RegisterRequest): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse<UserResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during registration');
  }
}

export async function loginUser(data: LoginRequest): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse<UserResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during login');
  }
}

export async function getUserProfile(token: string): Promise<ProfileResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse<ProfileResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching profile');
  }
}