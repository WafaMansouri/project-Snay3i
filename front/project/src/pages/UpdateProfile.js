import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import updateAction from "../actions/updateAction";
import { retrieveCategories } from "../actions/categoriesActions";
import { useAlert } from "react-alert";

const UpdateProfile = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //to retrieve categories from database and update state category
  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);
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
        props.setupdateInfo(false);
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
            props.setupdateInfo(false);
            update.errors = null;
          }}
        />
        <div className={"modal-box update_profile"}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="container_close_icon"
              onClick={(e) => {
                setdisplay(false);
                props.setupdateInfo(false);
                update.errors = null;
              }}
            >
              <i class="small material-icons">close</i>
            </div>
          </div>
          <form onSubmit={updateInfo}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="f_name"
                defaultValue={auth.user.f_name}
                onChange={handleChange}
              />
              <i class="material-icons">edit</i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="l_name"
                defaultValue={auth.user.l_name}
                onChange={handleChange}
              />
              <i class="material-icons">edit</i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="email"
                name="email"
                defaultValue={auth.user.email}
                onChange={handleChange}
              />
              <i class="material-icons">edit</i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="address"
                defaultValue={auth.user.address}
                onChange={handleChange}
                placeholder="address"
              />
              <i class="material-icons">edit</i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="tel"
                defaultValue={auth.user.tel}
                onChange={handleChange}
                placeholder="telephone number"
              />
              <i class="material-icons">edit</i>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                name="age"
                defaultValue={auth.user.age}
                onChange={handleChange}
                placeholder="age"
              />
              <i class="material-icons">edit</i>
            </div>
            {auth.user.state === "Artisan" && (
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type="text"
                    name="description"
                    placeholder="describe your job"
                    defaultValue={
                      auth.user.description && auth.user.description
                    }
                    onChange={handleChange}
                  />
                  <i class="material-icons">edit</i>
                </div>
              </div>
            )}
            <h6 className="error_update">{update.errors && update.errors}</h6>
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
