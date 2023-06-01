import { Article } from '../types/article';

const API_KEY = '6373ede663554a03b18486224c42b265';

const BASE_URL_START = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&sortBy=popularity&apiKey=${API_KEY}`;
const BASE_URL_SEARCH = `https://newsapi.org/v2/everything?language=en&pageSize=10&sortBy=popularity&apiKey=${API_KEY}`;

export const getArticle = async (page: number, searchQuery: string): Promise<{
  status: string;
  totalResults: number;
  articles: Article[];
}> => {
  const fetchUrl = searchQuery
    ? `${BASE_URL_SEARCH}&page=${page}&q=${searchQuery}`
    : `${BASE_URL_START}&page=${page}`;

  const response = await fetch(fetchUrl);
  const data = await response.json();

  return data;
};
