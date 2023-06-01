import React, { CSSProperties } from 'react';
import './Button.scss';

type Props = {
  title: string;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  title,
  style,
  onClick,
  disabled,
}) => {
  return (
    <div className="button-container">
      <button
        style={style}
        className="button"
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};
