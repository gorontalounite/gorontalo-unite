export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin" | "editor";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin" | "editor";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin" | "editor";
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          category: string;
          tags: string[];
          author_id: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          category?: string;
          tags?: string[];
          author_id?: string | null;
          published?: boolean;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          category?: string;
          tags?: string[];
          published?: boolean;
          published_at?: string | null;
          updated_at?: string;
        };
      };
      knowledge_base: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          tags: string[];
          source_url: string | null;
          author_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category?: string;
          tags?: string[];
          source_url?: string | null;
          author_id?: string | null;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          content?: string;
          category?: string;
          tags?: string[];
          source_url?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string | null;
          user_message: string;
          ai_response: string;
          sources: Json;
          feedback: "up" | "down" | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          user_message: string;
          ai_response: string;
          sources?: Json;
          feedback?: "up" | "down" | null;
        };
        Update: {
          feedback?: "up" | "down" | null;
        };
      };
    };
  };
}
