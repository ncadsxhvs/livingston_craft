export interface Color {
  id: string;
  name: string;
  hex: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colors: Color[];
  features: string[];
  priceRange: string;
  durability: string;
  waterResistance: string;
  installation: string;
  maintenance: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  room: "living" | "kitchen" | "bedroom" | "bathroom";
  productId: string;
  alt: string;
}
