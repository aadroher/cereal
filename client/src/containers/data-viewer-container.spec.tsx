import DataViewerContainer from "./data-viewer-container";
import { render, screen } from "@testing-library/react";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("DataViewerContainer", () => {
  it("renders!", () => {
    render(<DataViewerContainer />);
  });
});
