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
  // Redirect to the feed page after register
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
    <form onSubmit={registerNow}>
      <button type="button" onClick={handleUserState}>
        {info.state}
      </button>
      <div>
        <label>First Name</label>
        <input type="text" name="f_name" onChange={handleChange} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="l_name" onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      {info.state === "Artisan" && (
        // Add Category
        <div>
          <label className="browser-default">Job Category</label>
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
          <label className="browser-default">Governorate</label>
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
      <button type="submit">Register {info.state}</button>
      {errors && <h3>{errors}</h3>}
    </form>
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
