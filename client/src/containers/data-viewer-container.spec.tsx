// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import "jest-fetch-mock";

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

    it.todo("renders 2 day selectors with the correct defaults");

    it("renders a set of 3 radio buttons with the 3 bin sizes and the second is selected", async () => {
      await act(async () => render(<DataViewerContainer />));

      const minRadioButton = await screen.findByRole("radio", {
        name: /1 min/,
      });
      await waitFor(() => {
        expect(minRadioButton).not.toBeChecked();
      });

      const hourRadioButton = await screen.findByRole("radio", {
        name: /1 hour/,
      });
      await waitFor(() => {
        expect(hourRadioButton).toBeChecked();
      });

      const dayRadioButton = await screen.findByRole("radio", {
        name: /1 day/,
      });
      await waitFor(() => {
        expect(dayRadioButton).not.toBeChecked();
      });
    });

    describe("when a different bin size is selected", () => {
      it("refetches data witnh the updated parameters", async () => {
        await act(async () => render(<DataViewerContainer />));

        await waitFor(() => {
          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/bin_size=3600/)
          );
        });

        const minRadioButton = await screen.findByRole("radio", {
          name: /1 min/,
        });
        await act(() => {
          fireEvent.click(minRadioButton);
        });

        await waitFor(() => {
          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/bin_size=60/)
          );
        });
      });
    });
  });
});
