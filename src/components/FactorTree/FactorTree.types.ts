import {
  CSSProperties,
  HTMLProps
} from 'react'

import { Styleable } from '../../utilities'

export type FactorTreeNode = {
  /** The value of the node */
  value: number
  /** Whether this node is a prime factor */
  isPrime?: boolean
  /** Custom color for this node */
  color?: string
  /** Custom label for this node (defaults to value) */
  label?: string
  /** Child nodes (factors) */
  children?: FactorTreeNode[]
}

export type FactorTreeStyles = {
  root: CSSProperties
  node: CSSProperties
  primeNode: CSSProperties
  compositeNode: CSSProperties
  line: CSSProperties
  label: CSSProperties
  title: CSSProperties
}

export interface FactorTreeProps
  extends Omit<HTMLProps<HTMLDivElement>, 'data'>,
    Styleable<FactorTreeStyles> {
  /** The number to factor, or a pre-built tree structure */
  data: number | FactorTreeNode
  /** Whether to show the original number at the top */
  showTitle?: boolean
  /** Custom title text (defaults to "Factor Tree of {number}") */
  title?: string
  /** Size of the tree nodes */
  nodeSize?: 'sm' | 'md' | 'lg'
  /** Color for prime factor nodes */
  primeColor?: string
  /** Color for composite nodes */
  compositeColor?: string
  /** Color for connecting lines */
  lineColor?: string
  /** Spacing between levels of the tree */
  levelSpacing?: number
  /** Spacing between sibling nodes */
  nodeSpacing?: number
  /** Whether to automatically calculate factors */
  autoFactor?: boolean
}
