import React from 'react'

import { cn } from '../../utilities'
import {
  NumberLineMark,
  NumberLineProps,
  NumberLineRay,
  NumberLineSegment
} from './NumberLine.types'

const DEFAULT_LINE_COLOR = '#1f2937' // gray-800
const DEFAULT_MARK_COLOR = '#3b82f6' // blue-500

const COLOR_MAP: Record<string, string> = {
  red: '#ef4444',
  green: '#22c55e',
  blue: '#3b82f6',
  yellow: '#eab308',
  purple: '#a855f7',
  pink: '#ec4899',
  indigo: '#6366f1',
  cyan: '#06b6d4',
  orange: '#f97316',
  gray: '#6b7280',
  black: '#000000',
  white: '#ffffff'
}

function getCSSColor(color?: string): string {
  if (!color) return DEFAULT_MARK_COLOR
  if (
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('hsl')
  ) {
    return color
  }
  return COLOR_MAP[color.toLowerCase()] || DEFAULT_MARK_COLOR
}

function getMarkSize(size: 'sm' | 'md' | 'lg' = 'md'): string {
  switch (size) {
    case 'sm':
      return 'w-2 h-2'
    case 'lg':
      return 'w-4 h-4'
    case 'md':
    default:
      return 'w-3 h-3'
  }
}

function getOptimalDecimalPlaces(values: number[]): number {
  if (values.length === 0) return 0

  // Find the maximum number of decimal places needed
  let maxDecimals = 0

  for (const value of values) {
    // Convert to string and check decimal places
    const str = value.toString()
    const decimalIndex = str.indexOf('.')

    if (decimalIndex !== -1) {
      const decimals = str.length - decimalIndex - 1
      maxDecimals = Math.max(maxDecimals, decimals)
    }
  }

  // Cap at 4 decimal places for readability
  return Math.min(maxDecimals, 4)
}

