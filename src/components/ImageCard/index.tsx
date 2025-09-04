import { useState } from 'react'

import { motion } from 'framer-motion'

import { cn } from '../../utilities'
import { ImageCardProps } from './ImageCard.types'

export function ImageCard({
  className,
  image,
  title,
  description,
  side = 'left',
  onClick
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.button
      className={cn(
        'bg-black rounded-lg p-6 grow h-full min-h-[300px] flex items-end relative overflow-hidden',
        'cursor-pointer text-left w-full',
        side === 'left' ? 'justify-start text-left' : 'justify-end text-right',
        className
      )}
      key={image}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.98 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left top'
      }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        animate={{
          scale: isHovered ? 1.0 : 1.05
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90"></div>
      <div className="relative z-10">
        <p className="text-white text-3xl font-semibold">{title}</p>
        <p className="text-white/80 text-lg">{description}</p>
      </div>
    </motion.button>
  )
}
