// styles
import styles from "./index.module.scss";

import { FC } from "react";

interface IModalOverlay {
  closeModal: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
  return <div onClick={closeModal} className={styles.overlay}></div>;
};
