import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPostAction } from "../actions/artisanActions";
import { useAlert } from "react-alert";
import { Progress } from "antd";

const AddPostModel = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [file, setfile] = useState(null);
  const [info, setinfo] = useState({ title: "", description: "" });
  const [percent, setpercent] = useState(0);
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) =>
      setpercent(
        parseInt(Math.floor((progressEvent.loaded * 100) / progressEvent.total))
      ),
  };
  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const selectImageToUpload = (e) => {
    setfile(e.target.files[0]);
  };
  const addPost = (e) => {
    e.preventDefault();
    dispatch(addPostAction(info, file, config));
  };
  const [display, setdisplay] = useState(true);
  useEffect(() => {
    if (percent === 100) {
      setTimeout(() => {
        setdisplay(false);
        props.setaddPostTest(false);
        alert.success(<div>Add Post Success</div>);
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
            props.setaddPostTest(false);
          }}
        />
        <div className={"modal-box"}>
          <form onSubmit={addPost}>
            <div>
              <input
                type="text"
                name="title"
                placeholder="TITLE"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                placeholder="DESCRIPTION"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="btn btn-primary btn-block btn-outlined"
                for="mypost"
              >
                Choose Photo
              </label>
              <input
                style={{ display: "none" }}
                className="browser-default"
                id="mypost"
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={selectImageToUpload}
                required
              />
            </div>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={percent}
            />
            {/* <Progress percent={percent} /> */}
            <button className="waves-effect waves-light btn">ADD</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModel;
