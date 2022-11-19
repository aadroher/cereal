import React from "react";

const BIN_SIZES = [60, 60 * 60, 60 * 60 * 24];

const binSizeToHumanString = (binSize: number) => {
  switch (binSize) {
    case BIN_SIZES[0]: {
      return "1 minute";
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
  <fieldset>
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
  </fieldset>
);

export default BinSizeSelector;
