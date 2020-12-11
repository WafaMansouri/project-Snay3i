import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
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
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div className="containerInfo">
              <div>
                <div className="cadrePhoto">
                  <img
                    className="cadrePhoto"
                    src={
                      auth.user.avatar
                        ? auth.user.avatar
                        : "/images/profile_photo.png"
                    }
                    alt="profile photo"
                  ></img>
                  <a
                    style={{ transform: "translate(-98%, 120px)" }}
                    onClick={(e) => setaddPhoto(true)}
                  >
                    <div className="container_icon_add_photo">
                      <i class="small material-icons">add_a_photo</i>
                    </div>
                  </a>
                </div>
                {auth.user.state === "Artisan" && (
                  <div className="rate">
                    <Rate
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "#232f3e",
                        fontSize: 15,
                      }}
                      allowHalf
                      disabled
                      value={rate_artisan.rate ? rate_artisan.rate.rate : 0}
                    />
                    <span
                      style={{
                        textAlign: "center",
                        fontSize: "1.5em",
                        marginLeft: 15,
                        color: "#232f3e",
                      }}
                    >
                      {rate_artisan.rate ? rate_artisan.rate.nbr_rate : 0}
                    </span>
                    <span style={{ paddingTop: 5, color: "#232f3e" }}>
                      <i class="material-icons">person</i>
                    </span>
                  </div>
                )}
              </div>
              <div className="info">
                <div>
                  <a onClick={(e) => setupdateInfo(true)}>
                    Update your profile
                  </a>
                  <i class="fas fa-user-edit"></i>
                </div>
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
                  {auth.user.tel && (
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
            </div>
            {auth.user.state === "Artisan" && (
              <div className="containerPosts">
                {auth.user && auth.user.state === "Artisan" && (
                  <div>
                    <a onClick={(e) => setaddPostTest(true)}>Add new post</a>
                    &nbsp;
                    <i class="fas fa-plus"></i>
                  </div>
                )}
                {posts.posts && (
                  <div className="container-posts">
                    {posts.posts.map((post, index) => {
                      return <PostModal key={post._id} post={post} />;
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="rowPost">
        <div className="colPost s12 m7">
          <div className="cardPost">
            <div className="cardPost-image">
              <img src={post.photo} />
            </div>
            <div className="cardPost-content">
              <span className="cardPost-title">{upper(post.title)}</span>
              <p>{upper(post.description)}</p>
            </div>
            <div className="created_at">
              Created at: {new Date(post.created_at).toLocaleString("en-GB")}
            </div>
            <div className="cardPost-action">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="small material-icons"
                  style={{ color: "#c41717" }}
                >
                  favorite
                </i>
                <div style={{ fontSize: "1em", fontWeight: "700" }}>
                  {countLikes && <span>{countLikes} </span>} person like this
                </div>
              </div>
              <div>
                <a
                  onClick={(e) => {
                    setalertDelete(true);
                  }}
                >
                  <i
                    className="small material-icons"
                    style={{ color: "#c41717" }}
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
