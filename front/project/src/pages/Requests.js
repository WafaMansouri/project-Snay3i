import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Requests = () => {
  const request_artisan = useSelector((state) => state.request_artisan);
  const history = useHistory();

  const handleReturn = () => {
    history.goBack();
  };
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
const RequestModal = ({ request }) => {
  const history = useHistory();
  const response_artisan = useSelector((state) => state.response_artisan);
  return request.state === "Ignored" ? (
    <div>
      <h2>Ignored By the Client</h2> <button>OK</button>
    </div>
  ) : (
    <div style={{ border: "1px solid green" }}>
      {response_artisan.response ? (
        <h3>Your Response: {response_artisan.response.msg_artisan}</h3>
      ) : (
        request.msg_artisan && <h3>Your Response: {request.msg_artisan}</h3>
      )}

      <h3>
        Client: {`${request.id_client.f_name} ${request.id_client.l_name}`}
      </h3>
      <h3>Message: {request.msg_client}</h3>
      <h3>Date: {new Date(request.created_at).toUTCString()}</h3>
      <button
        onClick={(e) =>
          history.push(`/artisanResponse/${request.id_client._id}`)
        }
      >
        {response_artisan.response || request.state === "Respond Artisan"
          ? "Update"
          : "Respond"}
      </button>
    </div>
  );
};

export default Requests;
