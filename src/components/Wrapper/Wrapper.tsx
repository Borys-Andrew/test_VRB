import React from 'react';
import './Wrapper.scss';

type Props = {
  children: React.ReactNode
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className='wrapper'>
      {children}
    </div>
  );
};
