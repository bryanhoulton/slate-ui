import {
  useEffect,
  useMemo,
  useRef
} from 'react'

import {
  GeometryProps,
  Shape
} from './Geometry.types'

const SCALE_FACTOR = 100
const TAU = Math.PI * 2

// Normalize angle to (-π, π]
const norm = (a: number) => {
  let t = a % TAU
  if (t >= Math.PI) t -= TAU
  if (t < -Math.PI) t += TAU
  return t
}

// Calculate shortest angular difference between two angles
const shortestDelta = (a: number, b: number) => norm(b - a)

type Viewbox = {
  x: {
    min: number
    max: number
    pad: number
    offset: number
  }
  y: {
    min: number
    max: number
    pad: number
    offset: number
  }
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  viewbox: Viewbox
) {
  const viewboxScale = viewbox.x.max - viewbox.x.min
  const pointRadius = Math.max(viewboxScale / 75, 20)
  const edgeWidth = Math.max(viewboxScale / 200, 5)
  const dashSpacing = Math.max(viewboxScale / 100, 10)
  const fontSize = Math.max(viewboxScale / 20, 14)

  for (const edge of shape.edges || []) {
    const source = shape.points?.find((point) => point.id === edge.source)
    const target = shape.points?.find((point) => point.id === edge.target)
    if (!source || !target) continue
    ctx.beginPath()
    ctx.lineWidth = edgeWidth
    ctx.strokeStyle = edge.color || 'black'
    ctx.setLineDash(edge.stroke === 'dashed' ? [dashSpacing, dashSpacing] : [])
    ctx.moveTo(source.x, source.y)
    ctx.lineTo(target.x, target.y)
    ctx.stroke()
  }

  for (const point of shape.points || []) {
    ctx.beginPath()
    ctx.fillStyle = point.color || 'black'
    ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI)
    ctx.fill()
  }

  for (const angle of shape.angles || []) {
    const pointA = shape.points?.find((point) => point.id === angle.pointA)
    const pointB = shape.points?.find((point) => point.id === angle.pointB)
    const pointC = shape.points?.find((point) => point.id === angle.pointC)
    if (!pointA || !pointB || !pointC) continue

    // Calculate vectors from vertex B to points A and C
    const u = { x: pointA.x - pointB.x, y: pointA.y - pointB.y } // B->A
    const v = { x: pointC.x - pointB.x, y: pointC.y - pointB.y } // B->C

    // Calculate angles
    const angU = Math.atan2(u.y, u.x)
    const angV = Math.atan2(v.y, v.x)

    // Calculate angular difference based on angle type
    let delta: number
    if (angle.type === 'reflex') {
      // For reflex angles, draw the longer arc
      const shortDelta = shortestDelta(angU, angV)
      delta = shortDelta > 0 ? shortDelta - TAU : shortDelta + TAU
    } else {
      // For non-reflex angles, draw the shorter arc (default behavior)
      delta = shortestDelta(angU, angV)
    }

    // Determine arc parameters
    const start = angU
    const end = angU + delta // may be < start
    const anticlockwise = delta < 0 // go the appropriate way

    // Draw the angle arc
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = edgeWidth
    ctx.arc(pointB.x, pointB.y, pointRadius * 4, start, end, anticlockwise)
    ctx.stroke()

    // Draw angle label if provided
    if (angle.label) {
      drawAngleLabel(
        ctx,
        pointB,
        angU,
        angV,
        angle.label,
        pointRadius,
        fontSize
      )
    }
  }
}

