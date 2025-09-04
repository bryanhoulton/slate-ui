import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities'
import { ImageCard } from './'

const meta: Meta<typeof ImageCard> = {
  component: ImageCard,
  title: 'Display/ImageCard',
  argTypes: args({
    side: {
      control: {
        type: 'select'
      },
      options: ['left', 'right']
    },
    onClick: {
      action: 'clicked'
    }
  })
}

export default meta
type Story = StoryObj<typeof ImageCard>

// Sample images for stories
const SAMPLE_IMAGES = {
  landscape:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
  nature:
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  ocean:
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
  mountain:
    'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=800&h=600&fit=crop',
  forest:
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=800&h=600&fit=crop'
}

export const Default: Story = {
  args: {
    image: SAMPLE_IMAGES.landscape,
    title: 'Beautiful Landscape',
    description:
      'Explore the stunning natural beauty of mountain ranges and valleys.'
  }
}

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Left Side (Default)</h3>
        <ImageCard
          image={SAMPLE_IMAGES.city}
          title="Urban Explorer"
          description="Discover the vibrant life of modern cities"
          side="left"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Right Side</h3>
        <ImageCard
          image={SAMPLE_IMAGES.nature}
          title="Nature's Wonder"
          description="Experience the tranquility of untouched wilderness"
          side="right"
        />
      </div>
    </div>
  )
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ImageCard
        image={SAMPLE_IMAGES.landscape}
        title="Mountain Views"
        description="Breathtaking peaks and valleys"
        onClick={() => console.log('Mountain clicked')}
      />
      <ImageCard
        image={SAMPLE_IMAGES.city}
        title="City Life"
        description="Urban adventures await"
        side="right"
        onClick={() => console.log('City clicked')}
      />
      <ImageCard
        image={SAMPLE_IMAGES.ocean}
        title="Ocean Breeze"
        description="Endless blue horizons"
        onClick={() => console.log('Ocean clicked')}
      />
      <ImageCard
        image={SAMPLE_IMAGES.mountain}
        title="Alpine Adventure"
        description="Conquer new heights"
        side="right"
        onClick={() => console.log('Alpine clicked')}
      />
      <ImageCard
        image={SAMPLE_IMAGES.forest}
        title="Forest Path"
        description="Walk among ancient trees"
        onClick={() => console.log('Forest clicked')}
      />
      <ImageCard
        image={SAMPLE_IMAGES.nature}
        title="Wild Beauty"
        description="Nature in its purest form"
        side="right"
        onClick={() => console.log('Wild clicked')}
      />
    </div>
  )
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Small Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ImageCard
            image={SAMPLE_IMAGES.landscape}
            title="Small Card"
            description="Compact view"
            className="min-h-[200px]"
          />
          <ImageCard
            image={SAMPLE_IMAGES.city}
            title="Another Small"
            description="Side by side"
            side="right"
            className="min-h-[200px]"
          />
          <ImageCard
            image={SAMPLE_IMAGES.ocean}
            title="Ocean View"
            description="Blue waters"
            className="min-h-[200px]"
          />
          <ImageCard
            image={SAMPLE_IMAGES.mountain}
            title="Peak Views"
            description="High altitude"
            side="right"
            className="min-h-[200px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Large Cards</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImageCard
            image={SAMPLE_IMAGES.forest}
            title="Large Forest View"
            description="Immerse yourself in the deep, ancient forest where towering trees create a natural cathedral"
            className="min-h-[400px]"
          />
          <ImageCard
            image={SAMPLE_IMAGES.nature}
            title="Wilderness Adventure"
            description="Embark on an unforgettable journey through pristine wilderness areas"
            side="right"
            className="min-h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}

