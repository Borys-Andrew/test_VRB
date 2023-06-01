import React, { ChangeEvent, Dispatch, useState } from 'react';
import { useArticlesActions } from '../../features/article/hooks';
import './ArticleForm.scss';

type Props = {
  setActive: Dispatch<React.SetStateAction<boolean>>;
};
export const ArticleForm: React.FC<Props> = ({ setActive }) => {
  const { addArticle } = useArticlesActions();
  const [article, setArticle] = useState({
    author: '',
    description: '',
    title: '',
    urlToImage: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setArticle((prev) => ({
          ...prev,
          urlToImage: imageDataUrl,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addArticle({
      ...article,
      slug: article.title + article.author,
    });

    setActive(false);
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="form__label">
          Title:
          <input
            className="form__input"
            id="title"
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description" className="form__label">
          Description:
          <input
            className="form__input"
            id="description"
            type="text"
            name="description"
            value={article.description}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="author" className="form__label">
          Author:
          <input
            className="form__input"
            id="author"
            type="text"
            name="author"
            minLength={4}
            value={article.author}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="image" className="form__label form__label-file">
          Load image for article:
          <input
            className="form__input-file"
            id="image"
            type="file"
            name="urlToImage"
            onChange={handleImageChange}
          />
        </label>
        <div className="form__button-wrapper">
          <button className='form__button' type="submit">Add</button>
          <button className='form__button' onClick={() => setActive(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
