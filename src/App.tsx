import React, { CSSProperties, useState } from 'react';
import './App.scss';
import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList';
import { Button } from './components/Button/Button';
import { Header } from './components/Header';
import { Modal } from './components/Modal';

export const App: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  const buttonStyle: CSSProperties = {

  };

  return (
    <div>
      <Header />
      <Button title={'Add New Article'} onClick={() => setIsModal(true)} style={buttonStyle} />
      <ArticlesList />
      {isModal && (
        <Modal setActive={setIsModal}>
          <ArticleForm setActive={setIsModal} />
        </Modal>
      )}
    </div>
  );
};
