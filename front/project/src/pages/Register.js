import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { retrieveCategories } from "../actions/categoriesActions";

const Register = ({ history }) => {
  const [info, setInfo] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    state: "Client",
  });
  const [errors, seterrors] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //retrieve category from state
  const category = useSelector((state) => state.category);

  //function to dispatch action of register client
  const registerNow = (e) => {
    e.preventDefault();
    dispatch(register(info));
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  // Redirect to the profile page after register
  useEffect(() => {
    if (auth.isAuth) {
      history.push("/profile");
    }
    if (auth.errors) {
      seterrors(auth.errors);
    }
  }, [auth.isAuth, auth]);
  //to retrieve categories from database and update state category
  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);

  return (
    <div className="container_login register">
      <form
        className="form_login"
        onSubmit={registerNow}
        onFocus={() => seterrors(null)}
      >
        <div className="grid_item_login">
          <div className="login_radioGroup">
            <input
              onChange={handleChange}
              className="login_radio"
              // className="browser-default"
              type="radio"
              id="client"
              name="state"
              value="Client"
              defaultChecked
            />
            <label for="client" className="login_radioLabel">
              Client
            </label>
            <input
              onChange={handleChange}
              className="login_radio"
              type="radio"
              id="artisan"
              name="state"
              value="Artisan"
            />
            <label for="artisan" className="login_radioLabel">
              Artisan
            </label>
          </div>
          <div>
            <input
              className="browser-default"
              type="text"
              name="f_name"
              placeholder="  &#xF007; First Name"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="browser-default"
              type="text"
              name="l_name"
              placeholder="  &#xF007; Last Name"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="browser-default"
              type="email"
              name="email"
              placeholder="  &#xF0E0; Email"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="browser-default"
              type="password"
              name="password"
              placeholder="  &#xF023; Password"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={handleChange}
            />
          </div>
          {info.state === "Artisan" && (
            // Add Category
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <select
                className="browser-default"
                name="category"
                onChange={handleChange}
              >
                {/* {handleCategory()} */}
                <option value="" disabled selected>
                  "--Select Category--"
                </option>
                {category.categories.map((el, index) => (
                  <option key={index} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              {/* Add Address */}
              <select
                className="browser-default"
                name="address"
                onChange={handleChange}
              >
                <Governorate />
              </select>
            </div>
          )}
        </div>
        <div className="grid_item_login">
          <div style={{ height: 30 }}>
            {errors && <h6 className="errorRegister">{errors}</h6>}
          </div>
          <button
            className="waves-effect waves-light btn"
            style={{ borderRadius: 8 }}
            type="submit"
          >
            Register {info.state}
          </button>
        </div>
      </form>
    </div>
  );
};
const Governorate = () => {
  return (
    <>
      <option className="r" disabled selected>
        "--Select Your Governorate--"
      </option>
      <option>Ariana</option>
      <option>Beja</option>
      <option>Ben Arous</option>
      <option>Bizert</option>
      <option>Gabes</option>
      <option>Gafsa</option>
      <option>Jandouba</option>
      <option>Kairouan</option>
      <option>Kasserine</option>
      <option>Kebilli</option>
      <option>Kef</option>
      <option>Mahdia</option>
      <option>Manouba</option>
      <option>Medenine</option>
      <option>Monastir</option>
      <option>Nabeul</option>
      <option>Sfax</option>
      <option>Sidi Bouzid</option>
      <option>Siliana</option>
      <option>Sousse</option>
      <option>Tataouine</option>
      <option>Tozeur</option>
      <option>Tunis</option>
      <option>Zaouana</option>
    </>
  );
};
export default Register;
