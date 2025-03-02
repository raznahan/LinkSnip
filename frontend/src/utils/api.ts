const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

interface ShortenUrlRequest {
  longUrl: string;
  customSlug?: string;
}

interface ShortenUrlResponse {
  shortUrl: string;
}

interface ApiError {
  error: string;
}

export async function shortenUrl(data: ShortenUrlRequest): Promise<ShortenUrlResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/url/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!response.ok) {
      if (isJson) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
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
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while connecting to the server');
  }
}