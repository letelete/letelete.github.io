import { SocialButtons } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/SocialButtons',
  component: SocialButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SocialButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
