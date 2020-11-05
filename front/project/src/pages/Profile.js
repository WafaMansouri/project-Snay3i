import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadClient } from "../actions/authActions";
import AddPostModel from "./AddPostModel";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import { artisanPostsAction } from "../actions/artisanPostsAction";
import { Rate } from "antd";
import "../App.css";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
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
  const updateInfo = () => {
    history.push("/update-profile");
  };
  // To get all the rate and posts of the artisan (if the connected is artisan)
  useEffect(() => {
    if (auth.user && auth.user.state === "Artisan") {
      dispatch(artisanRatesAction(auth.user._id));
      dispatch(artisanPostsAction(auth.user._id));
    }
  }, [auth.user]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  const posts = useSelector((state) => state.posts);
  return addPostTest ? (
    <AddPostModel />
  ) : (
    <div className="profile">
      {auth.user && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div className="containerInfo">
            <a onClick={updateInfo}>UPDATE YOUR PROFILE</a>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="cadrePhoto">
                {/* <img src="/images/profileBack.png" alt="profilePhoto" /> */}
              </div>
              <Link to="addPhoto">
                <i class="small material-icons">add_a_photo</i>
              </Link>
            </div>
            {rate_artisan.rate && (
              <Rate
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "gray",
                  fontSize: 12,
                }}
                allowHalf
                disabled
                defaultValue={rate_artisan.rate.rate}
              />
            )}
            <ul>
              <li>
                <i class="small material-icons">account_circle</i>&nbsp;
                {auth.user.f_name + " " + auth.user.l_name}
              </li>
              <li>
                <i class="small material-icons">email</i>&nbsp;
                {auth.user.email}
              </li>
              {auth.user.category && (
                <li>
                  <i class="small material-icons">work</i>&nbsp;
                  {auth.user.category}
                </li>
              )}
              {auth.user.address && (
                <li>
                  <i class="small material-icons">phone</i>&nbsp;{" "}
                  {auth.user.tel}
                </li>
              )}
              {auth.user.address && (
                <li>
                  <i class="small material-icons">add_location</i>&nbsp;{" "}
                  {auth.user.address}
                </li>
              )}
              {auth.user.description && (
                <li>
                  <i class="small material-icons">description</i>&nbsp;{" "}
                  {auth.user.description}
                </li>
              )}
              {auth.user.age && <li>Age: {auth.user.age}</li>}
            </ul>
          </div>
          <div className="containerInfo">
            {auth.user && auth.user.state === "Artisan" && (
              <a onClick={(e) => setaddPostTest(true)}>ADD NEW POST</a>
            )}
            {posts.posts && (
              <div className="container-posts">
                {posts.posts.map((post, index) => {
                  return <PostModal key={index} post={post} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;

//Post Modal
const PostModal = ({ post }) => {
  return (
    <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src="images/profileBack.png" />
            <span class="card-title">{post.title}</span>
          </div>
          <div class="card-content">
            <p>{post.description}</p>
          </div>
          <div class="card-action">
            <a>
              <i class="small material-icons">favorite_border</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
