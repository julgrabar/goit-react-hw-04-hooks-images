import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({ modalImg, onClose }) => {
  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

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
