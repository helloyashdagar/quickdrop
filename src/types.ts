export interface Traveler {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  destination: string;
  departureIn: number;
  from: string;
}

export interface ActiveRelay {
  id: string;
  itemName: string;
  itemCategory: string;
  status: 'awaiting' | 'in-transit' | 'at-relay' | 'delivered';
  eta: string;
  traveler: Traveler;
  progress: number;
}

export interface OpenRequest {
  id: string;
  itemName: string;
  itemCategory: string;
  reward: number;
  from: string;
  to: string;
  sender: Traveler;
  distance: number;
  urgency: 'standard' | 'high' | 'emergency';
  postedAt: string;
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  deliveryStatus: 'active' | 'completed' | 'pending';
  relayId: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'sent' | 'received' | 'matched' | 'completed';
}

export interface VaultItem {
  id: string;
  name: string;
  value: number;
  image: string;
  status: 'locked' | 'released';
}

export type Category = 'Documents' | 'Medicine' | 'Keys' | 'Gadgets' | 'Gifts' | 'Other';
