import React, { useEffect, useState, lazy, Suspense } from "react";
import Portal from '../portal';
import '../../../theme/components/core/modal.scss';

interface ModalProps {
  activeModal: string,
  onCloseModal?: () => void
}

const LazyComponent = (modal: string) => lazy(() => import(`../../modals/${modal}`));

const Modal : React.FC<ModalProps> = (props) => {
  const {
    activeModal,
    onCloseModal
  } = props;

  const [ActiveModal, setActiveModal] = useState<any>();

  useEffect(() => {
    setActiveModal(LazyComponent(activeModal)); 
  }, [activeModal]);

  return (
    <Portal>
      {activeModal !== '' && (
        <section className="modal" data-testid="modal-base">
          <i className="fas fa-times close-icon" onClick={onCloseModal} />
          <Suspense fallback={<i className="fas fa-spinner fa-spin" />}>
            {ActiveModal && (<ActiveModal />)}
          </Suspense>
        </section>
      )}
    </Portal>
  );
}

export default Modal;
