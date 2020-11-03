import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { rejectAction } from "../actions/rejectAction";
import { ignore_artisanAction } from "../actions/ignore_artisanAction";
import { accept_artisanAction } from "../actions/artisanActions";
import { checkRequest_artisan } from "../actions/artisanActions";

const Requests = () => {
  const request_artisan = useSelector((state) => state.request_artisan);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const handleReturn = () => {
    history.goBack();
  };
  const dispatch = useDispatch();
  //To Check if there is requests for the connected artisan
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Artisan") {
      dispatch(checkRequest_artisan());
    }
  }, [auth]);
  return (
    <div>
      {!request_artisan.errors ? (
        request_artisan.requests ? (
          <div>
            {request_artisan.requests.map((request, index) => {
              return <RequestModal key={index} request={request} />;
            })}
          </div>
        ) : (
          <h3>NO REQUESTS</h3>
        )
      ) : (
        <h2>{request_artisan.errors}</h2>
      )}
      <button onClick={handleReturn}>return</button>
    </div>
  );
};
//Request Modal
const RequestModal = ({ request }) => {
  const history = useHistory();
  const response_artisan = useSelector((state) => state.response_artisan);
  const dispatch = useDispatch();
  const rejectRequest = () => {
    dispatch(rejectAction(request._id));
  };
  const handleIgnore = () => {
    dispatch(ignore_artisanAction(request._id));
  };
  const handleAccept = () => {
    dispatch(accept_artisanAction(request._id));
  };
  const ignore = useSelector((state) => state.ignore);
  return (
    request.state !== "Rejected" &&
    request.state !== "Ignored By Artisan" &&
    (request.state === "Ignored By Client" ? (
      <div>
        <h2>
          Request from &nbsp;
          {request.id_client.f_name + " " + request.id_client.l_name}&nbsp;
          Ignored By The Client
        </h2>
        <button onClick={rejectRequest}>OK</button>
      </div>
    ) : ignore.ignored_req && ignore.ignored_req._id === request._id ? (
      <h2>Request Ignored with Success</h2>
    ) : (
      <div style={{ border: "1px solid green" }}>
        {response_artisan.response ? (
          <h3>
            Your Response:{" "}
            {response_artisan.response &&
            response_artisan.response._id === request._id
              ? response_artisan.response.msg_artisan
              : request.msg_artisan}
          </h3>
        ) : (
          request.msg_artisan && <h3>Your Response: {request.msg_artisan}</h3>
        )}

        <h3>
          Client: {`${request.id_client.f_name} ${request.id_client.l_name}`}
        </h3>
        <h3>Message: {request.msg_client}</h3>
        <h3>Date: {new Date(request.created_at).toUTCString()}</h3>
        {request.state === "Accepted By Artisan" ? (
          <i class="fas fa-check"></i>
        ) : (
          <div>
            <button onClick={handleIgnore}>IGNORE</button>
            <button
              onClick={(e) =>
                history.push(`/artisanResponse/${request.id_client._id}`)
              }
            >
              {response_artisan.response || request.state === "Respond Artisan"
                ? "Update"
                : "Respond"}
            </button>
            <button onClick={handleAccept}>ACCEPT</button>
          </div>
        )}
      </div>
    ))
  );
};

export default Requests;
