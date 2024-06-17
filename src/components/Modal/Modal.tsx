// styles
import styles from "./index.module.scss";
// react
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
// routing
import { useLocation, useNavigate } from "react-router-dom";
// components
import { CloseIcon } from "../../assets/icons";
import { ModalOverlay } from "./ModalOverlay";

const modalRoot = document.getElementById("react-modals") as Element;

interface IProps {
  title?: string;
}

export const Modal: FC<PropsWithChildren<IProps>> = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [navigate, closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.close} onClick={closeModal}>
          <div className={styles.inner}>
            <span className={styles.title}>{title}</span>
            {CloseIcon}
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot
  );
};
