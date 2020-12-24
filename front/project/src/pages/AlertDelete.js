import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../actions/artisanActions";
import { useAlert } from "react-alert";
import { removeUserAction } from "../actions/adminActions";

const AlertDelete = (props) => {
  const alert = useAlert();
  const [display, setdisplay] = useState(true);
  const dispatch = useDispatch();
  const removeUserFunction = (id, state) => {
    dispatch(removeUserAction(id, state));
    props.setalertDeleteUser(false);
    alert.success(<div>{state} removed</div>);
  };
  const deletePostFunction = (post_id) => {
    dispatch(deletePostAction(post_id));
    props.setalertDelete(false);
    alert.success(<div>Post Deleted with success</div>);
  };
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className="modal-backdrop alert"
          onClick={() => {
            setdisplay(false);
            props.post_id
              ? props.setalertDelete(false) //if alert to delete post
              : props.setalertDeleteUser(false); //if alert to delete user
          }}
        />
        <div className={"modal-box alert"}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="container_close_icon"
              onClick={(e) => {
                setdisplay(false);
                props.post_id
                  ? props.setalertDelete(false) //if alert to delete post
                  : props.setalertDeleteUser(false); //if alert to delete user
              }}
            >
              <i class="small material-icons">close</i>
            </div>
          </div>
          {props.post_id ? (
            <h4>Are you sure you want to delete this post</h4>
          ) : (
            <h4>Are you sure you want to remove this user</h4>
          )}

          <button
            onClick={(e) => {
              setdisplay(false);
              props.post_id
                ? props.setalertDelete(false) //if alert to delete post
                : props.setalertDeleteUser(false); //if alert to delete user
            }}
            className="waves-effect waves-light btn"
            type="submit"
          >
            CANCEL
          </button>
          <button
            onClick={(e) => {
              // dispatch(deletePostAction(match.params.id_post));
              setdisplay(false);
              if (props.post_id) {
                deletePostFunction(props.post_id);
              } //if alert to delete post
              else {
                removeUserFunction(
                  props.userToRemove.id,
                  props.userToRemove.state
                );
              } //if alert to delete user
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
