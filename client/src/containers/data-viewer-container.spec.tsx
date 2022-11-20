// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import "jest-fetch-mock";

import DataViewerContainer from "./data-viewer-container";

window.ResizeObserver = ResizeObserverPolyfill;

describe("DataViewerContainer", () => {
  it("renders!", async () => {
    fetch.mockResponse(async (request) => {
      return {
        body: JSON.stringify([
          {
            timestamp: new Date().toISOString(),
            name: "foo",
            value: 1981,
          },
        ]),
      };
    });

    await act(async () => render(<DataViewerContainer />));
  });
});
