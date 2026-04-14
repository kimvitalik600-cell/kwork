// === Core domain types for RULWEAR.ORG ===

export type ObjectType = 'material' | 'digital' | 'service' | 'ai_content'
export type DeliveryType = 'auto' | 'manual'

export type ObjectStatus =
  | 'available'
  | 'reserved'
  | 'distributed'
  | 'extracted'
  | 'verified'
  | 'hidden'
  | 'archived'

export type RequestStatus =
  | 'pending'
  | 'waiting_payment'
  | 'paid'
  | 'partial_paid'
  | 'reserved'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'disputed'

export type UserRole =
  | 'guest'
  | 'user'
  | 'verified'
  | 'premium'
  | 'author'
  | 'moderator'
  | 'admin'

export type PaymentMethod =
  | 'betatransfer'
  | 'liqpay'
  | 'wayforpay'
  | 'balance'
  | 'crypto'
  | 'manual'

export interface CatalogObject {
  id: string
  slug: string
  externalId?: string
  title: Record<string, string>
  shortDescription: Record<string, string>
  fullDescription: Record<string, string>
  type: ObjectType
  status: ObjectStatus
  categoryId: string
  subcategoryId?: string
  compensation: number
  compensationCredits?: number
  currency: string
  images: string[]
  hasUnpacking: boolean
  hasPdfProtocol: boolean
  deliveryType: DeliveryType
  countryOfOrigin?: string
  internationalShipping: boolean
  boxLabel?: string
  batchId?: string
  authorId?: string
  viewCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  slug: string
  name: Record<string, string>
  icon?: string
  parentId?: string
  children?: Category[]
  allowedObjectTypes: ObjectType[]
  sortOrder: number
  isActive: boolean
}

export interface User {
  id: string
  name: string
  nickname?: string
  email: string
  phone?: string
  telegram?: string
  viber?: string
  role: UserRole
  balance: number
  credits: number
  tokens: number
  language: string
  country: string
  isVerified: boolean
  isPremium: boolean
  avatarUrl?: string
  createdAt: string
}

export interface InfoPackageItem {
  objectId: string
  object: CatalogObject
  addedAt: string
}

export interface Request {
  id: string
  token: string
  userId?: string
  status: RequestStatus
  items: RequestItem[]
  totalCompensation: number
  paymentStatus: string
  paymentMethod?: PaymentMethod
  email: string
  telegram?: string
  phone?: string
  country: string
  city?: string
  deliveryMethod?: string
  comment?: string
  reserveTimer?: string
  createdAt: string
  updatedAt: string
}

export interface RequestItem {
  id: string
  objectId: string
  object: CatalogObject
  compensation: number
}

export interface Invoice {
  id: string
  requestId: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'cancelled' | 'expired'
  paymentUrl?: string
  description: string
  createdAt: string
  paidAt?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: Record<string, string>
  content: Record<string, string>
  excerpt: Record<string, string>
  type: 'unpacking' | 'news' | 'review' | 'report' | 'article' | 'guide'
  coverImage?: string
  authorId: string
  tags: string[]
  relatedObjectIds: string[]
  isPinned: boolean
  commentCount: number
  createdAt: string
  publishedAt?: string
}

export interface UnpackingReport {
  id: string
  objectId: string
  text: Record<string, string>
  photos: string[]
  videos: string[]
  externalVideoUrls: string[]
  verifiedAt?: string
  timeline: { date: string; event: string }[]
}

export interface Donation {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  type: 'pallet_purchase' | 'delivery_compensation' | 'project_development' | 'initiative'
  goalAmount: number
  collectedAmount: number
  currency: string
  isActive: boolean
  deadline?: string
  createdAt: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  parentId?: string
  targetType: 'object' | 'blog_post' | 'news'
  targetId: string
  createdAt: string
  replies?: Comment[]
}

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  status: 'new' | 'in_progress' | 'waiting_user' | 'closed'
  category: 'technical' | 'financial' | 'deal_dispute' | 'other'
  messages: TicketMessage[]
  createdAt: string
}

export interface TicketMessage {
  id: string
  userId: string
  content: string
  attachments: string[]
  isInternal: boolean
  createdAt: string
}

export interface DigitalAsset {
  id: string
  type: 'book' | 'key' | 'account' | 'archive' | 'ai_art' | '3d_model' | 'subscription' | 'template' | 'prompt'
  title: string
  format?: string
  deliveryType: DeliveryType
  accessDuration?: string
  downloadUrl?: string
  usagesLeft?: number
  acquiredAt: string
}

export interface AIGeneration {
  id: string
  userId: string
  prompt: string
  model: string
  type: 'image' | 'text' | 'upscale' | 'variation'
  resultUrl?: string
  tokensCost: number
  status: 'queued' | 'processing' | 'completed' | 'failed'
  createdAt: string
}

export interface InventoryBatch {
  id: string
  lotReference: string
  source: string
  status: 'open' | 'processing' | 'closed'
  comment?: string
  documents: string[]
  createdAt: string
}

export interface InventoryBox {
  id: string
  batchId: string
  label: string
  description?: string
  status: string
  photos: string[]
  videos: string[]
}

export interface InventoryItem {
  id: string
  boxId: string
  name: string
  type: string
  quantity: number
  unit: string
  condition: string
  photo?: string
  checkComment?: string
  size?: string
  color?: string
  location?: string
  reservedForRequestId?: string
  linkedObjectId?: string
  partnerId?: string
}
