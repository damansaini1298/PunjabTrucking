import React, { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext();

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState('general');

  const openModal = (type = 'general') => {
    setFormType(type);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, formType, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};
