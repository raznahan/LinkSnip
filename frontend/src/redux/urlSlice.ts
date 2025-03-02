import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shortenUrl, getUserUrls } from '../utils/api';

export interface UrlItem {
  _id?: string;
  longUrl: string;
  shortUrl: string;
  createdAt?: string;
}

interface UrlState {
  shortUrl: string | null;
  isLoading: boolean;
  error: string | null;
  history: UrlItem[];
  userUrls: UrlItem[];
}

const initialState: UrlState = {
  shortUrl: null,
  isLoading: false,
  error: null,
  history: [],
  userUrls: [],
};

export const createShortLink = createAsyncThunk(
  'url/shorten',
  async ({ longUrl, customSlug }: { longUrl: string; customSlug?: string }, { rejectWithValue }) => {
    try {
      const response = await shortenUrl({ longUrl, customSlug });
      return { shortUrl: response.shortUrl, longUrl };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchUserUrls = createAsyncThunk(
  'url/fetchUserUrls',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserUrls();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearUrlState: (state) => {
      state.shortUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create short link
      .addCase(createShortLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createShortLink.fulfilled, (state, action: PayloadAction<{ shortUrl: string; longUrl: string }>) => {
        state.isLoading = false;
        state.shortUrl = action.payload.shortUrl;
        state.history.unshift({
          longUrl: action.payload.longUrl,
          shortUrl: action.payload.shortUrl,
        });
      })
      .addCase(createShortLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch user URLs
      .addCase(fetchUserUrls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action: PayloadAction<UrlItem[]>) => {
        state.isLoading = false;
        state.userUrls = action.payload;
      })
      .addCase(fetchUserUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUrlState } = urlSlice.actions;
export default urlSlice.reducer; 