export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_item_id: string
          clicked_at: string
          id: string
          user_agent: string | null
        }
        Insert: {
          affiliate_item_id: string
          clicked_at?: string
          id?: string
          user_agent?: string | null
        }
        Update: {
          affiliate_item_id?: string
          clicked_at?: string
          id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_item_id_fkey"
            columns: ["affiliate_item_id"]
            isOneToOne: false
            referencedRelation: "affiliate_items"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          marketplace_name: string | null
          marketplace_url: string
          price: number | null
          price_label: string | null
          published: boolean
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          marketplace_name?: string | null
          marketplace_url: string
          price?: number | null
          price_label?: string | null
          published?: boolean
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          marketplace_name?: string | null
          marketplace_url?: string
          price?: number | null
          price_label?: string | null
          published?: boolean
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          allow_comments: boolean
          author_id: string | null
          blocks: Json
          categories: string[]
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          extra_images: string[]
          focus_keyword: string | null
          id: string
          image_prompt: string | null
          image_url: string | null
          is_sponsored: boolean
          is_trending: boolean
          project_url: string | null
          published: boolean
          published_at: string | null
          schema_type: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          source_name: string | null
          source_published_at: string | null
          source_url: string | null
          sponsor_logo_url: string | null
          sponsor_name: string | null
          tags: string[]
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          allow_comments?: boolean
          author_id?: string | null
          blocks?: Json
          categories?: string[]
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          extra_images?: string[]
          focus_keyword?: string | null
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          is_sponsored?: boolean
          is_trending?: boolean
          project_url?: string | null
          published?: boolean
          published_at?: string | null
          schema_type?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          source_name?: string | null
          source_published_at?: string | null
          source_url?: string | null
          sponsor_logo_url?: string | null
          sponsor_name?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          allow_comments?: boolean
          author_id?: string | null
          blocks?: Json
          categories?: string[]
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          extra_images?: string[]
          focus_keyword?: string | null
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          is_sponsored?: boolean
          is_trending?: boolean
          project_url?: string | null
          published?: boolean
          published_at?: string | null
          schema_type?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          source_name?: string | null
          source_published_at?: string | null
          source_url?: string | null
          sponsor_logo_url?: string | null
          sponsor_name?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          desk_key: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          desk_key?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          desk_key?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          approved: boolean
          article_id: string
          content: string
          created_at: string
          id: string
          updated_at: string
          user_email: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          approved?: boolean
          article_id: string
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          approved?: boolean
          article_id?: string
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          ai_response: string
          created_at: string
          feedback: string | null
          id: string
          sources: Json
          user_id: string | null
          user_message: string
        }
        Insert: {
          ai_response: string
          created_at?: string
          feedback?: string | null
          id?: string
          sources?: Json
          user_id?: string | null
          user_message: string
        }
        Update: {
          ai_response?: string
          created_at?: string
          feedback?: string | null
          id?: string
          sources?: Json
          user_id?: string | null
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          archived: boolean
          author_id: string | null
          category: string | null
          contact: string | null
          created_at: string
          description: string
          ends_at: string | null
          featured: boolean
          gallery: string[]
          id: string
          image_url: string | null
          latitude: number | null
          listing_details: Json
          longitude: number | null
          maps_url: string | null
          organizer: string | null
          price_label: string | null
          published: boolean
          rating: number | null
          registration_url: string | null
          review_count: number
          seo_description: string | null
          seo_title: string | null
          slug: string
          starts_at: string
          subcategory: string | null
          tags: string[]
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          address?: string | null
          archived?: boolean
          author_id?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string
          ends_at?: string | null
          featured?: boolean
          gallery?: string[]
          id?: string
          image_url?: string | null
          latitude?: number | null
          listing_details?: Json
          longitude?: number | null
          maps_url?: string | null
          organizer?: string | null
          price_label?: string | null
          published?: boolean
          rating?: number | null
          registration_url?: string | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          starts_at: string
          subcategory?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          address?: string | null
          archived?: boolean
          author_id?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string
          ends_at?: string | null
          featured?: boolean
          gallery?: string[]
          id?: string
          image_url?: string | null
          latitude?: number | null
          listing_details?: Json
          longitude?: number | null
          maps_url?: string | null
          organizer?: string | null
          price_label?: string | null
          published?: boolean
          rating?: number | null
          registration_url?: string | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          starts_at?: string
          subcategory?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          embedding: Json | null
          id: string
          is_active: boolean
          source_upload_id: string | null
          source_url: string | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          content: string
          created_at?: string
          embedding?: Json | null
          id?: string
          is_active?: boolean
          source_upload_id?: string | null
          source_url?: string | null
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          embedding?: Json | null
          id?: string
          is_active?: boolean
          source_upload_id?: string | null
          source_url?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_base_source_upload_id_fkey"
            columns: ["source_upload_id"]
            isOneToOne: false
            referencedRelation: "rag_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      rag_uploads: {
        Row: {
          chunks_created: number
          created_at: string
          elements_processed: number
          error_message: string | null
          file_size: number
          file_type: string | null
          filename: string
          id: string
          status: Database["public"]["Enums"]["rag_upload_status"]
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          chunks_created?: number
          created_at?: string
          elements_processed?: number
          error_message?: string | null
          file_size: number
          file_type?: string | null
          filename: string
          id?: string
          status?: Database["public"]["Enums"]["rag_upload_status"]
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          chunks_created?: number
          created_at?: string
          elements_processed?: number
          error_message?: string | null
          file_size?: number
          file_type?: string | null
          filename?: string
          id?: string
          status?: Database["public"]["Enums"]["rag_upload_status"]
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rag_uploads_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reels: {
        Row: {
          account_username: string
          author_id: string | null
          category: string
          comments: number
          created_at: string
          description: string
          display_order: number
          featured: boolean
          follows: number
          id: string
          likes: number
          permalink: string
          post_type: string
          publish_time: string
          reach: number
          saves: number
          shares: number
          sponsored: boolean
          status: string
          thumbnail_url: string | null
          updated_at: string
          views: number
        }
        Insert: {
          account_username: string
          author_id?: string | null
          category?: string
          comments?: number
          created_at?: string
          description?: string
          display_order?: number
          featured?: boolean
          follows?: number
          id?: string
          likes?: number
          permalink: string
          post_type?: string
          publish_time: string
          reach?: number
          saves?: number
          shares?: number
          sponsored?: boolean
          status?: string
          thumbnail_url?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          account_username?: string
          author_id?: string | null
          category?: string
          comments?: number
          created_at?: string
          description?: string
          display_order?: number
          featured?: boolean
          follows?: number
          id?: string
          likes?: number
          permalink?: string
          post_type?: string
          publish_time?: string
          reach?: number
          saves?: number
          shares?: number
          sponsored?: boolean
          status?: string
          thumbnail_url?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "reels_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tourism_places: {
        Row: {
          address: string | null
          archived: boolean
          author_id: string | null
          category: string | null
          contact: string | null
          created_at: string
          description: string
          featured: boolean
          gallery: string[]
          id: string
          image_url: string | null
          latitude: number | null
          listing_details: Json
          location: string | null
          longitude: number | null
          maps_url: string | null
          name: string
          opening_hours: string | null
          price_range: string | null
          published: boolean
          rating: number | null
          review_count: number
          seo_description: string | null
          seo_title: string | null
          slug: string
          subcategory: string | null
          tags: string[]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          archived?: boolean
          author_id?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string
          featured?: boolean
          gallery?: string[]
          id?: string
          image_url?: string | null
          latitude?: number | null
          listing_details?: Json
          location?: string | null
          longitude?: number | null
          maps_url?: string | null
          name: string
          opening_hours?: string | null
          price_range?: string | null
          published?: boolean
          rating?: number | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          subcategory?: string | null
          tags?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          archived?: boolean
          author_id?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string
          featured?: boolean
          gallery?: string[]
          id?: string
          image_url?: string | null
          latitude?: number | null
          listing_details?: Json
          location?: string | null
          longitude?: number | null
          maps_url?: string | null
          name?: string
          opening_hours?: string | null
          price_range?: string | null
          published?: boolean
          rating?: number | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          subcategory?: string | null
          tags?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tourism_places_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: { article_slug: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "user" | "editor" | "admin"
      rag_upload_status: "pending" | "embedding" | "done" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["user", "editor", "admin"],
      rag_upload_status: ["pending", "embedding", "done", "failed"],
    },
  },
} as const
