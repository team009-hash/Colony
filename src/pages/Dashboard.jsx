// Dashboard.jsx - Main Dashboard Page
import { useState, useEffect, useRef } from "react";
import '../styles/dashboard.css';
import { useNavigate } from "react-router-dom";
import { User, Bell, Palette, Shield, Globe, Settings2, Menu, Sun, Moon, HelpCircle, Settings as SettingsIcon, Accessibility as AccessibilityIcon } from "lucide-react";
import { supabase } from "../utils/supabase/client";
import { doSignOut } from "../firebase/auth";
import {
    SettingsProvider,
    WidgetProvider,
    useSettings,
    useWidgets,
    DashboardSidebar,
    DashboardNavbar,
    TaskHeader,
    TaskFilters,
    TaskStats,
    TaskList,
    AddTaskModal,
    EditTaskModal,
    WellbeingHeader,
    WellnessStats,
    MoodTracker,
    WellnessActivities,
    WellnessResources,
    BreathingExercise,
    WellbeingSidebar,
    AIHeader,
    WelcomeCard,
    ChatHistorySection,
    Suggestions,
    ChatArea,
    WidgetWrapper,
    ProductivityCard,
    AISuggestionsCard,
    WellbeingCard,
    CollaborationCard,
    TasksCard,
    RightPanel,
    CustomiseButton,
    AccountSettings,
    NotificationSettings,
    AppearanceSettings,
    AccessibilitySettings,
    PrivacySettings,
    IntegrationSettings,
    TeamPage
} from "../components/dashboard/dashboard_ui";

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

function AccessibilityIndicator() {
    const {
        enhancedFocusIndicators,
        largeCursor,
        reducedMotion,
        highContrast,
        largeText,
        colorBlindFriendly,
        disableAutoplay
    } = useSettings();

    if (!enhancedFocusIndicators && !largeCursor && !reducedMotion && !highContrast && !largeText && !colorBlindFriendly && !disableAutoplay) return null;

    return (
        <>
            {reducedMotion && (
                <style>{`
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        `}</style>
            )}

            {highContrast && (
                <style>{`
          :root {
            --text-contrast: 1.5;
          }
          body {
            filter: contrast(1.25);
          }
          .bg-gray-50, .bg-gray-100 {
            background-color: #ffffff !important;
          }
          .dark .bg-gray-800, .dark .bg-gray-900 {
            background-color: #000000 !important;
          }
          .text-gray-500, .text-gray-600 {
            color: #1a1a1a !important;
          }
          .dark .text-gray-400, .dark .text-gray-500 {
            color: #f0f0f0 !important;
          }
          .border-gray-200 {
            border-color: #000000 !important;
            border-width: 2px !important;
          }
          .dark .border-gray-700 {
            border-color: #ffffff !important;
            border-width: 2px !important;
          }
        `}</style>
            )}

            {largeText && (
                <style>{`
          * {
            font-size: calc(1em * 1.25) !important;
            line-height: calc(1.5em * 1.2) !important;
          }
          h1 { font-size: calc(2.5em * 1.25) !important; }
          h2 { font-size: calc(2em * 1.25) !important; }
          h3 { font-size: calc(1.75em * 1.25) !important; }
          h4 { font-size: calc(1.5em * 1.25) !important; }
          h5 { font-size: calc(1.25em * 1.25) !important; }
          h6 { font-size: calc(1em * 1.25) !important; }
          p, span, div, button, input, textarea, select {
            font-size: calc(1em * 1.25) !important;
          }
          .text-xs { font-size: calc(0.75rem * 1.25) !important; }
          .text-sm { font-size: calc(0.875rem * 1.25) !important; }
          .text-base { font-size: calc(1rem * 1.25) !important; }
          .text-lg { font-size: calc(1.125rem * 1.25) !important; }
          .text-xl { font-size: calc(1.25rem * 1.25) !important; }
          .text-2xl { font-size: calc(1.5rem * 1.25) !important; }
        `}</style>
            )}

            {enhancedFocusIndicators && (
                <style>{`
          *:focus {
            outline: 4px solid var(--accent-color) !important;
            outline-offset: 3px !important;
            box-shadow: 0 0 0 6px rgba(28, 106, 255, 0.1) !important;
            transition: outline 0.2s ease, box-shadow 0.2s ease !important;
          }
          *:focus-visible {
            outline: 4px solid var(--accent-color) !important;
            outline-offset: 3px !important;
            box-shadow: 0 0 0 6px rgba(28, 106, 255, 0.1) !important;
          }
        `}</style>
            )}

            {largeCursor && (
                <style>{`
          * {
            cursor: crosshair !important;
          }
          button, a, [role="button"], input[type="submit"], input[type="button"] {
            cursor: crosshair !important;
            outline: 2px solid transparent;
            transition: outline 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease !important;
          }
          button:hover, a:hover, [role="button"]:hover {
            outline: 3px solid var(--accent-color) !important;
            outline-offset: 2px !important;
            transform: scale(1.05) !important;
            box-shadow: 0 0 15px rgba(28, 106, 255, 0.3) !important;
          }
          input[type="text"]:hover, 
          input[type="email"]:hover, 
          input[type="password"]:hover,
          textarea:hover,
          select:hover {
            outline: 2px solid var(--accent-color) !important;
            outline-offset: 1px !important;
            box-shadow: 0 0 10px rgba(28, 106, 255, 0.2) !important;
          }
        `}</style>
            )}

            {colorBlindFriendly && (
                <style>{`
          /* Add patterns and labels to color-coded items */
        `}</style>
            )}

            {disableAutoplay && (
                <style>{`
          video, audio {
            autoplay: false !important;
          }
          video[autoplay], audio[autoplay] {
            autoplay: false !important;
          }
          @media (prefers-reduced-motion: no-preference) {
            *::before, *::after {
              animation-play-state: paused !important;
            }
          }
        `}</style>
            )}
        </>
    );
}

