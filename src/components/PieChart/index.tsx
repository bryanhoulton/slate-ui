import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

import { cn } from '../../utilities'
import { PieChartProps } from './PieChart.types'

// Default colors for pie slices
const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-info)',
  'var(--color-warning)',
  'var(--color-success)',
  'var(--color-error)',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
  '#8dd1e1',
  '#d084d0'
]

export function PieChart({
  data,
  nameKey = 'name',
  valueKey = 'value',
  innerRadius = 0,
  outerRadius = 80,
  showLabels = false,
  showTooltip = true,
  showLegend = true,
  labelLine = true,
  startAngle = 0,
  endAngle = 360,
  height = 300,
  width,
  margin = { top: 20, right: 20, left: 20, bottom: 20 },
  slices = [],
  className,
  styles,
  ...props
}: PieChartProps) {
  // Generate colors for slices
  const getSliceColor = (index: number, slice?: { color?: string }) => {
    if (slice?.color) {
      return slice.color.startsWith('var(--color-')
        ? slice.color
        : `var(--color-${slice.color})`
    }
    return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }

  // Custom label formatter
  const renderLabel = (entry: { [key: string]: string | number }) => {
    if (!showLabels) return null
    const percent = (
      (Number(entry.value) /
        data.reduce((sum, item) => sum + Number(item[valueKey]), 0)) *
      100
    ).toFixed(1)
    return `${entry[nameKey]} (${percent}%)`
  }

  return (
    <div className={cn('p-4', className)} style={styles?.root} {...props}>
      <div className="relative">
        <ResponsiveContainer width={width || '100%'} height={height}>
          <RechartsPieChart margin={margin} style={styles?.chart}>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              label={showLabels ? renderLabel : false}
              labelLine={labelLine}
            >
              {data.map((entry, index) => {
                const sliceConfig = slices.find((s) => s.key === entry[nameKey])
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={getSliceColor(index, sliceConfig)}
                    opacity={sliceConfig?.opacity || 1}
                    stroke="var(--color-neutral-300)"
                    style={styles?.cell}
                  />
                )
              })}
            </Pie>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  ...styles?.tooltip
                }}
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
            )}
            {showLegend && (
              <Legend
                wrapperStyle={styles?.legend}
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
