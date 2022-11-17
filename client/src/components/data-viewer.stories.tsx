import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

import DataViewer, { DataPoint } from "./data-viewer";

const mockLabels = ["A", "B", "C"];

const numSamples = 50;

const intialDate = DateTime.utc();
const binSizeMin = 5;
const binRange = [...Array(numSamples).keys()];
const minVal = 0;
const maxVal = 100;

const data: DataPoint[] = mockLabels.flatMap((label) =>
  binRange.map((i) => ({
    timestamp: intialDate.plus({ minutes: i * binSizeMin }).toJSDate(),
    name: label,
    value: faker.datatype.number({ min: minVal, max: maxVal }),
  }))
);

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
  return <DataViewer {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
