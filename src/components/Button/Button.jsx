import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Button.scss";
const cx = classNames.bind(styles);

const defaultProps = {};
const propTypes = {};

class Button extends Component {
  render() {
    const { value, className, onClick } = this.props;
    return (
      <button className={cx(styles.button, className)} onClick={onClick}>
        {value}
      </button>
    );
  }
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
