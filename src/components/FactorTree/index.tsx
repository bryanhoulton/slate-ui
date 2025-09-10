import {
  JSX,
  useMemo
} from 'react'

import { cn } from '../../utilities'
import {
  FactorTreeNode,
  FactorTreeProps
} from './FactorTree.types'

const DEFAULT_PRIME_COLOR = '#22c55e' // green-500
const DEFAULT_COMPOSITE_COLOR = '#3b82f6' // blue-500
const DEFAULT_LINE_COLOR = '#6b7280' // gray-500

// Helper function to check if a number is prime
function isPrime(num: number): boolean {
  if (num < 2) return false
  if (num === 2) return true
  if (num % 2 === 0) return false

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false
  }
  return true
}

// Helper function to find the smallest factor of a number
function findSmallestFactor(num: number): number {
  if (num < 2) return num
  if (num % 2 === 0) return 2

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return i
  }
  return num
}

// Helper function to automatically generate a factor tree
function generateFactorTree(num: number): FactorTreeNode {
  if (isPrime(num) || num < 2) {
    return {
      value: num,
      isPrime: true,
      children: []
    }
  }

  const smallestFactor = findSmallestFactor(num)
  const otherFactor = num / smallestFactor

  return {
    value: num,
    isPrime: false,
    children: [
      generateFactorTree(smallestFactor),
      generateFactorTree(otherFactor)
    ]
  }
}

// Helper function to calculate tree dimensions
function calculateTreeDimensions(node: FactorTreeNode): {
  width: number
  height: number
} {
  if (!node.children || node.children.length === 0) {
    return { width: 1, height: 1 }
  }

  const childDimensions = node.children.map(calculateTreeDimensions)
  const totalWidth = childDimensions.reduce((sum, dim) => sum + dim.width, 0)
  const maxHeight = Math.max(...childDimensions.map((dim) => dim.height))

  return {
    width: Math.max(1, totalWidth),
    height: maxHeight + 1
  }
}

export function FactorTree({
  data,
  showTitle = true,
  title,
  nodeSize = 'md',
  primeColor = DEFAULT_PRIME_COLOR,
  compositeColor = DEFAULT_COMPOSITE_COLOR,
  lineColor = DEFAULT_LINE_COLOR,
  levelSpacing = 80,
  nodeSpacing = 60,
  autoFactor = true,
  className,
  styles,
  ...props
}: FactorTreeProps) {
  // Convert input data to tree structure
  const treeData = useMemo((): FactorTreeNode => {
    if (typeof data === 'number') {
      return autoFactor
        ? generateFactorTree(data)
        : {
            value: data,
            isPrime: isPrime(data),
            children: []
          }
    }
    return data
  }, [data, autoFactor])

  // Calculate tree dimensions for positioning
  const dimensions = useMemo(
    () => calculateTreeDimensions(treeData),
    [treeData]
  )

  // Get the original number for title
  const originalNumber = typeof data === 'number' ? data : treeData.value
  const displayTitle = title || `Factor Tree of ${originalNumber}`

  // Collect all lines and nodes separately to control rendering order
  const collectTreeElements = (
    node: FactorTreeNode,
    x: number,
    y: number,
    parentX?: number,
    parentY?: number
  ): { lines: JSX.Element[]; nodes: JSX.Element[] } => {
    const lines: JSX.Element[] = []
    const nodes: JSX.Element[] = []
    const nodeKey = `node-${x}-${y}-${node.value}`

    // Determine node color
    const nodeColor = node.color || (node.isPrime ? primeColor : compositeColor)

    // Collect connecting line to parent
    if (parentX !== undefined && parentY !== undefined) {
      const lineKey = `line-${parentX}-${parentY}-${x}-${y}`
      lines.push(
        <line
          key={lineKey}
          x1={parentX}
          y1={parentY}
          x2={x}
          y2={y}
          stroke={lineColor}
          strokeWidth={2}
          style={styles?.line}
        />
      )
    }

    // Collect the node
    nodes.push(
      <g key={nodeKey} transform={`translate(${x}, ${y})`}>
        <circle
          r={nodeSize === 'sm' ? 16 : nodeSize === 'lg' ? 24 : 20}
          fill={nodeColor}
          stroke="white"
          strokeWidth={2}
          style={{
            ...styles?.node,
            ...(node.isPrime ? styles?.primeNode : styles?.compositeNode)
          }}
        />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontWeight="600"
          fontSize={nodeSize === 'sm' ? 12 : nodeSize === 'lg' ? 16 : 14}
          style={styles?.label}
        >
          {node.label || node.value}
        </text>
      </g>
    )

    // Collect child elements
    if (node.children && node.children.length > 0) {
      const childY = y + levelSpacing
      const totalChildWidth = (node.children.length - 1) * nodeSpacing
      const startX = x - totalChildWidth / 2

      node.children.forEach((child, index) => {
        const childX = startX + index * nodeSpacing
        const childElements = collectTreeElements(child, childX, childY, x, y)
        lines.push(...childElements.lines)
        nodes.push(...childElements.nodes)
      })
    }

    return { lines, nodes }
  }

  // Calculate SVG dimensions
  const svgWidth = Math.max(400, dimensions.width * nodeSpacing + 100)
  const svgHeight = Math.max(200, dimensions.height * levelSpacing + 100)

  // Starting position (center top)
  const startX = svgWidth / 2
  const startY = 50

  // Collect all tree elements with proper rendering order
  const treeElements = collectTreeElements(treeData, startX, startY)

  return (
    <div
      className={cn('flex flex-col items-center space-y-4', className)}
      style={styles?.root}
      {...props}
    >
      {showTitle && (
        <h3
          className="text-lg font-semibold text-gray-800"
          style={styles?.title}
        >
          {displayTitle}
        </h3>
      )}

      <div className="w-full overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="mx-auto"
        >
          {/* Render lines first (behind nodes) */}
          {treeElements.lines}
          {/* Render nodes second (on top of lines) */}
          {treeElements.nodes}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: primeColor }}
          />
          <span>Prime Factors</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: compositeColor }}
          />
          <span>Composite Numbers</span>
        </div>
      </div>
    </div>
  )
}
