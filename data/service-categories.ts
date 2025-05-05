export interface ServiceCategory {
  title: string;
  description: string;
  slug: string;
  services: Service[];
}

export interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Hardscaping",
    description: "Transform your outdoor space with our expert hardscaping services. From patios to retaining walls, we create beautiful and functional hardscape features.",
    slug: "hardscaping",
    services: [
      {
        title: "Patios",
        description: "Custom-designed patios using flagstone, pavers, or stamped concrete, perfect for outdoor dining, lounging, or entertaining.",
        image: "https://images.unsplash.com/photo-1597246880829-366e61b57881?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/patios"
      },
      {
        title: "Walkways & Pathways",
        description: "Functional and decorative paths that connect outdoor areas, expertly crafted with stone, pavers, or gravel.",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/walkways"
      },
      {
        title: "Retaining Walls",
        description: "Structural and decorative walls designed to manage slopes, prevent erosion, and define outdoor spaces.",
        image: "https://images.unsplash.com/photo-1580778356641-55c0f0864ef5?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/retaining-walls"
      },
      {
        title: "Driveways",
        description: "Custom paver or concrete driveways that enhance curb appeal while providing lasting durability.",
        image: "https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/driveways"
      },
      {
        title: "Outdoor Fire Features",
        description: "Custom-built fire pits and fireplaces that create warm and inviting gathering spaces.",
        image: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd8?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/fire-features"
      },
      {
        title: "Steps & Stairs",
        description: "Stone or concrete steps expertly integrated with elevation changes and retaining walls.",
        image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/steps"
      },
      {
        title: "Built-in Seating",
        description: "Low stone or block seating walls incorporated into your landscape design for both function and style.",
        image: "https://images.unsplash.com/photo-1568738351265-c7065f5d4293?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/seating"
      },
      {
        title: "Water Features",
        description: "Custom-designed fountains, waterfalls, and ponds integrated with your hardscape elements.",
        image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=2070&auto=format&fit=crop",
        link: "/services/hardscaping/water-features"
      }
    ]
  },
  {
    title: "Landscaping",
    description: "Create a beautiful and sustainable landscape with our expert design and maintenance services.",
    slug: "landscaping",
    services: [
      {
        title: "Garden Design",
        description: "Custom garden designs that blend beauty with functionality, creating sustainable landscapes that complement your property.",
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2070&auto=format&fit=crop",
        link: "/services/landscaping/garden-design"
      },
      {
        title: "Lawn Care",
        description: "Comprehensive lawn maintenance including mowing, fertilization, aeration, and pest control.",
        image: "https://images.unsplash.com/photo-1598885511440-218a568ced46?q=80&w=2070&auto=format&fit=crop",
        link: "/services/landscaping/lawn-care"
      },
      {
        title: "Plant Installation",
        description: "Expert selection and installation of trees, shrubs, and flowers suited to your local climate.",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2070&auto=format&fit=crop",
        link: "/services/landscaping/planting"
      }
    ]
  },
  {
    title: "Irrigation & Lighting",
    description: "Keep your landscape healthy and beautiful day and night with our irrigation and lighting solutions.",
    slug: "irrigation-lighting",
    services: [
      {
        title: "Irrigation Systems",
        description: "Professional irrigation system design and installation for efficient water management.",
        image: "https://images.unsplash.com/photo-1599164917715-7bfa52511dd1?q=80&w=2070&auto=format&fit=crop",
        link: "/services/irrigation-lighting/irrigation"
      },
      {
        title: "Landscape Lighting",
        description: "Custom outdoor lighting design to enhance security and showcase your landscape's beauty.",
        image: "https://images.unsplash.com/photo-1611516818236-0ec92a0167e3?q=80&w=2070&auto=format&fit=crop",
        link: "/services/irrigation-lighting/lighting"
      },
      {
        title: "Smart Irrigation Controls",
        description: "Advanced irrigation control systems for optimal water usage and plant health.",
        image: "https://images.unsplash.com/photo-1621954037221-02c91bc4571d?q=80&w=2070&auto=format&fit=crop",
        link: "/services/irrigation-lighting/smart-controls"
      }
    ]
  },
  {
    title: "Maintenance",
    description: "Keep your outdoor space looking its best with our comprehensive maintenance services.",
    slug: "maintenance",
    services: [
      {
        title: "Regular Maintenance",
        description: "Scheduled maintenance services to keep your landscape healthy and beautiful year-round.",
        image: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2070&auto=format&fit=crop",
        link: "/services/maintenance/regular"
      },
      {
        title: "Seasonal Clean-up",
        description: "Spring and fall clean-up services to prepare your landscape for the changing seasons.",
        image: "https://images.unsplash.com/photo-1635179856995-a6b5d8501456?q=80&w=2070&auto=format&fit=crop",
        link: "/services/maintenance/seasonal"
      },
      {
        title: "Irrigation Maintenance",
        description: "Regular check-ups and maintenance of irrigation systems to ensure optimal performance.",
        image: "https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?q=80&w=2070&auto=format&fit=crop",
        link: "/services/maintenance/irrigation"
      }
    ]
  }
]; 