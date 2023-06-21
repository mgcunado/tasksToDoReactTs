import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  translations: any
}

export const DeleteConfirmModal = ({ message, onConfirm, onCancel, setShowModal, showModal, translations }: ModalProps) => {
  const appElement = document.getElementById('root') as HTMLElement;
  const { t } = useTranslation();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={ showModal }
      onRequestClose={onCancel}
      onAfterClose={handleClose}
      contentLabel="Confirm"
      className="confirm-modal"
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }}
      appElement={ appElement }
    >
      <h2>{message}</h2>
      <button className="cancel-button" onClick={onCancel}>{t(translations.tasks['Cancel'])}</button>
      <button className="confirm-button" onClick={onConfirm}>{t(translations.tasks['Confirm'])}</button>
    </Modal>
  );
}
