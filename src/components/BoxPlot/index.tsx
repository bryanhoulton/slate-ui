import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import {
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities/types'
import { BoxPlotProps } from './BoxPlot.types'

const boxPlotVariants = cva<
  Variants<{ size: SlateSize; variant: SlateVariant }>
>('rounded-lg bg-white p-4', {
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6'
    },
    variant: {
      primary:
        '[--fill-color:theme(colors.primary)] [--stroke-color:theme(colors.primary)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.gray.700)]',
      secondary:
        '[--fill-color:theme(colors.secondary)] [--stroke-color:theme(colors.secondary)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.gray.700)]',
      default:
        '[--fill-color:theme(colors.gray.200)] [--stroke-color:theme(colors.gray.400)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.gray.700)]',
      subtle:
        '[--fill-color:theme(colors.gray.100)] [--stroke-color:theme(colors.gray.300)] [--whisker-color:theme(colors.gray.300)] [--median-color:theme(colors.gray.600)]',
      success:
        '[--fill-color:theme(colors.success.100)] [--stroke-color:theme(colors.success.500)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.success.700)]',
      warning:
        '[--fill-color:theme(colors.warning.100)] [--stroke-color:theme(colors.warning.500)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.warning.700)]',
      error:
        '[--fill-color:theme(colors.error.100)] [--stroke-color:theme(colors.error.500)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.error.700)]',
      info: '[--fill-color:theme(colors.info.100)] [--stroke-color:theme(colors.info.500)] [--whisker-color:theme(colors.gray.400)] [--median-color:theme(colors.info.700)]'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary'
  }
})

export function BoxPlot({
  min,
  q1,
  median,
  q3,
  max,
  outliers = [],
  label,
  variant = 'primary',
  size = 'md',
  height = 80,
  className,
  styles,
  ...props
}: BoxPlotProps) {
  // Calculate the full range including outliers
  const allValues = [min, q1, median, q3, max, ...outliers]
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const range = maxValue - minValue

  // Calculate positions as percentages
  const getPosition = (value: number) => {
    return ((value - minValue) / range) * 100
  }

  const minPos = getPosition(min)
  const q1Pos = getPosition(q1)
  const medianPos = getPosition(median)
  const q3Pos = getPosition(q3)
  const maxPos = getPosition(max)

  return (
    <div
      className={cn(
        boxPlotVariants({ size, variant }),
        'flex flex-col gap-2',
        className
      )}
      style={styles?.root}
      {...props}
    >
      {label && (
        <div className="text-sm font-medium text-gray-700 mb-4">{label}</div>
      )}

      <div
        className="relative w-full bg-gray-50 rounded mt-6 mb-6"
        style={{ height: `${height}px` }}
      >
        {/* Scale labels */}
        <div className="absolute -top-6 left-0 text-xs text-gray-500">
          {minValue.toFixed(1)}
        </div>
        <div className="absolute -top-6 right-0 text-xs text-gray-500">
          {maxValue.toFixed(1)}
        </div>

        {/* Whisker line (min to max) */}
        <div
          className="absolute top-1/2 transform -translate-y-0.5 h-0.5"
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`,
            backgroundColor: 'var(--whisker-color)'
          }}
        />

        {/* Min whisker cap */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-6"
          style={{
            left: `${minPos}%`,
            backgroundColor: 'var(--whisker-color)'
          }}
        />

        {/* Max whisker cap */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-6"
          style={{
            left: `${maxPos}%`,
            backgroundColor: 'var(--whisker-color)'
          }}
        />

        {/* Box (Q1 to Q3) */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-10 border-2 rounded opacity-30"
          style={{
            left: `${q1Pos}%`,
            width: `${q3Pos - q1Pos}%`,
            backgroundColor: 'var(--fill-color)',
            borderColor: 'var(--stroke-color)'
          }}
        />

        {/* Median line */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-10 rounded"
          style={{
            left: `${medianPos}%`,
            backgroundColor: 'var(--median-color)'
          }}
        />

        {/* Outliers */}
        {outliers.map((outlier, index) => (
          <div
            key={index}
            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-70"
            style={{
              left: `${getPosition(outlier)}%`,
              backgroundColor: 'var(--stroke-color)'
            }}
          />
        ))}

        {/* Value labels */}
        <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500">
          <span
            className="absolute transform -translate-x-1/2"
            style={{ left: `${q1Pos}%` }}
          >
            Q1: {q1}
          </span>
          <span
            className="absolute transform -translate-x-1/2"
            style={{ left: `${medianPos}%` }}
          >
            Med: {median}
          </span>
          <span
            className="absolute transform -translate-x-1/2"
            style={{ left: `${q3Pos}%` }}
          >
            Q3: {q3}
          </span>
        </div>
      </div>
    </div>
  )
}
