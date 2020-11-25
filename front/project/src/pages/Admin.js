import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../actions/adminActions";
import { getMessages } from "../actions/adminActions";
import { useAlert } from "react-alert";
import { retrieveCategories } from "../actions/categoriesActions";

const Admin = () => {
  const [newCategory, setnewCategory] = useState({ name: "" });
  const category = useSelector((state) => state.category);
  const messages_admin = useSelector((state) => state.messages_admin);
  const dispatch = useDispatch();
  const alert = useAlert();
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
    } else if (category.newCategory.name) {
      seterrors(null);
      alert.success("Category added!");
      setTimeout(() => {
        setnewCategory({ name: "" });
      }, 1000);
    }
  }, [category.errors]);
  useEffect(() => {
    dispatch(getMessages());
    dispatch(retrieveCategories());
  }, []);
  return (
    <div className="container_admin">
      <div>
        <h5>ADD NEW CATEGORY</h5>
        <div className="dropdown">
          <button className="dropbtn">All Categories</button>
          <div className="dropdown-content">
            {category.categories.map((el) => {
              return <a>el.name</a>;
            })}
          </div>
        </div>
        <form onSubmit={handleCategory}>
          <label>Add Category</label>
          <input
            className="browser-default"
            value={newCategory.name}
            type="text"
            name="category"
            onChange={handleChange}
          />
          <button>Add</button>
        </form>
        {errors && <h5 style={{ color: "red" }}>{errors}</h5>}
      </div>
      <div>
        <h5>AUTHENICATION AND AUTHORIZATION</h5>
        <div></div>
      </div>
      <div>
        <h5>ADD ADMIN</h5>
        <div></div>
      </div>
      <div>
        <h5>CHECK MESSAGES</h5>
        <div>
          {messages_admin.messages &&
            messages_admin.messages.map((msg) => {
              return (
                <div>
                  <ul>
                    <li>{msg.f_name}</li>
                    <li>{msg.l_name}</li>
                    <li>{msg.email}</li>
                    <li>{msg.mobile}</li>
                    <li>{msg.message}</li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
