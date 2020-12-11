import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../actions/artisanActions";
import { useAlert } from "react-alert";

const AlertDelete = (props) => {
  const alert = useAlert();
  const [display, setdisplay] = useState(true);
  const dispatch = useDispatch();
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className="modal-backdrop alert"
          onClick={() => {
            setdisplay(false);
            props.setalertDelete(false);
          }}
        />
        <div className={"modal-box alert"}>
          <h5>Are you sure you want to delete this post?</h5>
          <button
            onClick={(e) => {
              setdisplay(false);
              props.setalertDelete(false);
            }}
            className="waves-effect waves-light btn"
            type="submit"
          >
            CANCEL
          </button>
          <button
            onClick={(e) => {
              // dispatch(deletePostAction(match.params.id_post));
              dispatch(deletePostAction(props.post_id));
              setdisplay(false);
              props.setalertDelete(false);
              alert.success(<div>Post Deleted with success</div>);
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

export default AlertDelete;
