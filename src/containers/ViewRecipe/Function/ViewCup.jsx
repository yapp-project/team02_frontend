import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";

import glass1 from "../../../static/images/glass1_full.png";
import glass2 from "../../../static/images/glass2_full.png";
import glass3 from "../../../static/images/glass3_full.png";
import glass4 from "../../../static/images/glass4_full.png";
import glass5 from "../../../static/images/glass5_full.png";

const glasses = [glass1, glass2, glass3, glass4, glass5];

const cx = classNames.bind(styles);

const RecipeCup = (props) => {
  const styles = {
    backgroundImage: `url(${glasses[props.glass]})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  }

  return (
    <span style={styles} id="cupImage" className={cx("detail-content-main-view-cup")}></span>
  );
};

export default RecipeCup;