export interface HardscapingServiceContent {
  title: string;
  description: string;
  heroImage: string;
  benefits: string[];
  features: {
    title: string;
    description: string;
  }[];
}

export const hardscapingServicesContent: Record<string, HardscapingServiceContent> = {
  'patio-installation': {
    title: 'Patio Installation',
    description: 'Transform your outdoor space with our custom patio designs. We create beautiful, durable patios that perfectly match your home\'s style and your lifestyle needs.',
    heroImage: '/images/hardscaping/patio-main.svg',
    benefits: [
      'Custom Design Options',
      'Premium Materials',
      'Expert Installation',
      'Long-lasting Durability',
      'Enhanced Home Value',
      'Low Maintenance'
    ],
    features: [
      {
        title: 'Custom Patio Design',
        description: 'Work with our designers to create the perfect patio layout that matches your vision and complements your home.'
      },
      {
        title: 'Material Selection',
        description: 'Choose from a wide range of premium materials including natural stone, pavers, concrete, and more.'
      },
      {
        title: 'Built-in Features',
        description: 'Add built-in seating, planters, fire pits, or outdoor kitchens to enhance your patio space.'
      },
      {
        title: 'Drainage Solutions',
        description: 'Proper drainage systems ensure your patio remains stable and functional for years to come.'
      }
    ]
  },
  'walkways-pathways': {
    title: 'Walkways & Pathways',
    description: 'Create beautiful and functional pathways that enhance your landscape\'s flow and accessibility while adding charm to your outdoor space.',
    heroImage: '/images/hardscaping/walkway-main.svg',
    benefits: [
      'Enhanced Curb Appeal',
      'Improved Accessibility',
      'Custom Designs',
      'Quality Materials',
      'Professional Installation',
      'Safe Navigation'
    ],
    features: [
      {
        title: 'Custom Path Design',
        description: 'Design paths that naturally guide movement through your landscape while complementing your garden.'
      },
      {
        title: 'Material Options',
        description: 'Choose from natural stone, brick, concrete pavers, or gravel to create the perfect look.'
      },
      {
        title: 'Lighting Integration',
        description: 'Add pathway lighting for safety and ambiance during evening hours.'
      },
      {
        title: 'Border Options',
        description: 'Enhance your pathways with decorative borders and edging for a polished look.'
      }
    ]
  },
  'retaining-walls': {
    title: 'Retaining Walls',
    description: 'Expert retaining wall construction that combines structural integrity with aesthetic appeal, perfect for managing slopes and creating usable outdoor spaces.',
    heroImage: '/images/hardscaping/retaining-wall-main.svg',
    benefits: [
      'Erosion Control',
      'Space Maximization',
      'Structural Stability',
      'Aesthetic Appeal',
      'Property Value',
      'Low Maintenance'
    ],
    features: [
      {
        title: 'Engineering & Design',
        description: 'Professional design and engineering ensure your retaining wall is both beautiful and structurally sound.'
      },
      {
        title: 'Material Selection',
        description: 'Choose from natural stone, concrete blocks, or timber to match your landscape style.'
      },
      {
        title: 'Drainage Systems',
        description: 'Built-in drainage solutions prevent water damage and ensure wall longevity.'
      },
      {
        title: 'Decorative Options',
        description: 'Add built-in lighting, caps, or vegetation for enhanced visual appeal.'
      }
    ]
  },
  'driveway-paving': {
    title: 'Driveway Installation',
    description: 'Create a lasting first impression with our custom driveway solutions. We combine durability with design for driveways that enhance your property\'s value and appeal.',
    heroImage: '/images/hardscaping/driveway-main.svg',
    benefits: [
      'Curb Appeal',
      'Durability',
      'Low Maintenance',
      'Custom Design',
      'Quality Materials',
      'Expert Installation'
    ],
    features: [
      {
        title: 'Material Options',
        description: 'Choose from concrete, pavers, asphalt, or decorative stone for your perfect driveway.'
      },
      {
        title: 'Custom Design',
        description: 'Create unique patterns and borders that complement your home\'s architecture.'
      },
      {
        title: 'Drainage Solutions',
        description: 'Proper grading and drainage systems prevent water pooling and damage.'
      },
      {
        title: 'Base Preparation',
        description: 'Thorough base preparation ensures long-lasting stability and performance.'
      }
    ]
  },
  'fire-features': {
    title: 'Outdoor Fire Features',
    description: 'Add warmth and ambiance to your outdoor space with custom fire pits and fireplaces. Create a cozy gathering spot for year-round enjoyment.',
    heroImage: '/images/hardscaping/fire-feature-main.svg',
    benefits: [
      'Year-round Enjoyment',
      'Custom Design',
      'Safety Features',
      'Added Value',
      'Entertainment Space',
      'Professional Installation'
    ],
    features: [
      {
        title: 'Fire Pit Design',
        description: 'Custom-designed fire pits in various styles, sizes, and fuel options.'
      },
      {
        title: 'Outdoor Fireplaces',
        description: 'Beautiful outdoor fireplaces that serve as stunning focal points.'
      },
      {
        title: 'Built-in Seating',
        description: 'Incorporate comfortable seating areas around your fire feature.'
      },
      {
        title: 'Safety Features',
        description: 'Professional installation with all necessary safety measures and permits.'
      }
    ]
  },
  'steps': {
    title: 'Steps & Stairs',
    description: 'Create safe and beautiful outdoor steps that seamlessly connect different levels of your landscape while adding architectural interest.',
    heroImage: '/images/hardscaping/steps-main.svg',
    benefits: [
      'Safe Access',
      'Custom Design',
      'Durability',
      'Added Value',
      'Low Maintenance',
      'Professional Installation'
    ],
    features: [
      {
        title: 'Custom Design',
        description: 'Steps designed to complement your home\'s architecture and landscape.'
      },
      {
        title: 'Material Options',
        description: 'Choose from natural stone, concrete, or pavers for the perfect look.'
      },
      {
        title: 'Safety Features',
        description: 'Built-in lighting and proper dimensions for safe navigation.'
      },
      {
        title: 'Railing Options',
        description: 'Add decorative railings for both safety and style.'
      }
    ]
  },
  'seating': {
    title: 'Built-in Seating',
    description: 'Maximize your outdoor living space with custom built-in seating solutions that combine comfort with style.',
    heroImage: '/images/hardscaping/seating-main.svg',
    benefits: [
      'Space Efficiency',
      'Custom Design',
      'Durability',
      'Added Value',
      'Low Maintenance',
      'Aesthetic Appeal'
    ],
    features: [
      {
        title: 'Custom Designs',
        description: 'Seating designed to fit your space and complement your landscape.'
      },
      {
        title: 'Material Options',
        description: 'Choose from stone, concrete, or wood materials for your perfect look.'
      },
      {
        title: 'Storage Solutions',
        description: 'Optional built-in storage space for outdoor essentials.'
      },
      {
        title: 'Comfort Features',
        description: 'Ergonomic design with options for cushions and weather protection.'
      }
    ]
  },
  'water-features': {
    title: 'Water Features',
    description: 'Add the soothing sound and visual appeal of water to your landscape with our custom water feature designs.',
    heroImage: '/images/hardscaping/water-feature-main.svg',
    benefits: [
      'Tranquil Atmosphere',
      'Custom Design',
      'Low Maintenance',
      'Added Value',
      'Wildlife Attraction',
      'Professional Installation'
    ],
    features: [
      {
        title: 'Fountain Design',
        description: 'Custom fountains in various styles and sizes to match your landscape.'
      },
      {
        title: 'Pond Installation',
        description: 'Natural-looking ponds with optional fish habitats and plantings.'
      },
      {
        title: 'Waterfall Creation',
        description: 'Beautiful waterfalls that create visual and auditory interest.'
      },
      {
        title: 'Maintenance Systems',
        description: 'Easy-maintenance filtration and circulation systems.'
      }
    ]
  }
}; 