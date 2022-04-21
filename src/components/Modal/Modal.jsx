import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg } = this.props;

    return createPortal(
      <Overlay onClick={this.closeModal}>
        <div className="modal">
          <img src={modalImg} alt="#" />
        </div>
      </Overlay>,
      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
};
