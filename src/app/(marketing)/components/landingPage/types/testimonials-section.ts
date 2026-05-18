export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export interface TestimonialsProps {
  testimonials?: Testimonial[];
}
