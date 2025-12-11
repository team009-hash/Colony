import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Singleton pattern to prevent multiple instances
let supabaseInstance: SupabaseClient | null = null;

export const supabase = (() => {
    if (!supabaseInstance) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
        console.log('✅ Supabase client initialized (singleton)');
    }
    return supabaseInstance;
})();

// Database types
export interface Task {
    id: string;
    title: string;
    description: string;
    project?: string;
    status: string;
    priority: 'high' | 'medium' | 'low';
    assignee?: string;
    due_date?: string;
    dueDate?: string;
    completed?: boolean;
    category?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    avatar: string;
    avatar_url?: string;
    department?: string;
    status: 'active' | 'inactive' | 'away';
    joined_date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    team_members: string[];
    start_date?: string;
    due_date: string;
    priority?: string;
    dueDate?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RecentActivity {
    id: string;
    action?: string;
    entity_type?: string;
    entity_id?: string;
    entity_name?: string;
    user_name?: string;
    type?: string;
    title?: string;
    description?: string;
    metadata?: string;
    user?: string;
    timestamp: string;
}
