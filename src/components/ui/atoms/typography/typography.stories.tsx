import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './index';

const meta = {
  title: 'UI/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

const text =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae quia quidem aspernatur odio neque earum a laudantium? Sunt reiciendis eveniet deleniti fugiat magnam doloribus vel, hic iusto? Expedita officiis id maiores magni itaque modi possimus et ipsum, fugiat distinctio, atque excepturi, laborum odit placeat. Unde soluta corporis provident incidunt vel exercitationem sequi expedita deleniti minima quam nostrum distinctio reiciendis eos placeat tenetur id dolores, optio beatae rem officia dignissimos! Expedita quibusdam rem ipsa libero ab sapiente impedit inventore totam. Quaerat mollitia dolore officiis, qui autem laboriosam, id veritatis tempora quibusdam quam non similique quas! Perspiciatis accusamus illum mollitia beatae? Est?';

export const Default: Story = {
  args: {
    children: text,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    variant: 'body',
    weight: 'normal',
    children: <h1>{text}</h1>,
  },
};
