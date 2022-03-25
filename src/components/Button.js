import React from "react";
import classNames from "classnames";
import "./Button.scss";

export default function Button(props) {

   const buttonClass = classNames(
      'button',
      { 'button--confirm': props.confirm },
      { 'button--danger': props.danger }
   );

   return (
      <button
         onClick={props.onClick}
         disabled={props.disabled}
         className={buttonClass}
      >
         {props.children}
      </button>
   );

};
