import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e07a7e74/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== TASKS ENDPOINTS ====================

// Get all tasks
app.get("/make-server-e07a7e74/tasks", async (c) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching tasks:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get single task
app.get("/make-server-e07a7e74/tasks/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching task:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching task:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create task
app.post("/make-server-e07a7e74/tasks", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('tasks')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data }, 201);
  } catch (error) {
    console.error('Server error creating task:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update task
app.put("/make-server-e07a7e74/tasks/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('tasks')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error updating task:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete task
app.delete("/make-server-e07a7e74/tasks/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Server error deleting task:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== TEAM MEMBERS ENDPOINTS ====================

// Get all team members
app.get("/make-server-e07a7e74/team-members", async (c) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching team members:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching team members:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get single team member
app.get("/make-server-e07a7e74/team-members/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team member:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching team member:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create team member
app.post("/make-server-e07a7e74/team-members", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('team_members')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data }, 201);
  } catch (error) {
    console.error('Server error creating team member:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update team member
app.put("/make-server-e07a7e74/team-members/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('team_members')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error updating team member:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete team member
app.delete("/make-server-e07a7e74/team-members/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Server error deleting team member:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== PROJECTS ENDPOINTS ====================

// Get all projects
app.get("/make-server-e07a7e74/projects", async (c) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching projects:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get single project
app.get("/make-server-e07a7e74/projects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching project:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create project
app.post("/make-server-e07a7e74/projects", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('projects')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data }, 201);
  } catch (error) {
    console.error('Server error creating project:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update project
app.put("/make-server-e07a7e74/projects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('projects')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error updating project:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete project
app.delete("/make-server-e07a7e74/projects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Server error deleting project:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== RECENT ACTIVITIES ENDPOINTS ====================

// Get all recent activities
app.get("/make-server-e07a7e74/activities", async (c) => {
  try {
    const limit = c.req.query('limit') || '20';
    const { data, error } = await supabase
      .from('recent_activities')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      console.error('Error fetching recent activities:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data });
  } catch (error) {
    console.error('Server error fetching recent activities:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create recent activity
app.post("/make-server-e07a7e74/activities", async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await supabase
      .from('recent_activities')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating recent activity:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ data }, 201);
  } catch (error) {
    console.error('Server error creating recent activity:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== SEED DATA ENDPOINT (MVP/DEMO) ====================

// Populate database with sample data (for MVP/testing)
app.post("/make-server-e07a7e74/seed-data", async (c) => {
  try {
    console.log('Starting database seeding...');

    // Sample projects
    const projects = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Colony Design System',
        description: 'Building a comprehensive design system for the Colony platform',
        status: 'active',
        progress: 75,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Mobile App Development',
        description: 'Native mobile app for iOS and Android',
        status: 'active',
        progress: 45,
        created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'API v2 Migration',
        description: 'Migrate from legacy API to new REST API v2',
        status: 'active',
        progress: 60,
        created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Sample team members
    const teamMembers = [
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Sarah Chen',
        email: 'sarah.chen@colony.app',
        role: 'Senior Product Designer',
        department: 'Design',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'active',
        joined_date: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Marcus Johnson',
        email: 'marcus.j@colony.app',
        role: 'Lead Frontend Developer',
        department: 'Engineering',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        status: 'active',
        joined_date: new Date(Date.now() - 547 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 547 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Priya Patel',
        email: 'priya.patel@colony.app',
        role: 'Backend Engineer',
        department: 'Engineering',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        status: 'active',
        joined_date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440004',
        name: 'Alex Rivera',
        email: 'alex.rivera@colony.app',
        role: 'Product Manager',
        department: 'Product',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        status: 'active',
        joined_date: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Sample tasks
    const tasks = [
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        title: 'Design button component variants',
        description: 'Create all button variants (primary, secondary, ghost, danger)',
        status: 'completed',
        priority: 'high',
        project_id: '550e8400-e29b-41d4-a716-446655440001',
        assigned_to: '660e8400-e29b-41d4-a716-446655440001',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        title: 'Implement authentication flow',
        description: 'Build login, signup, and password reset screens',
        status: 'in_progress',
        priority: 'high',
        project_id: '550e8400-e29b-41d4-a716-446655440002',
        assigned_to: '660e8400-e29b-41d4-a716-446655440003',
        due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: null,
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440003',
        title: 'Create typography scale',
        description: 'Define responsive typography system',
        status: 'in_progress',
        priority: 'medium',
        project_id: '550e8400-e29b-41d4-a716-446655440001',
        assigned_to: '660e8400-e29b-41d4-a716-446655440001',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: null,
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440004',
        title: 'Update security dependencies',
        description: 'Run npm audit and update vulnerable packages',
        status: 'in_progress',
        priority: 'high',
        project_id: null,
        assigned_to: '660e8400-e29b-41d4-a716-446655440002',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440005',
        title: 'User interview sessions',
        description: 'Conduct 5 user interviews for product feedback',
        status: 'todo',
        priority: 'medium',
        project_id: null,
        assigned_to: '660e8400-e29b-41d4-a716-446655440004',
        due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
      },
    ];

    // Sample recent activities
    const activities = [
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        type: 'task_completed',
        title: 'Design button component variants',
        description: 'Sarah Chen completed a task',
        user_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: JSON.stringify({ taskId: '770e8400-e29b-41d4-a716-446655440001', priority: 'high' }),
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        type: 'task_created',
        title: 'Update security dependencies',
        description: 'Marcus Johnson created a new task',
        user_name: 'Marcus Johnson',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        metadata: JSON.stringify({ taskId: '770e8400-e29b-41d4-a716-446655440004', priority: 'high' }),
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440003',
        type: 'project_updated',
        title: 'Colony Design System progress updated',
        description: 'Project progress updated to 75%',
        user_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        metadata: JSON.stringify({ projectId: '550e8400-e29b-41d4-a716-446655440001', progress: 75 }),
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440004',
        type: 'task_updated',
        title: 'Implement authentication flow',
        description: 'Priya Patel updated task status to in_progress',
        user_name: 'Priya Patel',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        metadata: JSON.stringify({ taskId: '770e8400-e29b-41d4-a716-446655440002', status: 'in_progress' }),
      },
    ];

    // Insert data using upsert (won't duplicate if already exists)
    const { error: projectsError } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });

    if (projectsError) {
      console.error('Error seeding projects:', projectsError);
      return c.json({ error: `Failed to seed projects: ${projectsError.message}` }, 500);
    }

    const { error: teamError } = await supabase
      .from('team_members')
      .upsert(teamMembers, { onConflict: 'id' });

    if (teamError) {
      console.error('Error seeding team members:', teamError);
      return c.json({ error: `Failed to seed team members: ${teamError.message}` }, 500);
    }

    const { error: tasksError } = await supabase
      .from('tasks')
      .upsert(tasks, { onConflict: 'id' });

    if (tasksError) {
      console.error('Error seeding tasks:', tasksError);
      return c.json({ error: `Failed to seed tasks: ${tasksError.message}` }, 500);
    }

    const { error: activitiesError } = await supabase
      .from('recent_activities')
      .upsert(activities, { onConflict: 'id' });

    if (activitiesError) {
      console.error('Error seeding activities:', activitiesError);
      return c.json({ error: `Failed to seed activities: ${activitiesError.message}` }, 500);
    }

    console.log('Database seeding completed successfully');

    return c.json({
      success: true,
      message: 'Sample data populated successfully',
      counts: {
        projects: projects.length,
        team_members: teamMembers.length,
        tasks: tasks.length,
        activities: activities.length,
      },
    }, 201);
  } catch (error) {
    console.error('Server error seeding data:', error);
    return c.json({ error: 'Internal server error while seeding data' }, 500);
  }
});

// Clear all data (use with caution!)
app.delete("/make-server-e07a7e74/clear-data", async (c) => {
  try {
    console.log('Clearing all database data...');

    // Delete in order (activities first, then tasks, then team members, then projects)
    await supabase.from('recent_activities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('Database cleared successfully');

    return c.json({
      success: true,
      message: 'All data cleared successfully',
    });
  } catch (error) {
    console.error('Server error clearing data:', error);
    return c.json({ error: 'Internal server error while clearing data' }, 500);
  }
});

Deno.serve(app.fetch);