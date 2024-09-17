import React from "react";
import FilterByCheckbox from "./additional-components/FilterByCheckbox";
import Button from "./additional-components/Button";
import styles from "./Filter.module.css";

function Filter() {
  return <div className={styles.filter}>
  <div className={styles.filterItems}>
    <FilterByCheckbox >რეგიონი</FilterByCheckbox>
    <FilterByCheckbox >საფასო კატეგორია</FilterByCheckbox>
    <FilterByCheckbox >ფართობი</FilterByCheckbox>
    <FilterByCheckbox >საძინებლის რაოდენობა</FilterByCheckbox>
  </div>
    <div className={styles.addButtons}>
      <Button className={styles.addListing}>+ ლისტინგის დამატება</Button>
      <Button className={styles.addAgent}>+ აგენტის დამატება</Button>
    </div>
  </div>;
}

export default Filter;