// -----------------------------------------------------------------------------
// DASHBOARD PAGES
// -----------------------------------------------------------------------------

function TaskPage({ onNavigate, profileImage, onSignOut }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const { theme } = useSettings();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();

        const subscription = supabase
            .channel('tasks_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tasks' },
                (payload) => {
                    console.log('Task change received:', payload);

                    if (payload.eventType === 'INSERT') {
                        setTasks((current) => [...current, payload.new]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTasks((current) =>
                            current.map((task) =>
                                task.id === payload.new.id ? payload.new : task
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setTasks((current) =>
                            current.filter((task) => task.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            if (error.code === 'PGRST205') {
                setTasks([]);
            } else {
                console.error('Error fetching tasks:', error);
            }
        } else {
            setTasks(data || []);
        }
    };

    const addRecentActivity = async (type, description, user = "You") => {
        const parts = description.split(': ');
        const action = parts[0] || description;
        const entity_name = parts[1] || '';

        const activity = {
            id: crypto.randomUUID(),
            type,
            description,
            action,
            entity_type: type,
            entity_name,
            timestamp: new Date().toISOString(),
            user_name: user,
        };

        const { error } = await supabase
            .from('recent_activities')
            .insert([activity]);

        if (error) {
            console.error('Error adding activity:', error);
        } else {
            console.log('✅ Recent activity added:', description);
        }
    };

    const handleToggleTask = async (id) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const wasCompleted = task.completed;
        const nowCompleted = !wasCompleted;

        const { error } = await supabase
            .from('tasks')
            .update({ completed: nowCompleted, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error toggling task:', error);
            return;
        }

        if (nowCompleted && !wasCompleted) {
            await addRecentActivity('task_completed', `Completed task: ${task.title}`, 'You');
        }
    };

    const handleDeleteTask = async (id) => {
        const task = tasks.find((t) => t.id === id);

        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
            return;
        }

        if (task) {
            await addRecentActivity('task', `Deleted task: ${task.title}`, 'You');
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (updatedTask) => {
        const { error } = await supabase
            .from('tasks')
            .update({
                ...updatedTask,
                updated_at: new Date().toISOString()
            })
            .eq('id', updatedTask.id);

        if (error) {
            console.error('Error updating task:', error);
            return;
        }

        await addRecentActivity('task', `Updated task: ${updatedTask.title}`, 'You');

        setIsEditModalOpen(false);
        setEditingTask(null);
    };

    const handleAddTask = async (newTask) => {
        const taskToInsert = {
            ...newTask,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('tasks')
            .insert([taskToInsert]);

        if (error) {
            console.error('Error adding task:', error);
            return;
        }

        await addRecentActivity('task', `Created task: ${taskToInsert.title}`, 'You');
    };

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: theme === "dark" ? "#0A0E1A" : "#F4F6FA" }}
        >
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate}
                activePage="tasks"
                profileImage={profileImage}
                onSignOut={onSignOut}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TaskHeader
                    onAddTask={() => setIsModalOpen(true)}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-hidden flex">
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <TaskFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                        <TaskStats tasks={tasks} />
                        <TaskList
                            tasks={tasks}
                            onToggle={handleToggleTask}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                            filter={activeFilter}
                        />
                    </main>
                </div>
            </div>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTask}
            />
            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingTask(null);
                }}
                task={editingTask}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

function WellbeingPage({ onNavigate, profileImage, onSignOut }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useSettings();

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: theme === "dark" ? "#0A0E1A" : "#F4F6FA" }}
        >
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate}
                activePage="wellbeing"
                profileImage={profileImage}
                onSignOut={onSignOut}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <WellbeingHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-hidden flex">
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <WellnessStats />
                                <MoodTracker />
                            </div>

                            <WellnessActivities />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <WellnessResources />
                                <BreathingExercise />
                            </div>
                        </div>
                    </main>

                    <WellbeingSidebar />
                </div>
            </div>
        </div>
    );
}

