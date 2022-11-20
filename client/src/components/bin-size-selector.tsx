import React from "react";

import "./bin-size-selector.scss";

const BIN_SIZES = [60, 60 * 60, 60 * 60 * 24];

const binSizeToHumanString = (binSize: number) => {
  switch (binSize) {
    case BIN_SIZES[0]: {
      return "1 min";
    }
    case BIN_SIZES[1]: {
      return "1 hour";
    }
    case BIN_SIZES[2]: {
      return "1 day";
    }
    default: {
      return `${binSize} seconds`;
    }
  }
};

type BinSizeSelectorProps = {
  binSize: number;
  onBinSizeChange: (newBinsize: number) => void;
};

const BinSizeSelector = ({
  binSize,
  onBinSizeChange,
}: BinSizeSelectorProps) => (
  // TODO: Bin binSizeOption.toString() is called to many times.
  // Move to its own variable.
  <div className="bin-size-selector">
    <div>interval:</div>
    {BIN_SIZES.map((binSizeOption) => (
      <div key={binSizeOption}>
        <input
          id={`bin-size-${binSizeOption.toString()}`}
          name={`bin-size-${binSizeOption.toString()}`}
          type="radio"
          value={binSizeOption.toString()}
          checked={binSizeOption === binSize}
          onChange={() => {
            onBinSizeChange(binSizeOption);
          }}
        />
        <label htmlFor={`bin-size-${binSizeOption.toString()}`}>
          {binSizeToHumanString(binSizeOption)}
        </label>
      </div>
    ))}
  </div>
);

export default BinSizeSelector;
