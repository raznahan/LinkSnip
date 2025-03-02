import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shortenUrl } from '../utils/api';

interface UrlState {
  shortUrl: string | null;
  isLoading: boolean;
  error: string | null;
  history: { longUrl: string; shortUrl: string }[];
}

const initialState: UrlState = {
  shortUrl: null,
  isLoading: false,
  error: null,
  history: [],
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
      });
  },
});

export const { clearUrlState } = urlSlice.actions;
export default urlSlice.reducer; 