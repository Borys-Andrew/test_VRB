import React from 'react';
import {
  useArticlesActions,
  useArticlesState,
} from '../../features/article/hooks';
import { ArticlesItem } from '../ArticlesItem';
import { Button } from '../Button';
import { Wrapper } from '../Wrapper';
import './ArticlesList.scss';

export const ArticlesList: React.FC = () => {
  const { loadNextPage } = useArticlesActions();
  const { articles, isLoading, nextPage, searchQuery } = useArticlesState();

  const buttonStyle = {
    marginBottom: '20px',
  };
  
  return (
    <div>
      <Wrapper>
        {searchQuery
          ? <h1>Results for query: {searchQuery}</h1>
          : <h1>Top headlines</h1>
        }
        <div className="card-grid">
          {articles.map((article) => (
            <ArticlesItem article={article} key={article.slug} />
          ))}
        </div>
      </Wrapper>
      {nextPage && (
        <Button
          disabled={isLoading}
          onClick={loadNextPage}
          title={'Load More'}
          style={buttonStyle}
        />
      )}
    </div>
  );
};
