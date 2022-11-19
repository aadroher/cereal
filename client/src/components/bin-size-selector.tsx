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
  <div className="bin-size-selector">
    <div>interval:</div>
    {BIN_SIZES.map((binSizeOption) => (
      <div key={binSizeOption}>
        <input
          id={binSizeOption.toString()}
          name="bin-size"
          type="radio"
          value={binSizeOption.toString()}
          checked={binSizeOption === binSize}
          onChange={() => {
            onBinSizeChange(binSizeOption);
          }}
        />
        <label htmlFor={binSizeOption.toString()}>
          {binSizeToHumanString(binSizeOption)}
        </label>
      </div>
    ))}
  </div>
);

export default BinSizeSelector;
