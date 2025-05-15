export type Profile = {
  id: string;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type SoftwareProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  download_link?: string | null;
  created_at: string;
  updated_at: string;
};

export type ElectronicsProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  price: number;
  size: string;
  download_link?: string | null;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
