import React, { Dispatch, MouseEvent, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import closeIcon from '../../images/close.png';

type Props = {
  setActive: Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({ setActive, children }) => {
  const mouseDownClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  };

  useEffect(() => {
    const keyDownClose = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setActive(false);
      }
    };

    window.addEventListener('keydown', keyDownClose);
    return () => {
      window.removeEventListener('keydown', keyDownClose);
    };
  }, [setActive]);

  return ReactDOM.createPortal(
    <div className="modal__overlay" onClick={mouseDownClose}>
      <div className="modal__content">
        <button
          autoFocus
          className="modal__closeBtn"
          onClick={() => setActive(false)}
        >
          <img width="20px" src={closeIcon} alt="close button" />
        </button>
        {children}
      </div>
    </div>,
    document.querySelector('#modal-root') as Element,
  );
};
