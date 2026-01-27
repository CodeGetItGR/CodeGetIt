export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

// TODO: Replace with real client testimonials
// These are placeholder testimonials - update with actual client feedback
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CTO",
    company: "Tech Solutions Inc.",
    content: "Outstanding work on our e-commerce platform. The team delivered a robust, scalable solution that exceeded our expectations. Communication was excellent throughout the project.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Product Manager",
    company: "Digital Innovations",
    content: "Professional, efficient, and highly skilled. They transformed our legacy system into a modern, responsive application. The quality of code and attention to detail was impressive.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Chen",
    role: "CEO",
    company: "StartupHub",
    content: "Working with this team was a game-changer for our business. They not only built our platform but also provided valuable insights on architecture and scalability.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Founder",
    company: "CloudConnect",
    content: "Exceptional development skills combined with clear communication. Our project was delivered on time and within budget. Highly recommend for any full-stack project.",
    rating: 5,
  },
];
