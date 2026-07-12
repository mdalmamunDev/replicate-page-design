import Modal from './Modal';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutUsModal = ({ isOpen, onClose }: AboutUsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ABOUT US">
      <div className="text-sm leading-relaxed text-gray-700 space-y-3">
        <p>
          Leisuretravelmedia.com publishes a curated portfolio of digital magazines
          devoted to travel, lifestyle, culture, art and the art of living.
        </p>
        <p>
          Our titles take readers to the world's most captivating destinations and
          the finest expressions of contemporary life — from the world of the arts
          to island escapes, from exceptional cuisine to wellness, from remarkable
          cultural experiences to the pleasures of living well through authoritative
          editorial, striking photography and the highest standards of design.
        </p>
        <p>
          Driven by a passion for discovery and an unwavering commitment to quality,
          each issue is crafted to inspire and to awaken a passion for the
          extraordinary — cultivating a deeper connection with the world, encouraging
          exploration and personal fulfillment, and nurturing a refined appreciation
          of all that life has to offer.
        </p>
      </div>
    </Modal>
  );
};

export default AboutUsModal;