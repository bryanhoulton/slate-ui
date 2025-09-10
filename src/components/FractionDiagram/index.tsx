import { useMemo } from 'react'

import { cn } from '../../utilities'
import {
  FractionData,
  FractionDiagramProps
} from './FractionDiagram.types'

export function FractionDiagram({
  fractions: propsFractions,
  type = 'grid',
  size = 200,
  showLabel = true,
  fillColor = 'var(--color-primary)',
  emptyColor = 'var(--color-neutral-200)',
  gridColumns,
  gridGap = 2,
  spacing = 16,
  className,
  styles,
  ...restProps
}: FractionDiagramProps) {
  // Normalize fractions to always be an array
  const fractions = Array.isArray(propsFractions)
    ? propsFractions
    : [propsFractions]

  const renderSingleDiagram = (fraction: FractionData, index: number) => {
    const safeDenominator = Math.max(1, fraction.denominator)
    const safeNumerator = Math.max(0, fraction.numerator)

    // Handle improper fractions
    const wholeNumber = Math.floor(safeNumerator / safeDenominator)
    const remainder = safeNumerator % safeDenominator
    const isImproper = safeNumerator > safeDenominator

    const fractionLabel =
      fraction.label || `${safeNumerator}/${safeDenominator}`
    const diagramFillColor = fraction.fillColor || fillColor
    const diagramEmptyColor = fraction.emptyColor || emptyColor

    // Calculate grid dimensions
    const calculatedGridColumns = useMemo(() => {
      if (gridColumns) return gridColumns

      // Auto-calculate optimal grid dimensions
      const sqrt = Math.sqrt(safeDenominator)
      if (Number.isInteger(sqrt)) {
        return sqrt
      }

      // Find the best rectangular layout
      for (let cols = Math.floor(sqrt); cols >= 1; cols--) {
        if (safeDenominator % cols === 0) {
          return cols
        }
      }

      return safeDenominator
    }, [safeDenominator, gridColumns])

    const renderGridDiagram = (fillAmount: number, diagramIndex: number) => {
      const cells = []

      for (let i = 0; i < safeDenominator; i++) {
        const isFilled = i < fillAmount
        cells.push(
          <div
            key={`${diagramIndex}-${i}`}
            className={cn(
              'border border-neutral-300 transition-colors duration-200',
              isFilled ? 'opacity-100' : 'opacity-60'
            )}
            style={{
              backgroundColor: isFilled ? diagramFillColor : diagramEmptyColor,
              ...styles?.gridCell
            }}
          />
        )
      }

      return (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${calculatedGridColumns}, 1fr)`,
            gap: `${gridGap}px`,
            width: size,
            height: size,
            ...styles?.grid
          }}
        >
          {cells}
        </div>
      )
    }

    const renderPieDiagram = (fillAmount: number, diagramIndex: number) => {
      const centerX = size / 2
      const centerY = size / 2
      const radius = size / 2 - 20
      const anglePerSlice = (2 * Math.PI) / safeDenominator

      const createSlicePath = (sliceIndex: number) => {
        const startAngle = sliceIndex * anglePerSlice - Math.PI / 2 // Start from top
        const endAngle = (sliceIndex + 1) * anglePerSlice - Math.PI / 2

        const x1 = centerX + radius * Math.cos(startAngle)
        const y1 = centerY + radius * Math.sin(startAngle)
        const x2 = centerX + radius * Math.cos(endAngle)
        const y2 = centerY + radius * Math.sin(endAngle)

        const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0

        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
      }

      const slices = []
      for (let i = 0; i < safeDenominator; i++) {
        const isFilled = i < fillAmount
        slices.push(
          <path
            key={`${diagramIndex}-${i}`}
            d={createSlicePath(i)}
            fill={isFilled ? diagramFillColor : diagramEmptyColor}
            stroke="white"
            strokeWidth="2"
            className="transition-colors duration-200"
          />
        )
      }

      return (
        <div
          className="relative flex items-center justify-center"
          style={{
            width: size,
            height: size,
            ...styles?.pie
          }}
        >
          <svg width={size} height={size}>
            {slices}
          </svg>
        </div>
      )
    }

    // Generate the diagrams needed for improper fractions
    const diagrams = []

    if (isImproper) {
      // Add complete diagrams for the whole number part
      for (let i = 0; i < wholeNumber; i++) {
        diagrams.push(
          <div key={`whole-${i}`} className="flex flex-col items-center">
            {type === 'grid'
              ? renderGridDiagram(safeDenominator, i)
              : renderPieDiagram(safeDenominator, i)}
          </div>
        )
      }

      // Add partial diagram for the remainder if it exists
      if (remainder > 0) {
        diagrams.push(
          <div key={`remainder`} className="flex flex-col items-center">
            {type === 'grid'
              ? renderGridDiagram(remainder, wholeNumber)
              : renderPieDiagram(remainder, wholeNumber)}
          </div>
        )
      }
    } else {
      // Regular proper fraction - single diagram
      diagrams.push(
        <div key={`proper`} className="flex flex-col items-center">
          {type === 'grid'
            ? renderGridDiagram(safeNumerator, 0)
            : renderPieDiagram(safeNumerator, 0)}
        </div>
      )
    }

    return (
      <div key={index} className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-2">{diagrams}</div>

        {showLabel && (
          <div
            className="text-sm font-medium text-neutral-700"
            style={styles?.label}
          >
            {fractionLabel}
            {isImproper && (
              <span className="text-xs text-neutral-500 ml-2">
                ({wholeNumber} {wholeNumber === 1 ? 'whole' : 'wholes'}
                {remainder > 0 ? ` + ${remainder}/${safeDenominator}` : ''})
              </span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center',
        fractions.length > 1 ? 'space-x-4' : 'justify-center',
        className
      )}
      style={{
        gap: fractions.length > 1 ? `${spacing}px` : undefined,
        ...styles?.root
      }}
      {...restProps}
    >
      {fractions.map((fraction, index) => renderSingleDiagram(fraction, index))}
    </div>
  )
}
