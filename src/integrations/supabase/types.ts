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
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          code: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          code?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          created_at: string
          id: string
          lesson_learned: string
          mood: string
          notes: string
          title: string
          trade_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_learned?: string
          mood?: string
          notes?: string
          title: string
          trade_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_learned?: string
          mood?: string
          notes?: string
          title?: string
          trade_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "paper_trades"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          attempts: number
          best_score: number
          completed: boolean
          completed_at: string | null
          id: string
          lesson_id: string
          total_questions: number
          updated_at: string
          user_id: string
          world_id: string
        }
        Insert: {
          attempts?: number
          best_score?: number
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id: string
          total_questions?: number
          updated_at?: string
          user_id: string
          world_id: string
        }
        Update: {
          attempts?: number
          best_score?: number
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id?: string
          total_questions?: number
          updated_at?: string
          user_id?: string
          world_id?: string
        }
        Relationships: []
      }
      paper_trades: {
        Row: {
          closed_at: string | null
          entry_price: number
          exit_price: number | null
          id: string
          notes: string | null
          opened_at: string
          pnl: number | null
          quantity: number
          risk_amount: number | null
          side: string
          status: string
          stop_loss: number | null
          symbol: string
          take_profit: number | null
          user_id: string
        }
        Insert: {
          closed_at?: string | null
          entry_price: number
          exit_price?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          pnl?: number | null
          quantity: number
          risk_amount?: number | null
          side?: string
          status?: string
          stop_loss?: number | null
          symbol: string
          take_profit?: number | null
          user_id: string
        }
        Update: {
          closed_at?: string | null
          entry_price?: number
          exit_price?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          pnl?: number | null
          quantity?: number
          risk_amount?: number | null
          side?: string
          status?: string
          stop_loss?: number | null
          symbol?: string
          take_profit?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cash_balance: number
          created_at: string
          daily_goal_xp: number
          display_name: string
          experience_level: string
          goal: string
          id: string
          last_active_date: string | null
          level: number
          longest_streak: number
          onboarded: boolean
          streak_count: number
          updated_at: string
          xp: number
        }
        Insert: {
          cash_balance?: number
          created_at?: string
          daily_goal_xp?: number
          display_name?: string
          experience_level?: string
          goal?: string
          id: string
          last_active_date?: string | null
          level?: number
          longest_streak?: number
          onboarded?: boolean
          streak_count?: number
          updated_at?: string
          xp?: number
        }
        Update: {
          cash_balance?: number
          created_at?: string
          daily_goal_xp?: number
          display_name?: string
          experience_level?: string
          goal?: string
          id?: string
          last_active_date?: string | null
          level?: number
          longest_streak?: number
          onboarded?: boolean
          streak_count?: number
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      question_attempts: {
        Row: {
          correct: boolean
          created_at: string
          id: string
          lesson_id: string
          question_id: string
          topic: string
          user_id: string
        }
        Insert: {
          correct: boolean
          created_at?: string
          id?: string
          lesson_id: string
          question_id: string
          topic: string
          user_id: string
        }
        Update: {
          correct?: boolean
          created_at?: string
          id?: string
          lesson_id?: string
          question_id?: string
          topic?: string
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
  public: {
    Enums: {},
  },
} as const
