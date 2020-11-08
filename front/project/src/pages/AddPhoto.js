import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import addPhotoAction from "../actions/addPhotoAction";
const AddPhoto = () => {
  const [display, setdisplay] = useState(true);
  const history = useHistory();
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  const addPhoto = (e) => {
    e.preventDefault();
    dispatch(addPhotoAction(file));
    setdisplay(false);
    history.back();
  };
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            history.goBack();
          }}
        />
        <div className={"modal-box"}>
          <form>
            <label>ADD IMAGE</label>
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              className="browser-default"
              type="file"
              name="photo"
            />
            <button
              onClick={addPhoto}
              className="waves-effect waves-light btn"
              type="submit"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    )
  );
};
export default AddPhoto;
