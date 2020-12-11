import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { respondAction } from "../actions/artisanActions";
import { useHistory } from "react-router-dom";
import { Calendar } from "antd";
import { useAlert } from "react-alert";
import DatePickerCalendarExample from "./DatePickerCaledarExample";

function ArtisanResponse({ settestRespond, id_client }) {
  const alert = useAlert();

  const [display, setdisplay] = useState(true);
  const dispatch = useDispatch();
  const [newDates, setnewDates] = useState({});
  const [response, setresponse] = useState({
    id_client: id_client,
    msg_artisan: "",
    start_date_artisan: "",
    end_date_artisan: "",
  });
  const [first, setFirst] = useState(false);
  const handleChange = (e) => {
    setresponse({
      ...response,
      [e.target.name]: e.target.value,
    });
  };
  const handleRespond = (e) => {
    e.preventDefault();
    dispatch(
      respondAction({
        ...response,
        start_date_artisan: newDates.start_date_artisan,
        end_date_artisan: newDates.end_date_artisan,
      })
    );
  };
  const response_artisan = useSelector((state) => state.response_artisan);
  useEffect(() => {
    if (first) {
      if (!response_artisan.errors) {
        // history.goBack();
        settestRespond(false);
        alert.success("Response Success!");
      }
    }
    setFirst(true);
  }, [response_artisan]);
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            settestRespond(false);
            response_artisan.errors = null;
          }}
        />
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
                settestRespond(false);
                response_artisan.errors = null;
              }}
              className="container_close_icon"
            >
              <i class="small material-icons">close</i>
            </div>
          </div>
          <div className="form_contact">
            <textarea
              onChange={handleChange}
              name="msg_artisan"
              placeholder="Write your response here"
            ></textarea>
            <div className="calendar">
              <span className="spanContact">
                {" "}
                Please select a date interval:
              </span>
              <DatePickerCalendarExample
                // id_client={match.params.id_client}
                id_client={id_client}
                setnewDates={setnewDates}
              />
            </div>
          </div>
          <div style={{ height: 90 }}>
            <h6 style={{ color: "red", height: 25 }}>
              {response_artisan.errors && response_artisan.errors}
            </h6>
            <button
              type="submit"
              className="waves-effect waves-light btn contact"
              onClick={handleRespond}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ArtisanResponse;
