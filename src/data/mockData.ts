import { Traveler, ActiveRelay, OpenRequest, ChatThread, ActivityItem, VaultItem } from '../types';

export const travelers: Traveler[] = [
  { id: '1', name: 'Arjun Mehta', avatar: '/avatars/user1.jpg', rating: 4.8, destination: 'Delhi', departureIn: 12, from: 'IIT Jammu' },
  { id: '2', name: 'Priya Sharma', avatar: '/avatars/user2.jpg', rating: 4.9, destination: 'Mumbai', departureIn: 25, from: 'IIT Jammu' },
  { id: '3', name: 'Ravi Kumar', avatar: '/avatars/user3.jpg', rating: 4.7, destination: 'Bangalore', departureIn: 45, from: 'IIT Jammu' },
];

export const activeRelays: ActiveRelay[] = [
  {
    id: 'r1',
    itemName: 'MacBook Pro Charger',
    itemCategory: 'Gadgets',
    status: 'in-transit',
    eta: '2h 14m',
    traveler: travelers[0],
    progress: 65,
  },
  {
    id: 'r2',
    itemName: 'Birthday Gift Box',
    itemCategory: 'Gifts',
    status: 'awaiting',
    eta: '45m',
    traveler: travelers[1],
    progress: 15,
  },
  {
    id: 'r3',
    itemName: 'Medical Prescription',
    itemCategory: 'Medicine',
    status: 'at-relay',
    eta: '15m',
    traveler: travelers[2],
    progress: 90,
  },
];

export const openRequests: OpenRequest[] = [
  { id: 'o1', itemName: 'iPad Air Documents', itemCategory: 'Documents', reward: 350, from: 'Jammu', to: 'Delhi', sender: travelers[0], distance: 2.3, urgency: 'standard', postedAt: '2 min ago' },
  { id: 'o2', itemName: 'Emergency Medicines', itemCategory: 'Medicine', reward: 800, from: 'Jammu', to: 'Chandigarh', sender: travelers[1], distance: 1.1, urgency: 'emergency', postedAt: '5 min ago' },
  { id: 'o3', itemName: 'Apartment Keys', itemCategory: 'Keys', reward: 200, from: 'Jammu', to: 'Srinagar', sender: travelers[2], distance: 0.8, urgency: 'high', postedAt: '12 min ago' },
  { id: 'o4', itemName: 'Wireless Earbuds', itemCategory: 'Gadgets', reward: 450, from: 'Jammu', to: 'Delhi', sender: travelers[0], distance: 3.5, urgency: 'standard', postedAt: '18 min ago' },
  { id: 'o5', itemName: 'Wedding Invitation Cards', itemCategory: 'Documents', reward: 300, from: 'Jammu', to: 'Amritsar', sender: travelers[1], distance: 1.5, urgency: 'high', postedAt: '25 min ago' },
  { id: 'o6', itemName: 'Smart Watch', itemCategory: 'Gadgets', reward: 600, from: 'Jammu', to: 'Mumbai', sender: travelers[2], distance: 4.2, urgency: 'standard', postedAt: '34 min ago' },
];

export const chatThreads: ChatThread[] = [
  { id: 'c1', name: 'Arjun Mehta', avatar: '/avatars/user1.jpg', lastMessage: 'I have reached the pickup point. Waiting for you.', timestamp: '2m ago', unreadCount: 2, deliveryStatus: 'active', relayId: 'r1' },
  { id: 'c2', name: 'Priya Sharma', avatar: '/avatars/user2.jpg', lastMessage: 'Package dropped at the hotel reception. QR code attached.', timestamp: '15m ago', unreadCount: 0, deliveryStatus: 'active', relayId: 'r2' },
  { id: 'c3', name: 'Ravi Kumar', avatar: '/avatars/user3.jpg', lastMessage: 'Thanks for the delivery! Everything was perfect.', timestamp: '2h ago', unreadCount: 0, deliveryStatus: 'completed', relayId: 'r3' },
  { id: 'c4', name: 'Divya Patel', avatar: '/avatars/user4.jpg', lastMessage: 'Can you bring the package tomorrow morning?', timestamp: '3h ago', unreadCount: 1, deliveryStatus: 'pending', relayId: 'o1' },
  { id: 'c5', name: 'Kunal Singh', avatar: '/avatars/user5.jpg', lastMessage: 'I will be at the station in 10 minutes.', timestamp: '5h ago', unreadCount: 0, deliveryStatus: 'active', relayId: 'o2' },
];

export const activities: ActivityItem[] = [
  { id: 'a1', action: 'Relay Matched', description: 'Your MacBook Pro Charger was matched with Arjun Mehta', timestamp: '2h ago', type: 'matched' },
  { id: 'a2', action: 'Package Sent', description: 'Birthday Gift Box dispatched to Priya Sharma', timestamp: '5h ago', type: 'sent' },
  { id: 'a3', action: 'Relay Completed', description: 'Medical Prescription delivered by Ravi Kumar', timestamp: '1d ago', type: 'completed' },
  { id: 'a4', action: 'Package Received', description: 'You received Documents from Divya Patel', timestamp: '2d ago', type: 'received' },
  { id: 'a5', action: 'Trust Streak', description: '7-day streak! You earned a +5% bonus on all relays', timestamp: '3d ago', type: 'completed' },
];

export const vaultItems: VaultItem[] = [
  { id: 'v1', name: 'Apple Watch Series 8', value: 45000, image: '/items/package.jpg', status: 'locked' },
  { id: 'v2', name: 'Noise Cancelling Headphones', value: 25000, image: '/items/package.jpg', status: 'locked' },
  { id: 'v3', name: 'iPad Mini', value: 42000, image: '/items/package.jpg', status: 'released' },
];

export const categories = ['Documents', 'Medicine', 'Keys', 'Gadgets', 'Gifts', 'Other'];
export const cities = ['IIT Jammu', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Chandigarh', 'Pune', 'Kolkata', 'Jaipur'];
