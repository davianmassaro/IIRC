export interface EventSpeaker {
  name: string;
  title: string;
  company?: string;
  bio?: string;
  photo?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  category: string;
  type: string;
  status: string;
  thumbnail?: string;
  startDate: string;
  endDate: string;
  venue?: string;
  venueAddress?: string;
  isOnline?: boolean;
  quota: number;
  registeredCount?: number;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdUntil?: string;
  tags: string[];
  speakers?: EventSpeaker[];
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string;
  eventTitle?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  eventTitle?: string;
  description?: string;
  embedUrl: string;
  thumbnail?: string;
}
