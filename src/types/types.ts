export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: "customer" | "handyman";
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  userType: "customer" | "handyman";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, "password">;
  requiresOnboarding?: boolean;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price:
    | number
    | {
        hourly?: number;
        fixed?: number;
      };
  providerId: string;
  availability: "available" | "unavailable" | "busy";
  rating?: number;
  imageUrls?: string[];
  location?: {
    address?: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  subcategories: Subcategory[];
  description?: string;
  imageUrl?: string;
}

export type Subcategory = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
};
export interface ServiceRequest {
  id: string;
  customerId: string;
  serviceId: string;
  handymanId: string;
  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "completed"
    | "cancelled"
    | "urgent";
  scheduledDate?: Date | string;
  scheduledTime?: string;
  notes?: string;
  price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Review {
  id: string;
  serviceId: string;
  customerId: string;
  handymanId: string;
  rating: number;
  comment?: string;
  createdAt: Date | string;
}
export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  type: "new_request" | "status_update" | "message" | "payment";
  referenceId?: string;
  createdAt: Date | string;
}

export interface Payment {
  id: string;
  serviceRequestId: string;
  customerId: string;
  handymanId: string;
  amount: number;
  status: "pending" | "completed" | "refunded" | "failed";
  method: "credit_card" | "paypal" | "cash" | "other";
  transactionId?: string;
  createdAt: Date | string;
}
export interface Booking {
  id: string;
  service: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  scheduledDate: string;
  scheduledTime: string;
  customerId: string;
  customerName: string;
  handymanId: string;
  handymanName: string;
  description: string;
  location: Location;
  category: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  completedDate?: string;
  completedTime?: string;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}
export interface CalendarBooking {
  id: string;
  title: string;
  location: Location;
  description: string;
  from: string; // ISO format: "YYYY-MM-DDTHH:MM:SS"
  to: string; // ISO format: "YYYY-MM-DDTHH:MM:SS"
  dateCreatedAt: string;
  userId: string; // New field
}
