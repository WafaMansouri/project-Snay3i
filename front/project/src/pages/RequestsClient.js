import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ignoreAction } from "../actions/ignoreAction";
import { checkRequest_client } from "../actions/clientActions";

const RequestsClient = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth]);
  const request_client = useSelector((state) => state.request_client);
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  return (
    <div>
      {!request_client.errors ? (
        request_client.requests ? (
          <div>
            {request_client.requests.map((request, index) => {
              return <RequestModal key={index} request={request} />;
            })}
          </div>
        ) : (
          <h3>NO REQUESTS</h3>
        )
      ) : (
        <h2>{request_client.errors}</h2>
      )}
      <button onClick={handleReturn}>return</button>
    </div>
  );
};
const RequestModal = ({ request }) => {
  const dispatch = useDispatch();
  const handleIgnore = () => {
    dispatch(ignoreAction(request._id));
  };
  const ignore = useSelector((state) => state.ignore);

  return ignore.ignored_req ? (
    <h2>Request Ignored with Success</h2>
  ) : (
    request.state !== "Ignored" && (
      <div style={{ border: "1px solid green" }}>
        <h3>Your Message: {request.msg_client}</h3>
        <h3>Date Request: {new Date(request.created_at).toUTCString()}</h3>
        <h3>Response: {request.msg_artisan}</h3>
        <button onClick={handleIgnore}>IGNORE</button>
        {/* <button onClick={confirmAction}>CONFIRM</button> */}
      </div>
    )
  );
};

export default RequestsClient;
