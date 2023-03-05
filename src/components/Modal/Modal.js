import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeydown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onKeydown);
  };

  onKeydown = evt => {
    if (evt.code === 'Escape') {
      this.props.onModalShow();
    }
  };

  onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onModalShow();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
