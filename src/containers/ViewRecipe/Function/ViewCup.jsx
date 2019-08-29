import React from "react";
import classNames from "classnames/bind";
import styles from "./ViewRecipe.scss";
import { ShakeList } from "../../../components";

import glass1 from "../../../static/images/glass1_full.png";
import glass2 from "../../../static/images/glass2_full.png";
import glass3 from "../../../static/images/glass3_full.png";
import glass4 from "../../../static/images/glass4_full.png";
import glass5 from "../../../static/images/glass5_full.png";

const glasses = [glass1, glass2, glass3, glass4, glass5];
const shakePosition = [
  ["7.5%", "60%"],
  ["30%", "39.5%"],
  ["30.7%", "38.7%"],
  ["34.2%", "37.2%"],
  ["41.5%", "31%"]
];

const cx = classNames.bind(styles);

const RecipeCup = props => {
  const cupImagestyles = {
    backgroundImage: `url(${glasses[props.glass]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    zIndex: 1,
    gridColumn: "2 / span 1"
  };
  const viewCupStyles = {
    position: "absolute",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 500px auto"
  };
  const shakeListColumnStyles = {
    position: "absolute",
    width: "100%",
    gridColumn: "2 / span 1"
  };
  const dummyStyles1 = {
    position: "absolute",
    width: "100%",
    gridColumn: "1 / span 1"
  };
  const dummyStyles2 = {
    position: "absolute",
    width: "100%",
    gridColumn: "3 / span 1"
  };
  const cup_style = {
    width: "100%",
    height: "100%",
    resize: "none",
    bottom: 0,
    position: "absolute",
    zIndex: 1,
    gridColumn: "2 / span 1"
  };
  return (
    <div style={viewCupStyles}>
      <div style={dummyStyles1} />
      {/* <span
        style={cupImagestyles}
        id="cupImage"
        className={cx("detail-content-main-view-cup")}
      /> */}
      <img src={glasses[props.glass]} style={cup_style} alt="컵" />
      <div style={dummyStyles2} />
      <div style={shakeListColumnStyles}>
        <ShakeList
          id={props.id}
          className={props.className}
          shakeitem={props.stuffs}
          direction={props.direction}
          startposition={shakePosition[props.glass][0]}
          endposition={shakePosition[props.glass][1]}
        />
      </div>
    </div>
  );
};

export default RecipeCup;
