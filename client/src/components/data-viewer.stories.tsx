import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DataViewer from './data-viewer';

export default {
  title: 'Components/DataViewer',
  component: DataViewer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DataViewer>;

const Template: ComponentStory<typeof DataViewer> = (args) => <DataViewer {...args} />;

export const Default = Template.bind({});
Default.args = {};
