'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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

const chartConfig = {
  totalUsers: {
    label: 'Total Users',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

interface UserActivityData {
  month: string;
  year: string;
  totalUsers: number;
}

export function UserActivityChart({
  chartData,
}: {
  chartData: UserActivityData[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity Overview</CardTitle>
        <CardDescription>Displays total user activity</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <ChartContainer config={chartConfig}>
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
              dataKey="totalUsers"
              type="natural"
              fill="var(--color-totalUsers)"
              fillOpacity={0.4}
              stroke="var(--color-totalUsers)"
            />
          </AreaChart>
        </ChartContainer> */}

        <ChartContainer config={chartConfig}>
          <LineChart
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalUsers"
              type="natural"
              stroke="var(--color-totalUsers)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
