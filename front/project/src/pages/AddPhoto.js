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
    history.goBack();
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
        <div className={"modal-box"} style={{ minHeight: 300 }}>
          <form>
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              type="file"
              name="photo"
            />
            <button
              style={{ width: 200, marginTop: 50 }}
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
