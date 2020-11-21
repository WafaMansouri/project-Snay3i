import React, { useState, useEffect } from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function DateRangePickerExample({ retrieve_dates, requestInfo }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  //   const [start_date, setstart_date] = useState("");
  //   const [start_date, setstart_date] = useState("");
  useEffect(() => {
    retrieve_dates({
      ...requestInfo,
      start_date: startDate,
      end_date: endDate,
    });
  }, [startDate, endDate]);
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
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
  );
}
export default DateRangePickerExample;
