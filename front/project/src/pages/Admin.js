import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../actions/adminActions";
const Admin = () => {
  const [newCategory, setnewCategory] = useState({ name: "" });
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setnewCategory({ ...newCategory, name: e.target.value });
  };

  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(newCategory));
  };
  const [errors, seterrors] = useState(null);
  useEffect(() => {
    if (category.errors) {
      seterrors(category.errors);
    } else seterrors(null);
  }, [category.errors]);
  return (
    <div>
      <form onSubmit={handleCategory}>
        <label>Add Category</label>
        <input type="text" name="category" onChange={handleChange} />
        <button>Add</button>
      </form>
      {errors && <h1>{errors}</h1>}
    </div>
  );
};

export default Admin;
