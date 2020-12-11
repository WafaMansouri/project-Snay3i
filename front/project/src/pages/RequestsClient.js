import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ignore_clientAction } from "../actions/ignore_clientAction";
import { confirm_clientAction } from "../actions/clientActions";
import { checkRequest_client } from "../actions/clientActions";
import { rejectAction } from "../actions/rejectAction";
import { visitByIdAction } from "../actions/clientActions";
import { useAlert } from "react-alert";
//function that convert the first letter of a string to uppercase
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const RequestsClient = () => {
  const auth = useSelector((state) => state.auth);
  const reject = useSelector((state) => state.reject);
  const ignore = useSelector((state) => state.ignore);
  const dispatch = useDispatch();

  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth, reject.rejected_req, ignore.ignored_req]);
  const request_client = useSelector((state) => state.request_client);
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  return (
    <div className="requests">
      <div style={{ width: "100%", height: "100%", textAlign: "left" }}>
        <button
          style={{ width: 90 }}
          className="waves-effect waves-light btn return"
          onClick={handleReturn}
        >
          <i className="large material-icons">arrow_back</i>
        </button>
      </div>
      {!request_client.errors ? (
        request_client.requests && request_client.requests.length ? (
          <div>
            {request_client.requests.map((request, index) => {
              return <RequestModal key={request._id} request={request} />;
            })}
          </div>
        ) : (
          <h3>No Requests</h3>
        )
      ) : (
        <h2>{request_client.errors}</h2>
      )}
    </div>
  );
};
export default RequestsClient;

//Request Modal
const RequestModal = ({ request }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  // to display or not the total message of the client
  const handleIgnore = () => {
    dispatch(ignore_clientAction(request._id));
    alert.success("Ignored with Success!");
  };
  const rejectRequest = () => {
    dispatch(rejectAction(request._id));
  };
  const handleConfirm = () => {
    dispatch(confirm_clientAction(request._id));
  };
  const visitArtisan = () => {
    dispatch(visitByIdAction(request.id_artisan._id));
    history.push("/visit");
  };
  let styleCard;
  request.state === "Confirmed By Client" ||
  request.state === "Accepted By Artisan"
    ? (styleCard = {
        width: "100%",
      })
    : (styleCard = {});
  return (
    <div>
      <div className="card">
        <div style={styleCard} className="additional">
          <div className="user-card">
            {/* <div className="level center">Level 13</div>
            <div className="points center">hhhh</div> */}
            <div width="110" height="110" viewBox="0 0 250 250" role="img">
              <img
                className="photo_request"
                src={
                  request.id_artisan.avatar
                    ? request.id_artisan.avatar
                    : "/images/profile_photo.png"
                }
                alt="photo"
              />
            </div>
          </div>
          <div className="more-info">
            <h3>
              <a style={{ color: "white" }} onClick={visitArtisan}>
                {" "}
                {upper(request.id_artisan.f_name) +
                  " " +
                  upper(request.id_artisan.l_name)}{" "}
              </a>
            </h3>
            {request.state !== "Rejected" &&
              request.state === "Ignored By Artisan" && (
                <div>
                  <ul>
                    <li style={{ fontWeight: "bold", marginTop: 20 }}>
                      Ignored By The Artisan
                    </li>
                  </ul>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="waves-effect waves-light btn"
                      onClick={rejectRequest}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            <div className="infoRequest">
              <div>
                <span> Your Message: </span>{" "}
                <div>{upper(request.msg_client)}</div>
              </div>
              <div>
                <span>Sent at:</span>{" "}
                <div>{new Date(request.created_at).toUTCString()}</div>
              </div>
              <div>
                <span>Date required: </span>
                <div>
                  {
                    new Date(request.start_date)
                      .toLocaleString("en-GB")
                      .split(", ")[0]
                  }{" "}
                  <i class="material-icons">arrow_forward</i>{" "}
                  {
                    new Date(request.end_date)
                      .toLocaleString("en-GB")
                      .split(", ")[0]
                  }{" "}
                </div>
              </div>
              {request.msg_artisan && (
                <div>
                  <span> Response: </span>
                  <div>{upper(request.msg_artisan)}</div>
                </div>
              )}
              {request.start_date_artisan && request.end_date_artisan && (
                <div>
                  <span>Date Offers:</span>
                  <div>
                    {
                      new Date(request.start_date_artisan)
                        .toLocaleString("en-GB")
                        .split(", ")[0]
                    }
                    <i class="material-icons">arrow_forward</i>{" "}
                    {
                      new Date(request.end_date_artisan)
                        .toLocaleString("en-GB")
                        .split(", ")[0]
                    }
                  </div>
                </div>
              )}
            </div>
            <div className="stats">
              <div>
                {request.state === "Accepted By Artisan" ||
                request.state === "Confirmed By Client" ? (
                  <i className="fas fa-check" style={{ marginRight: 100 }}></i>
                ) : (
                  request.state !== "Ignored By Artisan" && (
                    <button
                      className="waves-effect waves-light btn"
                      onClick={handleIgnore}
                    >
                      IGNORE
                    </button>
                  )
                )}
                {request.state !== "Accepted By Artisan" &&
                  request.state !== "Send Request" &&
                  request.state !== "Confirmed By Client" &&
                  request.state !== "Ignored By Artisan" && (
                    <button
                      className="waves-effect waves-light btn"
                      onClick={handleConfirm}
                    >
                      CONFIRM
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div class="general">
          <h3>
            {" "}
            {upper(request.id_artisan.f_name) +
              " " +
              upper(request.id_artisan.l_name)}
          </h3>
          <h5>{request.id_artisan.category}</h5>
          <p>
            {request.id_artisan.description && request.id_artisan.description}
          </p>
          <span class="more">Mouse over the card for more info</span>
        </div>
      </div>
    </div>
  );
};
