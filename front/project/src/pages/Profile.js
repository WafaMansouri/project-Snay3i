import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../actions/authActions";
import AddPhoto from "./AddPhoto";
import AddPostModel from "./AddPostModel";
const Profile = () => {
  const [addPostTest, setaddPostTest] = useState(false);
  const dispatch = useDispatch();
  //to retrieve client's data when the page feed have been loaded
  useEffect(() => {
    dispatch(loadClient());
  }, []);
  const addPost = useSelector((state) => state.addPost);
  useEffect(() => {
    setaddPostTest(false);
  }, [addPost._id]);
  const auth = useSelector((state) => state.auth);
  return addPostTest ? (
    <AddPostModel />
  ) : (
    <div>
      Hello {auth.user && auth.user.f_name}
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
