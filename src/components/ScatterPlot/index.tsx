import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { cn } from '../../utilities'
import { ScatterPlotProps } from './ScatterPlot.types'

export function ScatterPlot({
  data,
  xKey = 'x',
  yKey = 'y',
  scatters = [{ key: yKey, color: 'primary' }],
  showGrid = true,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  width,
  margin = { top: 20, right: 20, left: 10, bottom: 15 },
  dotSize = 6,
  className,
  styles,
  ...props
}: ScatterPlotProps) {
  return (
    <div className={cn('p-4', className)} style={styles?.root} {...props}>
      <div className="relative">
        <ResponsiveContainer width={width || '100%'} height={height}>
          <RechartsScatterChart margin={margin} style={styles?.chart}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            )}
            <XAxis
              type="number"
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
              type="number"
              dataKey={yKey}
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
              cursor={{ strokeDasharray: '3 3' }}
            />
            {scatters.length > 1 && (
              <Legend
                wrapperStyle={styles?.legend}
                verticalAlign="top"
                iconType="circle"
              />
            )}
            {scatters.map((scatter) => {
              // Transform data for this series - convert to x,y coordinates
              const seriesData = data.map((item) => ({
                x: item[xKey],
                y: item[scatter.key]
              }))

              return (
                <Scatter
                  key={scatter.key}
                  name={scatter.key}
                  data={seriesData}
                  fill={`var(--color-${scatter.color})`}
                  opacity={scatter.opacity || 0.8}
                  r={scatter.size || dotSize}
                />
              )
            })}
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
