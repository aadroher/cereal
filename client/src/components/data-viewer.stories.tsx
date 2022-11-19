import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

import DataViewer from "./data-viewer";
import { DataPoint } from "../state";

faker.seed(1984);

const mockLabels = ["temperature", "pressure", "insolation"];

const numSamples = 50;

const intialDate = DateTime.utc(2021, 3, 23, 12, 0);
const binSizeMin = 5;
const binRange = [...Array(numSamples).keys()];
const minVal = 0;
const maxVal = 50;

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

const data: DataPoint[] = binRange.map((i) => ({
  timestamp: intialDate.plus({ minutes: i * binSizeMin }).toJSDate(),
  values: mockLabels.reduce(
    (values, label) => ({
      ...values,
      [label]: faker.datatype.number({
        min: minVal + i * 1.5,
        max: maxVal + i * 1.5,
      }),
    }),
    {}
  ),
}));

export default {
  title: "Components/DataViewer",
  component: DataViewer,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof DataViewer>;

const Template: ComponentStory<typeof DataViewer> = (args) => {
  console.log(data);
  const [selectedLabels, setSelectedLabels] = useState(getDataNames(data));
  return (
    <DataViewer
      data={data}
      filters={{
        names: selectedLabels,
        dates: {
          from: data[0].timestamp,
          to: data[numSamples - 1].timestamp,
        },
      }}
      onSelectedLabelsChange={setSelectedLabels}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
