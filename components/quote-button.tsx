"use client";

import { useModal } from './modal-context';
import { ReactNode } from 'react';

interface QuoteButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const QuoteButton = ({ className, children, onClick }: QuoteButtonProps) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal();
    if (onClick) onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={className || "btn-primary"}
      aria-haspopup="dialog"
      type="button"
    >
      {children || "Get a Free Quote"}
    </button>
  );
};