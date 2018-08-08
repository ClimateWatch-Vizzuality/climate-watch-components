import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';

import closeIcon from './assets/sidebar-close.svg';
import styles from './modal-styles.scss';

/* Customized modal using react-modal */
class Modal extends PureComponent {
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    const {
      isOpen,
      customStyles,
      contentLabel,
      onRequestClose,
      header,
      children,
      shouldCloseOnOverlayClick,
      theme
    } = this.props;
    const defaultStyles = {
      overlay: {
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
        backgroundColor: 'rgba(17, 55, 80, 0.4)',
        overflow: 'hidden'
      }
    };
    const modalStyles = { ...defaultStyles, ...customStyles };

    return (
      <ReactModal
        className={cx(styles.modal, theme.modal)}
        style={modalStyles}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        {header}
        <Button
          onClick={() => onRequestClose()}
          className={cx(styles.closeBtn, theme.closeBtn)}
          square
        >
          <Icon
            icon={closeIcon}
            theme={{ icon: cx(styles.close, theme.close) }}
          />
        </Button>
        <div className={cx(styles.modalContent, theme.modalContent)}>
          {children}
        </div>
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  /* Set the modal visibility */
  isOpen: PropTypes.bool.isRequired,
  /* Close when click outside */
  shouldCloseOnOverlayClick: PropTypes.bool,
  /* Aria info */
  contentLabel: PropTypes.string,
  /* Styles of the veil and react-modal */
  customStyles: PropTypes.object,
  /* Content of it */
  children: PropTypes.node,
  /* Which header should it use, also exported a default one */
  header: PropTypes.node.isRequired,
  /* Theme options */
  theme: PropTypes.shape({
    modal: PropTypes.string,
    close: PropTypes.string,
    modalContent: PropTypes.string
  }),
  /* Callback when click outside or in the X button */
  onRequestClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  contentLabel: 'Modal content',
  shouldCloseOnOverlayClick: true,
  customStyles: {},
  theme: {},
  children: null
};

export default Modal;
