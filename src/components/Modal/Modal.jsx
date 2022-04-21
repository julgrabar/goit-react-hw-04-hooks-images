import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({ modalImg, onClose }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <div className="modal">
        <img src={modalImg} alt="#" />
      </div>
    </Overlay>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
};
