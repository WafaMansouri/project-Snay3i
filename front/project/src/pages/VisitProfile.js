import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest_client } from "../actions/clientActions";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import { artisanPostsAction } from "../actions/artisanActions";
import { addLikeAction } from "../actions/clientActions";
import { deleteLikeAction } from "../actions/clientActions";
import { clientLikesAction } from "../actions/clientActions";
import StarRating from "./StarRating";
import { Rate } from "antd";

const VisitProfile = () => {
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  const send_request = useSelector((state) => state.send_request);
  const request_client = useSelector((state) => state.request_client);
  const [testRequest, settestRequest] = useState(false);
  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth]);
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
  }, [visit.artisan]);
  // To get the posts of the visited artisan
  useEffect(() => {
    visit.artisan && dispatch(artisanPostsAction(visit.artisan._id));
  }, [visit.artisan]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  const posts = useSelector((state) => state.posts);

  const handleContact = () => {
    auth.isAuth ? history.push("/contact") : history.push("/login");
  };
  // To get all the rate of the visited artisan
  useEffect(() => {
    if (visit.artisan) {
      dispatch(artisanRatesAction(visit.artisan._id));
      dispatch(clientLikesAction(visit.artisan._id));
    }
  }, [visit.artisan]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  const likes_client = useSelector((state) => state.likes_client);
  return (
    <div>
      <button
        style={{ width: 90 }}
        className="waves-effect waves-light btn"
        onClick={handleReturn}
      >
        <i class="large material-icons">arrow_back</i>
      </button>
      {visit.artisan && (
        <div className="profile">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <div className="containerInfo">
              {testRequest ||
              (send_request.request &&
                send_request.request.state == "Send Request" &&
                send_request.request.id_artisan === visit.artisan._id) ? (
                <button
                  style={{ height: 60, marginBottom: 50 }}
                  className="waves-effect waves-light btn"
                  onClick={handleContact}
                >
                  View Request
                </button>
              ) : (
                <button
                  style={{ height: 60, marginBottom: 50 }}
                  className="waves-effect waves-light btn"
                  onClick={handleContact}
                >
                  Contact {visit.artisan && visit.artisan.f_name}
                </button>
              )}
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
              <StarRating /> {/* your rating */}
              {/* The artisan's rate */}
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
                  {visit.artisan.f_name + " " + visit.artisan.l_name}
                </li>
                <li>
                  <i class="small material-icons">email</i>&nbsp;
                  {visit.artisan.email}
                </li>
                {visit.artisan.category && (
                  <li>
                    <i class="small material-icons">work</i>&nbsp;
                    {visit.artisan.category}
                  </li>
                )}
                {visit.artisan.address && (
                  <li>Address: {visit.artisan.address}</li>
                )}
                {visit.artisan.description && (
                  <li> {visit.artisan.description}</li>
                )}
                {visit.artisan.age && <li>Age: {visit.artisan.age}</li>}
              </ul>
            </div>
            <div className="containerInfo">
              {posts.posts && (
                <div className="container-posts">
                  {posts.posts.map((post, index) => {
                    return <PostModal key={index} post={post} />;
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
  const likes_client = useSelector((state) => state.likes_client);
  // const [like, setlike] = useState(true);
  const visit = useSelector((state) => state.visit);
  const dispatch = useDispatch();
  const handleLike = (e) => {
    if (likes_client.likes.find((like) => like.id_post === post._id))
      dispatch(deleteLikeAction(post._id));
    else dispatch(addLikeAction(post._id, visit.artisan._id));
    // To get all the likes to the visited artisan's posts
    dispatch(clientLikesAction(visit.artisan._id));
  };
  return (
    <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src={post.photo ? post.photo : "image/profileBack.png"} />
            <span class="card-title">{post.title}</span>
          </div>
          <div class="card-content">
            <p>{post.description}</p>
          </div>
          <div class="card-action">
            <div>
              <a onClick={handleLike}>
                {likes_client.likes &&
                !likes_client.likes.find(
                  (like) => like.id_post === post._id
                ) ? (
                  <i class="small material-icons" style={{ color: "#ffab40" }}>
                    favorite_border
                  </i>
                ) : (
                  <i class="small material-icons" style={{ color: "#ffab40" }}>
                    favorite
                  </i>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
