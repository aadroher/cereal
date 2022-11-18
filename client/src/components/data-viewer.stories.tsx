import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

import DataViewer, { DataPoint } from "./data-viewer";

faker.seed(1984);

const mockLabels = ["temperature", "pressure", "insolation"];

const numSamples = 50;

const intialDate = DateTime.utc(2021, 3, 23, 12, 0);
const binSizeMin = 5;
const binRange = [...Array(numSamples).keys()];
const minVal = 0;
const maxVal = 50;

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
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof DataViewer>;

const Template: ComponentStory<typeof DataViewer> = (args) => {
  console.log(data);
  return <DataViewer data={data} />;
};

export const Default = Template.bind({});
Default.args = {};
