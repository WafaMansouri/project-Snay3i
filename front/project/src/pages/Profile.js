import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../actions/authActions";
import AddPhoto from "./AddPhoto";
import AddPostModel from "./AddPostModel";
const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const [addPostTest, setaddPostTest] = useState(false);
  const dispatch = useDispatch();
  //to retrieve client's data when the page feed have been loaded
  useEffect(() => {
    dispatch(loadClient());
  }, []);
  const addPost = useSelector((state) => state.addPost);
  //after adding the post set addPostTest to false to come back to the profile page
  useEffect(() => {
    setaddPostTest(false);
  }, [addPost._id]);
  //update info
  const updateInfo = () => {};
  return addPostTest ? (
    <AddPostModel />
  ) : (
    <div>
      <button onClick={updateInfo}>APDATE YOUR PROFILE</button>
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
      {/* upload photo */}
      {/* <form action="/profile" method="post" encType="multipart/form-data">
        <input type="file" name="profile_image" />
      </form> */}
      <AddPhoto />
      {auth.user && auth.user.state === "Artisan" && (
        <button onClick={(e) => setaddPostTest(true)}>ADD NEW POST</button>
      )}
    </div>
  );
};

export default Profile;
