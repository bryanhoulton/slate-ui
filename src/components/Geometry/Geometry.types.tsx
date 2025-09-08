import { HTMLProps } from 'react'

export type Point = {
  id: string
  x: number
  y: number
  color?: string
}

export type Edge = {
  id: string
  source: string
  target: string
  color?: string
  stroke?: 'solid' | 'dashed'
}

export type Angle = {
  id: string
  pointA: string
  pointB: string
  pointC: string
  type: 'non-reflex' | 'reflex'
  label: string
}

export type Shape = {
  points?: Point[]
  edges?: Edge[]
  angles?: Angle[]
}

export interface GeometryProps extends HTMLProps<HTMLCanvasElement> {
  shapes?: Shape[]
}
