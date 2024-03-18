import type { Meta, StoryObj } from '@storybook/react';

import { Navbar, NavbarItem } from './index';

const meta = {
  title: 'UI/Atoms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: NavbarItem[] = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const Default: Story = {
  args: {
    items,
    selectedItemId: 'hello',
  },
};
