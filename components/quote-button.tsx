"use client";

import { useState, useEffect } from 'react';
import { QuoteModal } from './quote-modal';
import { useModal } from './modal-context';
import { ReactNode } from 'react';

interface QuoteButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const QuoteButton = ({ className, children, onClick }: QuoteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const handleOpenModal = () => openModal();
    document.addEventListener('openQuoteModal', handleOpenModal);
    return () => document.removeEventListener('openQuoteModal', handleOpenModal);
  }, [openModal]);

  const handleClick = () => {
    openModal();
    if (onClick) onClick();
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className={className || "btn-primary"}
        aria-haspopup="dialog"
        type="button"
      >
        {children || "Get a Free Quote"}
      </button>
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};