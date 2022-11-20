import React from "react";
import { DateTime } from "luxon";

import "./date-selector.scss";

import { Filters } from "../state-management/reducer";

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
  <div className="date-selector">
    <div className="date-selector__field">
      <input
        className="date-selector__date-input"
        id="from"
        type="datetime-local"
        name="from"
        aria-label="from datetime"
        value={formatDateForHtml(filters.dates.from)}
        onChange={(event) => {
          onDateFromChange(new Date(event.target.value));
        }}
      />
    </div>
    <div className="date-selector__field">
      <label className="date-selector__label" htmlFor="to">
        to
      </label>
      <input
        className="date-selector__date-input"
        id="to"
        type="datetime-local"
        name="to"
        aria-label="to datetime"
        value={formatDateForHtml(filters.dates.to)}
        min={formatDateForHtml(filters.dates.from)}
        onChange={(event) => {
          onDateToChange(new Date(event.target.value));
        }}
      />
    </div>
  </div>
);

export default DateSelector;
