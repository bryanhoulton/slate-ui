import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { cn } from '../../utilities'
import { BarChartProps } from './BarChart.types'

export function BarChart({
  data,
  xKey = 'x',
  yKey = 'y',
  bars = [{ key: yKey, color: 'default' }],
  showGrid = true,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  width,
  margin = { top: 20, right: 20, left: 10, bottom: 15 },
  barGap = 4,
  categoryGap = 16,
  className,
  styles,
  ...props
}: BarChartProps) {
  return (
    <div className={cn('p-4', className)} style={styles?.root} {...props}>
      <div className="relative">
        <ResponsiveContainer width={width || '100%'} height={height}>
          <RechartsBarChart
            data={data}
            margin={margin}
            style={styles?.chart}
            barGap={barGap}
            barCategoryGap={categoryGap}
          >
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis
              dataKey={xKey}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: xAxisLabel,
                position: 'insideBottom',
                offset: -10
              }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{
                value: yAxisLabel,
                position: 'insideLeft',
                angle: -90,
                offset: -2
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                ...styles?.tooltip
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Legend
              wrapperStyle={styles?.legend}
              verticalAlign="top"
              iconType="rect"
            />
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                opacity={bar.opacity || 1}
                fill={`var(--color-${bar.color})`}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
