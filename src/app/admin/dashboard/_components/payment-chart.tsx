'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PaymentData } from '@/types';

const chartConfig = {
  totalAmount: {
    label: 'Total Amount',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function PaymentChart({ chartData }: { chartData: PaymentData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Activity Overview</CardTitle>
        <CardDescription>Total payment amounts over the period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="totalAmount"
              type="natural"
              fill="var(--color-totalAmount)"
              fillOpacity={0.4}
              stroke="var(--color-totalAmount)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
