import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import addPhotoAction from "../actions/addPhotoAction";
import { Progress } from "antd";
import { useAlert } from "react-alert";

const AddPhoto = (props) => {
  const alert = useAlert();
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
        alert.success("Add Photo Success!");
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
        <div className="modal-box add_photo">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="container_close_icon"
              onClick={(e) => {
                setdisplay(false);
                props.setaddPhoto(false);
              }}
            >
              <i class="small material-icons">close</i>
            </div>
          </div>
          <h4>Update your profile photo</h4>
          <form>
            <label
              className="btn btn-primary btn-block btn-outlined"
              for="myphoto"
            >
              Choose Photo
            </label>
            <input
              onClick={(e) => seterror(false)}
              style={{ display: "none" }}
              className="browser-default"
              id="myphoto"
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              type="file"
              name="photo"
              accept="image/png, image/jpeg"
            />
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={percent}
            />
            <h6 style={{ color: "red", height: 50, paddingTop: 20 }}>
              {error && "Please choose a photo"}
            </h6>
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