function drawAngleLabel(
  ctx: CanvasRenderingContext2D,
  vertex: { x: number; y: number },
  angleA: number,
  angleC: number,
  label: string,
  pointRadius: number,
  fontSize: number
) {
  // Calculate the shortest angular difference and bisector using the same logic as arc drawing
  const delta = shortestDelta(angleA, angleC)
  const bisectorAngle = angleA + delta / 2

  // Calculate the minor angle size for label positioning
  const minorAngle = Math.abs(delta)

  // Determine label distance based on angle size
  const isNonReflex = minorAngle < Math.PI / 2
  const isVeryNonReflex = minorAngle < Math.PI / 6 // 30 degrees

  let labelDistance: number
  if (isVeryNonReflex) {
    labelDistance = pointRadius * 12 // Far out for very non-reflex angles
  } else if (isNonReflex) {
    labelDistance = pointRadius * 8 // Medium distance for non-reflex angles
  } else {
    labelDistance = pointRadius * 6 // Closer for reflex angles
  }

  // Calculate label position
  const labelX = vertex.x + Math.cos(bisectorAngle) * labelDistance
  const labelY = vertex.y + Math.sin(bisectorAngle) * labelDistance

  // Set text styling
  ctx.save()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = '#374151' // Gray-700

  // Smart text alignment based on label position relative to vertex
  const dx = labelX - vertex.x
  const dy = labelY - vertex.y

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal positioning is dominant
    ctx.textAlign = dx > 0 ? 'left' : 'right'
    ctx.textBaseline = 'middle'
  } else {
    // Vertical positioning is dominant
    ctx.textAlign = 'center'
    ctx.textBaseline = dy > 0 ? 'top' : 'bottom'
  }

  // For very non-reflex angles, add a small background for better readability
  if (isVeryNonReflex) {
    const textMetrics = ctx.measureText(label)
    const padding = 4
    const bgWidth = textMetrics.width + padding * 2
    const bgHeight = 20

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(labelX - bgWidth / 2, labelY - bgHeight / 2, bgWidth, bgHeight)

    ctx.fillStyle = '#374151'
  }

  // Draw the label
  ctx.fillText(label, labelX, labelY)
  ctx.restore()
}

function scaleShapes(shapes: Shape[]) {
  return shapes.map((shape) => ({
    ...shape,
    points: shape.points?.map((point) => ({
      ...point,
      x: point.x * SCALE_FACTOR,
      y: point.y * SCALE_FACTOR
    }))
  }))
}

function getViewbox(shapes: Shape[], padPercent = 0.25): Viewbox {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const shape of shapes) {
    for (const point of shape.points || []) {
      minX = Math.min(minX, point.x)
      minY = Math.min(minY, point.y)
      maxX = Math.max(maxX, point.x)
      maxY = Math.max(maxY, point.y)
    }
  }

  const xDiff = maxX - minX
  const yDiff = maxY - minY
  const xPad = xDiff * padPercent
  const yPad = yDiff * padPercent

  return {
    x: {
      min: minX - xPad,
      max: maxX + xPad,
      pad: xPad,
      offset: -minX
    },
    y: {
      min: minY - yPad,
      max: maxY + yPad,
      pad: yPad,
      offset: -minY
    }
  }
}

export function Shapes({ shapes, ...props }: GeometryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scaledShapes = useMemo(() => scaleShapes(shapes || []), [shapes])
  const viewbox = useMemo(() => getViewbox(scaledShapes), [scaledShapes])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Error if viewbox has inf
      if (
        viewbox.x.min === Infinity ||
        viewbox.y.min === Infinity ||
        viewbox.x.max === -Infinity ||
        viewbox.y.max === -Infinity
      ) {
        throw new Error('Viewbox has infinity values')
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(
        1,
        0,
        0,
        1,
        viewbox.x.pad + viewbox.x.offset,
        viewbox.y.pad + viewbox.y.offset
      )

      scaledShapes.forEach((shape) => drawShape(ctx, shape, viewbox))
    }
  }, [shapes])

  return (
    <canvas
      className="w-full max-w-md border rounded-lg"
      width={viewbox.x.max - viewbox.x.min}
      height={viewbox.y.max - viewbox.y.min}
      {...props}
      ref={canvasRef}
    />
  )
}
