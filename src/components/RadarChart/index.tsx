import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

import { cn } from '../../utilities'
import { RadarChartProps } from './RadarChart.types'

export function RadarChart({
  data,
  color = 'var(--color-primary)',
  fillOpacity = 0.6,
  height = 400,
  width,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  className,
  styles,
  ...props
}: RadarChartProps) {
  return (
    <div className={cn('p-4', className)} style={styles?.root} {...props}>
      <div className="relative">
        <ResponsiveContainer width={width || '100%'} height={height}>
          <RechartsRadarChart data={data} margin={margin} style={styles?.chart}>
            <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              tick={{ fill: '#6b7280', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                ...styles?.tooltip
              }}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={2}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
