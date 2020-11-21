import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import addPhotoAction from "../actions/addPhotoAction";
import { Progress } from "antd";

const AddPhoto = (props) => {
  const [display, setdisplay] = useState(true);
  const [percent, setpercent] = useState(0);
  const [file, setfile] = useState(null);
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const addPhoto = (e) => {
    e.preventDefault();
    if (!file) {
      seterror(true);
    } else {
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) =>
          setpercent(
            parseInt(
              Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            )
          ),
      };
      dispatch(addPhotoAction(file, config));
    }
  };
  useEffect(() => {
    if (percent == 100) {
      setTimeout(() => {
        setdisplay(false);
        props.setaddPhoto(false);
      }, 1000);
    }
  }, [percent]);
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            props.setaddPhoto(false);
          }}
        />
        <div className={"modal-box"} style={{ minHeight: 300, width: "30%" }}>
          <form>
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              type="file"
              name="photo"
            />
            <Progress type="circle" percent={percent} />
            {error && <h6 style={{ color: "red" }}>Please choose a photo</h6>}
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
