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
              return <RequestModal key={index} request={request} />;
            })}
          </div>
        ) : (
          <h3 style={{ marginTop: 50 }}>NO REQUESTS</h3>
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

  return (
    <div>
      {" "}
      {testRespond && (
        <ArtisanResponse
          settestRespond={settestRespond}
          id_client={request.id_client._id}
        />
      )}
      {request.state !== "Rejected" &&
        (request.state === "Ignored By Client" ? (
          <div className="request_modal">
            <div className="title_request">
              Request from &nbsp;
              <a href="">
                {upper(request.id_client.f_name) +
                  " " +
                  upper(request.id_client.l_name)}
              </a>
            </div>
            <ul>
              <li style={{ fontWeight: "bold", marginTop: 20 }}>
                Ignored By The Client
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
        ) : (
          <div className="request_modal">
            {request.id_client && (
              <div className="title_request">
                <span> Request from:</span>{" "}
                <a>
                  {" "}
                  {`${upper(request.id_client.f_name)} ${upper(
                    request.id_client.l_name
                  )}`}
                </a>
              </div>
            )}
            <ul>
              <li>
                {" "}
                <span>Message:</span> {upper(request.msg_client)}
              </li>
              <li>
                <span>Sent at:</span>{" "}
                {new Date(request.created_at).toUTCString()}
              </li>
              <li>
                <span>Date required:</span> From{" "}
                {
                  new Date(request.start_date)
                    .toLocaleString("en-GB", {})
                    .split(", ")[0]
                }{" "}
                To{" "}
                {
                  new Date(request.end_date)
                    .toLocaleString("en-GB", {})
                    .split(", ")[0]
                }
              </li>
              {request.msg_artisan && (
                <li>
                  <span> Your Response:</span> {upper(request.msg_artisan)}
                </li>
              )}
              {request.start_date_artisan && request.end_date_artisan && (
                <li>
                  <span> Your Date Offers:</span> From{" "}
                  {
                    new Date(request.start_date_artisan)
                      .toLocaleString("en-GB")
                      .split(", ")[0]
                  }{" "}
                  To{" "}
                  {
                    new Date(request.end_date_artisan)
                      .toLocaleString("en-GB", {})
                      .split(", ")[0]
                  }
                </li>
              )}
            </ul>
            {request.state === "Accepted By Artisan" ? (
              <div style={{ textAlign: "center" }}>
                {" "}
                <i class="fas fa-check"></i>
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
        ))}
    </div>
  );
};
