import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar, DateRangePicker } from "react-nice-dates";
import { START_DATE, END_DATE } from "react-nice-dates";

import { useSelector } from "react-redux";
import "react-nice-dates/build/style.css";
function DatePickerCalendarExample({ id_client, setnewDates }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateUpdated, setStartDateUpdated] = useState("");
  const [endDateUpdated, setEndDateUpdated] = useState("");

  // const [date, setDate] = useState();
  const request_artisan = useSelector((state) => state.request_artisan);
  const [request, setrequest] = useState();
  useEffect(() => {
    setrequest(
      request_artisan.requests.length &&
        request_artisan.requests.find(
          (req) =>
            (req.id_client._id == id_client &&
              req.state === "Respond Artisan") ||
            req.state === "Send Request"
        )
    );
  }, [request_artisan.requests]);
  useEffect(() => {
    if (request) {
      if (request.state === "Send Request") {
        setStartDate(request.start_date);
        setEndDate(request.end_date);
      } else if (request.state === "Respond Artisan") {
        setStartDate(request.start_date_artisan);
        setEndDate(request.end_date_artisan);
      }
    }
  }, [request]);

  useEffect(() => {
    if (endDateUpdated && startDateUpdated) {
      setnewDates({
        start_date_artisan: startDateUpdated,
        end_date_artisan: endDateUpdated,
      });
    }
  }, [startDateUpdated, endDateUpdated]);

  return (
    <div>
      {/* <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} /> */}
      <DateRangePicker
        startDate={
          startDateUpdated
            ? new Date(startDateUpdated)
            : startDate
            ? new Date(startDate)
            : undefined
        }
        endDate={
          endDateUpdated
            ? new Date(endDateUpdated)
            : endDate
            ? new Date(endDate)
            : undefined
        }
        onStartDateChange={setStartDateUpdated}
        onEndDateChange={setEndDateUpdated}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="date-range">
            <input
              name="start_date"
              className={"input" + (focus === START_DATE ? " -focused" : "")}
              {...startDateInputProps}
              placeholder="Start date"
            />
            <span className="date-range_arrow" />
            <input
              name="end_date"
              className={"input" + (focus === END_DATE ? " -focused" : "")}
              {...endDateInputProps}
              placeholder="End date"
            />
          </div>
        )}
      </DateRangePicker>
    </div>
  );
}
export default DatePickerCalendarExample;
