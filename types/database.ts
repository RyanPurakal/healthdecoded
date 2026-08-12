export type UserRole = 'ambassador' | 'volunteer' | 'admin';
export type RegistrationStatus = 'registered' | 'attended' | 'cancelled';
export type NewsPostStatus = 'draft' | 'published';
export type DeletionRequestStatus = 'pending' | 'completed';
export type ServiceHourStatus = 'pending' | 'verified' | 'rejected';
export type ActivityType = 'lesson' | 'quiz' | 'interactive';
export type BadgeCriteriaType = 'xp_threshold' | 'activity_count';

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
  school_or_org: string | null;
  avatar_url: string | null;
  grade: string | null;
  bio: string | null;
  total_xp: number;
  show_on_leaderboard: boolean;
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

export type DeletionRequest = {
  id: string;
  user_id: string;
  user_email: string;
  requested_at: string;
  status: DeletionRequestStatus;
  notes: string | null;
};

export type ServiceHour = {
  id: string;
  user_id: string;
  event_id: string | null;
  hours: number;
  description: string | null;
  status: ServiceHourStatus;
  submitted_at: string;
  verified_by: string | null;
  verified_at: string | null;
};

export type GameActivity = {
  id: string;
  title: string;
  slug: string;
  type: ActivityType;
  description: string | null;
  xp_value: number;
  content_url: string | null;
  is_published: boolean;
  created_at: string;
};

export type ActivityCompletion = {
  id: string;
  user_id: string;
  activity_id: string;
  completed_at: string;
  score: number | null;
};

export type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  criteria_type: BadgeCriteriaType;
  criteria_value: number;
  created_at: string;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  awarded_at: string;
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
      deletion_requests: {
        Row: DeletionRequest;
        Insert: Partial<DeletionRequest> & { user_id: string; user_email: string };
        Update: Partial<DeletionRequest>;
        Relationships: [
          {
            foreignKeyName: 'deletion_requests_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      service_hours: {
        Row: ServiceHour;
        Insert: Partial<ServiceHour> & { user_id: string; hours: number };
        Update: Partial<ServiceHour>;
        Relationships: [
          {
            foreignKeyName: 'service_hours_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'service_hours_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      game_activities: {
        Row: GameActivity;
        Insert: Partial<GameActivity> & { title: string; slug: string };
        Update: Partial<GameActivity>;
        Relationships: [];
      };
      activity_completions: {
        Row: ActivityCompletion;
        Insert: Partial<ActivityCompletion> & { user_id: string; activity_id: string };
        Update: Partial<ActivityCompletion>;
        Relationships: [
          {
            foreignKeyName: 'activity_completions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activity_completions_activity_id_fkey';
            columns: ['activity_id'];
            isOneToOne: false;
            referencedRelation: 'game_activities';
            referencedColumns: ['id'];
          },
        ];
      };
      badges: {
        Row: Badge;
        Insert: Partial<Badge> & { name: string; criteria_type: BadgeCriteriaType };
        Update: Partial<Badge>;
        Relationships: [];
      };
      user_badges: {
        Row: UserBadge;
        Insert: Partial<UserBadge> & { user_id: string; badge_id: string };
        Update: Partial<UserBadge>;
        Relationships: [
          {
            foreignKeyName: 'user_badges_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_badges_badge_id_fkey';
            columns: ['badge_id'];
            isOneToOne: false;
            referencedRelation: 'badges';
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
