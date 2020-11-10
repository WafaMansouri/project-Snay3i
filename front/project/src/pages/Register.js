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
  }, [auth.isAuth, auth.errors, history]);
  //to retrieve categories from database and update state category
  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);
  // Change the state of the user
  const handleUserState = () => {
    if (info.state === "Client") {
      setInfo({ ...info, state: "Artisan" });
    } else {
      setInfo({ ...info, state: "Client" });
    }
  };
  return (
    <div className="container_login">
      <form className="form_login" onSubmit={registerNow}>
        <button type="button" onClick={handleUserState}>
          {info.state}
        </button>
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
          <div>
            <select
              className="browser-default"
              name="category"
              onChange={handleChange}
              required
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
              required
            >
              <Governorate />
            </select>
          </div>
        )}
        <button
          className="waves-effect waves-light btn"
          style={{ borderRadius: 8 }}
          type="submit"
        >
          Register {info.state}
        </button>
        {errors && <h6 style={{ color: "red", marginTop: 10 }}>{errors}</h6>}
      </form>
    </div>
  );
};
const Governorate = () => {
  return (
    <>
      <option disabled selected>
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
