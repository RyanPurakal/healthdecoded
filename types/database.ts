export type UserRole = 'ambassador' | 'volunteer' | 'admin';
export type RegistrationStatus = 'registered' | 'attended' | 'cancelled';
export type NewsPostStatus = 'draft' | 'published';

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
  school_or_org: string | null;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  created_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  status: RegistrationStatus;
  registered_at: string;
};

export type ActivityLog = {
  id: string;
  user_id: string;
  action: string;
  event_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  body: string;
  cover_image_url: string | null;
  status: NewsPostStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      events: {
        Row: Event;
        Insert: Partial<Event> & { title: string; event_date: string };
        Update: Partial<Event>;
        Relationships: [];
      };
      event_registrations: {
        Row: EventRegistration;
        Insert: Partial<EventRegistration> & { event_id: string; user_id: string };
        Update: Partial<EventRegistration>;
        Relationships: [
          {
            foreignKeyName: 'event_registrations_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_registrations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      activity_logs: {
        Row: ActivityLog;
        Insert: Partial<ActivityLog> & { user_id: string; action: string };
        Update: Partial<ActivityLog>;
        Relationships: [
          {
            foreignKeyName: 'activity_logs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activity_logs_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      news_posts: {
        Row: NewsPost;
        Insert: Partial<NewsPost> & { title: string; slug: string; body: string };
        Update: Partial<NewsPost>;
        Relationships: [
          {
            foreignKeyName: 'news_posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
