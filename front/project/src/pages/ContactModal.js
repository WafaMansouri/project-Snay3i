import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkRequest_client,
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
  const dispatch = useDispatch();
  const sendRequest = (e) => {
    e.preventDefault();
    dispatch(sendRequestAction(requestInfo));
  };
  const send_request = useSelector((state) => state.send_request);
  useEffect(() => {
    if (first) {
      if (!send_request.errors) {
        props.settestContact(false);
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
  const handleIgnore = () => {
    dispatch(ignore_clientAction(testRequest._id));
    alert.success("Ignored with Success!");
  };
  const handleConfirm = () => {
    dispatch(confirm_clientAction(testRequest._id));
  };
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            props.settestContact(false);
          }}
        />
        {/* if there is already a request */}
        {testRequest ? (
          <div className={"modal-box"}>
            <form
              action=""
              onSubmit={(e) => {
                setdisplay(false);
                props.settestContact(false);
              }}
            >
              <ul className="view_request">
                <li>
                  <span>Request sent at:</span>{" "}
                  {new Date(testRequest.created_at).toUTCString()}
                </li>
                <li>
                  <span>Your message:</span> {testRequest.msg_client}
                </li>
                <li>
                  <span>Date required: From</span>{" "}
                  {
                    new Date(testRequest.start_date)
                      .toLocaleString("en-GB", {})
                      .split(", ")[0]
                  }{" "}
                  <span>To</span>{" "}
                  {
                    new Date(testRequest.end_date)
                      .toLocaleString("en-GB", {})
                      .split(", ")[0]
                  }
                </li>
                {testRequest.msg_artisan && (
                  <li>
                    <span>Response:</span> {testRequest.msg_artisan}
                  </li>
                )}
                {testRequest.start_date_artisan && (
                  <li>
                    <span>Date offers: From</span>{" "}
                    {
                      new Date(testRequest.start_date_artisan)
                        .toLocaleString("en-GB", {})
                        .split(", ")[0]
                    }{" "}
                    <span>To </span>{" "}
                    {
                      new Date(testRequest.end_date_artisan)
                        .toLocaleString("en-GB", {})
                        .split(", ")[0]
                    }
                  </li>
                )}
              </ul>
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
              <button className="waves-effect waves-light btn" type="submit">
                OK
              </button>
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
                {/* <Calendar
                  onSelect={(e) => {
                    setrequestInfo({
                      ...requestInfo,
                      date_client: e._d.toDateString(),
                    });
                  }}
                /> */}
                {/* <Space direction="vertical" size={12}>
                  <RangePicker
                    bordered={false}
                    onCalendarChange={(e) => {
                      console.log(e);
                    }}
                  />
                </Space> */}
                <DateRangePickerExample
                  retrieve_dates={setrequestInfo}
                  requestInfo={requestInfo}
                />
                ,
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
