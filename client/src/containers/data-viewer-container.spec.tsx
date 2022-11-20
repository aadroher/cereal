// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "@testing-library/react";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import "jest-fetch-mock";

import { DateTime } from "luxon";

import DataViewerContainer from "./data-viewer-container";

import { mockResponseBody } from "./data-viewer-mock-responses";

window.ResizeObserver = ResizeObserverPolyfill;

jest.mock("recharts", () => {
  const MockResponsiveContainer = () => (
    <div data-testid="mock-responsive-container" />
  );

  return {
    ...jest.requireActual("recharts"),
    ResponsiveContainer: MockResponsiveContainer,
  };
});

describe("DataViewerContainer", () => {
  describe("when the server returns a well formed response", () => {
    beforeEach(() => {
      fetch.mockResponse(async (request) => ({
        body: JSON.stringify(mockResponseBody),
      }));
    });

    it("calls fetch with the correct default argument", async () => {
      await act(async () => render(<DataViewerContainer />));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/\/api\/v0\/metrics\/averages/)
        );
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /from=\d{4}-\d{2}-\d{2}T\d{2}%3A\d{2}%3A\d{2}\.\d{3}Z/
          )
        );
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /to=\d{4}-\d{2}-\d{2}T\d{2}%3A\d{2}%3A\d{2}\.\d{3}Z/
          )
        );
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/bin_size=3600/)
        );
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /names\[\]=temperature&names\[\]=pressure&names\[\]=insolation/
          )
        );
      });
    });

    it("renders the main chart", async () => {
      await act(async () => render(<DataViewerContainer />));

      const mainChart = await screen.findByTestId("mock-responsive-container");

      expect(mainChart).toBeInTheDocument();
    });

    it("renders 3 checked checkboxes, one for each known name", async () => {
      await act(async () => render(<DataViewerContainer />));

      const insolationCheckBox = await screen.findByRole("checkbox", {
        name: "insolation",
      });
      await waitFor(() => {
        expect(insolationCheckBox).toBeChecked();
      });

      const temperatureCheckBox = await screen.findByRole("checkbox", {
        name: "temperature",
      });
      await waitFor(() => {
        expect(temperatureCheckBox).toBeChecked();
      });

      const pressureCheckBox = await screen.findByRole("checkbox", {
        name: "pressure",
      });
      await waitFor(() => {
        expect(pressureCheckBox).toBeChecked();
      });
    });

    it("renders 2 day selectors with the correct defaults", async () => {
      const currentDate = new Date();
      const expectedToValue =
        DateTime.fromJSDate(currentDate).toFormat("yyyy-MM-dd'T'HH:mm");
      const expectedFromValue = DateTime.fromJSDate(currentDate)
        .minus({ days: 3 })
        .toFormat("yyyy-MM-dd'T'HH:mm");

      await act(async () => render(<DataViewerContainer />));

      screen.debug();
    });
  });
});
