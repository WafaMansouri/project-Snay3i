import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  deleteCategory,
  deleteMessageAction,
  getUsers,
} from "../actions/adminActions";
import { getMessages } from "../actions/adminActions";
import { useAlert } from "react-alert";
import { retrieveCategories } from "../actions/categoriesActions";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import AlertDelete from "./AlertDelete";
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const Admin = ({ match }) => {
  let styleLinks = {
    // backgroundColor: "#232f3e",
    // textDecoration: "underline",
    backgroundColor: "#1890ff",
    color: "white",
  };
  return (
    <div className="container_admin">
      <div className="links_sections">
        <ul>
          <Link to={`${match.url}/messages`}>
            <li
              style={
                window.location.pathname === "/admin/messages"
                  ? styleLinks
                  : null
              }
            >
              Messages
            </li>
          </Link>
          <Link to={`${match.url}/categories`}>
            <li
              style={
                window.location.pathname === "/admin/categories"
                  ? styleLinks
                  : null
              }
            >
              Categories
            </li>
          </Link>
          <Link to={`${match.url}/users`}>
            <li
              style={
                window.location.pathname === "/admin/users" ? styleLinks : null
              }
            >
              Users
            </li>
          </Link>
        </ul>
        <Switch>
          <Route
            exact
            path={`${match.url}/categories`}
            component={Categories}
          />
          <Route exact path={`${match.url}/messages`} component={Messages} />
          <Route exact path={`${match.url}/users`} component={Users} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;

const Categories = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [newCategory, setnewCategory] = useState({ name: "" });
  const category = useSelector((state) => state.category);
  const handleChange = (e) => {
    setnewCategory({ ...newCategory, name: e.target.value });
  };
  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(newCategory));
  };
  useEffect(() => {
    dispatch(retrieveCategories());
  }, []);
  useEffect(() => {
    if (category.errors) {
      alert.error(category.errors);
      setTimeout(() => {
        category.errors = null;
      }, 1000);
    } else if (category.deletedCategory) {
      alert.success("Category deleted!");
    } else if (category.newCategory) {
      alert.success("Category added!");
      setTimeout(() => {
        setnewCategory({ name: "" });
      }, 1000);
    }
  }, [category]);
  return (
    <div className="categories_section">
      <form onSubmit={handleCategory}>
        <input
          className="browser-default"
          placeholder="Add new Category"
          value={newCategory.name}
          type="text"
          name="category"
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
      <table className="table">
        <thead className="table-dark">
          <td>Category</td>
          <td>Action</td>
        </thead>
        <tbody>
          {category.categories.length > 0 &&
            category.categories.map((el) => {
              return (
                <tr>
                  <td>{el.name}</td>{" "}
                  <td>
                    <button
                      onClick={(e) => {
                        dispatch(deleteCategory(el.name));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const Messages = () => {
  const messages_admin = useSelector((state) => state.messages_admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages());
  }, []);
  return (
    <div className="messages_section">
      <table className="table">
        <thead className="table-dark">
          <td>Full Name</td>
          <td>Email</td>
          <td>Mobile</td>
          <td>Message</td>
          <td>Date</td>
          <td>Action</td>
        </thead>
        <tbody>
          {messages_admin.messages &&
            messages_admin.messages.map((msg) => {
              return (
                <tr key={msg._id}>
                  <td>{upper(msg.f_name) + " " + upper(msg.l_name)}</td>
                  <td>{msg.email}</td>
                  <td>{msg.mobile}</td>
                  <td>{msg.message}</td>
                  <td>
                    {
                      new Date(msg.created_at)
                        .toLocaleString("en-GB", {})
                        .split(", ")[0]
                    }
                  </td>
                  <td>
                    <button
                      // key={msg._id}
                      onClick={(e) => {
                        dispatch(deleteMessageAction(msg._id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const Users = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const list_users = useSelector((state) => state.list_users);
  const [alertDeleteUser, setalertDeleteUser] = useState(false);
  const [userToRemove, setuserToRemove] = useState({ id: null, state: "" });
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const data = {
    columns: [
      {
        label: "State",
        field: "state",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Full Name",
        field: "full_name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 150,
      },
      {
        label: "Member since",
        field: "member_since",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],

    rows: [],
  };
  list_users.users &&
    list_users.users.map((user) => {
      data.rows.push({
        state: user.state,
        email: user.email,
        full_name: upper(user.f_name) + " " + upper(user.l_name),
        category: user.category ? user.category : "-",
        member_since: new Date(user.created_at)
          .toLocaleString("en-GB", {})
          .split(", ")[0],
        action: (
          <button
            key={user._id}
            onClick={(e) => {
              setuserToRemove({ id: user._id, state: user.state });
              setalertDeleteUser(true);
            }}
          >
            Remove
          </button>
        ),
      });
    });
  return (
    <div>
      <MDBDataTable striped bordered small responsiveSm data={data} />
      {alertDeleteUser && (
        <AlertDelete
          userToRemove={userToRemove}
          setalertDeleteUser={setalertDeleteUser}
        />
      )}
    </div>
  );
};
