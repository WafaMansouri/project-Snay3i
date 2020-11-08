import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePostAction } from "../actions/artisanActions";
const Alert = ({ match }) => {
  const [display, setdisplay] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className="modal-backdrop alert"
          onClick={() => {
            setdisplay(false);
            history.goBack();
          }}
        />
        <div className={"modal-box alert"}>
          <h5>Are you sure you want to delete this post?</h5>
          <button
            onClick={(e) => {
              setdisplay(false);
              history.goBack();
            }}
            className="waves-effect waves-light btn"
            type="submit"
          >
            CANCEL
          </button>
          <button
            onClick={(e) => {
              console.log(match.params.id_post);
              dispatch(deletePostAction(match.params.id_post));
              setdisplay(false);
              history.goBack();
            }}
            className="waves-effect waves-light btn"
            type="submit"
          >
            CONFIRM
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
