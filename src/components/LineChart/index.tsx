import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { cn } from '../../utilities'
import { LineChartProps } from './LineChart.types'

export function LineChart({
  data,
  xKey = 'x',
  yKey = 'y',
  lines = [{ key: yKey, color: 'primary' }],
  showGrid = true,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  width,
  margin = { top: 20, right: 20, left: 10, bottom: 10 },
  className,
  styles,
  ...props
}: LineChartProps) {
  return (
    <div
      className={cn('rounded-lg bg-white p-4', className)}
      style={styles?.root}
      {...props}
    >
      <div className="relative">
        <ResponsiveContainer width={width || '100%'} height={height}>
          <RechartsLineChart data={data} margin={margin} style={styles?.chart}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis
              dataKey={xKey}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                ...styles?.tooltip
              }}
              cursor={{ stroke: '#e5e7eb' }}
            />
            <Legend wrapperStyle={styles?.legend} iconType="line" />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={`var(--color-${line.color})`}
                strokeWidth={line.strokeWidth || 2}
                strokeDasharray={line.strokeDasharray}
                dot={{
                  fill: `var(--color-${line.color})`,
                  strokeWidth: 0,
                  r: 3
                }}
                activeDot={{
                  r: 4,
                  stroke: `var(--color-${line.color})`,
                  strokeWidth: 2
                }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>

        {/* Axis Labels */}
        {xAxisLabel && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-600 font-medium bottom-8">
            {xAxisLabel}
          </div>
        )}
        {yAxisLabel && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-gray-600 font-medium">
            {yAxisLabel}
          </div>
        )}
      </div>
    </div>
  )
}
