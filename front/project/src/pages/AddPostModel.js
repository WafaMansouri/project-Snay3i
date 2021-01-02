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
  const [error, seterror] = useState(false);

  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const selectImageToUpload = (e) => {
    setfile(e.target.files[0]);
  };
  const addPost = (e) => {
    e.preventDefault();
    if (info.description.length < 15)
      seterror("Your description  must have 15 characters at least");
    else if (!file) {
      seterror("Please choose a photo");
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
      dispatch(addPostAction(info, file, config));
    }
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
        <div className={"modal-box add_post"}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="container_close_icon"
              onClick={(e) => {
                setdisplay(false);
                props.setaddPostTest(false);
              }}
            >
              <i class="small material-icons">close</i>
            </div>
          </div>
          <h4>Add new post</h4>
          <form>
            <input
              type="text"
              name="title"
              placeholder="TITLE"
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="DESCRIPTION"
              onChange={handleChange}
              // required
            />
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
              // required
            />
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={percent}
            />
            {/* <Progress percent={percent} /> */}
            <h6 className="error_add_post">{error && error}</h6>
            <button className="waves-effect waves-light btn" onClick={addPost}>
              ADD
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModel;
