import React from "react";
import styles from "./CardAbout.module.css";

import { InfoAbout } from "../../../services/serviceAbout";

interface CardAboutProps {
  infoAbout: InfoAbout;
}

const CardAbout: React.FC<CardAboutProps> = ({infoAbout}) => {
 
  const {foto, resumo} = infoAbout;
  return (
    <div className={styles.card}>
      <img src={foto}  className={styles.foto} />
      <div className={styles.content}>
    
        <p className={styles.resumo}>{resumo}</p>
      </div>
    </div>
  );
};

export default CardAbout;