import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAction } from "../actions/artisanActions";
import { useHistory } from "react-router-dom";

const AddPostModel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [info, setinfo] = useState({ title: "", description: "" });
  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const addPost = (e) => {
    e.preventDefault();
    dispatch(addPostAction(info));
    history.goBack();
  };
  const [display, setdisplay] = useState(true);

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
              <label>ADD IMAGE</label>
              <input
                className="browser-default"
                type="file"
                name="photo"
                onChange={handleChange}
              />
            </div>
            <button className="waves-effect waves-light btn" type="submit">
              ADD
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModel;
