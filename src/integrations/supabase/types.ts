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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_name: string
          last_used: string | null
          permissions: Json
          usage_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_name: string
          last_used?: string | null
          permissions?: Json
          usage_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_name?: string
          last_used?: string | null
          permissions?: Json
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      payment_channels: {
        Row: {
          api_credentials: Json | null
          avg_response_time: number | null
          channel_type: string
          configuration: Json | null
          created_at: string
          display_name: string | null
          health_status: string | null
          id: string
          last_health_check: string | null
          provider_name: string
          status: string | null
          success_rate: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          api_credentials?: Json | null
          avg_response_time?: number | null
          channel_type: string
          configuration?: Json | null
          created_at?: string
          display_name?: string | null
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          provider_name: string
          status?: string | null
          success_rate?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          api_credentials?: Json | null
          avg_response_time?: number | null
          channel_type?: string
          configuration?: Json | null
          created_at?: string
          display_name?: string | null
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          provider_name?: string
          status?: string | null
          success_rate?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          preferred_currency: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          preferred_currency?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          preferred_currency?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      routing_preferences: {
        Row: {
          autopilot_enabled: boolean | null
          created_at: string
          custom_rules: Json | null
          id: string
          priority_order: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          autopilot_enabled?: boolean | null
          created_at?: string
          custom_rules?: Json | null
          id?: string
          priority_order?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          autopilot_enabled?: boolean | null
          created_at?: string
          custom_rules?: Json | null
          id?: string
          priority_order?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string
          event_description: string
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_description: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_description?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          ai_score: number | null
          created_at: string
          destination_amount: number | null
          destination_currency: string | null
          exchange_rate: number | null
          external_id: string | null
          fee_amount: number | null
          fee_currency: string | null
          id: string
          metadata: Json | null
          payment_channel_id: string | null
          recipient_info: Json | null
          route_taken: Json | null
          source_amount: number
          source_currency: string
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_score?: number | null
          created_at?: string
          destination_amount?: number | null
          destination_currency?: string | null
          exchange_rate?: number | null
          external_id?: string | null
          fee_amount?: number | null
          fee_currency?: string | null
          id?: string
          metadata?: Json | null
          payment_channel_id?: string | null
          recipient_info?: Json | null
          route_taken?: Json | null
          source_amount: number
          source_currency: string
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_score?: number | null
          created_at?: string
          destination_amount?: number | null
          destination_currency?: string | null
          exchange_rate?: number | null
          external_id?: string | null
          fee_amount?: number | null
          fee_currency?: string | null
          id?: string
          metadata?: Json | null
          payment_channel_id?: string | null
          recipient_info?: Json | null
          route_taken?: Json | null
          source_amount?: number
          source_currency?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_payment_channel_id_fkey"
            columns: ["payment_channel_id"]
            isOneToOne: false
            referencedRelation: "payment_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string
          execution_count: number | null
          id: string
          is_active: boolean | null
          last_executed: string | null
          rule_name: string
          rule_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actions: Json
          conditions: Json
          created_at?: string
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed?: string | null
          rule_name: string
          rule_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed?: string | null
          rule_name?: string
          rule_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          available_balance: number
          balance: number
          created_at: string
          currency_code: string
          id: string
          locked_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance?: number
          balance?: number
          created_at?: string
          currency_code: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance?: number
          balance?: number
          created_at?: string
          currency_code?: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
