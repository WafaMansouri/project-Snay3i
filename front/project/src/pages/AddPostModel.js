import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAction } from "../actions/artisanActions";

const AddPostModel = () => {
  const dispatch = useDispatch();
  const [info, setinfo] = useState({ title: "", description: "" });
  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const addPost = (e) => {
    e.preventDefault();
    dispatch(addPostAction(info));
  };
  return (
    <div>
      <form onSubmit={addPost}>
        <div>
          <label>ADD TITLE</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label>ADD DESCRIPTION</label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <div>
          <label>ADD IMAGE</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default AddPostModel;
