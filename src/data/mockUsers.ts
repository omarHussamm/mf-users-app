import type { User, Role, ActivityItem } from '../types/index.js';

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-25T14:30:00Z",
    createdAt: "2023-06-15T09:00:00Z",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  {
    id: "2",
    name: "Sarah Johnson", 
    email: "sarah.johnson@company.com",
    role: "user",
    status: "active",
    lastLogin: "2024-01-24T16:45:00Z",
    createdAt: "2023-08-22T10:30:00Z",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332a7dd"
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@company.com", 
    role: "user",
    status: "active",
    lastLogin: "2024-01-25T08:15:00Z",
    createdAt: "2023-09-10T14:20:00Z",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@company.com",
    role: "viewer",
    status: "inactive", 
    lastLogin: "2024-01-20T11:30:00Z",
    createdAt: "2023-11-05T13:45:00Z",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    id: "5", 
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-25T12:00:00Z", 
    createdAt: "2023-05-30T16:15:00Z",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: "6",
    name: "Lisa Anderson", 
    email: "lisa.anderson@company.com",
    role: "user",
    status: "active",
    lastLogin: "2024-01-23T09:45:00Z",
    createdAt: "2023-10-12T11:00:00Z",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    role: "viewer",
    status: "active",
    lastLogin: "2024-01-24T15:20:00Z",
    createdAt: "2023-12-01T10:00:00Z"
  },
  {
    id: "8",
    name: "Jennifer Lee",
    email: "jennifer.lee@company.com",
    role: "user",
    status: "inactive",
    lastLogin: "2024-01-10T14:30:00Z",
    createdAt: "2023-07-15T12:30:00Z"
  }
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: [
      "users.create",
      "users.read", 
      "users.update",
      "users.delete",
      "products.create",
      "products.read",
      "products.update", 
      "products.delete",
      "orders.create",
      "orders.read",
      "orders.update",
      "orders.delete",
      "analytics.read"
    ],
    userCount: 2
  },
  {
    id: "2", 
    name: "User",
    description: "Standard user with limited permissions",
    permissions: [
      "products.read",
      "orders.read",
      "orders.create",
      "profile.update"
    ],
    userCount: 4
  },
  {
    id: "3",
    name: "Viewer",
    description: "Read-only access to basic information", 
    permissions: [
      "products.read",
      "orders.read",
      "profile.read"
    ],
    userCount: 2
  }
];

export const mockActivity: ActivityItem[] = [
  {
    id: "1",
    userId: "1",
    action: "login",
    description: "John Smith logged in to the system",
    timestamp: "2024-01-25T14:30:00Z",
    icon: "🔐"
  },
  {
    id: "2",
    userId: "2",
    action: "profile_update",
    description: "Sarah Johnson updated her profile information",
    timestamp: "2024-01-24T16:45:00Z",
    icon: "✏️"
  },
  {
    id: "3",
    userId: "3",
    action: "order_created",
    description: "Mike Davis created a new order",
    timestamp: "2024-01-25T08:15:00Z",
    icon: "🛒"
  },
  {
    id: "4",
    userId: "5",
    action: "user_created",
    description: "David Wilson created a new user account",
    timestamp: "2024-01-25T12:00:00Z",
    icon: "👤"
  },
  {
    id: "5",
    userId: "6",
    action: "password_change",
    description: "Lisa Anderson changed her password",
    timestamp: "2024-01-23T09:45:00Z",
    icon: "🔑"
  },
  {
    id: "6",
    userId: "1",
    action: "role_updated",
    description: "John Smith updated user roles and permissions",
    timestamp: "2024-01-22T11:20:00Z",
    icon: "🛡️"
  }
];
