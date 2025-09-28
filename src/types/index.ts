export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

export interface AppProps {
  user?: User | null;
  basePath?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface ActivityItem {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: string;
  icon: string;
}
