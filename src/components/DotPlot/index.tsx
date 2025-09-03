import { cva } from 'class-variance-authority'

import {
  bin,
  cn
} from '../../utilities'
import {
  SlateVariant,
  Variants
} from '../../utilities/types'
import { DotPlotProps } from './DotPlot.types'

const dotVariants = cva<Variants<{ variant: SlateVariant }>>(
  'rounded-full border',
  {
    variants: {
      variant: {
        primary: 'bg-primary border-primary',
        secondary: 'bg-secondary border-secondary',
        default: 'bg-black',
        subtle: 'bg-white',
        success: 'bg-success-200 border-success-400',
        warning: 'bg-warning-200 border-warning-400',
        error: 'bg-error-200 border-error-400',
        info: 'bg-info-200 border-info-400'
      }
    }
  }
)

export function DotPlot({
  data,
  label,
  dotSize = 16,
  binSize = 5,
  variant = 'primary',
  className,
  styles,
  ...props
}: DotPlotProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      style={styles?.root}
      {...props}
    >
      <div className="relative w-full flex justify-around gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-end items-center grow p-4"
          >
            <div className="flex items-end justify-center gap-1 mb-2">
              {bin(Array.from({ length: item.count }), binSize).map(
                (bin, binIndex) => (
                  <div
                    className="flex flex-col justify-end gap-1"
                    key={binIndex}
                  >
                    {bin.map((_, dotIndex) => (
                      <div
                        className={dotVariants({ variant })}
                        key={dotIndex}
                        style={{
                          width: `${dotSize}px`,
                          height: `${dotSize}px`
                        }}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
            <div className="text-xs text-gray-600 text-center w-full border-t">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {label && (
        <div className="text-lg font-medium text-gray-700 p-2">{label}</div>
      )}
    </div>
  )
}
