import React from "react";
import "../ContactModal.css";
function ContactModal(props) {
  return (
    <div className={"modal-wrapper"}>
      <div
        className={"modal-backdrop"}
        onClick={() => {
          props.setdis("false");
          props.setin("");
        }}
      />
      <div className={"modal-box"}>{props.children}</div>
    </div>
  );
}
export default ContactModal;
