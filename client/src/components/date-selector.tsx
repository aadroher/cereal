import React from "react";
import { DateTime } from "luxon";

import { Filters } from "../state";

type FormatDateForHtml = (date: Date) => string;
const formatDateForHtml: FormatDateForHtml = (date) =>
  DateTime.fromJSDate(date).toFormat("yyyy-MM-dd'T'HH:mm");

type DateSelectorProps = {
  filters: Filters;
  onDateFromChange: (newFromDate: Date) => void;
  onDateToChange: (newToDate: Date) => void;
};

const DateSelector = ({
  filters,
  onDateFromChange,
  onDateToChange,
}: DateSelectorProps): JSX.Element => (
  <div>
    <label htmlFor="from">From:</label>
    <input
      id="from"
      type="datetime-local"
      name="from"
      value={formatDateForHtml(filters.dates.from)}
      onChange={(event) => {
        onDateFromChange(new Date(event.target.value));
      }}
    />
    <label htmlFor="to">To:</label>
    <input
      id="to"
      type="datetime-local"
      name="to"
      value={formatDateForHtml(filters.dates.to)}
      min={formatDateForHtml(filters.dates.from)}
      onChange={(event) => {
        onDateToChange(new Date(event.target.value));
      }}
    />
  </div>
);

export default DateSelector;
