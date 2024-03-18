import type { Meta, StoryObj } from '@storybook/react';

import { AboutMeBentoBox } from './index';

const meta = {
  title: 'Features/Home/AboutMeBentoBox',
  component: AboutMeBentoBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AboutMeBentoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
