import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import updateAction from "../actions/updateAction";
import { useHistory } from "react-router-dom";
import { retrieveCategories } from "../actions/categoriesActions";
import { useAlert } from "react-alert";

const UpdateProfile = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //to retrieve categories from database and update state category
  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);
  const category = useSelector((state) => state.category);
  const [info, setinfo] = useState({
    f_name: auth.user.f_name,
    l_name: auth.user.l_name,
    age: auth.user.age,
    address: auth.user.address,
    email: auth.user.email,
    category: auth.user.category,
    description: auth.user.description,
    tel: auth.user.tel,
  });
  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const update = useSelector((state) => state.update);
  const updateInfo = (e) => {
    e.preventDefault();
    dispatch(updateAction(info));
  };
  const [display, setdisplay] = useState(true);
  const [first, setFirst] = useState(false);
  useEffect(() => {
    if (first) {
      if (!update.errors) {
        history.goBack();
        alert.success("Update Success!");
      }
    }
    setFirst(true);
  }, [update]);
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
          <form onSubmit={updateInfo}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="f_name"
                defaultValue={auth.user.f_name}
                onChange={handleChange}
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray", color: "gray" }}
              >
                edit
              </i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="l_name"
                defaultValue={auth.user.l_name}
                onChange={handleChange}
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray" }}
              >
                edit
              </i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="email"
                name="email"
                defaultValue={auth.user.email}
                onChange={handleChange}
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray" }}
              >
                edit
              </i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="address"
                defaultValue={auth.user.address}
                onChange={handleChange}
                placeholder="address"
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray" }}
              >
                edit
              </i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="tel"
                defaultValue={auth.user.tel}
                onChange={handleChange}
                placeholder="telephone number"
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray" }}
              >
                edit
              </i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="age"
                defaultValue={auth.user.age}
                onChange={handleChange}
                placeholder="age"
              />
              <i
                class="material-icons"
                style={{ fontSize: "1.7rem", color: "gray" }}
              >
                edit
              </i>
            </div>
            {auth.user.state === "Artisan" && (
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type="text"
                    name="category"
                    placeholder="describe your job"
                    defaultValue={auth.user.description && auth.user.category}
                    onChange={handleChange}
                  />
                  <i
                    class="material-icons"
                    style={{ fontSize: "1.7rem", color: "gray" }}
                  >
                    edit
                  </i>
                </div>
              </div>
            )}

            <h5 style={{ color: "red", marginTop: 20 }}>
              {update.errors && update.errors}
            </h5>
            {/* <button
              onClick={() => {
                alert.success("It's ok now!");
              }}
            >
              Success!
            </button> */}
            <button className="waves-effect waves-light btn" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateProfile;
