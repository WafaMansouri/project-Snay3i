import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { rejectAction } from "../actions/rejectAction";
import { ignore_artisanAction } from "../actions/ignore_artisanAction";
import { accept_artisanAction } from "../actions/artisanActions";
import { checkRequest_artisan } from "../actions/artisanActions";
import { useAlert } from "react-alert";
import ArtisanResponse from "./ArtisanResponse";

//function that convert the first letter of a string to uppercase
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};
const Requests = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const request_artisan = useSelector((state) => state.request_artisan);
  const ignore = useSelector((state) => state.ignore);
  const reject = useSelector((state) => state.reject);
  const handleReturn = () => {
    history.goBack();
  };
  //To Check if there is requests for the connected artisan
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Artisan") {
      dispatch(checkRequest_artisan());
    }
  }, [auth, ignore.ignored_req, reject.rejected_req]);
  return (
    <div className="requests">
      <div style={{ width: "100%", textAlign: "left" }}>
        <button
          style={{ width: 90, marginTop: 20 }}
          className="waves-effect waves-light btn return"
          onClick={handleReturn}
        >
          <i class="large material-icons">arrow_back</i>
        </button>
      </div>
      {!request_artisan.errors ? (
        request_artisan.requests && request_artisan.requests.length ? (
          <div style={{ width: "50%" }}>
            {request_artisan.requests.map((request, index) => {
              return <RequestModal key={request._id} request={request} />;
            })}
          </div>
        ) : (
          <h3>No Requests</h3>
        )
      ) : (
        <h2>{request_artisan.errors}</h2>
      )}
    </div>
  );
};
export default Requests;

//Request Modal
const RequestModal = ({ request }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [testRespond, settestRespond] = useState(false);

  const rejectRequest = () => {
    dispatch(rejectAction(request._id));
  };
  const handleIgnore = () => {
    dispatch(ignore_artisanAction(request._id));
    dispatch(checkRequest_artisan());
    alert.success("Ignored with Success!");
  };
  const handleAccept = () => {
    dispatch(accept_artisanAction(request._id));
    dispatch(checkRequest_artisan());
  };
  let styleCard;
  request.state === "Confirmed By Client" ||
  request.state === "Accepted By Artisan" ||
  request.state === "Ignored By Client"
    ? (styleCard = {
        width: "100%",
      })
    : (styleCard = {});
  return (
    <div>
      {testRespond && (
        <ArtisanResponse
          settestRespond={settestRespond}
          id_client={request.id_client._id}
        />
      )}
      <div className="card">
        <div style={styleCard} className="additional">
          <div className="user-card">
            {/* <div className="level center">Level 13</div>
            <div className="points center">hhhh</div> */}
            <div width="110" height="110" viewBox="0 0 250 250" role="img">
              <img
                className="photo_request"
                src={
                  request.id_client.avatar
                    ? request.id_client.avatar
                    : "/images/profile_photo.png"
                }
                alt="photo"
              />
            </div>
          </div>
          <div className="more-info">
            <h3>
              <a style={{ color: "white" }}>
                {" "}
                {upper(request.id_client.f_name) +
                  " " +
                  upper(request.id_client.l_name)}{" "}
              </a>
            </h3>
            {request.state !== "Rejected" && (
              // (request.state === "Ignored By Client" ? (
              //   <div className="request_modal">
              //     <ul>
              //       <li style={{ fontWeight: "bold", marginTop: 20 }}>
              //         Ignored By The Client
              //       </li>
              //     </ul>
              //     <div style={{ textAlign: "center" }}>
              //       <button
              //         className="waves-effect waves-light btn"
              //         onClick={rejectRequest}
              //       >
              //         OK
              //       </button>
              //     </div>
              //   </div>
              // ) :

              <div className="infoRequest">
                <div>
                  <span>Message:</span> <div>{upper(request.msg_client)}</div>
                </div>
                <div>
                  <span>Sent at:</span>{" "}
                  <div>{new Date(request.created_at).toUTCString()}</div>
                </div>
                <div>
                  <span>Date required:</span>{" "}
                  <div>
                    {
                      new Date(request.start_date)
                        .toLocaleString("en-GB", {})
                        .split(", ")[0]
                    }{" "}
                    <i class="material-icons">arrow_forward</i>{" "}
                    {
                      new Date(request.end_date)
                        .toLocaleString("en-GB", {})
                        .split(", ")[0]
                    }
                  </div>
                </div>
                {request.msg_artisan && (
                  <div>
                    <span> Your Response:</span>
                    <div>{upper(request.msg_artisan)}</div>
                  </div>
                )}
                {request.start_date_artisan && request.end_date_artisan && (
                  <div>
                    <span> Your Date Offers:</span>{" "}
                    <div>
                      {
                        new Date(request.start_date_artisan)
                          .toLocaleString("en-GB")
                          .split(", ")[0]
                      }{" "}
                      <i class="material-icons">arrow_forward</i>{" "}
                      {
                        new Date(request.end_date_artisan)
                          .toLocaleString("en-GB", {})
                          .split(", ")[0]
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="stats">
              {request.state === "Accepted By Artisan" ||
              request.state === "Confirmed By Client" ? (
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <i class="fas fa-check"></i>
                </div>
              ) : request.state === "Ignored By Client" ? (
                <div style={{ textAlign: "center" }}>
                  <i className="large material-icons">close</i>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={handleIgnore}
                  >
                    IGNORE
                  </button>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={
                      (e) => settestRespond(true)
                      // request.id_client &&
                      // history.push(`/artisanResponse/${request.id_client._id}`)
                    }
                  >
                    {request.state === "Respond Artisan" ? "Update" : "Respond"}
                  </button>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={handleAccept}
                  >
                    ACCEPT
                  </button>
                </div>
              )}
            </div>
            {request.state === "Ignored By Client" && (
              <div className="general" style={{ color: "#c41717" }}>
                <span className="more">Ignored by the client</span>
              </div>
            )}
          </div>
        </div>
        <div className="general">
          <h3>
            {" "}
            {upper(request.id_client.f_name) +
              " " +
              upper(request.id_client.l_name)}
          </h3>
          <h5>{request.id_client.address && request.id_client.address}</h5>
          {/* <p>
            {request.id_artisan.description && request.id_artisan.description}
          </p> */}
          <span className="more">Mouse over the card for more info</span>
        </div>
      </div>
    </div>
  );
};
