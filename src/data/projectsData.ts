export interface DemoLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Gym' | 'Resort' | 'E-commerce' | 'AB Travels' | 'Personal Branding' | 'Portfolio';
  tagline: string;
  description: string;
  fullDetails: string;
  client: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  image: string;
  liveUrl?: string;
  demoLinks?: DemoLink[];
  featured?: boolean;
  allowIframe?: boolean;
}

export const PROJECT_CATEGORIES = [
  'All Projects',
  'Gym',
  'Resort',
  'E-commerce',
  'AB Travels',
  'Personal Branding',
  'Portfolio',
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'apex-gym',
    title: 'Apex Fitness & Performance Gym',
    category: 'Gym',
    tagline: 'High-Energy Interactive Gym Platform',
    description: 'A high-impact website for a modern fitness center featuring interactive workout schedule matrices, real-time trainer booking, and membership checkout.',
    fullDetails: 'Engineered for high conversion and client engagement. Features custom dark glass UI, dynamic class filtering, instant mobile membership registration, and 99+ Lighthouse performance scores.',
    client: 'Apex Fitness LLC',
    metrics: [
      { label: 'Conversion Boost', value: '+142%' },
      { label: 'Page Speed', value: '99/100' },
      { label: 'Mobile Bookings', value: '3.4k/mo' },
    ],
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Stripe API'],
    image: '/images/gym_live_screenshot.png',
    liveUrl: 'https://apex-fitness-gym-demo-eight.vercel.app/',
    allowIframe: true,
    featured: true,
  },
  {
    id: 'lumina-resort',
    title: 'Lumina Fine Dining & Resort',
    category: 'Resort',
    tagline: 'Luxury Resort & Culinary Experience',
    description: 'Luxury resort website with dark glassmorphic menu display, interactive chef recommendations, and instant online table reservation.',
    fullDetails: 'Designed to match the high-end ambiance of Lumina Resort. Implemented an interactive food menu with filtering by dietary preferences, live table availability calendars, and OpenTable integration.',
    client: 'Lumina Hospitality Group',
    metrics: [
      { label: 'Table Reservations', value: '+85%' },
      { label: 'Avg Session Time', value: '3m 45s' },
      { label: 'Direct Bookings', value: '₹45k/mo' },
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Lucide', 'GraphQL'],
    image: '/images/resort_live_screenshot.png',
    liveUrl: 'https://resort-demo-1.vercel.app/',
    allowIframe: true,
    featured: true,
  },
  {
    id: 'jewellery-ecommerce',
    title: 'Jewellery E-Commerce Store',
    category: 'E-commerce',
    tagline: 'Luxury Jewellery & Tech Shopping Platform',
    description: 'Custom e-commerce experience with interactive product previews, instant cart drawer physics, and seamless dark UI shopping flow.',
    fullDetails: 'Built a high-performance custom headless e-commerce store with smooth micro-interactions, dark glass cart slideouts, and fast checkout conversion funnel.',
    client: 'Jewellery Store Inc',
    metrics: [
      { label: 'Sales Increase', value: '+165%' },
      { label: 'Cart Abandonment', value: '-32%' },
      { label: 'Monthly Visitors', value: '85k+' },
    ],
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Lucide'],
    image: '/images/jewellery_live_screenshot.png',
    liveUrl: 'https://jewellery-a781qbsir-tarzanvicky55-2282s-projects.vercel.app/',
    allowIframe: false,
    featured: true,
  },
  {
    id: 'ab-travels',
    title: 'AB Travels Agency',
    category: 'AB Travels',
    tagline: 'Interactive Travel & Flight Booking Platform',
    description: 'Sleek travel platform featuring destination showcases, instant flight booking inquiries, and interactive itinerary planning.',
    fullDetails: 'Full digital transformation for AB Travels. Built with dynamic dark canvas graphics, interactive flight calculators, and travel lead integration.',
    client: 'AB Travels Corp',
    metrics: [
      { label: 'Lead Capture Rate', value: '+210%' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'Flight Demos', value: '180+/mo' },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite'],
    image: '/images/travels_live_screenshot.png',
    liveUrl: 'https://tq-fly-travels-vvy.vercel.app/',
    allowIframe: true,
    featured: true,
  },
  {
    id: 'personal-branding',
    title: 'Elena Vance — Executive Coach',
    category: 'Personal Branding',
    tagline: 'High-Impact Personal Brand & Keynote Speaker',
    description: 'Elegant personal branding platform for an executive leadership strategist featuring video highlights, newsletter funnel, and booking portal.',
    fullDetails: 'Tailored personal brand website designed to establish executive credibility. Built with dark cinematic aesthetic, media press kit download, and calendar scheduling API.',
    client: 'Vance Executive Consulting',
    metrics: [
      { label: 'Speaking Inquiries', value: '+190%' },
      { label: 'Newsletter Growth', value: '12k sub' },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Formspree'],
    image: '/images/business_website.png',
    liveUrl: 'https://tq-fly-travels-vvy.vercel.app/',
    allowIframe: true,
    featured: true,
  },
  {
    id: 'portfolio-showcase',
    title: 'Kuro Creative Agency Portfolio',
    category: 'Portfolio',
    tagline: 'Interactive Design & Visual FX Showcase',
    description: 'Immersive portfolio platform displaying award-winning visual effects, 3D motion case studies, and interactive client showcases.',
    fullDetails: 'A visual masterpiece for an international creative agency featuring smooth scroll inertia, dynamic canvas video grid, and case study breakdowns.',
    client: 'Kuro Motion Lab',
    metrics: [
      { label: 'Awwwards Feature', value: 'Site of Day' },
      { label: 'Page Views', value: '250k' },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas API'],
    image: '/images/portfolio_live_screenshot.png',
    liveUrl: 'https://portfolio-final-rosy-xi.vercel.app/',
    allowIframe: true,
    demoLinks: [
      { label: 'View Demo 1', url: 'https://portfolio-final-rosy-xi.vercel.app/' },
      { label: 'View Demo 2', url: 'https://portfoliomain-liart-delta.vercel.app/' },
    ],
    featured: true,
  },
];
