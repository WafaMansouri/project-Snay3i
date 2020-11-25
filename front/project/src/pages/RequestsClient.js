import React, { useEffect } from "react";
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
      <div style={{ width: "100%", textAlign: "left" }}>
        <button
          style={{ width: 90 }}
          className="waves-effect waves-light btn return"
          onClick={handleReturn}
        >
          <i class="large material-icons">arrow_back</i>
        </button>
      </div>
      {!request_client.errors ? (
        request_client.requests && request_client.requests.length ? (
          <div>
            {request_client.requests.map((request, index) => {
              return <RequestModal key={index} request={request} />;
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
  return (
    request.state !== "Rejected" &&
    (request.state === "Ignored By Artisan" ? (
      <div className="request_modal">
        <div className="title_request">
          Request to &nbsp;
          <a href="">
            {upper(request.id_artisan.f_name) +
              " " +
              upper(request.id_artisan.l_name)}
          </a>
        </div>
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
    ) : (
      request.state !== "Ignored By Client" && (
        <div className="request_modal">
          <div className="title_request">
            <span> Request to:</span>{" "}
            <a onClick={visitArtisan}>
              {" "}
              {upper(request.id_artisan.f_name) +
                " " +
                upper(request.id_artisan.l_name)}
            </a>
          </div>
          <ul>
            <li>
              <span> Your Message: </span>
              {upper(request.msg_client)}
            </li>
            <li>
              <span> Sent at: </span>
              {new Date(request.created_at).toUTCString()}
            </li>
            {request.msg_artisan && (
              <li>
                <span> Response: </span>
                {upper(request.msg_artisan)}
              </li>
            )}
            <li>
              <span>Date required:</span> From{" "}
              {
                new Date(request.start_date)
                  .toLocaleString("en-GB")
                  .split(", ")[0]
              }{" "}
              To{" "}
              {
                new Date(request.end_date)
                  .toLocaleString("en-GB")
                  .split(", ")[0]
              }
            </li>
            {request.start_date_artisan && request.end_date_artisan && (
              <li>
                <span>Date Offers:</span> From{" "}
                {
                  new Date(request.start_date_artisan)
                    .toLocaleString("en-GB")
                    .split(", ")[0]
                }{" "}
                To{" "}
                {
                  new Date(request.end_date_artisan)
                    .toLocaleString("en-GB")
                    .split(", ")[0]
                }
              </li>
            )}
          </ul>
          {request.state === "Accepted By Artisan" ? (
            <i className="fas fa-check"></i>
          ) : (
            <button
              className="waves-effect waves-light btn"
              onClick={handleIgnore}
            >
              IGNORE
            </button>
          )}
          {request.state !== "Accepted By Artisan" &&
            request.state !== "Send Request" && (
              <button
                className="waves-effect waves-light btn"
                onClick={handleConfirm}
              >
                CONFIRM
              </button>
            )}
        </div>
      )
    ))
  );
};