export const LongTitles: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ImageCard
        image={SAMPLE_IMAGES.landscape}
        title="This is a Very Long Title That Spans Multiple Lines"
        description="Sometimes titles can be quite lengthy and need to wrap gracefully within the card layout"
      />
      <ImageCard
        image={SAMPLE_IMAGES.city}
        title="Urban Development and Modern Architecture"
        description="Exploring the intersection of contemporary design and sustainable city planning in the 21st century"
        side="right"
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Clickable Cards</h3>
        <p className="text-sm text-gray-600">
          These cards have onClick handlers and will log to console when
          clicked. Notice the hover and tap animations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageCard
            image={SAMPLE_IMAGES.landscape}
            title="Learn More"
            description="Click to discover more about this topic"
            onClick={() => {
              console.log('Landscape card clicked!')
              alert('Landscape card clicked!')
            }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.city}
            title="Explore City"
            description="Urban adventures await your click"
            side="right"
            onClick={() => {
              console.log('City card clicked!')
              alert('City card clicked!')
            }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.ocean}
            title="Dive Deeper"
            description="Click to explore ocean depths"
            onClick={() => {
              console.log('Ocean card clicked!')
              alert('Ocean card clicked!')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            image={SAMPLE_IMAGES.mountain}
            title="Custom Border Radius"
            description="This card has custom rounded corners"
            className="rounded-3xl"
          />
          <ImageCard
            image={SAMPLE_IMAGES.forest}
            title="Custom Height"
            description="This card has a custom minimum height"
            side="right"
            className="min-h-[500px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Custom Styles Prop</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            image={SAMPLE_IMAGES.nature}
            title="Custom Text Color"
            description="This card has custom text styling"
            styles={{
              title: { color: '#fbbf24' },
              description: { color: '#fde047' }
            }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.ocean}
            title="Custom Background"
            description="This card has a custom overlay"
            side="right"
            styles={{
              root: { border: '2px solid #3b82f6' }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export const ContentVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Short Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageCard
            image={SAMPLE_IMAGES.landscape}
            title="Quick"
            description="Short and sweet"
          />
          <ImageCard
            image={SAMPLE_IMAGES.city}
            title="Fast"
            description="Brief description"
            side="right"
          />
          <ImageCard
            image={SAMPLE_IMAGES.ocean}
            title="Simple"
            description="Easy to read"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Detailed Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            image={SAMPLE_IMAGES.mountain}
            title="Comprehensive Mountain Exploration Guide"
            description="Discover the most breathtaking mountain ranges around the world, complete with hiking trails, scenic viewpoints, and expert photography tips for capturing the perfect landscape shot."
            className="min-h-[350px]"
          />
          <ImageCard
            image={SAMPLE_IMAGES.forest}
            title="Ancient Forest Conservation Project"
            description="Join our mission to preserve old-growth forests and protect biodiversity. Learn about sustainable forestry practices and how you can contribute to conservation efforts in your local area."
            side="right"
            className="min-h-[350px]"
          />
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Explore Our Destinations</h2>
        <p className="text-gray-600">Click on any card to start your journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImageCard
          image={SAMPLE_IMAGES.landscape}
          title="Mountain Adventures"
          description="Scale new heights and discover breathtaking vistas that will leave you speechless"
          onClick={() => console.log('Mountain adventure selected')}
          className="min-h-[400px]"
        />
        <ImageCard
          image={SAMPLE_IMAGES.city}
          title="Urban Exploration"
          description="Immerse yourself in the vibrant culture and architecture of world-class cities"
          side="right"
          onClick={() => console.log('Urban exploration selected')}
          className="min-h-[400px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImageCard
          image={SAMPLE_IMAGES.ocean}
          title="Ocean Escapes"
          description="Dive into crystal-clear waters and explore marine wonders"
          onClick={() => console.log('Ocean escape selected')}
        />
        <ImageCard
          image={SAMPLE_IMAGES.forest}
          title="Forest Retreats"
          description="Find peace among ancient trees and wildlife"
          side="right"
          onClick={() => console.log('Forest retreat selected')}
        />
        <ImageCard
          image={SAMPLE_IMAGES.nature}
          title="Wild Safaris"
          description="Witness nature's most magnificent creatures in their habitat"
          onClick={() => console.log('Wild safari selected')}
        />
      </div>
    </div>
  )
}