export function NumberLine({
  min,
  max,
  step = 1,
  marks = [],
  segments = [],
  rays = [],
  showTicks = true,
  showLabels = true,
  height = 120,
  width = '100%',
  customTicks,
  showArrows = true,
  title,
  className,
  styles,
  ...props
}: NumberLineProps) {
  const range = max - min
  const lineColor = DEFAULT_LINE_COLOR

  // Generate tick positions
  const generateTicks = (): number[] => {
    if (customTicks) {
      return customTicks.filter((tick) => tick >= min && tick <= max)
    }

    const ticks: number[] = []
    for (let i = min; i <= max; i += step) {
      ticks.push(i)
    }
    return ticks
  }

  const ticks = generateTicks()

  // Calculate optimal decimal places for tick formatting
  const decimalPlaces = getOptimalDecimalPlaces(ticks)

  // Convert value to percentage position
  const valueToPercent = (value: number): number => {
    return ((value - min) / range) * 100
  }

  // Render a segment on the number line
  const renderSegment = (segment: NumberLineSegment, index: number) => {
    const startPosition = valueToPercent(segment.start)
    const endPosition = valueToPercent(segment.end)
    const color = getCSSColor(segment.color)

    return (
      <div key={`segment-${index}`} className="absolute inset-0">
        {/* Segment line */}
        <div
          className="absolute h-1"
          style={{
            left: `${startPosition}%`,
            width: `${endPosition - startPosition}%`,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: color
          }}
        />

        {/* Start endpoint */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${startPosition}%`,
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{
              borderColor: color,
              backgroundColor: segment.startType === 'open' ? 'white' : color
            }}
          />
        </div>

        {/* End endpoint */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${endPosition}%`,
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{
              borderColor: color,
              backgroundColor: segment.endType === 'open' ? 'white' : color
            }}
          />
        </div>

        {/* Label */}
        {segment.label && showLabels && (
          <div
            className="absolute flex justify-center"
            style={{
              left: `${startPosition}%`,
              width: `${endPosition - startPosition}%`,
              top: '-2rem'
            }}
          >
            <span className="text-xs text-gray-600 whitespace-nowrap">
              {segment.label}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Render a ray on the number line
  const renderRay = (ray: NumberLineRay, index: number) => {
    const position = valueToPercent(ray.value)
    const color = getCSSColor(ray.color)

    return (
      <div key={`ray-${index}`} className="absolute inset-0">
        {/* Ray line */}
        <div
          className="absolute h-1"
          style={{
            left: ray.direction === 'right' ? `${position}%` : '0%',
            width:
              ray.direction === 'right' ? `${100 - position}%` : `${position}%`,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: color
          }}
        />

        {/* Endpoint */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${position}%`,
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{
              borderColor: color,
              backgroundColor: ray.type === 'open' ? 'white' : color
            }}
          />
        </div>

        {/* Arrow at the extending end */}
        <div
          className="absolute flex items-center"
          style={{
            left: ray.direction === 'right' ? '95%' : '5%',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className="w-3 h-3"
            style={{
              backgroundColor: color,
              clipPath:
                ray.direction === 'right'
                  ? 'polygon(0 0, 0 100%, 100% 50%)'
                  : 'polygon(0 50%, 100% 0, 100% 100%)'
            }}
          />
        </div>

        {/* Label */}
        {ray.label && showLabels && (
          <div
            className="absolute"
            style={{
              left: `${position}%`,
              top: '-2rem',
              transform: 'translateX(-50%)'
            }}
          >
            <span className="text-xs text-gray-600 whitespace-nowrap">
              {ray.label}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Render a mark on the number line
  const renderMark = (mark: NumberLineMark, index: number) => {
    const position = valueToPercent(mark.value)
    const color = getCSSColor(mark.color)
    const sizeClass = getMarkSize(mark.size)

    // Default dot variant
    return (
      <div
        key={`mark-${index}`}
        className="absolute flex flex-col items-center"
        style={{
          left: `${position}%`,
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          ...styles?.mark
        }}
      >
        <div
          className={cn('rounded-full border-2', sizeClass)}
          style={{
            backgroundColor: color,
            borderColor: 'white'
          }}
        />
        {mark.label && showLabels && (
          <span
            className="text-xs text-gray-600 absolute -top-8 whitespace-nowrap"
            style={styles?.label}
          >
            {mark.label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col items-center space-y-3 w-full', className)}
      style={{ width: width || '100%', ...styles?.root }}
      {...props}
    >
      {title && <h3 className="text-sm font-medium text-gray-700">{title}</h3>}

      <div
        className="relative w-full flex items-center"
        style={{ height: height }}
      >
        {/* Main line */}
        <div
          className="relative h-0.5 w-full"
          style={{
            marginLeft: showArrows ? '24px' : '8px',
            marginRight: showArrows ? '24px' : '8px',
            backgroundColor: lineColor,
            ...styles?.line
          }}
        >
          {/* Tick marks */}
          {showTicks &&
            ticks.map((tick, index) => {
              const position = valueToPercent(tick)
              return (
                <div
                  key={`tick-${index}`}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${position}%`,
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)'
                  }}
                >
                  <div
                    className="w-px h-4"
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      backgroundColor: lineColor,
                      ...styles?.tick
                    }}
                  />
                  {showLabels && (
                    <span
                      className="text-xs text-gray-500 whitespace-nowrap"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        ...styles?.label
                      }}
                    >
                      {tick.toFixed(decimalPlaces)}
                    </span>
                  )}
                </div>
              )
            })}

          {/* Segments */}
          {segments.map(renderSegment)}

          {/* Rays */}
          {rays.map(renderRay)}

          {/* Custom marks */}
          {marks.map(renderMark)}
        </div>

        {/* Left arrow */}
        {showArrows && (
          <div
            className="absolute left-1 w-4 h-4 flex items-center justify-center"
            style={{
              backgroundColor: lineColor,
              clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'
            }}
          />
        )}

        {/* Right arrow */}
        {showArrows && (
          <div
            className="absolute right-1 w-4 h-4 flex items-center justify-center"
            style={{
              backgroundColor: lineColor,
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)'
            }}
          />
        )}
      </div>
    </div>
  )
}
