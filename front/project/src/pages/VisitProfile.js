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
import { SmileTwoTone } from "@ant-design/icons";
import ScrollAnimation from "react-animate-on-scroll";
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
    if (visit.artisan && visit.artisan._id) {
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
  const [testRate, settestRate] = useState(false);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  return (
    <div>
      {testContact && <ContactModal settestContact={settestContact} />}
      <div className="profile">
        {visit.artisan && (
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
                      visit.artisan.avatar
                        ? visit.artisan.avatar
                        : "/images/profile_photo.png"
                    }
                    alt="profile photo"
                  ></img>
                </div>
                {/* the rate of the artisan */}
                <div className="rate">
                  <Rate
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: 15,
                    }}
                    allowHalf
                    disabled
                    value={rate_artisan.rate ? rate_artisan.rate.rate : 0}
                  />
                  <span className="rate_nbr_person">
                    {rate_artisan.rate ? rate_artisan.rate.nbr_rate : 0}
                  </span>
                  <span className="icon_person">
                    <i className="material-icons">person</i>
                  </span>
                </div>
                {auth.user && auth.user.state === "Client" && testRequest ? (
                  <button
                    className="waves-effect waves-light btn visit"
                    onClick={handleContact}
                  >
                    View Request
                  </button>
                ) : (
                  ((auth.user && auth.user.state === "Client") ||
                    !auth.user) && (
                    <button
                      className="waves-effect waves-light btn visit"
                      onClick={handleContact}
                    >
                      Contact {visit.artisan && visit.artisan.f_name}
                    </button>
                  )
                )}
              </div>
              <div className="info">
                {/* the rate of the client */}
                {testRate && <RateModal settestRate={settestRate} />}
                {((auth.isAuth && auth.user.state === "Client") ||
                  !auth.isAuth) && (
                  <div
                    className={
                      testRate
                        ? "container_rate container_rate_click"
                        : "container_rate"
                    }
                    onClick={(e) => {
                      auth.isAuth
                        ? settestRate(!testRate)
                        : history.push("/login");
                    }}
                  >
                    <h4>Rate me</h4>
                    <ScrollAnimation animateIn="bounce" initiallyVisible={true}>
                      <div className="icons-list">
                        <SmileTwoTone twoToneColor="#1890ff" />
                      </div>
                    </ScrollAnimation>
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
                  {visit.artisan.tel && (
                    <li>
                      <i class="small material-icons">phone</i>&nbsp;{" "}
                      {visit.artisan.tel}
                    </li>
                  )}
                  {visit.artisan.address && (
                    <li>
                      <i class="small material-icons">add_location</i>&nbsp;{" "}
                      {visit.artisan.address}
                    </li>
                  )}
                  {visit.artisan.description && (
                    <li>
                      <i class="small material-icons">description</i>&nbsp;{" "}
                      {upper(visit.artisan.description)}
                    </li>
                  )}
                  <li>
                    <i class="small material-icons">access_time</i>&nbsp; member
                    since{" "}
                    {new Date(visit.artisan.created_at).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    ) +
                      " " +
                      new Date(visit.artisan.created_at).getFullYear()}
                  </li>
                  {visit.artisan.age && (
                    <li>
                      <i class="small material-icons">cake</i>&nbsp;{" "}
                      {visit.artisan.age} years old
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {posts.posts && posts.posts.length > 0 && (
              <div className="containerPosts">
                <div className="container-posts">
                  {posts.posts.map((post, index) => {
                    return <PostModal key={post._id} post={post} />;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div class="rowPost">
        <div class="col s12 m7">
          <div class="cardPost">
            <div class="cardPost-image">
              <img src={post.photo} />
            </div>
            <div class="cardPost-content">
              <span class="cardPost-title">{upper(post.title)}</span>
              <p>{upper(post.description)}</p>
            </div>
            <div className="created_at">
              Created at: {new Date(post.created_at).toLocaleString("en-GB")}
            </div>
            <div class="cardPost-action">
              <div style={{ display: "flex" }}>
                <a onClick={handleLike}>
                  {!like_client ? (
                    <i class="small material-icons">favorite_border</i>
                  ) : (
                    <i class="small material-icons">favorite</i>
                  )}
                </a>
                <div style={{ fontSize: "0.9em", fontWeight: "700" }}>
                  {countLikes && <span>{countLikes} </span>} person like this
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Rate Modal
const RateModal = ({ settestRate }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="rate_modal">
      <StarRating />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          onClick={(e) => {
            settestRate(false);
          }}
          className="container_close_icon"
        >
          <i class="small material-icons">close</i>
        </div>
      </div>
    </div>
  );
};
// <div>

//     <div style={{ textAlign: "left" }}>
//       <button
//         className="waves-effect waves-light btn return"
//         onClick={handleReturn}
//       >
//         <i class="large material-icons">arrow_back</i>
//       </button>
//     </div>
