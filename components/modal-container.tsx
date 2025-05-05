"use client";

import { useModal } from './modal-context';
import { QuoteModal } from './quote-modal';

export function ModalContainer() {
  const { isModalOpen, closeModal } = useModal();
  return <QuoteModal isOpen={isModalOpen} onClose={closeModal} />;
} 