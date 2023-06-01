import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Article } from '../../types/article';
import { add, ArticleState, loadPage, remove, setPinned, setSearchQuery } from './article';

export const useArticlesActions = (): {
  loadFirstPage: () => void;
  loadNextPage: () => void;
  addArticle: (article: Article) => void;
  removeArticle: (slug: string) => void;
  pinArticle: (slug: string) => void;
  unpinArticle: () => void;
  setQuery: (searchQuery: string) => void;
} => {
  const dispatch: AppDispatch = useDispatch();
  const { nextPage, searchQuery } = useSelector((state: RootState) => state.articles);

  const loadFirstPage = () => {
    dispatch(loadPage({page: 1, searchQuery}));
  };

  const loadNextPage = () => {
    if (nextPage === null) {
      return;
    }
    dispatch(loadPage({page: nextPage, searchQuery}));
  };

  const addArticle = (article: Article) => {
    dispatch(add(article));
  };

  const removeArticle = (slug: string) => {
    dispatch(remove(slug));
  };

  const pinArticle = (slug: string) => {
    dispatch(setPinned(slug));
  };

  const unpinArticle = () => {
    dispatch(setPinned(null));
  };

  const setQuery = (searchQuery: string) => {
    dispatch(setSearchQuery(searchQuery));
  };

  return {
    loadNextPage,
    addArticle,
    removeArticle,
    pinArticle,
    unpinArticle,
    setQuery,
    loadFirstPage,
  };
};

export const useArticlesState = (): ArticleState => {
  return useSelector((state: RootState) => state.articles);
};
