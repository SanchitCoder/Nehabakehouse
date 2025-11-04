export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: 'Cakes' | 'Pastries' | 'Breads' | 'Cookies' | 'Custom Orders'
          image_url: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: 'Cakes' | 'Pastries' | 'Breads' | 'Cookies' | 'Custom Orders'
          image_url: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: 'Cakes' | 'Pastries' | 'Breads' | 'Cookies' | 'Custom Orders'
          image_url?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          delivery_address: string
          special_instructions: string
          items: Json
          subtotal: number
          tax: number
          total: number
          payment_status: 'completed' | 'pending' | 'failed'
          stripe_payment_id: string | null
          webhook_sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          delivery_address: string
          special_instructions?: string
          items: Json
          subtotal: number
          tax: number
          total: number
          payment_status?: 'completed' | 'pending' | 'failed'
          stripe_payment_id?: string | null
          webhook_sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          delivery_address?: string
          special_instructions?: string
          items?: Json
          subtotal?: number
          tax?: number
          total?: number
          payment_status?: 'completed' | 'pending' | 'failed'
          stripe_payment_id?: string | null
          webhook_sent?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
