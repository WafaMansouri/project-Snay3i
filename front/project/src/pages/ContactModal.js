import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirm_clientAction,
  sendRequestAction,
} from "../actions/clientActions";
import { useHistory } from "react-router-dom";
import { Calendar } from "antd";
import { useAlert } from "react-alert";
import { ignore_clientAction } from "../actions/ignore_clientAction";
import { DatePicker, Space } from "antd";
import DateRangePickerExample from "./DateRangePickerExample";

function ContactModal(props) {
  const { RangePicker } = DatePicker;
  const alert = useAlert();
  const visit = useSelector((state) => state.visit);
  const history = useHistory();
  const dispatch = useDispatch();
  const [display, setdisplay] = useState(true);
  const [requestInfo, setrequestInfo] = useState({
    id_artisan: "",
    msg_client: "",
    start_date: "",
    end_date: "",
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
  const sendRequest = (e) => {
    e.preventDefault();
    dispatch(sendRequestAction(requestInfo));
  };
  const send_request = useSelector((state) => state.send_request);
  useEffect(() => {
    if (first) {
      if (!send_request.errors) {
        props.settestContact(false);
        alert.success("send Request Success!");
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
  const handleIgnore = () => {
    dispatch(ignore_clientAction(testRequest));
    setdisplay(false);
    props.settestContact(false);
    alert.success("Ignored with Success!");
  };
  const handleConfirm = () => {
    dispatch(confirm_clientAction(testRequest));
    setdisplay(false);
    props.settestContact(false);
    alert.success("Confirmed with Success!");
  };
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            props.settestContact(false);
            send_request.errors = null;
          }}
        />
        {/* if there is already a request */}
        {testRequest ? (
          <div className={"modal-box view_request"}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                onClick={(e) => {
                  setdisplay(false);
                  props.settestContact(false);
                }}
                className="container_close_icon"
              >
                <i class="small material-icons">close</i>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                setdisplay(false);
                props.settestContact(false);
              }}
            >
              <dl>
                <dt>Request sent at</dt>
                <dd>{new Date(testRequest.created_at).toUTCString()}</dd>
                <dt>Your message</dt>
                <dd>{testRequest.msg_client}</dd>
                <dt>Date required</dt>
                <dd>
                  {
                    new Date(testRequest.start_date)
                      .toLocaleString("en-GB", {})
                      .split(", ")[0]
                  }{" "}
                  <i class="material-icons">arrow_forward</i>{" "}
                  {
                    new Date(testRequest.end_date)
                      .toLocaleString("en-GB", {})
                      .split(", ")[0]
                  }
                </dd>
                {testRequest.msg_artisan && (
                  <div>
                    <dt>Response</dt>
                    <dd>{testRequest.msg_artisan}</dd>
                  </div>
                )}
                {testRequest.start_date_artisan && (
                  <div>
                    <dt>Date offers: From</dt>{" "}
                    <dd>
                      {
                        new Date(testRequest.start_date_artisan)
                          .toLocaleString("en-GB", {})
                          .split(", ")[0]
                      }{" "}
                      <i class="material-icons">arrow_forward</i>{" "}
                      {
                        new Date(testRequest.end_date_artisan)
                          .toLocaleString("en-GB", {})
                          .split(", ")[0]
                      }
                    </dd>
                  </div>
                )}
              </dl>
            </form>
            <div style={{ textAlign: "center" }}>
              {testRequest.state === "Accepted By Artisan" ? (
                <i className="fas fa-check"></i>
              ) : (
                <button
                  className="waves-effect waves-light btn"
                  onClick={handleIgnore}
                >
                  IGNORE
                </button>
              )}
              {testRequest.state !== "Accepted By Artisan" &&
                testRequest.state !== "Send Request" && (
                  <button
                    className="waves-effect waves-light btn"
                    onClick={handleConfirm}
                  >
                    CONFIRM
                  </button>
                )}
              {/* <button className="waves-effect waves-light btn">OK</button> */}
            </div>
          </div>
        ) : (
          <div className={"modal-box contact"}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "fit-content",
              }}
            >
              <div
                onClick={(e) => {
                  setdisplay(false);
                  props.settestContact(false);
                  send_request.errors = null;
                }}
                className="container_close_icon"
              >
                <i class="small material-icons">close</i>
              </div>
            </div>
            <div className="form_contact">
              <textarea
                name="msg_client"
                placeholder="describe your request"
                onChange={handleChange}
              ></textarea>
              <div className="calendar">
                <span className="spanContact">
                  {" "}
                  Please select a date interval:
                </span>
                <DateRangePickerExample
                  retrieve_dates={setrequestInfo}
                  requestInfo={requestInfo}
                />
              </div>
            </div>
            <div style={{ height: 90 }}>
              <h6 style={{ color: "red", height: 25 }}>
                {send_request.errors && send_request.errors}
              </h6>
              <button
                type="submit"
                className="waves-effect waves-light btn contact"
                onClick={sendRequest}
              >
                SEND
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
export default ContactModal;
