// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

// News Types
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  publishedAt: string;
  category: string;
  slug: string;
}

// Job Types
export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  deadline: string;
  description: string;
  requirements: string[];
  salary?: string;
}

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  priority: 'normal' | 'important' | 'urgent';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Dialog Types
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export interface ConfirmDialogProps extends DialogProps {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

// Hero Section Types
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
}

// Footer Types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Social Media Types
export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}
