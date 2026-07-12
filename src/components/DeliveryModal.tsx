import Modal from './Modal';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryModal = ({ isOpen, onClose }: DeliveryModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="DELIVERY">
      <div className="text-sm leading-relaxed text-gray-700 space-y-3">
        <p>
          Each new edition will be announced by email the moment it becomes
          available. Our magazines are published quarterly, with the exact release
          date varying within the month of publication.
        </p>
      </div>
    </Modal>
  );
};

export default DeliveryModal;