import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
return (
 <footer className={styles.footer}>
 <p>&copy; {new Date().getFullYear ()} Dashboard do meu site pessoal. Todos os direitos reservados.</p>
 </footer>
);
};

export default Footer;