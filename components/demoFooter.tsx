import React from "react";
import styles from "@/styles/Footer.module.css";
import { CatCardProps } from "@/types/global";

const DemoFooter = (props: { herd: CatCardProps[]; UserData: string }) => {
  return (
    <footer className={styles.footerContainer}>
      <select className={styles.dropdown}>
        <option className={styles.dropdownOption} value={props.UserData}>
          {props.UserData}
        </option>
      </select>
      <div className={styles.aligment}>
        <div className={styles.carAligment}>Car Aligment</div>
        <div className={styles.truckAligment}>Truck Aligment</div>
      </div>
    </footer>
  );
};

export default DemoFooter;
