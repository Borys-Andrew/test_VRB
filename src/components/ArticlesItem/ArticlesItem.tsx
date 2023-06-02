import React from 'react';
import { Article } from '../../types/article';
import noImage from '../../images/no-image.png';
import { useArticlesActions } from '../../features/article/hooks';
import closeIcon from '../../images/close.png';
import './ArticlesItem.scss';

type Props = {
  article: Article;
};

export const ArticlesItem: React.FC<Props> = ({ article }) => {
  const { slug, urlToImage, title, description, author, isUserCreated } =
    article;
  const { removeArticle } = useArticlesActions();

  const image = urlToImage ? urlToImage : noImage;

  return (
    <div className="card" key={slug}>
      <div className="card__image-wrapper">
        <img className="card__image" src={image} alt="Article image" />
      </div>
      <div className="card__content-wrapper">
        <h4 className="card__title">{title}</h4>
        <p className="card__description">{description}</p>
        <p className="card__author">
          Author: {author ? author : <span>No author</span>}
        </p>
        {isUserCreated && (
          <button className='card__close-btn' onClick={() => removeArticle(slug)}>
            <img src={closeIcon} alt="close icon" height="20px" />
          </button>
        )}
      </div>
    </div>
  );
};
