import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../actions/authActions";
import AddPhoto from "./AddPhoto";
import AddPostModel from "./AddPostModel";
import { artisanRatesAction } from "../actions/artisanRatesAction";
const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const [addPostTest, setaddPostTest] = useState(false);
  const dispatch = useDispatch();
  //to retrieve client's data when the page feed have been loaded
  useEffect(() => {
    if (auth.isAuth) {
      dispatch(loadClient());
    }
  }, [auth.isAuth, dispatch]);
  const addPost = useSelector((state) => state.addPost);
  //after adding the post set addPostTest to false to come back to the profile page
  useEffect(() => {
    setaddPostTest(false);
  }, [addPost._id]);
  //update info
  const updateInfo = () => {};
  // To get all the rate of the  artisan (if the connected is artisan)
  useEffect(() => {
    if (auth.user && auth.user.state === "Artisan")
      dispatch(artisanRatesAction(auth.user._id));
  }, [auth.user]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  return addPostTest ? (
    <AddPostModel />
  ) : (
    <div>
      {rate_artisan.rate && (
        <i className="far fa-star" style={{ fontSize: 50 }}>
          {rate_artisan.rate.rate.toFixed(1)}
        </i>
      )}
      <button onClick={updateInfo}>UPDATE YOUR PROFILE</button>
      {auth.user && (
        <ul>
          <li>First Name: {auth.user.f_name}</li>
          <li>Last Name: {auth.user.l_name}</li>
          <li>Email: {auth.user.email}</li>
          {auth.user.category && <li>Job Category: {auth.user.category}</li>}
          {auth.user.description && (
            <li>Job Description: {auth.user.description}</li>
          )}
          {auth.user.age && <li>Age: {auth.user.age}</li>}
          {auth.user.address && <li>Address: {auth.user.address}</li>}
        </ul>
      )}
      <AddPhoto />
      {auth.user && auth.user.state === "Artisan" && (
        <button onClick={(e) => setaddPostTest(true)}>ADD NEW POST</button>
      )}
    </div>
  );
};

export default Profile;
