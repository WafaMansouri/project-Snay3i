import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { retrieveCategories } from "../actions/categoriesActions";

const Register = ({ history }) => {
  const [userState, setuserState] = useState("Client");
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
    if (auth.isAuth === true) {
      history.push("/profile");
    }
    if (auth.errors) {
      seterrors(auth.errors);
    }
  }, [auth.isAuth, auth.errors]);
  //to retrieve categories from database and update state category
  useEffect(() => {
    dispatch(retrieveCategories());
  }, []);
  // Change the state of the user
  const handleUserState = () => {
    if (userState === "Client") {
      setuserState("Artisan");
      setInfo({ ...info, state: "Artisan" });
    } else {
      setuserState("Client");
      setInfo({ ...info, state: "Client" });
    }
  };
  return (
    <form onSubmit={registerNow}>
      <button type="button" onClick={handleUserState}>
        {userState}
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
      {userState === "Artisan" && (
        <div>
          <label className="browser-default">Job Category</label>
          <select
            className="browser-default"
            name="category"
            id=""
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
        </div>
      )}
      <button type="submit">Register {userState}</button>
      {errors && <h3>{errors}</h3>}
    </form>
  );
};

export default Register;