import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/article';
import { getArticle } from '../../api';

const PAGE_LIMIT = 10; // api's limited to 100 articles

export const loadPage = createAsyncThunk(
  'article/loadPage',
  async ({
    page,
    searchQuery,
  }: {
    page: number,
    searchQuery: string,
  }) => {
    return getArticle(page, searchQuery);
  },
);

export interface ArticleState {
  articles: Article[];
  nextPage: number | null;
  pinnedArticle: string | null;
  isLoading: boolean;
  hasError: boolean;
  prevSearchQuery: string;
  searchQuery: string;
}

const initialState: ArticleState = {
  articles: [],
  nextPage: 1,
  pinnedArticle: null,
  isLoading: false,
  hasError: false,
  prevSearchQuery: '',
  searchQuery: '',
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Article>) => {
      state.articles.unshift(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(
        (article) => article.slug !== action.payload,
      );
    },
    setPinned: (state, action: PayloadAction<string | null>) => {
      state.pinnedArticle = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPage.fulfilled, (state, action) => {
        state.isLoading = false;
        const isNewQuery = state.prevSearchQuery !== action.meta.arg.searchQuery;
        const articles = action.payload.articles.map((article) => ({
          ...article,
          slug: article.title + article.author,
        }));
        if (isNewQuery) {
          state.articles = articles;
          state.prevSearchQuery = action.meta.arg.searchQuery;
          state.nextPage = action.payload.totalResults > 10 ? 2 : null;

          return;
        }
        state.articles.push(...articles);
        if (state.nextPage === null) {
          return;
        }
        state.nextPage =
          state.nextPage >= PAGE_LIMIT
            ? null
            : state.nextPage + 1;
      })
      .addCase(loadPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPage.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { add, remove, setPinned, setSearchQuery } = articleSlice.actions;
export default articleSlice.reducer;
