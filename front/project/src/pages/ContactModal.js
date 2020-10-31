import React, { useState } from "react";
import "../ContactModal.css";
import { useDispatch, useSelector } from "react-redux";
import { sendRequestAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
function ContactModal() {
  const visit = useSelector((state) => state.visit);
  const history = useHistory();

  const [display, setdisplay] = useState(true);
  const [requestInfo, setrequestInfo] = useState({
    id_artisan: visit.artisan._id,
    msg_client: "",
  });
  const handleChange = (e) => {
    setrequestInfo({ ...requestInfo, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const sendRequest = (e) => {
    e.preventDefault();
    dispatch(sendRequestAction(requestInfo));
    history.goBack();
  };
  const request_client = useSelector((state) => state.request_client);
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            history.goBack();
          }}
        />
        {request_client.requests.state === "Send Request" ? (
          <div className={"modal-box"}>
            <form
              action=""
              onSubmit={(e) => {
                setdisplay(false);
                history.goBack();
              }}
            >
              <h3>Request sent at:</h3>
              <h4>
                {new Date(request_client.requests.created_at).toUTCString()}
              </h4>
              <h3>Your message:</h3>
              <h4>{request_client.requests.msg_client}</h4>
              <h3>Time Required:</h3>
              <h4>{request_client.requests.msg_client}</h4>
              <button type="submit">OK</button>
            </form>
          </div>
        ) : (
          <div className={"modal-box"}>
            <form action="" onSubmit={sendRequest}>
              <textarea
                name="msg_client"
                cols="20"
                rows="10"
                placeholder="describe your request"
                onChange={handleChange}
              ></textarea>
              <button type="submit">SEND</button>
            </form>
          </div>
        )}
      </div>
    )
  );
}
export default ContactModal;
