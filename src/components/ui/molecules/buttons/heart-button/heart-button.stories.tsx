import type { Meta, StoryObj } from '@storybook/react';

import { HeartButton } from '~ui/molecules/buttons/heart-button';

const meta = {
  title: 'UI/Molecules/Buttons/HeartButton',
  component: HeartButton,
  tags: ['autodocs'],
  argTypes: {
    phase: {
      control: {
        type: 'range',
        min: 0,
        max: 3,
        step: 1,
      },
      description:
        'A value describing currently visible phase of the incremental heart',
    },
  },
} satisfies Meta<typeof HeartButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phase: 0,
  },
};
