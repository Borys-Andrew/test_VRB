import React, { ChangeEvent, useEffect } from 'react';
import {
  useArticlesActions,
  useArticlesState,
} from '../../features/article/hooks';
import { Wrapper } from '../Wrapper';
import debaunce from 'lodash.debounce';
import './Header.scss';

export const Header: React.FC = () => {
  const { setQuery, loadFirstPage } = useArticlesActions();
  const { searchQuery } = useArticlesState();

  const setValue = debaunce((value) => setQuery(value), 500);
  const handleQueryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    loadFirstPage();

  }, [searchQuery]);

  return (
    <div className="header">
      <Wrapper>
        <div className="header__content">
          <input
            type="search"
            className="search-query"
            placeholder="Search articles..."
            onChange={handleQueryFilter}
          />
        </div>
      </Wrapper>
    </div>
  );
};
