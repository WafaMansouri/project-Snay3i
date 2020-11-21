import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadClient } from "../actions/authActions";
import AddPostModel from "./AddPostModel";
import AlertDelete from "./AlertDelete";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import { artisanPostsAction } from "../actions/artisanActions";
import { likesArtisanAction } from "../actions/artisanActions";
import { Rate } from "antd";
import { useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import AddPhoto from "./AddPhoto";
//function that convert the first letter of a string to uppercase
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const [addPostTest, setaddPostTest] = useState(false);
  const [updateInfo, setupdateInfo] = useState(false);
  const [addPhoto, setaddPhoto] = useState(false);
  const dispatch = useDispatch();
  //to retrieve client's data when the page feed have been loaded
  useEffect(() => {
    if (auth.isAuth) {
      dispatch(loadClient());
    }
  }, [auth.isAuth]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    if (auth.user && auth.user.state === "Artisan") {
      dispatch(artisanRatesAction(auth.user._id));
      dispatch(artisanPostsAction(auth.user._id));
      dispatch(likesArtisanAction(auth.user._id));
    }
  }, [auth.user]);
  return (
    <div>
      {updateInfo && <UpdateProfile setupdateInfo={setupdateInfo} />}
      {addPostTest && <AddPostModel setaddPostTest={setaddPostTest} />}
      {addPhoto && <AddPhoto setaddPhoto={setaddPhoto} />}
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
              <a onClick={(e) => setupdateInfo(true)}>UPDATE YOUR PROFILE</a>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cadrePhoto">
                  <img
                    className="cadrePhoto"
                    src={
                      auth.user.avatar
                        ? auth.user.avatar
                        : "/images/profile_photo.png"
                    }
                    alt="profile photo"
                  />
                </div>
                {/* <Link to="addPhoto"> */}
                <a onClick={(e) => setaddPhoto(true)}>
                  <i class="small material-icons">add_a_photo</i>
                </a>
                {/* </Link> */}
              </div>
              {rate_artisan.rate && (
                <div className="rate">
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
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: "1.5em",
                      marginLeft: 5,
                    }}
                  >
                    {rate_artisan.rate ? rate_artisan.rate.nbr_rate : 0}
                  </span>
                  <span style={{ paddingTop: 5 }}>
                    <i class="material-icons">person</i>
                  </span>
                </div>
              )}
              <ul>
                <li>
                  <i class="small material-icons">account_circle</i>&nbsp;
                  {upper(auth.user.f_name) + " " + upper(auth.user.l_name)}
                </li>
                <li>
                  <i class="small material-icons">email</i>&nbsp;
                  {auth.user.email}
                </li>
                {auth.user.category && (
                  <li>
                    <i class="small material-icons">work</i>&nbsp;
                    {upper(auth.user.category)}
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
                    {upper(auth.user.description)}
                  </li>
                )}
                <li>
                  <i class="small material-icons">access_time</i>&nbsp; member
                  since{" "}
                  {new Date(auth.user.created_at).toLocaleString("default", {
                    month: "long",
                  }) +
                    " " +
                    new Date(auth.user.created_at).getFullYear()}
                </li>

                {auth.user.age && <li>Age: {auth.user.age}</li>}
              </ul>
            </div>
            {auth.user.state === "Artisan" && (
              <div className="containerPosts">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;

//Post Modal
const PostModal = ({ post }) => {
  const likes_artisan = useSelector((state) => state.likes_artisan);
  const [countLikes, setcountLikes] = useState(0);
  useEffect(() => {
    if (likes_artisan.likes.length) {
      let likes = 0;
      likes_artisan.likes.forEach((like) => {
        if (like.id_post === post._id) {
          likes += 1;
        }
      });
      setcountLikes(likes);
    }
  }, [likes_artisan]);
  const [alertDelete, setalertDelete] = useState(false);

  return (
    <div>
      <div className="row">
        <div className="col s12 m7">
          <div className="card">
            <div className="card-image">
              <img src={post.photo ? post.photo : "image/profileBack.png"} />
            </div>
            <div className="card-content">
              <span className="card-title">{upper(post.title)}</span>
              <p>{upper(post.description)}</p>
            </div>
            <div className="card-action">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="small material-icons"
                  style={{ color: "#ff3399" }}
                >
                  favorite
                </i>
                <div style={{ fontSize: "1em" }}>
                  {countLikes && <span>{countLikes} </span>} person like this
                </div>
              </div>
              <div>
                <a
                  onClick={(e) => {
                    setalertDelete(true);
                    // history.push(`/alert/${post._id}`);
                  }}
                >
                  <i
                    className="small material-icons"
                    style={{ color: "#ff3399" }}
                  >
                    delete
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {alertDelete && (
        <AlertDelete post_id={post._id} setalertDelete={setalertDelete} />
      )}
    </div>
  );
};
