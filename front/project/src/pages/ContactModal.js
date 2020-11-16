import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRequestAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
import { Calendar } from "antd";
import { useAlert } from "react-alert";

function ContactModal() {
  const alert = useAlert();
  const visit = useSelector((state) => state.visit);
  const history = useHistory();
  const [display, setdisplay] = useState(true);
  // const [date_client, setdate_client] = useState("");
  const [requestInfo, setrequestInfo] = useState({
    id_artisan: "",
    msg_client: "",
    date_client: "",
  });
  const [first, setFirst] = useState(false);
  const handleChange = (e) => {
    if (visit.artisan)
      setrequestInfo({
        ...requestInfo,
        [e.target.name]: e.target.value,
        id_artisan: visit.artisan._id,
      });
  };
  const dispatch = useDispatch();
  const sendRequest = (e) => {
    e.preventDefault();
    dispatch(sendRequestAction(requestInfo));
    // alert.success("Request Sent");
    // history.goBack();
  };
  const send_request = useSelector((state) => state.send_request);
  useEffect(() => {
    if (first) {
      if (!send_request.errors) {
        history.goBack();
        alert.success("send_request Success!");
      }
    }
    setFirst(true);
  }, [send_request]);
  //To Check if there is a request with the visited artisan or not
  const request_client = useSelector((state) => state.request_client);
  const [testRequest, settestRequest] = useState(false);
  useEffect(() => {
    if (visit.artisan && visit.artisan._id && request_client.requests) {
      settestRequest(
        request_client.requests.find(
          (el) =>
            el.id_artisan._id === visit.artisan._id &&
            (el.state === "Send Request" || el.state === "Respond Artisan")
        )
      );
    }
  }, [visit.artisan]);
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
        {/* if there is already a request */}
        {testRequest ? (
          <div className={"modal-box"}>
            <form
              action=""
              onSubmit={(e) => {
                setdisplay(false);
                history.goBack();
              }}
            >
              <h3>Request sent at:</h3>
              <h4>{new Date(testRequest.created_at).toUTCString()}</h4>
              <h3>Your message:</h3>
              <h4>{testRequest.msg_client}</h4>
              <h3>Time Required:</h3>
              <h4>{testRequest.msg_client}</h4>
              <button type="submit">OK</button>
            </form>
          </div>
        ) : send_request.request &&
          send_request.request.state === "Send Request" &&
          send_request.request.id_artisan === visit.artisan._id ? (
          <div className={"modal-box"}>
            <form
              action=""
              onSubmit={(e) => {
                setdisplay(false);
                history.goBack();
              }}
            >
              <h3>Request sent at:</h3>
              <h4>{new Date(send_request.request.created_at).toUTCString()}</h4>
              <h3>Your message:</h3>
              <h4>{send_request.request.msg_client}</h4>
              <h3>Time Required:</h3>
              <h4>{send_request.request.msg_client}</h4>
              <button type="submit">OK</button>
            </form>
          </div>
        ) : (
          <div className={"modal-box contact"}>
            <div>
              <textarea
                name="msg_client"
                placeholder="describe your request"
                onChange={handleChange}
              ></textarea>

              <div className="calendar">
                <Calendar
                  onSelect={(e) => {
                    setrequestInfo({
                      ...requestInfo,
                      date_client: e._d.toDateString(),
                    });
                  }}
                />
              </div>
            </div>
            <h6 style={{ color: "red", marginTop: 20 }}>
              {send_request.errors && send_request.errors}
            </h6>
            <button
              type="submit"
              className="waves-effect waves-light btn"
              onClick={sendRequest}
            >
              SEND
            </button>
          </div>
        )}
      </div>
    )
  );
}
export default ContactModal;
