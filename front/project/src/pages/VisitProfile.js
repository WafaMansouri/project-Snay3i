import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest_client } from "../actions/clientActions";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import {
  artisanPostsAction,
  likesArtisanAction,
} from "../actions/artisanActions";
import { addLikeAction } from "../actions/clientActions";
import { deleteLikeAction } from "../actions/clientActions";
import StarRating from "./StarRating";
import { Rate } from "antd";
import ContactModal from "./ContactModal";
//function that convert the first letter of a string to uppercase
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const VisitProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const request_client = useSelector((state) => state.request_client);
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth]);
  // To get all likes and posts of the visited artisan
  useEffect(() => {
    if (visit.artisan) {
      dispatch(artisanPostsAction(visit.artisan._id));
      dispatch(likesArtisanAction(visit.artisan._id));
    }
  }, [visit.artisan]);
  //To Check if there is a request with the visited artisan or not
  useEffect(() => {
    if (auth.isAuth && visit.artisan && request_client.requests) {
      settestRequest(
        request_client.requests.find(
          (el) =>
            el.id_artisan._id === visit.artisan._id &&
            (el.state === "Send Request" || el.state === "Respond Artisan")
        )
      );
    }
  }, [visit.artisan, request_client]);
  const handleReturn = () => {
    history.goBack();
  };

  const handleContact = () => {
    auth.isAuth ? settestContact(true) : history.push("/login");
  };

  // To get all the rate of the visited artisan
  useEffect(() => {
    if (visit.artisan) {
      dispatch(artisanRatesAction(visit.artisan._id));
    }
  }, [visit.artisan]);
  const posts = useSelector((state) => state.posts);
  const [testRequest, settestRequest] = useState(false);
  const [testContact, settestContact] = useState(false);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  return (
    <div>
      {testContact && <ContactModal settestContact={settestContact} />}
      <div style={{ textAlign: "left" }}>
        <button
          className="waves-effect waves-light btn return"
          onClick={handleReturn}
        >
          <i class="large material-icons">arrow_back</i>
        </button>
      </div>
      {visit.artisan && (
        <div className="profile">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <div className="containerInfo" style={{ paddingTop: 10 }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                {testRequest ? (
                  <button
                    className="waves-effect waves-light btn visit"
                    onClick={handleContact}
                  >
                    View Request
                  </button>
                ) : (
                  <button
                    className="waves-effect waves-light btn visit"
                    onClick={handleContact}
                  >
                    Contact {visit.artisan && visit.artisan.f_name}
                  </button>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cadrePhoto">
                  <img
                    className="cadrePhoto"
                    src={
                      visit.artisan && visit.artisan.avatar
                        ? visit.artisan.avatar
                        : "/images/profile_photo.png"
                    }
                    alt="profile photo"
                  />
                </div>
              </div>
              {/* your rating */}
              {auth.isAuth && <StarRating />}

              {/* The artisan's rate */}
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
                  {upper(visit.artisan.f_name) +
                    " " +
                    upper(visit.artisan.l_name)}
                </li>
                <li>
                  <i class="small material-icons">email</i>&nbsp;
                  {visit.artisan.email}
                </li>
                {visit.artisan.category && (
                  <li>
                    <i class="small material-icons">work</i>&nbsp;
                    {upper(visit.artisan.category)}
                  </li>
                )}
                {visit.artisan.address && (
                  <li>
                    <i class="small material-icons">add_location</i>&nbsp;{" "}
                    {upper(visit.artisan.address)}
                  </li>
                )}
                {visit.artisan.description && (
                  <li> {upper(visit.artisan.description)}</li>
                )}
                {visit.artisan.age && <li>Age: {visit.artisan.age}</li>}
              </ul>
            </div>
            <div className="containerPosts">
              {posts.posts && (
                <div className="container-posts">
                  {posts.posts.map((post, index) => {
                    return <PostModal key={post._id} post={post} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitProfile;

//Post Modal
const PostModal = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  const [countLikes, setcountLikes] = useState(0);
  const [like_client, setlike_client] = useState(false);
  const likes_artisan = useSelector((state) => state.likes_artisan);
  //To count the number of likes of the post
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
  }, [likes_artisan.likes]);
  //set the like of the client
  useEffect(() => {
    likes_artisan.likes.length &&
      auth.user &&
      setlike_client(
        likes_artisan.likes.find(
          (like) =>
            like.id_post === post._id && like.id_client === auth.user._id
        )
      );
  }, [likes_artisan.likes]);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLike = (e) => {
    if (!auth.isAuth) {
      history.push("/login");
    } else {
      if (like_client) {
        dispatch(deleteLikeAction(post._id));
        setlike_client(false);
        setcountLikes(countLikes - 1);
      } else {
        dispatch(addLikeAction(post._id, visit.artisan._id));
        setlike_client(true);
        setcountLikes(countLikes + 1);
      }
    }
  };
  return (
    <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src={post.photo ? post.photo : "image/profileBack.png"} />
          </div>
          <div class="card-content">
            <span class="card-title">{upper(post.title)}</span>
            <p>{upper(post.description)}</p>
          </div>
          <div style={{ textAlign: "left" }}>
            Created at: {new Date(post.created_at).toLocaleString("en-GB")}
          </div>
          <div class="card-action">
            <div
              style={{
                fontSize: "1em",
                display: "flex",
              }}
            >
              <a style={{ margin: 0, padding: 0 }} onClick={handleLike}>
                {!like_client ? (
                  <i class="small material-icons" style={{ color: "#ff3399" }}>
                    favorite_border
                  </i>
                ) : (
                  <i class="small material-icons" style={{ color: "#ff3399" }}>
                    favorite
                  </i>
                )}
              </a>
              {countLikes && <span>{countLikes} </span>} person like this
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