function AIAssistantPage({ onNavigate, profileImage, onSignOut }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const { theme } = useSettings();

    const isDark =
        theme === "dark" ||
        (theme === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const saveChatToHistory = (messages) => {
        if (messages.length === 0) return;

        const firstUserMessage =
            messages.find((m) => m.role === "user")?.content.toLowerCase() || "";
        let category = "General";

        if (
            firstUserMessage.includes("task") ||
            firstUserMessage.includes("prioritize")
        ) {
            category = "Tasks";
        } else if (
            firstUserMessage.includes("wellbeing") ||
            firstUserMessage.includes("mood") ||
            firstUserMessage.includes("health")
        ) {
            category = "Wellbeing";
        } else if (
            firstUserMessage.includes("team") ||
            firstUserMessage.includes("collaborate")
        ) {
            category = "Team";
        } else if (
            firstUserMessage.includes("focus") ||
            firstUserMessage.includes("productivity")
        ) {
            category = "Productivity";
        }

        const title =
            messages[0]?.content.substring(0, 50) +
            (messages[0]?.content.length > 50 ? "..." : "");

        const newChat = {
            id: Date.now().toString(),
            title,
            category,
            messages: [...messages],
            timestamp: new Date(),
        };

        setChatHistory((prev) => [newChat, ...prev]);

        console.log("💬 Chat saved to history:", {
            category,
            title,
            messageCount: messages.length,
            timestamp: new Date().toLocaleString(),
        });
    };

    const handleNewChat = () => {
        if (messages.length > 0) {
            saveChatToHistory(messages);
        }

        setMessages([]);
        setInputValue("");
        setIsTyping(false);
    };

    const handleSendMessage = (message) => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: message,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            let aiResponse = "";

            const lowerMessage = message.toLowerCase();
            if (
                lowerMessage.includes("task") ||
                lowerMessage.includes("prioritize")
            ) {
                aiResponse =
                    "I can help you prioritize your tasks! Based on your current workload, I recommend:\n\n1. Focus on high-priority tasks first\n2. Break large tasks into smaller steps\n3. Set realistic deadlines\n\nWould you like me to analyze your current task list?";
            } else if (
                lowerMessage.includes("wellbeing") ||
                lowerMessage.includes("mood") ||
                lowerMessage.includes("health")
            ) {
                aiResponse =
                    "Your wellbeing matters! I can help you:\n\n• Track your daily mood\n• Schedule regular breaks\n• Monitor stress levels\n• Get personalized wellness tips\n\nWould you like to log your current mood?";
            } else if (
                lowerMessage.includes("team") ||
                lowerMessage.includes("collaborate") ||
                lowerMessage.includes("available")
            ) {
                aiResponse =
                    "For team collaboration, I can assist with:\n\n• Checking team availability\n• Scheduling meetings\n• Coordinating projects\n• Sharing updates\n\nWhat would you like to know about your team?";
            } else if (
                lowerMessage.includes("focus") ||
                lowerMessage.includes("concentrate")
            ) {
                aiResponse =
                    "Great! Focus sessions boost productivity. I recommend:\n\n• 25-minute focused work blocks\n• 5-minute breaks between sessions\n• Eliminate distractions\n• Set a clear goal\n\nShall I start a focus timer?";
            } else if (
                lowerMessage.includes("progress") ||
                lowerMessage.includes("productivity")
            ) {
                aiResponse =
                    "Here's what I see:\n\n📊 Your productivity has improved 15% this week\n✅ 12 tasks completed\n⏱️ Average focus time: 2.5 hours/day\n🎯 3 goals achieved\n\nKeep up the great work!";
            } else if (lowerMessage.includes("improve")) {
                aiResponse =
                    "To improve your productivity, try:\n\n1. Set clear daily goals\n2. Use time blocking\n3. Take regular breaks\n4. Track your progress\n5. Celebrate small wins\n\nWhich area would you like to focus on?";
            } else {
                aiResponse =
                    "I'm here to help! You can ask me about:\n\n• Task management and prioritization\n• Wellbeing and mood tracking\n• Team collaboration\n• Productivity insights\n• Focus sessions\n\nWhat would you like to explore?";
            }

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1200);
    };

    const handleChatSelect = (chat) => {
        setMessages(chat.messages);
        setInputValue("");
        setIsTyping(false);
    };

    const showWelcome = messages.length === 0;
    const bgColor = isDark ? '#0A0E1A' : '#F4F6FA';

    return (
        <div className="flex h-screen overflow-hidden" style={{ backgroundColor: bgColor }}>
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate}
                activePage="ai-assistant"
                profileImage={profileImage}
            />

            <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: bgColor }}>
                <AIHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    onNewChat={handleNewChat}
                />

                <main className="flex-1 overflow-hidden" style={{ backgroundColor: bgColor }}>
                    {showWelcome ? (
                        <div className="h-full flex flex-col px-6 lg:px-12 pt-12">
                            <div className="flex-1">
                                <WelcomeCard onActionClick={handleSendMessage} />

                                {chatHistory.length > 0 && (
                                    <div className={`mt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-8`}>
                                        <ChatHistorySection
                                            chatHistory={chatHistory}
                                            onChatSelect={handleChatSelect}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="pb-6">
                                <Suggestions onSuggestionClick={handleSendMessage} />
                            </div>
                        </div>
                    ) : (
                        <ChatArea
                            messages={messages}
                            isTyping={isTyping}
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSendMessage={handleSendMessage}
                            messagesEndRef={messagesEndRef}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

function DashboardHome({ onNavigate, profileImage, onSignOut }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { widgets } = useWidgets();
    const { theme } = useSettings();
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        fetchRecentActivities();

        const subscription = supabase
            .channel('dashboard_recent_activities_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'recent_activities' },
                (payload) => {
                    console.log('Recent activity change received:', payload);

                    if (payload.eventType === 'INSERT') {
                        setRecentActivities((current) => [payload.new, ...current].slice(0, 20));
                    } else if (payload.eventType === 'UPDATE') {
                        setRecentActivities((current) =>
                            current.map((activity) =>
                                activity.id === payload.new.id ? payload.new : activity
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setRecentActivities((current) =>
                            current.filter((activity) => activity.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchRecentActivities = async () => {
        const { data, error } = await supabase
            .from('recent_activities')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(20);

        if (error) {
            if (error.code === 'PGRST205') {
                setRecentActivities([]);
            } else {
                console.error('Error fetching recent activities:', error);
            }
        } else {
            setRecentActivities(data || []);
        }
    };

    const getWidget = (id) => widgets.find((w) => w.id === id);

    const productivityWidget = getWidget("productivity");
    const aiSuggestionsWidget = getWidget("aiSuggestions");
    const wellbeingWidget = getWidget("wellbeing");
    const collaborationWidget = getWidget("collaboration");
    const tasksWidget = getWidget("tasks");

    const hasVisibleWidgets = widgets.some((w) => w.isVisible);

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: theme === "dark" ? "#0A0E1A" : "#F4F6FA" }}
        >
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate}
                activePage="dashboard"
                profileImage={profileImage}
                onSignOut={onSignOut}
            />

            <div className="flex-1 flex flex-col overflow-hidden w-full">
                <DashboardNavbar
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-auto dashboard-scroll-container">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {!hasVisibleWidgets && (
                                    <div className="md:col-span-2 flex flex-col items-center justify-center p-12 sm:p-16 text-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1C6AFF]/10 to-[#8C7AE7]/10 flex items-center justify-center mb-6">
                                            <Settings2 size={32} className="text-[#1C6AFF]" />
                                        </div>
                                        <h3 className="text-xl text-[#111827] mb-3">
                                            No Widgets Selected
                                        </h3>
                                        <p className="text-[#6B7280] mb-6 max-w-md">
                                            Customize your dashboard by selecting widgets that matter most to you.
                                        </p>
                                        <CustomiseButton />
                                    </div>
                                )}

                                {productivityWidget?.isVisible && (
                                    <WidgetWrapper
                                        size={productivityWidget.size}
                                        className={
                                            productivityWidget.size === "large"
                                                ? "md:col-span-2"
                                                : ""
                                        }
                                    >
                                        <ProductivityCard />
                                    </WidgetWrapper>
                                )}

                                {aiSuggestionsWidget?.isVisible && (
                                    <WidgetWrapper
                                        size={aiSuggestionsWidget.size}
                                        className={
                                            aiSuggestionsWidget.size === "large"
                                                ? "md:col-span-2"
                                                : ""
                                        }
                                    >
                                        <AISuggestionsCard />
                                    </WidgetWrapper>
                                )}

                                {wellbeingWidget?.isVisible && (
                                    <WidgetWrapper
                                        size={wellbeingWidget.size}
                                        className={
                                            wellbeingWidget.size === "large" ? "md:col-span-2" : ""
                                        }
                                    >
                                        <WellbeingCard />
                                    </WidgetWrapper>
                                )}

                                {collaborationWidget?.isVisible && (
                                    <WidgetWrapper
                                        size={collaborationWidget.size}
                                        className={
                                            collaborationWidget.size === "large"
                                                ? "md:col-span-2"
                                                : ""
                                        }
                                    >
                                        <CollaborationCard recentActivities={recentActivities} />
                                    </WidgetWrapper>
                                )}

                                {tasksWidget?.isVisible && (
                                    <WidgetWrapper
                                        size={tasksWidget.size}
                                        className={
                                            tasksWidget.size === "large" ? "md:col-span-2" : ""
                                        }
                                    >
                                        <TasksCard />
                                    </WidgetWrapper>
                                )}
                            </div>

                            <RightPanel recentActivities={recentActivities} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const settingsTabs = [
    {
        id: "account",
        label: "Account",
        icon: User,
        description: "Manage your profile",
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        description: "Control alerts",
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
        description: "Customize theme",
    },
    {
        id: "accessibility",
        label: "Accessibility",
        icon: AccessibilityIcon,
        description: "Inclusive features",
    },
    {
        id: "privacy",
        label: "Privacy",
        icon: Shield,
        description: "Security settings",
    },
    {
        id: "integrations",
        label: "Integrations",
        icon: Globe,
        description: "Connected apps",
    },
];

function SettingsPage({ onNavigate, profileImage, onSignOut }) {
    const [activeTab, setActiveTab] = useState("appearance");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [localProfileImage, setLocalProfileImage] = useState(profileImage);
    const { theme, customGradientEnabled, gradientPrimaryColor, setTheme } = useSettings();

    useEffect(() => {
        setLocalProfileImage(profileImage);
    }, [profileImage]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return <AccountSettings profileImage={localProfileImage} setProfileImage={setLocalProfileImage} />;
            case "notifications":
                return <NotificationSettings />;
            case "appearance":
                return <AppearanceSettings />;
            case "accessibility":
                return <AccessibilitySettings />;
            case "privacy":
                return <PrivacySettings />;
            case "integrations":
                return <IntegrationSettings />;
            default:
                return <AccountSettings profileImage={localProfileImage} setProfileImage={setLocalProfileImage} />;
        }
    };

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{
                backgroundColor: theme === "dark" ? "#0A0E1A" : "#F4F6FA",
            }}
        >
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate}
                activePage="settings"
                profileImage={localProfileImage}
                onSignOut={onSignOut}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <div
                    className={`relative border-b overflow-hidden px-4 sm:px-6 lg:px-8 py-6 ${
                        theme === "dark"
                            ? "bg-gradient-to-r from-[#1A1F2E] via-[#0A0E1A] to-[#1A1F2E] border-gray-700"
                            : "bg-gradient-to-r from-white via-[#F4F6FA] to-white border-gray-200"
                    }`}
                >
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                        theme === "dark"
                                            ? "bg-[#1A1F2E] hover:bg-[#2D3748]"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    <Menu
                                        size={20}
                                        className={theme === "dark" ? "text-white" : "text-gray-900"}
                                    />
                                </button>

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg accent-gradient">
                                        <SettingsIcon size={24} className="text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1
                                        className={`text-2xl font-bold ${
                                            theme === "dark" ? "text-white" : "text-[#111827]"
                                        }`}
                                    >
                                        Settings
                                    </h1>
                                    <p
                                        className={`${
                                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                                        } text-sm`}
                                    >
                                        Manage your account and preferences
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                    theme === "dark"
                                        ? "bg-[#1A1F2E] hover:bg-[#2D3748]"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun size={20} className={theme === "dark" ? "text-white" : "text-gray-900"} />
                                ) : (
                                    <Moon size={20} className={theme === "dark" ? "text-white" : "text-gray-900"} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1">
                                <div
                                    className={`rounded-2xl shadow-md p-4 sticky top-8 ${
                                        theme === "dark"
                                            ? "bg-[#1A1F2E] border border-gray-700"
                                            : "bg-white border border-gray-200"
                                    }`}
                                >
                                    <nav className="space-y-2">
                                        {settingsTabs.map((tab) => {
                                            const Icon = tab.icon;
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`w-full group p-4 rounded-xl transition-all duration-300 text-left ${
                                                        isActive
                                                            ? "accent-gradient text-white shadow-md"
                                                            : theme === "dark"
                                                                ? "bg-[#0F1419] hover:bg-[#1A1F2E] text-gray-300 hover:shadow-sm"
                                                                : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                                                isActive
                                                                    ? "bg-white/20"
                                                                    : ""
                                                            }`}
                                                            style={
                                                                isActive
                                                                    ? undefined
                                                                    : {
                                                                        background: customGradientEnabled
                                                                            ? `linear-gradient(to bottom right, ${gradientPrimaryColor}, var(--gradient-secondary))`
                                                                            : "linear-gradient(to bottom right, var(--accent-primary), var(--accent-secondary))"
                                                                    }
                                                            }
                                                        >
                                                            <Icon
                                                                size={18}
                                                                className={isActive ? "text-white" : ""}
                                                                style={{
                                                                    color: "white",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3
                                                                className={`font-semibold text-sm ${
                                                                    isActive
                                                                        ? "text-white"
                                                                        : theme === "dark"
                                                                            ? "text-white"
                                                                            : "text-gray-900"
                                                                }`}
                                                            >
                                                                {tab.label}
                                                            </h3>
                                                            <p
                                                                className={`text-xs mt-0.5 ${
                                                                    isActive
                                                                        ? "text-white/80"
                                                                        : theme === "dark"
                                                                            ? "text-gray-400"
                                                                            : "text-gray-500"
                                                                }`}
                                                            >
                                                                {tab.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </nav>

                                    <div
                                        className="mt-6 p-4 rounded-xl border"
                                        style={{
                                            background: customGradientEnabled
                                                ? `linear-gradient(to bottom right, ${gradientPrimaryColor}10, var(--gradient-secondary)10)`
                                                : "linear-gradient(to bottom right, var(--accent-primary)/10, var(--accent-secondary)/10)",
                                            borderColor: customGradientEnabled
                                                ? `${gradientPrimaryColor}30`
                                                : "var(--accent-primary)"
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: customGradientEnabled
                                                        ? `linear-gradient(to bottom right, ${gradientPrimaryColor}, var(--gradient-secondary))`
                                                        : "linear-gradient(to bottom right, var(--accent-primary), var(--accent-secondary))"
                                                }}
                                            >
                                                <HelpCircle size={16} className="text-white" />
                                            </div>
                                            <div>
                                                <h4
                                                    className={`font-semibold text-sm ${
                                                        theme === "dark" ? "text-white" : "text-gray-900"
                                                    }`}
                                                >
                                                    Need Help?
                                                </h4>
                                                <p
                                                    className={`text-xs mt-1 ${
                                                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                                                    }`}
                                                >
                                                    Visit our help center
                                                </p>
                                                <button
                                                    className="text-xs font-medium mt-2 hover:underline"
                                                    style={{
                                                        color: customGradientEnabled
                                                            ? gradientPrimaryColor
                                                            : "var(--accent-primary)"
                                                    }}
                                                >
                                                    Get Support →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3">{renderContent()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardApp() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("dashboard");
    const [profileImage, setProfileImage] = useState(null);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        fetchRecentActivities();

        const subscription = supabase
            .channel('app_recent_activities_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'recent_activities' },
                (payload) => {
                    console.log('Recent activity change received in App:', payload);

                    if (payload.eventType === 'INSERT') {
                        setRecentActivities((current) => [payload.new, ...current].slice(0, 50));
                    } else if (payload.eventType === 'UPDATE') {
                        setRecentActivities((current) =>
                            current.map((activity) =>
                                activity.id === payload.new.id ? payload.new : activity
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setRecentActivities((current) =>
                            current.filter((activity) => activity.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchRecentActivities = async () => {
        const { data, error } = await supabase
            .from('recent_activities')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(50);

        if (error) {
            if (error.code === 'PGRST205') {
                setRecentActivities([]);
            } else {
                console.error('Error fetching recent activities:', error);
            }
        } else {
            setRecentActivities(data || []);
        }
    };

    const handleSignOut = async () => {
        try {
            console.log("Signing out...");
            await doSignOut();
            console.log("Sign out successful, redirecting to /auth");
            navigate("/auth");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case "dashboard":
                return <DashboardHome onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
            case "tasks":
                return <TaskPage onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
            case "team":
                return <TeamPage onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} recentActivities={recentActivities} />;
            case "wellbeing":
                return <WellbeingPage onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
            case "ai-assistant":
                return <AIAssistantPage onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
            case "settings":
                return <SettingsPage onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
            default:
                return <DashboardHome onNavigate={setActivePage} profileImage={profileImage} onSignOut={handleSignOut} />;
        }
    };

    return (
        <>
            <AccessibilityIndicator />
            {renderPage()}
        </>
    );
}

// -----------------------------------------------------------------------------
// MAIN DASHBOARD EXPORT - Wrapped with Providers
// -----------------------------------------------------------------------------

export default function Dashboard() {
    return (
            <SettingsProvider>
                <WidgetProvider>
                    <div className="colony-dashboard">
                        <DashboardApp/>
                    </div>
                </WidgetProvider>
            </SettingsProvider>
);
}