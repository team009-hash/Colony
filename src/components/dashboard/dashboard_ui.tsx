import React, { useState, createContext, useContext, ReactNode, useRef, useEffect } from "react";
import { supabase, type Task, type TeamMember, type Project, type RecentActivity } from "../../utils/supabase/client";

import {
    Home,
    CheckSquare,
    Users,
    Bot,
    Settings as SettingsIcon,
    Calendar,
    TrendingUp,
    Heart,
    MessageSquare,
    Clock,
    Plus,
    Search,
    Bell,
    User,
    Menu,
    X,
    ChevronRight,
    MoreVertical,
    Trash2,
    Edit2,
    Filter,
    Tag,
    AlertCircle,
    Check,
    Sparkles,
    Zap,
    Target,
    Activity,
    Send,
    Palette,
    Shield,
    Globe,
    HelpCircle,
    Accessibility as AccessibilityIcon,
    Settings2,
    Eye,
    EyeOff,
    Save,
    UserPlus,
    Mail,
    Briefcase,
    MapPin,
    FileText,
    Smile,
    Meh,
    Frown,
    Upload,
    Lock,
    Download,
    Info,
    ExternalLink,
    Volume2,
    Keyboard,
    MousePointer,
    Focus,
    SidebarClose,
    Layers,
    BellOff,
    CheckCircle2,
    Type,
    Sun,
    Moon,
    Monitor,
    Brain,
    Droplets,
    Dumbbell,
    ThumbsUp,
    ThumbsDown,
    Minus,
    CheckCircle,
    Coffee,
    MessageCircle,
    LogOut,
    GitBranch,
    Figma,
    Link,
    Code,
    Music,
    Video,
    Cloud,
    Trello,
    AlertTriangle,
    Phone,
    BarChart3,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Settings Context
interface SettingsContextType {
    theme: "light" | "dark" | "auto";
    setTheme: (theme: "light" | "dark" | "auto") => void;
    accentColor: string;
    setAccentColor: (color: string) => void;
    fontSize: "small" | "medium" | "large";
    setFontSize: (size: "small" | "medium" | "large") => void;
    reducedMotion: boolean;
    setReducedMotion: (enabled: boolean) => void;
    highContrast: boolean;
    setHighContrast: (enabled: boolean) => void;
    largeCursor: boolean;
    setLargeCursor: (enabled: boolean) => void;
    // New accessibility settings
    largeText: boolean;
    setLargeText: (enabled: boolean) => void;
    enhancedFocusIndicators: boolean;
    setEnhancedFocusIndicators: (enabled: boolean) => void;
    colorBlindFriendly: boolean;
    setColorBlindFriendly: (enabled: boolean) => void;
    disableAutoplay: boolean;
    setDisableAutoplay: (enabled: boolean) => void;
    keyboardShortcutsOverlay: boolean;
    setKeyboardShortcutsOverlay: (enabled: boolean) => void;
    stickyKeysHelper: boolean;
    setStickyKeysHelper: (enabled: boolean) => void;
    screenReaderOptimization: boolean;
    setScreenReaderOptimization: (enabled: boolean) => void;
    audioDescriptions: boolean;
    setAudioDescriptions: (enabled: boolean) => void;
    textToSpeech: boolean;
    setTextToSpeech: (enabled: boolean) => void;
    colorVisionMode: "normal" | "deuteranopia" | "protanopia" | "tritanopia" | "monochromacy";
    setColorVisionMode: (mode: "normal" | "deuteranopia" | "protanopia" | "tritanopia" | "monochromacy") => void;
    // Focus Mode settings
    focusModeEnabled: boolean;
    setFocusModeEnabled: (enabled: boolean) => void;
    focusModeHideSidebar: boolean;
    setFocusModeHideSidebar: (enabled: boolean) => void;
    focusModeSimplifyUI: boolean;
    setFocusModeSimplifyUI: (enabled: boolean) => void;
    focusModeGrayscale: boolean;
    setFocusModeGrayscale: (enabled: boolean) => void;
    focusModeHideNotifications: boolean;
    setFocusModeHideNotifications: (enabled: boolean) => void;
    // Appearance settings
    customGradientEnabled: boolean;
    setCustomGradientEnabled: (enabled: boolean) => void;
    gradientPrimaryColor: string;
    setGradientPrimaryColor: (color: string) => void;
    gradientSecondaryColor: string;
    setGradientSecondaryColor: (color: string) => void;
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
    fontScale: number;
    setFontScale: (scale: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("dark");
    const [accentColor, setAccentColor] = useState("#1C6AFF"); // Updated to match navigation blue
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [largeCursor, setLargeCursor] = useState(false);
    // New accessibility settings
    const [largeText, setLargeText] = useState(false);
    const [enhancedFocusIndicators, setEnhancedFocusIndicators] = useState(false);
    const [colorBlindFriendly, setColorBlindFriendly] = useState(false);
    const [disableAutoplay, setDisableAutoplay] = useState(false);
    const [keyboardShortcutsOverlay, setKeyboardShortcutsOverlay] = useState(false);
    const [stickyKeysHelper, setStickyKeysHelper] = useState(false);
    const [screenReaderOptimization, setScreenReaderOptimization] = useState(false);
    const [audioDescriptions, setAudioDescriptions] = useState(false);
    const [textToSpeech, setTextToSpeech] = useState(false);
    const [colorVisionMode, setColorVisionMode] = useState<"normal" | "deuteranopia" | "protanopia" | "tritanopia" | "monochromacy">("normal");
    // Focus Mode state
    const [focusModeEnabled, setFocusModeEnabled] = useState(false);
    const [focusModeHideSidebar, setFocusModeHideSidebar] = useState(true);
    const [focusModeSimplifyUI, setFocusModeSimplifyUI] = useState(true);
    const [focusModeGrayscale, setFocusModeGrayscale] = useState(false);
    const [focusModeHideNotifications, setFocusModeHideNotifications] = useState(true);
    // Appearance state
    const [customGradientEnabled, setCustomGradientEnabled] = useState(false);
    const [gradientPrimaryColor, setGradientPrimaryColor] = useState("#000000");
    const [gradientSecondaryColor, setGradientSecondaryColor] = useState("#FFC371");
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [fontScale, setFontScale] = useState(16); // 16px = default

    React.useEffect(() => {
        const root = document.documentElement;

        // Secondary color map - now maps to same color for consistency (no gradients)
        const secondaryMap: Record<string, string> = {
            "#1C6AFF": "#1C6AFF", // Ocean Blue -> Ocean Blue (same)
            "#A78BFA": "#A78BFA", // Soft Violet -> Soft Violet (same)
            "#5FDCC0": "#5FDCC0", // Fresh Aqua -> Fresh Aqua (same)
            "#FFB84D": "#FFB84D", // Warm Yellow -> Warm Yellow (same)
            "#FF7BB8": "#FF7BB8", // Sweet Pink -> Sweet Pink (same)
            "#34D399": "#34D399", // Forest Green -> Forest Green (same)
        };

        // Apply theme - handle auto mode by checking system preference
        const isDark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Apply accent color or custom gradient
        if (customGradientEnabled) {
            root.style.setProperty("--accent-primary", gradientPrimaryColor);
            root.style.setProperty("--accent-color", gradientPrimaryColor);
            root.style.setProperty("--accent-secondary", gradientSecondaryColor);
            root.classList.add("custom-gradient-active");
        } else {
            root.style.setProperty("--accent-primary", accentColor);
            root.style.setProperty("--accent-color", accentColor);
            root.classList.remove("custom-gradient-active");
            // Set secondary color to same as accent color (no gradients)
            root.style.setProperty("--accent-secondary", secondaryMap[accentColor] || accentColor);
        }

        // Apply font size
        const fontSizeMap = { small: "12px", medium: "14px", large: "16px" };
        root.style.setProperty("--base-font-size", fontSizeMap[fontSize]);

        // Apply accessibility features
        if (reducedMotion) root.classList.add("reduce-motion");
        else root.classList.remove("reduce-motion");

        if (highContrast) root.classList.add("high-contrast");
        else root.classList.remove("high-contrast");

        if (largeCursor) {
            root.classList.add("large-cursor");
        } else {
            root.classList.remove("large-cursor");
        }

        // Apply new accessibility features
        if (largeText) root.classList.add("large-text");
        else root.classList.remove("large-text");

        if (enhancedFocusIndicators) {
            root.classList.add("enhanced-focus");
        } else {
            root.classList.remove("enhanced-focus");
        }

        if (colorBlindFriendly) {
            root.classList.add("color-blind-friendly");
        } else {
            root.classList.remove("color-blind-friendly");
        }

        if (disableAutoplay) root.classList.add("disable-autoplay");
        else root.classList.remove("disable-autoplay");

        if (keyboardShortcutsOverlay) root.classList.add("keyboard-shortcuts-overlay");
        else root.classList.remove("keyboard-shortcuts-overlay");

        if (stickyKeysHelper) root.classList.add("sticky-keys-helper");
        else root.classList.remove("sticky-keys-helper");

        if (screenReaderOptimization) root.classList.add("screen-reader-optimization");
        else root.classList.remove("screen-reader-optimization");

        if (audioDescriptions) root.classList.add("audio-descriptions");
        else root.classList.remove("audio-descriptions");

        if (textToSpeech) root.classList.add("text-to-speech");
        else root.classList.remove("text-to-speech");

        // Apply color vision mode
        root.classList.remove("deuteranopia", "protanopia", "tritanopia", "monochromacy");
        if (colorVisionMode !== "normal") {
            root.classList.add(colorVisionMode);

            // Update accent colors for color vision modes
            const currentAccent = customGradientEnabled ? gradientPrimaryColor : accentColor;
            const currentSecondary = customGradientEnabled ? gradientSecondaryColor : accentColor; // Use same color as accent

            // Color transformations for each mode
            const colorVisionTransforms: Record<string, Record<string, string>> = {
                deuteranopia: {
                    "#1C6AFF": "#78A5FF", // Ocean Blue
                    "#A78BFA": "#8B9FE8", // Soft Violet
                    "#5FDCC0": "#C9B896", // Fresh Aqua
                    "#FFB84D": "#FFD966", // Warm Yellow
                    "#FF7BB8": "#E88FD4", // Sweet Pink
                    "#34D399": "#F1C40F"  // Forest Green
                },
                protanopia: {
                    "#1C6AFF": "#699DFF", // Ocean Blue
                    "#A78BFA": "#7B8BE6", // Soft Violet
                    "#5FDCC0": "#95E5C8", // Fresh Aqua
                    "#FFB84D": "#E8C76A", // Warm Yellow
                    "#FF7BB8": "#B17FC7", // Sweet Pink
                    "#34D399": "#0284C7"  // Forest Green
                },
                tritanopia: {
                    "#1C6AFF": "#6ED5D0", // Ocean Blue
                    "#A78BFA": "#E88FCF", // Soft Violet
                    "#5FDCC0": "#7FE8D8", // Fresh Aqua
                    "#FFB84D": "#FF8585", // Warm Yellow
                    "#FF7BB8": "#E88FCF", // Sweet Pink
                    "#34D399": "#00BCD4"  // Forest Green
                },
                monochromacy: {
                    "#1C6AFF": "#6A6A6A", // Ocean Blue
                    "#A78BFA": "#6A6A6A", // Soft Violet
                    "#5FDCC0": "#888888", // Fresh Aqua
                    "#FFB84D": "#888888", // Warm Yellow
                    "#FF7BB8": "#666666", // Sweet Pink
                    "#34D399": "#555555"  // Forest Green
                }
            };

            const transforms = colorVisionTransforms[colorVisionMode];
            if (transforms) {
                const transformedPrimary = transforms[currentAccent] || currentAccent;
                const transformedSecondary = transforms[currentSecondary] || currentSecondary;
                root.style.setProperty("--accent-primary", transformedPrimary);
                root.style.setProperty("--accent-color", transformedPrimary);
                root.style.setProperty("--accent-secondary", transformedSecondary);
            }
        }

        // Apply focus mode
        if (focusModeEnabled) root.classList.add("focus-mode");
        else root.classList.remove("focus-mode");

        if (focusModeEnabled && focusModeHideSidebar) root.classList.add("focus-hide-sidebar");
        else root.classList.remove("focus-hide-sidebar");

        if (focusModeEnabled && focusModeSimplifyUI) root.classList.add("focus-simplify-ui");
        else root.classList.remove("focus-simplify-ui");

        if (focusModeEnabled && focusModeGrayscale) root.classList.add("focus-grayscale");
        else root.classList.remove("focus-grayscale");

        if (focusModeEnabled && focusModeHideNotifications) root.classList.add("focus-hide-notifications");
        else root.classList.remove("focus-hide-notifications");

        // Apply custom gradient OR accent color
        if (customGradientEnabled) {
            // Use custom gradient colors
            root.style.setProperty("--accent-color", gradientPrimaryColor);
            root.style.setProperty("--accent-secondary", gradientSecondaryColor);
            root.style.setProperty("--gradient-primary", gradientPrimaryColor);
            root.style.setProperty("--gradient-secondary", gradientSecondaryColor);
            root.classList.add("custom-gradient");
        } else {
            // Use selected accent color (same for both primary and secondary - no gradients)
            root.style.setProperty("--accent-color", accentColor);
            root.style.setProperty("--accent-secondary", accentColor); // Same as accent color
            root.style.setProperty("--gradient-primary", accentColor);
            root.style.setProperty("--gradient-secondary", accentColor);
            root.classList.remove("custom-gradient");
        }

        // Apply sidebar width
        root.style.setProperty("--sidebar-width", `${sidebarWidth}px`);

        // Apply font scale
        root.style.setProperty("font-size", `${fontScale}px`);
    }, [theme, accentColor, fontSize, reducedMotion, highContrast, largeCursor, largeText, enhancedFocusIndicators, colorBlindFriendly, disableAutoplay, keyboardShortcutsOverlay, stickyKeysHelper, screenReaderOptimization, audioDescriptions, textToSpeech, colorVisionMode, focusModeEnabled, focusModeHideSidebar, focusModeSimplifyUI, focusModeGrayscale, focusModeHideNotifications, customGradientEnabled, gradientPrimaryColor, gradientSecondaryColor, sidebarWidth, fontScale]);

    // Check for system theme changes when in auto mode
    React.useEffect(() => {
        if (theme !== "auto") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            const root = document.documentElement;
            if (e.matches) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    return (
        <SettingsContext.Provider
            value={{
                theme,
                setTheme,
                accentColor,
                setAccentColor,
                fontSize,
                setFontSize,
                reducedMotion,
                setReducedMotion,
                highContrast,
                setHighContrast,
                largeCursor,
                setLargeCursor,
                largeText,
                setLargeText,
                enhancedFocusIndicators,
                setEnhancedFocusIndicators,
                colorBlindFriendly,
                setColorBlindFriendly,
                disableAutoplay,
                setDisableAutoplay,
                keyboardShortcutsOverlay,
                setKeyboardShortcutsOverlay,
                stickyKeysHelper,
                setStickyKeysHelper,
                screenReaderOptimization,
                setScreenReaderOptimization,
                audioDescriptions,
                setAudioDescriptions,
                textToSpeech,
                setTextToSpeech,
                colorVisionMode,
                setColorVisionMode,
                focusModeEnabled,
                setFocusModeEnabled,
                focusModeHideSidebar,
                setFocusModeHideSidebar,
                focusModeSimplifyUI,
                setFocusModeSimplifyUI,
                focusModeGrayscale,
                setFocusModeGrayscale,
                focusModeHideNotifications,
                setFocusModeHideNotifications,
                customGradientEnabled,
                setCustomGradientEnabled,
                gradientPrimaryColor,
                setGradientPrimaryColor,
                gradientSecondaryColor,
                setGradientSecondaryColor,
                sidebarWidth,
                setSidebarWidth,
                fontScale,
                setFontScale,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }
    return context;
}

// Helper hook to get the active accent color
export function useAccentColor() {
    const { customGradientEnabled, gradientPrimaryColor, accentColor } = useSettings();
    return customGradientEnabled ? gradientPrimaryColor : accentColor;
}

// Helper hook to get gradient colors
export function useGradientColors() {
    const { customGradientEnabled, gradientPrimaryColor, gradientSecondaryColor, accentColor } = useSettings();
    if (customGradientEnabled) {
        return { primary: gradientPrimaryColor, secondary: gradientSecondaryColor };
    }
    // Default gradient using accent color
    const secondaryMap: Record<string, string> = {
        "#1C6AFF": "#8C7AE7", // Blue -> Purple
        "#9575FF": "#1C6AFF", // Purple -> Blue
        "#98F1CF": "#1C6AFF", // Mint -> Blue
        "#FBC24E": "#FF6B9D", // Yellow -> Pink
        "#FF6B9D": "#8C7AE7", // Pink -> Purple
        "#4CAF50": "#98F1CF", // Green -> Mint
    };
    return { primary: accentColor, secondary: secondaryMap[accentColor] || "#8C7AE7" };
}

// Widget Context
interface Widget {
    id: string;
    name: string;
    isVisible: boolean;
    size: "small" | "medium" | "large";
}

interface WidgetContextType {
    widgets: Widget[];
    toggleWidget: (id: string) => void;
    setWidgetSize: (id: string, size: "small" | "medium" | "large") => void;
    resetToDefault: () => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: ReactNode }) {
    const defaultWidgets: Widget[] = [
        { id: "productivity", name: "Productivity", isVisible: true, size: "medium" },
        { id: "aiSuggestions", name: "AI Suggestions", isVisible: true, size: "medium" },
        { id: "wellbeing", name: "Wellbeing", isVisible: true, size: "medium" },
        { id: "collaboration", name: "Collaboration", isVisible: true, size: "medium" },
        { id: "tasks", name: "Tasks", isVisible: true, size: "large" },
    ];

    const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);

    const toggleWidget = (id: string) => {
        setWidgets((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isVisible: !w.isVisible } : w))
        );
    };

    const setWidgetSize = (id: string, size: "small" | "medium" | "large") => {
        setWidgets((prev) =>
            prev.map((w) => (w.id === id ? { ...w, size } : w))
        );
    };

    const resetToDefault = () => {
        setWidgets([...defaultWidgets]);
    };

    return (
        <WidgetContext.Provider value={{ widgets, toggleWidget, setWidgetSize, resetToDefault }}>
            {children}
        </WidgetContext.Provider>
    );
}

export function useWidgets() {
    const context = useContext(WidgetContext);
    if (!context) {
        throw new Error("useWidgets must be used within WidgetProvider");
    }
    return context;
}


export function DashboardSidebar({
                                     isOpen,
                                     onClose,
                                     onNavigate,
                                     activePage,
                                     profileImage,
                                     currentUser,
                                     onSignOut,
                                 }: {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (page: string) => void;
    activePage: string;
    profileImage?: string | null;
    currentUser?: any;
    onSignOut?: () => void;
}) {
    const { customGradientEnabled } = useSettings();
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "tasks", label: "Tasks", icon: CheckSquare },
        { id: "team", label: "Team", icon: Users },
        { id: "wellbeing", label: "Wellbeing", icon: Heart },
        { id: "ai-assistant", label: "AI Assistant", icon: Bot },
        { id: "settings", label: "Settings", icon: SettingsIcon },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
                style={{ width: 'var(--sidebar-width, 250px)' }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))"
                                    }}
                                >
                                    <span className="text-white font-black" style={{ fontSize: '25px' }}>C</span>
                                </div>
                                <span className="font-black dark:text-white tracking-tight" style={{ color: "var(--accent-color)", fontSize: '25px' }}>Colony</span>
                            </div>
                            <button onClick={onClose} className="lg:hidden text-gray-700 dark:text-gray-300">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activePage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        onClose();
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        isActive
                                            ? "text-white shadow-lg"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                    style={
                                        isActive
                                            ? {
                                                background: "linear-gradient(to right, var(--accent-color), var(--gradient-secondary, #8C7AE7))",
                                            }
                                            : undefined
                                    }
                                >
                                    <Icon
                                        size={20}
                                        style={isActive ? undefined : (customGradientEnabled ? { color: "var(--accent-color)" } : { color: "var(--accent-color)" })}
                                    />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}

                        {/* Log out button - Fixed below Settings */}
                        <button
                            onClick={onSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        >
                            <LogOut
                                size={20}
                                style={customGradientEnabled ? { color: "var(--accent-color)" } : { color: "var(--accent-color)" }}
                            />
                            <span>Log out</span>
                        </button>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gradient-to-br dark:from-[#1C6AFF] dark:to-[#8C7AE7] flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <User size={20} className="text-gray-400 dark:text-white" strokeWidth={2.5} />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                    {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {currentUser?.email || 'user@colony.com'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}


export function DashboardNavbar({ onMenuClick, currentUser }: { onMenuClick: () => void; currentUser?: any }) {
    const { focusModeEnabled, setFocusModeEnabled, focusModeHideSidebar, theme, setTheme } = useSettings();
    const shouldHideMenuButton = focusModeEnabled && focusModeHideSidebar;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    // Search across tasks, members, and projects
    const handleSearch = async (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        try {
            const supabase = createClient(
                'https://placeholder.supabase.co',
                'placeholder-anon-key'
            );

            const searchLower = query.toLowerCase();
            const results: any[] = [];

            // Search tasks
            const { data: tasks } = await supabase
                .from('tasks')
                .select('*')
                .or(`title.ilike.%${searchLower}%,description.ilike.%${searchLower}%`)
                .limit(5);

            if (tasks) {
                tasks.forEach(task => results.push({ ...task, type: 'task' }));
            }

            // Search team members
            const { data: members } = await supabase
                .from('team_members')
                .select('*')
                .or(`name.ilike.%${searchLower}%,role.ilike.%${searchLower}%`)
                .limit(5);

            if (members) {
                members.forEach(member => results.push({ ...member, type: 'member' }));
            }

            // Search projects
            const { data: projects } = await supabase
                .from('projects')
                .select('*')
                .or(`name.ilike.%${searchLower}%,description.ilike.%${searchLower}%`)
                .limit(5);

            if (projects) {
                projects.forEach(project => results.push({ ...project, type: 'project' }));
            }

            setSearchResults(results);
            setShowResults(results.length > 0);
        } catch (error) {
            // Search failed silently
        }
    };

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 py-4">
            {/* Focus Mode Indicator */}
            {focusModeEnabled && (
                <div className="bg-[#1C6AFF]/10 dark:bg-[#1C6AFF]/20 border-l-4 border-[#1C6AFF] px-4 py-2 mb-4 rounded-r-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Focus size={16} style={{ color: 'var(--accent-color)' }} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Focus Mode Active - Distractions minimized for better concentration
            </span>
                    </div>
                    <button
                        onClick={() => setFocusModeEnabled(false)}
                        className="text-xs px-3 py-1 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
                    >
                        Exit
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    {!shouldHideMenuButton && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search tasks, members, projects..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            onFocus={() => searchResults.length > 0 && setShowResults(true)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                        />

                        {/* Search Results Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={`${result.type}-${result.id || index}`}
                                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            {result.type === 'task' && <CheckSquare size={16} className="text-blue-500" />}
                                            {result.type === 'member' && <Users size={16} className="text-green-500" />}
                                            {result.type === 'project' && <FolderOpen size={16} className="text-purple-500" />}
                                            <div className="flex-1">
                                                <p className="font-medium text-sm text-gray-900 dark:text-white">
                                                    {result.title || result.name}
                                                </p>
                                                {(result.description || result.role) && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        {result.description || result.role}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase">
                        {result.type}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setFocusModeEnabled(!focusModeEnabled)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            focusModeEnabled
                                ? 'bg-[#1C6AFF] text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        aria-label="Toggle focus mode"
                        title={focusModeEnabled ? "Disable Focus Mode" : "Enable Focus Mode"}
                    >
                        <Focus size={20} />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors notification">
                        <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </div>
        </header>
    );
}


export function WidgetWrapper({
                                  children,
                                  size,
                                  fullWidth = false,
                              }: {
    children: ReactNode;
    size: "small" | "medium" | "large";
    fullWidth?: boolean;
}) {
    // Map size to grid column spans
    const sizeClasses = {
        small: "lg:col-span-1",
        medium: "lg:col-span-2",
        large: "lg:col-span-3"
    };

    const colSpan = fullWidth ? "lg:col-span-3" : sizeClasses[size];
    return <div className={colSpan}>{children}</div>;
}


export function ProductivityCard() {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();

    const data = [
        { day: "Mon", hours: 6.5 },
        { day: "Tue", hours: 7.2 },
        { day: "Wed", hours: 5.8 },
        { day: "Thu", hours: 8.1 },
        { day: "Fri", hours: 7.5 },
        { day: "Sat", hours: 4.2 },
        { day: "Sun", hours: 3.5 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">Productivity</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This week's focus time</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${accentColor}10, ${gradients.secondary}10)` }}>
                    <TrendingUp size={24} style={{ color: accentColor }} />
                </div>
            </div>

            <div className="mb-4">
                <div className="text-3xl font-bold text-[#111827] dark:text-white">42.8h</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-green-600 dark:text-green-400">↑ 12%</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">vs last week</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={accentColor} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="hours"
                        stroke={accentColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorHours)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}



export function AISuggestionsCard() {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const [searchQuery, setSearchQuery] = useState("");

    const suggestions = [
        {
            id: 1,
            title: "Take a 10-minute break",
            description: "You've been focused for 2 hours",
            icon: Clock,
        },
        {
            id: 2,
            title: "Review pending tasks",
            description: "3 tasks due today",
            icon: CheckSquare,
        },
        {
            id: 3,
            title: "Schedule team sync",
            description: "Good time to connect",
            icon: Users,
        },
    ];

    // Filter suggestions based on search query
    const filteredSuggestions = suggestions.filter((suggestion) => {
        const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            suggestion.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Personalized recommendations</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${accentColor}10, ${gradients.secondary}10)` }}>
                    <Sparkles size={24} style={{ color: accentColor }} />
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search suggestions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                        style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                    />
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {filteredSuggestions.length === 0 ? (
                    <div className="text-center py-8">
                        <Sparkles size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No suggestions found</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
                    </div>
                ) : (
                    filteredSuggestions.map((suggestion) => {
                        const Icon = suggestion.icon;
                        return (
                            <div
                                key={suggestion.id}
                                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(to bottom right, ${gradients.primary}, ${gradients.secondary})` }}>
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{suggestion.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{suggestion.description}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400 mt-1" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <button
                className="w-full px-4 py-3 text-white rounded-xl hover:shadow-lg transition-shadow font-medium text-sm flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
            >
                <Sparkles size={18} />
                Get More Insights
            </button>
        </div>
    );
}



export function WellbeingCard() {
    const moodData = [
        { name: "Mon", mood: 7 },
        { name: "Tue", mood: 8 },
        { name: "Wed", mood: 6 },
        { name: "Thu", mood: 9 },
        { name: "Fri", mood: 8 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">Wellbeing</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your weekly mood tracker</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#98F1CF]/10 to-[#FBC24E]/10 flex items-center justify-center">
                    <Heart size={24} className="text-[#98F1CF]" />
                </div>
            </div>

            <div className="mb-4">
                <div className="text-3xl font-bold text-[#111827] dark:text-white">7.6/10</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Average mood this week</p>
            </div>

            <ResponsiveContainer width="100%" height={150}>
                <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: "12px" }} />
                    <YAxis domain={[0, 10]} stroke="#6B7280" style={{ fontSize: "12px" }} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#98F1CF"
                        strokeWidth={3}
                        dot={{ fill: "#98F1CF", r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Droplets size={18} className="text-blue-600 dark:text-blue-400" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Water</p>
                        <p className="font-medium text-gray-900 dark:text-white">6/8 glasses</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Brain size={18} className="text-purple-600 dark:text-purple-400" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Meditation</p>
                        <p className="font-medium text-gray-900 dark:text-white">15 min</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Dumbbell size={18} className="text-orange-600 dark:text-orange-400" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Exercise</p>
                        <p className="font-medium text-gray-900 dark:text-white">3/5 days</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <Moon size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sleep</p>
                        <p className="font-medium text-gray-900 dark:text-white">7.5 hrs</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                    <Smile size={20} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-900 dark:text-green-300 font-medium">Great progress!</span>
                </div>
                <ChevronRight size={16} className="text-green-600 dark:text-green-400" />
            </div>
        </div>
    );
}


export function CollaborationCard({ recentActivities = [] }: { recentActivities?: RecentActivity[] }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter to show ONLY completed tasks
    const completedTaskActivities = recentActivities.filter((activity) => {
        // Only show activities where tasks were completed
        const isCompletedTask =
            activity.action?.toLowerCase().includes('completed') ||
            activity.description?.toLowerCase().includes('completed task');

        return isCompletedTask;
    });

    // Then filter by search query
    const filteredActivities = completedTaskActivities.filter((activity) => {
        if (!searchQuery) return true;

        const matchesSearch =
            activity.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.entity_name?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const activities = filteredActivities.slice(0, 5); // Show top 5 completed tasks

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">Collaboration Feed</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Completed tasks</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${gradients.secondary}10, ${accentColor}10)` }}>
                    <Users size={24} style={{ color: gradients.secondary }} />
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search completed tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                        style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {activities.length === 0 ? (
                    <div className="text-center py-8">
                        <Users size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {searchQuery ? "No completed tasks found" : "No completed tasks yet"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {searchQuery ? "Try a different search term" : "Completed tasks will appear here"}
                        </p>
                    </div>
                ) : (
                    activities.map((activity) => {
                        const initials = activity.user_name?.substring(0, 2).toUpperCase() || '??';
                        const timeAgo = new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const actionText = activity.action || activity.description || 'performed an action';
                        const entityText = activity.entity_name || '';

                        return (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(to bottom right, ${gradients.primary}, ${gradients.secondary})` }}>
                                    <span className="text-white text-xs font-semibold">{initials}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 dark:text-gray-100">
                                        <span className="font-semibold">{activity.user_name}</span> {actionText} {entityText && <span className="font-medium">{entityText}</span>}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{timeAgo}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <button className="w-full mt-4 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-shadow font-medium text-sm flex items-center justify-center gap-2" style={{ background: `linear-gradient(to bottom right, ${gradients.secondary}, ${gradients.primary})` }}>
                <Users size={18} />
                View All Completed Tasks
            </button>
        </div>
    );
}


export function TasksCard({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch tasks and set up real-time subscription
    useEffect(() => {
        fetchTasks();

        const subscription = supabase
            .channel('dashboard_tasks_widget_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tasks' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setTasks((current) => [...current, payload.new as Task]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTasks((current) =>
                            current.map((task) =>
                                task.id === payload.new.id ? (payload.new as Task) : task
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
            // Silently handle table not found errors (PGRST205)
            if (error.code === 'PGRST205') {
                setTasks([]);
            } else {
                console.error('Error fetching tasks for dashboard widget:', error);
            }
        } else {
            setTasks(data || []);
        }
    };

    // Filter to show only pending (not completed) tasks and match search query
    const pendingTasks = tasks.filter(task => {
        if (task.completed) return false;
        if (!searchQuery) return true;

        const matchesSearch =
            task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.priority?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    const priorityColors: Record<string, string> = {
        high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">Task Summary</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your priorities today</p>
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                        style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                    />
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {pendingTasks.length === 0 ? (
                    <div className="text-center py-8">
                        <CheckSquare size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {searchQuery ? "No tasks found" : "No pending tasks"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {searchQuery ? "Try a different search term" : "Create a task to get started"}
                        </p>
                    </div>
                ) : (
                    pendingTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                        >
                            {/* Read-only checkbox - no click handler */}
                            <div
                                className="w-5 h-5 rounded border-2 flex items-center justify-center pointer-events-none"
                                style={task.completed ? { backgroundColor: accentColor, borderColor: accentColor } : { borderColor: "#D1D5DB" }}
                            >
                                {task.completed && <Check size={14} className="text-white" />}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                                    {task.title}
                                </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => onNavigate?.("tasks")}
                className="w-full px-4 py-3 text-white rounded-xl hover:shadow-lg transition-shadow font-medium text-sm flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
            >
                <CheckSquare size={18} />
                View All Tasks
            </button>
        </div>
    );
}


export const QuickTasksCard = TasksCard;


export function RightPanel() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [scheduleSearchQuery, setScheduleSearchQuery] = useState("");
    const accentColor = useAccentColor();

    // Fetch tasks and set up real-time subscription
    useEffect(() => {
        fetchTasks();

        const subscription = supabase
            .channel('right_panel_tasks_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tasks' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setTasks((current) => [...current, payload.new as Task]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTasks((current) =>
                            current.map((task) =>
                                task.id === payload.new.id ? (payload.new as Task) : task
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
            // Silently handle table not found errors (PGRST205)
            if (error.code === 'PGRST205') {
                setTasks([]);
            } else {
                console.error('Error fetching tasks for right panel:', error);
            }
        } else {
            setTasks(data || []);
        }
    };

    // Calculate real-time stats
    const totalTasks = React.useMemo(() => tasks.length, [tasks]);
    const completedTasks = React.useMemo(() => tasks.filter(t => t.completed).length, [tasks]);

    const scheduleItems = [
        { id: 1, time: "09:00", title: "Team Standup", color: "bg-blue-500" },
        { id: 2, time: "10:30", title: "Project Review", color: "bg-purple-500" },
        { id: 3, time: "13:00", title: "Lunch Break", color: "bg-yellow-500" },
        { id: 4, time: "14:00", title: "Client Call", color: "bg-blue-500" },
        { id: 5, time: "16:00", title: "Focus Time", color: "bg-purple-500" },
    ];

    // Filter schedule items based on search query
    const filteredScheduleItems = scheduleItems.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) ||
            item.time.toLowerCase().includes(scheduleSearchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="w-full lg:w-80 flex-shrink-0 sticky top-6 self-start pb-24">
            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center flex-shrink-0">
                        <Calendar size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-[#111827] dark:text-white">Today's Schedule</h3>
                </div>

                {/* Search Input */}
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search schedule..."
                            value={scheduleSearchQuery}
                            onChange={(e) => setScheduleSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                            style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredScheduleItems.length === 0 ? (
                        <div className="text-center py-8">
                            <Calendar size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">No meetings found</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
                        </div>
                    ) : (
                        filteredScheduleItems.map((item) => (
                            <div key={item.id} className="flex items-start gap-3">
                                <div className="flex flex-col items-start pt-1">
                                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 dark:text-white font-semibold">{item.time}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{item.title}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Time for a break card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mt-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#98F1CF]/40 to-[#FBC24E]/40 flex items-center justify-center flex-shrink-0">
                        <Coffee size={28} className="text-gray-700 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg text-[#111827] dark:text-white mb-2">Time for a break!</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            You've been focused for 90 minutes. Take a 2-minute stretch break to recharge.
                        </p>
                    </div>
                </div>
                <button className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold text-sm">
                    Start Break
                </button>
            </div>

            {/* Quick Stats card - Now with real data */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mt-6">
                <h3 className="font-semibold text-lg text-[#111827] dark:text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tasks completed</span>
                        <span className="text-lg font-semibold text-[#111827] dark:text-white">
              {totalTasks === 0 ? '0/0' : `${completedTasks}/${totalTasks}`}
            </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active tasks</span>
                        <span className="text-lg font-semibold text-[#111827] dark:text-white">
              {totalTasks - completedTasks}
            </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completion rate</span>
                        <span className="text-lg font-semibold text-[#111827] dark:text-white">
              {totalTasks === 0 ? '0%' : `${Math.round((completedTasks / totalTasks) * 100)}%`}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CustomiseButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { widgets, toggleWidget, setWidgetSize, resetToDefault } = useWidgets();
    const { focusModeEnabled, focusModeSimplifyUI, theme } = useSettings();
    const { primary, secondary } = useGradientColors();
    const accentColor = useAccentColor();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Hide customise button in focus mode with simplify UI
    if (focusModeEnabled && focusModeSimplifyUI) {
        return null;
    }

    const getWidgetIcon = (widgetId: string) => {
        switch (widgetId) {
            case 'productivity': return TrendingUp;
            case 'aiSuggestions': return Sparkles;
            case 'wellbeing': return Heart;
            case 'collaboration': return Users;
            case 'tasks': return CheckSquare;
            default: return Layers;
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                    boxShadow: `0 10px 30px ${accentColor}40`
                }}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-2xl hover:scale-105 transition-all z-30 group"
                aria-label="Customize dashboard"
            >
                <Settings2 size={26} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-700"
                        style={{
                            boxShadow: `0 25px 50px -12px ${accentColor}20`
                        }}
                    >
                        {/* Header */}
                        <div className="relative p-8 border-b border-gray-200 dark:border-gray-700">
                            <div
                                className="absolute inset-0 opacity-5"
                                style={{
                                    background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                }}
                            />
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                        }}
                                    >
                                        <Layers size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Customize Dashboard</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure your widgets and layout preferences</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-all hover:rotate-90"
                                >
                                    <X size={22} />
                                </button>
                            </div>
                        </div>

                        {/* Widget Grid */}
                        <div className="p-8 overflow-y-auto max-h-[calc(85vh-240px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {widgets.map((widget) => {
                                    const WidgetIcon = getWidgetIcon(widget.id);
                                    return (
                                        <div
                                            key={widget.id}
                                            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                                                widget.isVisible
                                                    ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border-transparent shadow-lg'
                                                    : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
                                            }`}
                                            style={widget.isVisible ? {
                                                boxShadow: `0 8px 24px ${accentColor}15`,
                                                borderColor: `${accentColor}30`
                                            } : {}}
                                        >
                                            {/* Gradient overlay for active widgets */}
                                            {widget.isVisible && (
                                                <div
                                                    className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                                    }}
                                                />
                                            )}

                                            <div className="relative flex items-start justify-between mb-4">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <div
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                                            widget.isVisible
                                                                ? 'shadow-md'
                                                                : 'bg-gray-200 dark:bg-gray-700'
                                                        }`}
                                                        style={widget.isVisible ? {
                                                            background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                                        } : {}}
                                                    >
                                                        <WidgetIcon
                                                            size={22}
                                                            className={widget.isVisible ? 'text-white' : 'text-gray-400'}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`font-bold text-lg ${
                                                            widget.isVisible
                                                                ? 'text-gray-900 dark:text-white'
                                                                : 'text-gray-500 dark:text-gray-500'
                                                        }`}>
                                                            {widget.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                                                            {widget.isVisible ? (
                                                                <>
                                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                                    Active
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                                                                    Disabled
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Toggle Button */}
                                                <button
                                                    onClick={() => toggleWidget(widget.id)}
                                                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                                                        widget.isVisible
                                                            ? 'shadow-inner'
                                                            : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}
                                                    style={widget.isVisible ? {
                                                        background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                                    } : {}}
                                                >
                                                    <div
                                                        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                                                            widget.isVisible ? 'left-7' : 'left-0.5'
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Size Selector */}
                                            <div className="relative">
                                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2.5">
                                                    Widget Size
                                                </label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['small', 'medium', 'large'].map((sizeOption) => (
                                                        <button
                                                            key={sizeOption}
                                                            onClick={() => setWidgetSize(widget.id, sizeOption as "small" | "medium" | "large")}
                                                            disabled={!widget.isVisible}
                                                            className={`relative py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                                                                widget.size === sizeOption && widget.isVisible
                                                                    ? 'text-white shadow-md'
                                                                    : widget.isVisible
                                                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                                            }`}
                                                            style={widget.size === sizeOption && widget.isVisible ? {
                                                                background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                                            } : {}}
                                                        >
                                                            {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                                {/* Visual size indicator */}
                                                <div className="mt-3 flex items-center gap-1.5 justify-center">
                                                    <div className={`h-1.5 rounded-full transition-all ${widget.size === 'small' ? 'w-4' : 'w-2'} ${widget.isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}`} />
                                                    <div className={`h-1.5 rounded-full transition-all ${widget.size === 'medium' ? 'w-6' : 'w-2'} ${widget.isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}`} />
                                                    <div className={`h-1.5 rounded-full transition-all ${widget.size === 'large' ? 'w-8' : 'w-2'} ${widget.isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}`} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        resetToDefault();
                                    }}
                                    className="flex-1 py-3.5 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <Activity size={18} />
                                    Reset to Default
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3.5 px-6 text-white rounded-xl font-semibold transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                    style={{
                                        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                                        boxShadow: `0 10px 30px ${accentColor}30`
                                    }}
                                >
                                    <Check size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


export function TaskHeader({ onAddTask, onMenuClick }: { onAddTask: () => void; onMenuClick?: () => void }) {
    const gradients = useGradientColors();
    const { theme, setTheme } = useSettings();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Tasks</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your tasks and priorities</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                    <button
                        onClick={onAddTask}
                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-shadow"
                        style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Add Task</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export function TaskSidebar() {
    return (
        <aside className="hidden xl:block w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            {/* Task Stats removed */}
        </aside>
    );
}

export function TaskFilters({
                                activeFilter,
                                onFilterChange,
                            }: {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}) {
    const filters = [
        { id: "all", label: "All Tasks" },
        { id: "active", label: "Active" },
        { id: "completed", label: "Completed" },
        { id: "high", label: "High Priority" },
    ];

    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                        activeFilter === filter.id
                            ? "bg-[#1C6AFF] text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}

export function TaskList({
                             tasks,
                             onToggle,
                             onDelete,
                             onEdit,
                             filter,
                         }: {
    tasks: any[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: any) => void;
    filter: string;
}) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        if (filter === "high") return task.priority === "high";
        return true;
    });

    const priorityColors = {
        high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            {/* Checkbox */}
                            <div
                                onClick={() => onToggle(task.id)}
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center cursor-pointer mt-0.5 sm:mt-1 flex-shrink-0 ${
                                    task.completed ? "bg-[#1C6AFF] border-[#1C6AFF]" : "border-gray-300 dark:border-gray-600"
                                }`}
                            >
                                {task.completed && <Check size={14} className="text-white sm:w-4 sm:h-4" />}
                            </div>

                            {/* Task Content */}
                            <div className="flex-1 min-w-0">
                                <h4 className={`font-semibold text-sm sm:text-base text-gray-900 dark:text-white ${task.completed ? "line-through" : ""}`}>
                                    {task.title}
                                </h4>
                                {task.description && (
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {task.description}
                                    </p>
                                )}

                                {/* Metadata - Stacks on mobile */}
                                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
                  <span className={`px-2 py-0.5 sm:py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                                    {task.dueDate && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={12} className="flex-shrink-0" />
                      <span className="truncate">{task.dueDate}</span>
                    </span>
                                    )}
                                    {task.category && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Tag size={12} className="flex-shrink-0" />
                      <span className="truncate">{task.category}</span>
                    </span>
                                    )}
                                </div>

                                {/* Buttons - Full width on mobile, inline on desktop */}
                                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:hidden">
                                    <button
                                        onClick={() => onEdit(task)}
                                        className="w-full px-3 py-2 bg-[#1C6AFF] hover:bg-[#1557CC] text-white rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(task.id)}
                                        className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Buttons - Hidden on mobile */}
                            <div className="hidden sm:flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="px-3 py-1.5 bg-[#1C6AFF] hover:bg-[#1557CC] text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export function TaskStats({ tasks }: { tasks: any[] }) {
    const { theme } = useSettings();
    const accentColor = useAccentColor();
    const gradients = useGradientColors();

    const totalTasks = React.useMemo(() => tasks.length, [tasks]);
    const completedTasks = React.useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
    const inProgressTasks = React.useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);
    const completionPercentage = React.useMemo(() =>
            totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        [totalTasks, completedTasks]
    );

    const isDark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const stats = [
        {
            label: "Total Tasks",
            value: totalTasks,
            gradient: `linear-gradient(to bottom right, ${gradients.primary}, ${gradients.secondary})`,
            textColor: "text-white/90",
            valueColor: "text-white"
        },
        {
            label: "Completed",
            value: completedTasks,
            gradient: "linear-gradient(to bottom right, #98F1CF, #5CD9A8)",
            textColor: "text-gray-800/90",
            valueColor: "text-gray-900"
        },
        {
            label: "In Progress",
            value: inProgressTasks,
            gradient: "linear-gradient(to bottom right, #FBC24E, #FF9F2E)",
            textColor: "text-gray-800/90",
            valueColor: "text-gray-900"
        },
        {
            label: "Completion",
            value: `${completionPercentage}%`,
            gradient: `linear-gradient(to bottom right, ${gradients.secondary}, ${gradients.primary})`,
            textColor: "text-white/90",
            valueColor: "text-white"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="p-6 rounded-2xl border border-white/20 shadow-lg"
                    style={{ background: stat.gradient }}
                >
                    <p className={`text-sm font-semibold ${stat.textColor} mb-2`}>{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
}

export function AddTaskModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (task: any) => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [project, setProject] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title,
            description,
            priority,
            due_date: dueDate || null,
            dueDate: dueDate || null,
            completed: false,
            category: category || 'General',
            project: project || 'General'
        });

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setCategory('');
        setProject('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                placeholder="Enter task title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                rows={3}
                                placeholder="Enter task description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project</label>
                            <input
                                type="text"
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': accentColor } as any}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': accentColor } as any}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-shadow"
                                style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function EditTaskModal({
                                  isOpen,
                                  onClose,
                                  task,
                                  onSave
                              }: {
    isOpen: boolean;
    onClose: () => void;
    task: any;
    onSave: (updatedTask: any) => void;
}) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [priority, setPriority] = useState(task?.priority || 'medium');
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [completed, setCompleted] = useState(task?.completed || false);
    const [category, setCategory] = useState(task?.category || '');

    // Update form when task changes
    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setPriority(task.priority || 'medium');
            setDueDate(task.dueDate || '');
            setCompleted(task.completed || false);
            setCategory(task.category || '');
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title,
            description,
            priority,
            dueDate,
            completed,
            category
        };

        onSave(updatedTask);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Task</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                placeholder="Enter task title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                rows={3}
                                placeholder="Enter task description"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': accentColor } as any}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={completed}
                                        onChange={(e) => setCompleted(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#1C6AFF] focus:ring-2"
                                        style={{ '--tw-ring-color': accentColor } as any}
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mark as completed</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                                placeholder="Enter category"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': accentColor } as any}
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-shadow"
                                style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export function TeamHeader({ onAddMember, onMenuClick }: { onAddMember: () => void; onMenuClick?: () => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme, setTheme } = useSettings();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Team</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your team and collaborate</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                    <button
                        onClick={onAddMember}
                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-shadow"
                        style={{ background: `linear-gradient(to right, ${gradients.primary}, ${gradients.secondary})` }}
                    >
                        <UserPlus size={20} />
                        <span className="hidden sm:inline">Add Member</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export function TeamSidebar() {
    return null;
}

export function TeamStats({ members, projects }: { members: any[]; projects: any[] }) {
    const onlineMembers = members.filter(m => m.status === "online").length;
    const totalTasks = members.reduce((sum, m) => sum + m.tasksCompleted, 0);
    const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Team Stats</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overview of team performance</p>
            </div>

            <div className="space-y-5">
                {/* Online Members */}
                <div className="p-4 rounded-xl bg-[#98F1CF]/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#98F1CF] flex items-center justify-center">
                            <Users size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Online Members</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{onlineMembers} / {members.length}</p>
                        </div>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                        <div
                            className="bg-[#98F1CF] h-2 rounded-full transition-all"
                            style={{ width: `${(onlineMembers / members.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Tasks Completed */}
                <div className="p-4 rounded-xl bg-[#1C6AFF]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <CheckCircle size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wide text-white/70 font-medium">Tasks Completed</p>
                            <p className="text-sm font-semibold text-white">{totalTasks}</p>
                        </div>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all"
                            style={{ width: "85%" }}
                        />
                    </div>
                </div>

                {/* Active Projects */}
                <div className="p-4 rounded-xl bg-[#8C7AE7]/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#8C7AE7] flex items-center justify-center">
                            <Briefcase size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Active Projects</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{projects.length} / {projects.length}</p>
                        </div>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                        <div
                            className="bg-[#8C7AE7] h-2 rounded-full transition-all"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>

                {/* Avg Progress */}
                <div className="p-4 rounded-xl bg-[#FBC24E]/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FBC24E] flex items-center justify-center">
                            <TrendingUp size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Avg Progress</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{avgProgress}%</p>
                        </div>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                        <div
                            className="bg-[#FBC24E] h-2 rounded-full transition-all"
                            style={{ width: `${avgProgress}%` }}
                        />
                    </div>
                </div>

                {/* Team Health Score */}
                <div className="p-5 rounded-xl bg-[#8C7AE7]/5 border border-[#8C7AE7]/10 text-center">
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">Team Health Score</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">75%</p>
                    <p className="text-sm text-gray-600">Great team engagement!</p>
                </div>
            </div>
        </div>
    );
}

export function TeamMembers({ members }: { members: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Team Members</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{members.length} members in your team</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((member) => (
                    <div key={member.id} className="p-5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                        {/* Header with avatar and info */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="relative">
                                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${member.status === "online" ? "bg-green-500" : "bg-yellow-500"}`} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    <Mail size={12} />
                                    <span>{member.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tasks Done</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{member.tasksCompleted}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Projects</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{member.activeProjects}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === "online"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
              }`}>
                {member.status === "online" ? "Online" : "Away"}
              </span>
                            <button className="text-sm font-medium text-[#1C6AFF] hover:text-[#1557d8]">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TeamProjects({ projects, members }: { projects: any[]; members: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track progress across all team projects</p>
            </div>
            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center flex-shrink-0">
                                <FileText size={20} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    Active
                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Dec {new Date(project.deadline).getDate()}
                  </span>
                                    <span className="flex items-center gap-1">
                    <Users size={12} />
                                        {project.members.length} members
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                                <span className="text-sm font-semibold text-[#1C6AFF]">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-[#1C6AFF] h-2 rounded-full transition-all"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {project.members.slice(0, 3).map((memberId: string) => {
                                    const member = members.find((m) => m.id === memberId);
                                    return member ? (
                                        <img
                                            key={memberId}
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                            title={member.name}
                                        />
                                    ) : null;
                                })}
                            </div>
                            <button className="text-sm font-medium text-[#1C6AFF] hover:text-[#1557d8]">
                                View Project
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TeamActivity({ activities, members }: { activities: any[]; members: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#111827] dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => {
                    const member = members.find((m) => m.id === activity.userId);
                    return (
                        <div key={activity.id} className="flex items-start gap-3">
                            {member && (
                                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            )}
                            <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-white">
                                    <span className="font-semibold">{member?.name}</span> {activity.action}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function AddMemberDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('Engineering');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !role.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const supabase = createClient(
                'https://placeholder.supabase.co',
                'placeholder-anon-key'
            );

            const { data, error } = await supabase
                .from('team_members')
                .insert([
                    {
                        name: name.trim(),
                        email: email.trim(),
                        phone: phone.trim() || null,
                        role: role.trim(),
                        department: department,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=random`,
                        status: 'offline'
                    }
                ])
                .select();

            if (error) throw error;

            // Add to recent activities
            await supabase.from('recent_activities').insert([
                {
                    action: `added ${name.trim()} to the team`,
                    timestamp: new Date().toISOString(),
                    type: 'member_added',
                    userId: data?.[0]?.id
                }
            ]);

            // Reset form and close
            setName('');
            setEmail('');
            setPhone('');
            setRole('');
            setDepartment('Engineering');
            onClose();
        } catch (error) {
            console.error('Error adding member:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Team Member</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                                placeholder="Enter member name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                                placeholder="Enter phone number (optional)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                                placeholder="Enter role"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                            >
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Product">Product</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#1C6AFF] to-[#8C7AE7] text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add Member'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function AIHeader({ onNewChat, onMenuClick }: { onNewChat: () => void; onMenuClick?: () => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme, setTheme } = useSettings();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className="relative border-b border-gray-200 dark:border-gray-700/50 bg-gradient-to-r from-white via-gray-50/50 to-white dark:from-[#0A0E1A] dark:via-[#1A1F2E]/50 dark:to-[#0A0E1A] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Animated Background Gradient */}
            <div
                className="absolute inset-0 animate-pulse opacity-30"
                style={{
                    background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05, ${accentColor}15)`
                }}
            />

            <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-4">
                    {onMenuClick && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    )}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="relative">
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                                    boxShadow: `0 10px 30px ${accentColor}40`
                                }}
                            >
                                <Sparkles size={20} className="text-white sm:hidden" />
                                <Sparkles size={24} className="text-white hidden sm:block lg:hidden" />
                                <Sparkles size={28} className="text-white hidden lg:block" />
                            </div>
                            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#0A0E1A] animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 sm:gap-2">
                                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="hidden sm:inline">Online & ready to help</span>
                                <span className="sm:hidden">Online</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={18} className="text-yellow-500 sm:w-5 sm:h-5" />
                        ) : (
                            <Moon size={18} className="text-gray-700 sm:w-5 sm:h-5" />
                        )}
                    </button>
                    <button
                        onClick={onNewChat}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-white rounded-xl hover:shadow-xl transition-all shadow-lg text-sm sm:text-base font-medium"
                        style={{ background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})` }}
                    >
                        <Plus size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">New Chat</span>
                        <span className="sm:hidden">New</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export function WelcomeCard({ onActionClick }: { onActionClick: (message: string) => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme } = useSettings();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const actions = [
        {
            title: "Prioritize my tasks",
            description: "Get AI-powered task prioritization",
            icon: Target,
            message: "Help me prioritize my tasks for today",
        },
        {
            title: "Check team availability",
            description: "See who's available to collaborate",
            icon: Users,
            message: "Who is available on my team right now?",
        },
        {
            title: "Track my wellbeing",
            description: "Log your mood and get insights",
            icon: Heart,
            message: "I'd like to log my mood today",
        },
        {
            title: "Start focus session",
            description: "Begin a productive work session",
            icon: Zap,
            message: "Start a focus session for me",
        },
    ];

    return (
        <div className="text-center py-4 sm:py-6 px-4">
            <div className="relative inline-block mb-4 sm:mb-6">
                <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse"
                    style={{ background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})` }}
                />
                <div
                    className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl mx-auto flex items-center justify-center shadow-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                        boxShadow: `0 20px 60px ${accentColor}50`
                    }}
                >
                    <Sparkles size={32} className="text-white sm:hidden" />
                    <Sparkles size={40} className="text-white hidden sm:block lg:hidden" />
                    <Sparkles size={48} className="text-white hidden lg:block" />
                </div>
            </div>

            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-4 px-4`}>
                Welcome to AI Assistant
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}>
                Your intelligent companion for productivity, wellbeing, and collaboration
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 max-w-4xl mx-auto">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.title}
                            onClick={() => onActionClick(action.message)}
                            className={`group relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} border hover:border-transparent hover:shadow-2xl transition-all duration-300 text-left overflow-hidden backdrop-blur-sm`}
                            style={{
                                boxShadow: 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 20px 40px ${accentColor}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                                style={{ background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})` }}
                            />

                            <div className="relative flex items-start gap-3 sm:gap-4">
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <Icon size={22} className="sm:hidden" style={{ color: accentColor }} />
                                    <Icon size={26} className="hidden sm:block" style={{ color: accentColor }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-1.5 text-base sm:text-lg`}>{action.title}</h3>
                                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{action.description}</p>
                                </div>
                                <ChevronRight size={18} className={`${isDark ? 'text-gray-600' : 'text-gray-300'} transition-colors flex-shrink-0 mt-1 sm:hidden`} style={{ color: 'inherit' }} />
                                <ChevronRight size={22} className={`${isDark ? 'text-gray-600' : 'text-gray-300'} transition-colors flex-shrink-0 mt-1 hidden sm:block`} style={{ color: 'inherit' }} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function Suggestions({ onSuggestionClick }: { onSuggestionClick: (message: string) => void }) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme } = useSettings();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const suggestions = [
        { text: "How can I improve my productivity?", icon: TrendingUp },
        { text: "Show me my progress this week", icon: BarChart3 },
        { text: "What tasks should I focus on?", icon: Target },
    ];

    return (
        <div className={`-mt-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div
                    className="w-1 h-4 sm:h-5 rounded-full"
                    style={{ background: `linear-gradient(180deg, ${gradients.primary}, ${gradients.secondary})` }}
                />
                <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Quick suggestions</p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;
                    return (
                        <button
                            key={suggestion.text}
                            onClick={() => onSuggestionClick(suggestion.text)}
                            className={`group relative flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-lg sm:rounded-xl ${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'} border text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-all duration-300 hover:shadow-lg overflow-hidden`}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = accentColor;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                const icon = e.currentTarget.querySelector('svg');
                                if (icon) {
                                    (icon as HTMLElement).style.color = accentColor;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgb(229, 231, 235)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                const icon = e.currentTarget.querySelector('svg');
                                if (icon) {
                                    (icon as HTMLElement).style.color = isDark ? 'rgb(156, 163, 175)' : 'rgb(156, 163, 175)';
                                }
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}03)`
                                }}
                            />
                            <div className="relative flex items-center gap-2 sm:gap-3">
                                <Icon size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-400'} transition-colors duration-300 sm:hidden`} />
                                <Icon size={18} className={`${isDark ? 'text-gray-400' : 'text-gray-400'} transition-colors duration-300 hidden sm:block`} />
                                <span className="font-medium">{suggestion.text}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function ChatArea({
                             messages,
                             isTyping,
                             inputValue,
                             onInputChange,
                             onSendMessage,
                             messagesEndRef,
                         }: {
    messages: any[];
    isTyping: boolean;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSendMessage: (message: string) => void;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme } = useSettings();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`flex gap-2 sm:gap-3 lg:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {message.role === "assistant" && (
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                                    boxShadow: `0 10px 25px ${accentColor}30`
                                }}
                            >
                                <Bot size={16} className="text-white sm:hidden" />
                                <Bot size={20} className="text-white hidden sm:block" />
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] sm:max-w-2xl p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl shadow-sm ${
                                message.role === "user"
                                    ? "text-white shadow-lg"
                                    : `${isDark ? 'bg-gray-800/80 text-white border-gray-700/50' : 'bg-white text-gray-900 border-gray-200'} border backdrop-blur-sm`
                            }`}
                            style={
                                message.role === "user"
                                    ? {
                                        background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                                        boxShadow: `0 10px 30px ${accentColor}30`
                                    }
                                    : {}
                            }
                        >
                            <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex-shrink-0 shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${gradients.secondary}, ${gradients.primary})`,
                                    boxShadow: `0 10px 25px ${accentColor}30`
                                }}
                            />
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                                boxShadow: `0 10px 25px ${accentColor}30`
                            }}
                        >
                            <Bot size={16} className="text-white sm:hidden" />
                            <Bot size={20} className="text-white hidden sm:block" />
                        </div>
                        <div className={`${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white border-gray-200'} p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border backdrop-blur-sm shadow-sm`}>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-bounce" style={{ backgroundColor: accentColor, animationDelay: "0ms" }} />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-bounce" style={{ backgroundColor: accentColor, animationDelay: "150ms" }} />
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-bounce" style={{ backgroundColor: accentColor, animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'} p-3 sm:p-4 lg:p-6`}>
                <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSendMessage(inputValue);
                            }
                        }}
                        placeholder="Type your message..."
                        className={`flex-1 px-3 py-3 sm:px-4 sm:py-3.5 lg:px-5 lg:py-4 text-sm sm:text-base ${isDark ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = accentColor;
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)';
                        }}
                    />
                    <button
                        onClick={() => onSendMessage(inputValue)}
                        disabled={!inputValue.trim()}
                        className="px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4 text-white rounded-xl sm:rounded-2xl hover:shadow-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none font-medium"
                        style={{
                            background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})`,
                            boxShadow: `0 10px 30px ${accentColor}30`
                        }}
                    >
                        <Send size={18} className="sm:hidden" />
                        <Send size={20} className="hidden sm:block" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ChatHistorySection({
                                       chatHistory,
                                       onChatSelect,
                                   }: {
    chatHistory: any[];
    onChatSelect: (chat: any) => void;
}) {
    const accentColor = useAccentColor();
    const gradients = useGradientColors();
    const { theme } = useSettings();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div className="p-4 sm:p-6">
            <h3 className={`font-semibold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6 flex items-center gap-2`}>
                <Clock size={18} className="sm:hidden" style={{ color: accentColor }} />
                <Clock size={20} className="hidden sm:block" style={{ color: accentColor }} />
                Recent Conversations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {chatHistory.slice(0, 4).map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onChatSelect(chat)}
                        className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} border hover:border-transparent hover:shadow-xl transition-all text-left overflow-hidden backdrop-blur-sm`}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 20px 40px ${accentColor}30`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                            style={{ background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})` }}
                        />

                        <div className="relative">
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                                <p className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-1 pr-2`}>{chat.title}</p>
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                  {new Date(chat.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                <span
                    className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${gradients.primary}, ${gradients.secondary})` }}
                >
                  {chat.category}
                </span>
                                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{chat.messages?.length || 0} messages</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function AISidebar() {
    const { theme } = useSettings();
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <aside className={`hidden xl:block w-80 border-l ${isDark ? 'border-gray-700 bg-[#1A1F2E]' : 'border-gray-200 bg-white'} p-6 overflow-y-auto`}>
            <div className="space-y-6">
                {/* Sidebar content */}
            </div>
        </aside>
    );
}


export function WellbeingHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const { theme, setTheme } = useSettings();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Wellbeing</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Track your mental and physical wellness</p>
                    </div>
                </div>
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                    ) : (
                        <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                    )}
                </button>
            </div>
        </header>
    );
}

export function WellbeingSidebar() {
    return null;
}

export function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState<string | null>("good");

    const moods = [
        { icon: ThumbsUp, label: "Excellent", value: "excellent" },
        { icon: Smile, label: "Good", value: "good" },
        { icon: Meh, label: "Okay", value: "okay" },
        { icon: Frown, label: "Poor", value: "poor" },
        { icon: ThumbsDown, label: "Bad", value: "bad" },
    ];

    const getMoodFeedback = () => {
        switch(selectedMood) {
            case "excellent":
                return {
                    message: "Fantastic! You're feeling amazing today. Keep that positive energy flowing! ✨",
                    color: "from-green-500/10 to-emerald-500/10",
                    borderColor: "border-green-500/30",
                    textColor: "text-gray-700 dark:text-gray-200"
                };
            case "good":
                return {
                    message: "Great job tracking your mood! Remember, it's okay to not feel great every day.",
                    color: "from-[#98F1CF]/10 to-[#98F1CF]/5",
                    borderColor: "border-[#98F1CF]/20",
                    textColor: "text-gray-700 dark:text-gray-200"
                };
            case "okay":
                return {
                    message: "It's okay to have neutral days. Consider taking a short break or doing something you enjoy.",
                    color: "from-blue-500/10 to-blue-400/10",
                    borderColor: "border-blue-500/30",
                    textColor: "text-gray-700 dark:text-gray-200"
                };
            case "poor":
                return {
                    message: "We all have tough days. Try a breathing exercise or reach out to someone you trust.",
                    color: "from-orange-500/10 to-orange-400/10",
                    borderColor: "border-orange-500/30",
                    textColor: "text-gray-700 dark:text-gray-200"
                };
            case "bad":
                return {
                    message: "You're not alone. Consider talking to a friend, taking a walk, or practicing self-care. 💙",
                    color: "from-red-500/10 to-red-400/10",
                    borderColor: "border-red-500/30",
                    textColor: "text-gray-700 dark:text-gray-200"
                };
            default:
                return {
                    message: "Select how you're feeling to get personalized suggestions.",
                    color: "from-gray-100 to-gray-50",
                    borderColor: "border-gray-200",
                    textColor: "text-gray-600"
                };
        }
    };

    const feedback = getMoodFeedback();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">How are you feeling today?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track your mood to understand your emotional patterns</p>
            </div>

            <div className="flex gap-3 mb-4">
                {moods.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.value;
                    return (
                        <button
                            key={mood.value}
                            onClick={() => setSelectedMood(mood.value)}
                            className={`flex-1 p-4 rounded-2xl transition-all ${
                                isSelected
                                    ? "bg-[#1C6AFF] shadow-lg scale-105"
                                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                            }`}
                        >
                            <Icon
                                size={24}
                                className={`mx-auto mb-2 ${
                                    isSelected ? "text-white" : "text-gray-400 dark:text-gray-500"
                                }`}
                            />
                            <p className={`text-sm font-medium ${
                                isSelected ? "text-white" : "text-gray-600 dark:text-gray-300"
                            }`}>
                                {mood.label}
                            </p>
                        </button>
                    );
                })}
            </div>

            {selectedMood && (
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feedback.color} border ${feedback.borderColor}`}>
                    <p className={`text-sm ${feedback.textColor} font-medium`}>
                        {feedback.message}
                    </p>
                </div>
            )}

            {/* Quick Tips */}
            <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-[#FBC24E]" />
                    Quick Tips
                </h4>
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#98F1CF]/10 to-[#FBC24E]/10 border border-[#98F1CF]/20 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#98F1CF] to-[#FBC24E] flex items-center justify-center flex-shrink-0">
                                <Heart size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Daily Tip</h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Take a 5-minute breathing exercise to reduce stress and improve focus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#1C6AFF]/10 dark:to-[#8C7AE7]/10 border border-[#1C6AFF]/30 dark:border-[#1C6AFF]/20 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(to bottom right, #1C6AFF, #8C7AE7)' }}
                            >
                                <Activity size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h5 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Goal</h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Aim for 8 hours of sleep and 30 minutes of physical activity daily.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function WellnessStats() {
    const weeklyGoals = [
        { day: "M", completed: 4, total: 4, progress: 100 },
        { day: "T", completed: 4, total: 4, progress: 100 },
        { day: "W", completed: 3, total: 4, progress: 75 },
        { day: "T", completed: 4, total: 4, progress: 100 },
        { day: "F", completed: 3, total: 4, progress: 75 },
        { day: "S", completed: 3, total: 4, progress: 75 },
        { day: "S", completed: 2, total: 4, progress: 50 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Your Progress</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Keep up the great work!</p>
            </div>

            {/* Stats Grid - 2x2 Layout */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Today's Goals */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#1C6AFF]/10 to-[#1C6AFF]/5 border border-[#1C6AFF]/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C6AFF] flex items-center justify-center">
                            <Target size={16} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Today's Goals</p>
                    </div>
                    <p className="font-semibold text-2xl text-[#1C6AFF] mb-2">1/4</p>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-[#1C6AFF] rounded-full transition-all" style={{ width: "25%" }} />
                    </div>
                </div>

                {/* Current Streak */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FBC24E]/10 to-[#FBC24E]/5 border border-[#FBC24E]/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FBC24E] flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Streak</p>
                    </div>
                    <p className="font-semibold text-2xl text-[#FBC24E]">5 days</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep going! 🔥</p>
                </div>

                {/* Mood Tracked */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#98F1CF]/10 to-[#98F1CF]/5 border border-[#98F1CF]/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#98F1CF] flex items-center justify-center">
                            <Smile size={16} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Mood Today</p>
                    </div>
                    <p className="font-semibold text-2xl text-[#98F1CF]">Good</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tracked ✓</p>
                </div>

                {/* This Week Goals */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#8C7AE7]/10 to-[#8C7AE7]/5 border border-[#8C7AE7]/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8C7AE7] flex items-center justify-center">
                            <Activity size={16} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">This Week</p>
                    </div>
                    <p className="font-semibold text-2xl text-[#8C7AE7]">23/28</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">82% complete</p>
                </div>
            </div>

            {/* Weekly Progress Calendar */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Weekly Overview</h4>
                <div className="flex items-center justify-between gap-2">
                    {weeklyGoals.map((day, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                                day.progress === 100
                                    ? 'bg-[#8C7AE7] text-white shadow-md'
                                    : day.progress >= 75
                                        ? 'bg-[#8C7AE7]/60 text-white'
                                        : day.progress >= 50
                                            ? 'bg-[#8C7AE7]/60 text-white'
                                            : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                            }`}>
                                {day.progress === 100 ? '✓' : `${day.completed}/${day.total}`}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{day.day}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Motivational Message */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#98F1CF]/10 via-[#FBC24E]/10 to-[#8C7AE7]/10 border border-[#98F1CF]/30">
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">
                    ✨ Every step counts. You've got this!
                </p>
            </div>
        </div>
    );
}

export function BreathingExercise() {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

    React.useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setPhase((current) => {
                if (current === "inhale") return "hold";
                if (current === "hold") return "exhale";
                return "inhale";
            });
        }, 4000);

        return () => clearInterval(timer);
    }, [isActive]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#111827] dark:text-white mb-6">Breathing Exercise</h3>

            <div className="flex flex-col items-center">
                <div
                    className={`w-48 h-48 rounded-full bg-gradient-to-br from-[#98F1CF] to-[#FBC24E] flex items-center justify-center transition-transform duration-1000 ${
                        isActive && phase === "inhale" ? "scale-110" : isActive && phase === "exhale" ? "scale-90" : "scale-100"
                    }`}
                >
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-900 mb-2">{isActive ? <span className="capitalize">{phase}</span> : <span className="text-base">Box Breathing</span>}</p>
                        {isActive && <p className="text-sm text-gray-800 dark:text-gray-800">Follow the circle</p>}
                    </div>
                </div>

                {!isActive && <p className="text-lg font-bold text-gray-900 dark:text-white mt-4 text-center">Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds</p>}

                <button
                    onClick={() => setIsActive(!isActive)}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1C6AFF] to-[#8C7AE7] text-gray-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold border border-[#1C6AFF]/20"
                >
                    {isActive ? "Stop" : "Start Exercise"}
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    {isActive ? "Breathe in sync with the circle" : "Click to begin a calming breathing exercise"}
                </p>
            </div>
        </div>
    );
}

export function WellnessActivities() {
    const [activities, setActivities] = useState([
        {
            id: "sleep",
            name: "Sleep",
            icon: Moon,
            goal: 8,
            current: 7,
            max: 12,
            unit: "hours",
            color: "#8C7AE7",
            bgColor: "bg-[#8C7AE7]"
        },
        {
            id: "exercise",
            name: "Exercise",
            icon: Dumbbell,
            goal: 30,
            current: 30,
            max: 180,
            unit: "mins",
            color: "#1C6AFF",
            bgColor: "bg-[#1C6AFF]"
        },
        {
            id: "water",
            name: "Water",
            icon: Droplets,
            goal: 8,
            current: 5,
            max: 15,
            unit: "glasses",
            color: "#98F1CF",
            bgColor: "bg-[#98F1CF]"
        },
        {
            id: "meditation",
            name: "Meditation",
            icon: Sparkles,
            goal: 15,
            current: 10,
            max: 120,
            unit: "mins",
            color: "#FBC24E",
            bgColor: "bg-[#FBC24E]"
        },
    ]);

    const updateActivity = (id: string, value: number) => {
        setActivities(prev =>
            prev.map(activity =>
                activity.id === id
                    ? { ...activity, current: Math.max(0, Math.min(value, activity.max)) }
                    : activity
            )
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Daily Activities</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track your healthy habits and stay on top of your wellness goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity) => {
                    const Icon = activity.icon;
                    const percentage = (activity.current / activity.max) * 100;
                    const goalPercentage = (activity.goal / activity.max) * 100;
                    const isGoalAchieved = activity.current >= activity.goal;
                    const remaining = activity.goal - activity.current;

                    return (
                        <div key={activity.id} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-12 h-12 rounded-xl ${activity.bgColor} flex items-center justify-center`}>
                                    <Icon size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{activity.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Goal: {activity.goal} {activity.unit}</p>
                                </div>
                                <button
                                    onClick={() => updateActivity(activity.id, activity.current === activity.goal ? 0 : activity.goal)}
                                    className={`w-8 h-8 rounded-lg ${activity.bgColor} flex items-center justify-center`}
                                >
                                    <Check size={16} className="text-white" />
                                </button>
                            </div>

                            {/* Circular Progress */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        {/* Background circle */}
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#f3f4f6"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke={activity.color}
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 56}`}
                                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - activity.current / activity.goal)}`}
                                            strokeLinecap="round"
                                            className="transition-all duration-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{activity.current}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.unit}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3 mb-4">
                                <button
                                    onClick={() => updateActivity(activity.id, activity.current - 1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Minus size={16} className="text-gray-600 dark:text-gray-400" />
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max={activity.max}
                                    value={activity.current}
                                    onChange={(e) => updateActivity(activity.id, Number(e.target.value))}
                                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, ${activity.color} 0%, ${activity.color} ${percentage}%, #f3f4f6 ${percentage}%, #f3f4f6 100%)`
                                    }}
                                />
                                <button
                                    onClick={() => updateActivity(activity.id, activity.current + 1)}
                                    className={`w-10 h-10 rounded-lg ${activity.bgColor} flex items-center justify-center hover:opacity-90 transition-opacity`}
                                >
                                    <Plus size={16} className="text-white" />
                                </button>
                            </div>

                            {/* Progress Bar with Goal Marker */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>0</span>
                                    <span style={{ color: activity.color }} className="font-medium">Goal: {activity.goal}</span>
                                    <span>{activity.max}</span>
                                </div>
                                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                                        style={{ width: `${percentage}%`, backgroundColor: activity.color }}
                                    />
                                    {/* Goal marker */}
                                    <div
                                        className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                                        style={{ left: `${goalPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Status Message */}
                            {isGoalAchieved ? (
                                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: `${activity.color}20` }}>
                                    <p className="text-sm font-medium flex items-center justify-center gap-2" style={{ color: activity.color }}>
                                        🎉 Goal Achieved!
                                    </p>
                                </div>
                            ) : (
                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {remaining} {activity.unit} to go
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function WellnessResources() {
    const resources = [
        {
            title: "Stress Management Guide",
            description: "Learn techniques to manage daily stress",
            icon: Heart,
            color: "from-[#98F1CF] to-[#FBC24E]",
        },
        {
            title: "Better Sleep Habits",
            description: "Tips for improving your sleep quality",
            icon: Clock,
            color: "from-[#7EA3F8] to-[#A897E8]",
        },
        {
            title: "Mindfulness Exercises",
            description: "Daily practices for mental clarity",
            icon: Sparkles,
            color: "from-[#FBC24E] to-[#F89B7E]",
        },
        {
            title: "Crisis Support Line",
            description: "24/7 support: 988 (Suicide & Crisis Lifeline)",
            icon: Phone,
            color: "from-[#EF4444] to-[#DC2626]",
            isUrgent: true,
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#111827] dark:text-white mb-6">Wellness Resources</h3>
            <div className="space-y-3">
                {resources.map((resource) => {
                    const Icon = resource.icon;
                    return (
                        <button
                            key={resource.title}
                            className={`w-full p-4 rounded-xl transition-colors text-left group ${
                                resource.isUrgent
                                    ? 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-2 border-red-200 dark:border-red-800'
                                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold text-sm mb-1 ${
                                        resource.isUrgent
                                            ? 'text-red-900 dark:text-red-100'
                                            : 'text-gray-900 dark:text-white'
                                    }`}>{resource.title}</h4>
                                    <p className={`text-xs ${
                                        resource.isUrgent
                                            ? 'text-red-700 dark:text-red-300 font-medium'
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}>{resource.description}</p>
                                </div>
                                {!resource.isUrgent && (
                                    <ChevronRight size={16} className="text-gray-400 mt-1" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function AccountSettings({
                                    profileImage,
                                    setProfileImage,
                                }: {
    profileImage: string | null;
    setProfileImage: (image: string | null) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 2 * 1024 * 1024) { // Max 2MB
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert("File size must be less than 2MB");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your profile</p>

            <div className="space-y-6">
                {/* Profile Picture Section */}
                <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Profile Picture</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Update your profile photo</p>

                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-full bg-gray-100 dark:bg-gradient-to-br dark:from-[#1C6AFF] dark:to-[#8C7AE7] flex items-center justify-center overflow-hidden shadow-xl border-3 border-gray-300 dark:border-gray-600 ring-2 ring-gray-200 dark:ring-gray-700">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={42} className="text-gray-400 dark:text-white drop-shadow-md" strokeWidth={3} />
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/jpeg,image/png,image/gif"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-[#1C6AFF] text-white rounded-lg hover:bg-[#1557d8] transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <Upload size={16} />
                                Upload Photo
                            </button>
                            <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Existing form fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        defaultValue="User"
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        defaultValue="user@colony.com"
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea
                        rows={4}
                        defaultValue="Product designer passionate about creating intuitive user experiences."
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6AFF]"
                    />
                </div>
                <button className="px-6 py-3 bg-[#1C6AFF] hover:bg-[#1557d8] text-white rounded-lg transition-colors font-medium">
                    <div className="flex items-center gap-2">
                        <Save size={18} />
                        Save Changes
                    </div>
                </button>
            </div>
        </div>
    );
}

export function NotificationSettings() {
    const [emailNotifs, setEmailNotifs] = useState({
        dailySummary: true,
        weeklyReport: true,
    });

    const [taskNotifs, setTaskNotifs] = useState({
        taskAssigned: true,
        taskCompleted: true,
        dueDateReminders: true,
    });

    const [teamNotifs, setTeamNotifs] = useState({
        teamMentions: true,
        teamStatusUpdates: false,
    });

    const [wellbeingNotifs, setWellbeingNotifs] = useState({
        wellbeingCheckIns: true,
        breakReminders: true,
    });

    // Do Not Disturb state
    const [dndEnabled, setDndEnabled] = useState(false);
    const [showDndConfig, setShowDndConfig] = useState(false);
    const [dndStartTime, setDndStartTime] = useState("22:00");
    const [dndEndTime, setDndEndTime] = useState("08:00");
    const [dndDays, setDndDays] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
    });

    const toggleDndDay = (day: keyof typeof dndDays) => {
        setDndDays({ ...dndDays, [day]: !dndDays[day] });
    };

    return (
        <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                        >
                            <Mail size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage how you receive email updates</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Daily Summary</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive a daily email with your activity summary</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={emailNotifs.dailySummary}
                                onChange={(e) => setEmailNotifs({ ...emailNotifs, dailySummary: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Weekly Report</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get a weekly overview of your productivity and wellbeing</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={emailNotifs.weeklyReport}
                                onChange={(e) => setEmailNotifs({ ...emailNotifs, weeklyReport: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Tasks & Productivity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                        >
                            <CheckSquare size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Tasks & Productivity</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Control your tasks & productivity alerts</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Task Assigned</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a task is assigned to you</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={taskNotifs.taskAssigned}
                                onChange={(e) => setTaskNotifs({ ...taskNotifs, taskAssigned: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Task Completed</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notifications when tasks are marked complete</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={taskNotifs.taskCompleted}
                                onChange={(e) => setTaskNotifs({ ...taskNotifs, taskCompleted: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Due Date Reminders</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reminders before tasks are due</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={taskNotifs.dueDateReminders}
                                onChange={(e) => setTaskNotifs({ ...taskNotifs, dueDateReminders: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Team & Collaboration */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                        >
                            <Users size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Team & Collaboration</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Control your team & collaboration alerts</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Team Mentions</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">When someone mentions you in a comment</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={teamNotifs.teamMentions}
                                onChange={(e) => setTeamNotifs({ ...teamNotifs, teamMentions: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Team Status Updates</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Updates on team member availability</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={teamNotifs.teamStatusUpdates}
                                onChange={(e) => setTeamNotifs({ ...teamNotifs, teamStatusUpdates: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Wellbeing */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                        >
                            <Bell size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Wellbeing</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Control your wellbeing alerts</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Wellbeing Check-ins</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daily reminders to log your mood</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={wellbeingNotifs.wellbeingCheckIns}
                                onChange={(e) => setWellbeingNotifs({ ...wellbeingNotifs, wellbeingCheckIns: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Break Reminders</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Periodic reminders to take breaks</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={wellbeingNotifs.breakReminders}
                                onChange={(e) => setWellbeingNotifs({ ...wellbeingNotifs, breakReminders: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Do Not Disturb */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                            >
                                <BellOff size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Do Not Disturb</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {dndEnabled ? "Currently active" : "Pause all notifications during focus time"}
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={dndEnabled}
                                onChange={(e) => setDndEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-[var(--accent-color)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-color)]"></div>
                        </label>
                    </div>
                </div>

                {dndEnabled && (
                    <div className="p-6 space-y-6">
                        {/* Schedule Configuration */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white">Schedule</h4>
                                <button
                                    onClick={() => setShowDndConfig(!showDndConfig)}
                                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                                >
                                    {showDndConfig ? "Hide" : "Configure"}
                                    <ChevronRight size={16} className={`transition-transform ${showDndConfig ? "rotate-90" : ""}`} />
                                </button>
                            </div>

                            {showDndConfig && (
                                <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                                    {/* Time Range */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Start Time
                                            </label>
                                            <input
                                                type="time"
                                                value={dndStartTime}
                                                onChange={(e) => setDndStartTime(e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                End Time
                                            </label>
                                            <input
                                                type="time"
                                                value={dndEndTime}
                                                onChange={(e) => setDndEndTime(e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Days Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Active Days
                                        </label>
                                        <div className="grid grid-cols-7 gap-2">
                                            {Object.entries(dndDays).map(([day, enabled]) => (
                                                <button
                                                    key={day}
                                                    onClick={() => toggleDndDay(day as keyof typeof dndDays)}
                                                    className={`py-2 px-1 rounded-lg text-xs font-medium transition-colors ${
                                                        enabled
                                                            ? "bg-[var(--accent-color)] text-white"
                                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    }`}
                                                >
                                                    {day.slice(0, 3).toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <button className="w-full px-4 py-2 bg-[var(--accent-color)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">
                                        Save Schedule
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">1 Hour</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Quick DND</p>
                            </button>
                            <button className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Until Tomorrow</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Extended DND</p>
                            </button>
                        </div>

                        {/* Status Message */}
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
                            <div className="flex items-start gap-2">
                                <Info size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-blue-800 dark:text-blue-300">
                                        When Do Not Disturb is active, you won't receive any notifications. Urgent messages from team leads will still come through.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function AppearanceSettings() {
    const {
        theme, setTheme,
        accentColor, setAccentColor,
        fontSize, setFontSize,
        customGradientEnabled, setCustomGradientEnabled,
        gradientPrimaryColor, setGradientPrimaryColor,
        gradientSecondaryColor, setGradientSecondaryColor,
        sidebarWidth, setSidebarWidth,
        fontScale, setFontScale,
        focusModeEnabled, setFocusModeEnabled,
        focusModeHideSidebar, setFocusModeHideSidebar,
        focusModeSimplifyUI, setFocusModeSimplifyUI,
        focusModeGrayscale, setFocusModeGrayscale,
        focusModeHideNotifications, setFocusModeHideNotifications
    } = useSettings();

    const activeAccentColor = useAccentColor();
    const gradients = useGradientColors();

    const accentColors = [
        { name: "Ocean Blue", value: "#1C6AFF" },
        { name: "Soft Violet", value: "#A78BFA" },
        { name: "Fresh Aqua", value: "#5FDCC0" },
        { name: "Warm Yellow", value: "#FFB84D" },
        { name: "Sweet Pink", value: "#FF7BB8" },
        { name: "Forest Green", value: "#34D399" },
    ];

    const fontSizeMap = {
        small: 12,
        medium: 14,
        large: 16,
    };

    return (
        <div className="space-y-6">
            {/* Theme Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                    >
                        <Palette size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Theme Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Choose your interface appearance</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            onClick={() => setTheme("light")}
                            className={`p-5 rounded-2xl border-2 transition-all ${
                                theme === "light"
                                    ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    theme === "light" ? "bg-[#1C6AFF]" : "bg-gray-300 dark:bg-gray-600"
                                }`}>
                                    <Sun size={28} className="text-white" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Light</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Clean and bright interface</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setTheme("dark")}
                            className={`p-5 rounded-2xl border-2 transition-all ${
                                theme === "dark"
                                    ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    theme === "dark" ? "bg-[#1C6AFF]" : "bg-gray-300 dark:bg-gray-600"
                                }`}>
                                    <Moon size={28} className="text-white" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Dark</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Easy on the eyes</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setTheme("auto")}
                            className={`p-5 rounded-2xl border-2 transition-all ${
                                theme === "auto"
                                    ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    theme === "auto" ? "bg-[#1C6AFF]" : "bg-gray-300 dark:bg-gray-600"
                                }`}>
                                    <Monitor size={28} className="text-white" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Auto</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Matches system settings</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Accent Color */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                    >
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Accent Color</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Personalize your interface color</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-6 gap-3 accent-color-swatches">
                        {accentColors.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => setAccentColor(color.value)}
                                className={`relative p-0 rounded-2xl border-3 transition-all aspect-square ${
                                    accentColor === color.value
                                        ? "border-gray-900 dark:border-white scale-95"
                                        : "border-gray-200 dark:border-gray-600 hover:scale-95"
                                }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                                aria-label={`${color.name} accent color`}
                            >
                                {accentColor === color.value && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                            <Check size={20} className="text-gray-900" />
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Gradient */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Palette size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Custom Gradient</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create your own color scheme</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Enable Custom Gradient */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Enable Custom Colors</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use custom colors instead of preset accents</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={customGradientEnabled}
                                onChange={(e) => setCustomGradientEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: customGradientEnabled ? 'var(--accent-color)' : undefined,
                                boxShadow: customGradientEnabled ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Primary Color */}
                    {customGradientEnabled && (
                        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                            <label className="block mb-3">
                                <span className="font-semibold text-gray-900 dark:text-white">Primary Color</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Main interface color</p>
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={gradientPrimaryColor}
                                    onChange={(e) => setGradientPrimaryColor(e.target.value)}
                                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600"
                                />
                                <input
                                    type="text"
                                    value={gradientPrimaryColor}
                                    onChange={(e) => setGradientPrimaryColor(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': 'var(--accent-color)' } as any}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    )}

                    {/* Secondary Color */}
                    {customGradientEnabled && (
                        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                            <label className="block mb-3">
                                <span className="font-semibold text-gray-900 dark:text-white">Secondary Color</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Complementary accent color</p>
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={gradientSecondaryColor}
                                    onChange={(e) => setGradientSecondaryColor(e.target.value)}
                                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600"
                                />
                                <input
                                    type="text"
                                    value={gradientSecondaryColor}
                                    onChange={(e) => setGradientSecondaryColor(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': 'var(--accent-color)' } as any}
                                    placeholder="#FFC371"
                                />
                            </div>
                        </div>
                    )}

                    {/* Preview */}
                    {customGradientEnabled && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                                Preview your custom gradient
                            </label>
                            <div
                                className="h-32 rounded-2xl"
                                style={{
                                    background: `linear-gradient(to bottom right, ${gradientPrimaryColor}, ${gradientSecondaryColor})`
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Display Options */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <SidebarClose size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Display Options</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Customize layout and spacing</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Font Size */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Font Size</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Adjust text size for readability</p>
                            </div>
                            <span className="text-sm font-semibold px-3 py-1 rounded-lg" style={{
                                backgroundColor: 'var(--accent-color)',
                                color: 'white'
                            }}>{fontScale}px</span>
                        </div>
                        <input
                            type="range"
                            min="12"
                            max="20"
                            value={fontScale}
                            onChange={(e) => setFontScale(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${((fontScale - 12) / 8) * 100}%, #E5E7EB ${((fontScale - 12) / 8) * 100}%, #E5E7EB 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>12px</span>
                            <span>16px</span>
                            <span>20px</span>
                        </div>
                    </div>

                    {/* Sidebar Width */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Sidebar Width</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Adjust navigation panel size</p>
                            </div>
                            <span className="text-sm font-semibold px-3 py-1 rounded-lg" style={{
                                backgroundColor: 'var(--accent-color)',
                                color: 'white'
                            }}>{sidebarWidth}px</span>
                        </div>
                        <input
                            type="range"
                            min="200"
                            max="350"
                            value={sidebarWidth}
                            onChange={(e) => setSidebarWidth(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${((sidebarWidth - 200) / 150) * 100}%, #E5E7EB ${((sidebarWidth - 200) / 150) * 100}%, #E5E7EB 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>200px</span>
                            <span>275px</span>
                            <span>350px</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AccessibilitySettings() {
    const {
        reducedMotion, setReducedMotion,
        highContrast, setHighContrast,
        largeCursor, setLargeCursor,
        largeText, setLargeText,
        enhancedFocusIndicators, setEnhancedFocusIndicators,
        colorBlindFriendly, setColorBlindFriendly,
        disableAutoplay, setDisableAutoplay,
        keyboardShortcutsOverlay, setKeyboardShortcutsOverlay,
        stickyKeysHelper, setStickyKeysHelper,
        screenReaderOptimization, setScreenReaderOptimization,
        audioDescriptions, setAudioDescriptions,
        textToSpeech, setTextToSpeech,
        colorVisionMode, setColorVisionMode,
        focusModeEnabled, setFocusModeEnabled,
        focusModeHideSidebar, setFocusModeHideSidebar,
        focusModeSimplifyUI, setFocusModeSimplifyUI,
        focusModeGrayscale, setFocusModeGrayscale,
        focusModeHideNotifications, setFocusModeHideNotifications,
        fontScale, setFontScale
    } = useSettings();

    return (
        <div className="space-y-6">
            {/* Visual Accessibility */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Eye size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Visual Accessibility</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enhance visual elements</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Reduced Motion */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Reduced Motion</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Minimize animations and transitions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={reducedMotion}
                                onChange={(e) => setReducedMotion(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: reducedMotion ? 'var(--accent-color)' : undefined,
                                boxShadow: reducedMotion ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">High Contrast</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Increase contrast for better readability</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={highContrast}
                                onChange={(e) => setHighContrast(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: highContrast ? 'var(--accent-color)' : undefined,
                                boxShadow: highContrast ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Large Text */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Large Text</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Increase text size across the interface</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={largeText}
                                onChange={(e) => setLargeText(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: largeText ? 'var(--accent-color)' : undefined,
                                boxShadow: largeText ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Enhanced Focus Indicators */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Enhanced Focus Indicators</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Make keyboard focus more visible</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={enhancedFocusIndicators}
                                onChange={(e) => setEnhancedFocusIndicators(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: enhancedFocusIndicators ? 'var(--accent-color)' : undefined,
                                boxShadow: enhancedFocusIndicators ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>
                    {enhancedFocusIndicators && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">💡 Test it: Press Tab key to see enhanced focus outlines</p>
                            <div className="space-y-2">
                                <button className="w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all" style={{ background: 'var(--accent-color)' }}>
                                    Press Tab to focus - Watch for thick colored outline
                                </button>
                                <input
                                    type="text"
                                    placeholder="Tab here - See the 4px colored outline with shadow"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all"
                                />
                                <a href="#" className="block hover:underline transition-all" style={{ color: 'var(--accent-color)' }} onClick={(e) => e.preventDefault()}>
                                    Tab to this link - Watch for thick outline ring
                                </a>
                                <div className="mt-2 p-3 rounded-lg border" style={{
                                    backgroundColor: 'var(--accent-color)',
                                    opacity: 0.1,
                                    borderColor: 'var(--accent-color)'
                                }}>
                                    <p className="text-xs" style={{ color: 'var(--accent-color)', opacity: 1 }}>
                                        ✨ Enhanced focus mode adds <strong>4px thick outlines</strong> with shadows and transitions when you Tab through elements!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Color Blind Friendly */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Color Blind Friendly</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add patterns and labels to color-coded items</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={colorBlindFriendly}
                                onChange={(e) => setColorBlindFriendly(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: colorBlindFriendly ? 'var(--accent-color)' : undefined,
                                boxShadow: colorBlindFriendly ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Disable Autoplay */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Disable Autoplay</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Prevent videos and animations from playing automatically</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={disableAutoplay}
                                onChange={(e) => setDisableAutoplay(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: disableAutoplay ? 'var(--accent-color)' : undefined,
                                boxShadow: disableAutoplay ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Input Assistance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Keyboard size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Interaction</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure interaction options</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Large Cursor */}
                    <div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Large Cursor</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Increase cursor size and visibility</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={largeCursor}
                                    onChange={(e) => setLargeCursor(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                    backgroundColor: largeCursor ? 'var(--accent-color)' : undefined,
                                    boxShadow: largeCursor ? '0 0 0 2px var(--accent-color)20' : undefined
                                }}></div>
                            </label>
                        </div>
                        {largeCursor && (
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">💡 Test it: Move your cursor over these elements to see enhanced visibility</p>
                                <div className="space-y-2">
                                    <button className="w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all" style={{ background: 'var(--accent-color)' }}>
                                        Hover over this button - Watch for outline & scale effect
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Click & hover to see text cursor with glow"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all"
                                    />
                                    <a href="#" className="block hover:underline transition-all" style={{ color: 'var(--accent-color)' }} onClick={(e) => e.preventDefault()}>
                                        Hover over this link - Watch for outline & glow
                                    </a>
                                    <div className="mt-2 p-3 rounded-lg border" style={{
                                        backgroundColor: 'var(--accent-color)',
                                        opacity: 0.1,
                                        borderColor: 'var(--accent-color)'
                                    }}>
                                        <p className="text-xs" style={{ color: 'var(--accent-color)', opacity: 1 }}>
                                            ✨ Your cursor is now a <strong>crosshair</strong> and interactive elements get <strong>outlines, glows, and scale effects</strong> when you hover!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Keyboard Shortcuts Overlay */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts Overlay</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Show available keyboard shortcuts on hover</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={keyboardShortcutsOverlay}
                                onChange={(e) => setKeyboardShortcutsOverlay(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: keyboardShortcutsOverlay ? 'var(--accent-color)' : undefined,
                                boxShadow: keyboardShortcutsOverlay ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Sticky Keys Helper */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Sticky Keys Helper</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Visual feedback for modifier keys</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={stickyKeysHelper}
                                onChange={(e) => setStickyKeysHelper(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: stickyKeysHelper ? 'var(--accent-color)' : undefined,
                                boxShadow: stickyKeysHelper ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Audio & Speech */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Volume2 size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Audio & Speech</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure audio & speech options</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Screen Reader Optimization */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Screen Reader Optimization</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enhanced support for screen readers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={screenReaderOptimization}
                                onChange={(e) => setScreenReaderOptimization(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: screenReaderOptimization ? 'var(--accent-color)' : undefined,
                                boxShadow: screenReaderOptimization ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Audio Descriptions */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Audio Descriptions</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enable audio descriptions for visual content</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={audioDescriptions}
                                onChange={(e) => setAudioDescriptions(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: audioDescriptions ? 'var(--accent-color)' : undefined,
                                boxShadow: audioDescriptions ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Text-to-Speech */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Text-to-Speech</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Read page content aloud</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={textToSpeech}
                                onChange={(e) => setTextToSpeech(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: textToSpeech ? 'var(--accent-color)' : undefined,
                                boxShadow: textToSpeech ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Color Vision Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Eye size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Color Vision Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select a color mode optimized for your vision</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: "Normal Vision", value: "normal" },
                            { label: "Deuteranopia (Red-Green)", value: "deuteranopia" },
                            { label: "Protanopia (Red-Green)", value: "protanopia" },
                            { label: "Tritanopia (Blue-Yellow)", value: "tritanopia" },
                            { label: "Monochromacy (Grayscale)", value: "monochromacy" },
                        ].map((mode) => (
                            <button
                                key={mode.value}
                                onClick={() => setColorVisionMode(mode.value as any)}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${
                                    colorVisionMode === mode.value
                                        ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700"
                                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900 dark:text-white">{mode.label}</span>
                                    {colorVisionMode === mode.value && (
                                        <Check size={20} style={{ color: 'var(--accent-color)' }} />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Focus Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, var(--accent-color)))" }}
                    >
                        <Focus size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Focus Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Minimize distractions</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Enable Focus Mode */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Enable Focus Mode</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reduce visual clutter for better concentration</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={focusModeEnabled}
                                onChange={(e) => setFocusModeEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                backgroundColor: focusModeEnabled ? 'var(--accent-color)' : undefined,
                                boxShadow: focusModeEnabled ? '0 0 0 2px var(--accent-color)20' : undefined
                            }}></div>
                        </label>
                    </div>

                    {/* Focus Mode Options */}
                    {focusModeEnabled && (
                        <>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Hide Sidebar</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Hide navigation sidebar</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={focusModeHideSidebar}
                                        onChange={(e) => setFocusModeHideSidebar(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                        backgroundColor: focusModeHideSidebar ? 'var(--accent-color)' : undefined,
                                        boxShadow: focusModeHideSidebar ? '0 0 0 2px var(--accent-color)20' : undefined
                                    }}></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Simplify UI</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce decorative elements</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={focusModeSimplifyUI}
                                        onChange={(e) => setFocusModeSimplifyUI(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                        backgroundColor: focusModeSimplifyUI ? 'var(--accent-color)' : undefined,
                                        boxShadow: focusModeSimplifyUI ? '0 0 0 2px var(--accent-color)20' : undefined
                                    }}></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Grayscale Mode</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Convert interface to grayscale</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={focusModeGrayscale}
                                        onChange={(e) => setFocusModeGrayscale(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                        backgroundColor: focusModeGrayscale ? 'var(--accent-color)' : undefined,
                                        boxShadow: focusModeGrayscale ? '0 0 0 2px var(--accent-color)20' : undefined
                                    }}></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Hide Notifications</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Mute notification badges</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={focusModeHideNotifications}
                                        onChange={(e) => setFocusModeHideNotifications(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{
                                        backgroundColor: focusModeHideNotifications ? 'var(--accent-color)' : undefined,
                                        boxShadow: focusModeHideNotifications ? '0 0 0 2px var(--accent-color)20' : undefined
                                    }}></div>
                                </label>
                            </div>
                        </>
                    )}

                    {/* Keyboard Shortcut Info */}
                    <div className="mt-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-blue-50/50 dark:bg-blue-900/20">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1C6AFF]/10 dark:bg-[#1C6AFF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Info size={16} style={{ color: 'var(--accent-color)' }} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Quick Toggle</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">Shift</kbd> + <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">F</kbd> to quickly toggle Focus Mode, or use the <Focus size={12} className="inline" /> button in the top navigation bar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PrivacySettings() {
    return (
        <div className="space-y-6">
            {/* Privacy Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center">
                        <Shield size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Privacy Controls</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your privacy preferences</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Profile Visibility */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#98F1CF]/20 flex items-center justify-center">
                                <Users size={20} className="text-[#98F1CF]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Profile Visibility</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Allow team members to view your profile</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>

                    {/* Activity Status */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#FBC24E]/20 flex items-center justify-center">
                                <Activity size={20} className="text-[#FBC24E]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Activity Status</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Show when you're online or active</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>

                    {/* Wellbeing Data Privacy */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#FF9A62]/20 flex items-center justify-center">
                                <Heart size={20} className="text-[#FF9A62]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Wellbeing Data Privacy</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Keep wellbeing stats private from team</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1C6AFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C6AFF]"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center">
                        <Lock size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Protect your account</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Password */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Password</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            Change Password
                        </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 bg-[#1C6AFF] text-white rounded-lg hover:bg-[#1557d8] transition-colors flex items-center gap-2 text-sm font-medium">
                            Enable 2FA
                        </button>
                    </div>

                    {/* Active Sessions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Active Sessions</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">2 active devices • Last active: Just now</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            View Sessions
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                    >
                        <Download size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Data Management</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Control your data</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Download Your Data */}
                    <button className="w-full p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1C6AFF] flex items-center justify-center">
                                <Download size={20} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Download Your Data</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get a copy of all your Colony data</p>
                            </div>
                        </div>
                    </button>

                    {/* Delete Account */}
                    <button className="w-full p-4 rounded-xl border border-red-100 dark:border-red-900 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                                <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400">Delete Account</h4>
                                <p className="text-sm text-red-500 dark:text-red-400">Permanently delete your account and all data</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Your Privacy Matters */}
            <div className="bg-white dark:bg-white rounded-2xl shadow-md border border-gray-100 dark:border-gray-200 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1C6AFF] flex items-center justify-center flex-shrink-0">
                            <Shield size={20} className="text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Your Privacy Matters</h4>
                            <p className="text-sm text-gray-600 mb-3">
                                We're committed to protecting your data. Review our Privacy Policy to learn how we handle your information.
                            </p>
                            <button className="text-[#1C6AFF] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Read Privacy Policy
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IntegrationSettings() {
    const { theme } = useSettings();

    const connectedApps = [
        {
            name: "Trello",
            description: "Project management and task boards",
            connected: false,
            icon: Trello,
            iconBg: "#0079BF",
            tags: ["Task sync", "Board management"]
        },
        {
            name: "GitHub",
            description: "Code repository and version control",
            connected: false,
            icon: GitBranch,
            iconBg: "#24292e",
            tags: ["Code sync", "Commit tracking"]
        },
        {
            name: "Figma",
            description: "Design collaboration platform",
            connected: false,
            icon: Figma,
            iconBg: "#F24E1E",
            tags: ["Design sync", "File updates"]
        },
        {
            name: "Spotify",
            description: "Music streaming for focus mode",
            connected: false,
            icon: Music,
            iconBg: "#1DB954",
            tags: ["Music control", "Playlist sync"]
        },
        {
            name: "Slack",
            description: "Team communication and collaboration",
            connected: true,
            icon: MessageSquare,
            iconBg: "#611f69",
            tags: ["Message notifications", "Status sync"]
        },
        {
            name: "Google Calendar",
            description: "Sync your schedule and events",
            connected: true,
            icon: Calendar,
            iconBg: "#4285F4",
            tags: ["Event sync", "Meeting reminders"]
        },
        {
            name: "Notion",
            description: "All-in-one workspace for notes and docs",
            connected: false,
            icon: FileText,
            iconBg: "#000000",
            tags: ["Document sync", "Database integration"]
        },
        {
            name: "Zoom",
            description: "Video conferencing and meetings",
            connected: false,
            icon: Video,
            iconBg: "#2D8CFF",
            tags: ["Meeting links", "Calendar integration"]
        },
        {
            name: "Dropbox",
            description: "Cloud storage and file sharing",
            connected: false,
            icon: Cloud,
            iconBg: "#0061FF",
            tags: ["File sync", "Storage management"]
        },
        {
            name: "Asana",
            description: "Work management and team coordination",
            connected: false,
            icon: CheckSquare,
            iconBg: "#F06A6A",
            tags: ["Project tracking", "Task management"]
        },
    ];

    // Separate connected and available apps
    const connected = connectedApps.filter(app => app.connected);
    const available = connectedApps.filter(app => !app.connected);

    return (
        <div className="space-y-6">
            {/* Connected Apps */}
            {connected.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                        >
                            <CheckCircle size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Connected Apps</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active integrations</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {connected.map((app) => (
                            <div
                                key={app.name}
                                className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: app.iconBg }}
                                        >
                                            <app.icon size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{app.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{app.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-xs font-medium text-green-700 dark:text-green-400">Connected</span>
                                        </div>
                                        <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            Settings
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {app.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Available Integrations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(to bottom right, var(--accent-color), var(--gradient-secondary, #8C7AE7))" }}
                    >
                        <Layers size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Available Integrations</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enhance Colony with powerful integrations</p>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {available.map((app) => (
                        <div
                            key={app.name}
                            className="p-5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700/50 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: app.iconBg }}
                                >
                                    <app.icon size={26} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{app.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.description}</p>
                                </div>
                            </div>
                            <button
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C6AFF] text-white rounded-lg hover:bg-[#1557d8] transition-colors font-medium"
                            >
                                <Plus size={18} />
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* API Access */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center">
                        <Code size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">API Access</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your API keys</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Personal Access Token</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">sk_live_••••••••••••6789</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Regenerate
                            </button>
                            <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Copy
                            </button>
                        </div>
                    </div>

                    <button className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                        <Plus size={20} />
                        <span className="font-medium">Generate New API Key</span>
                    </button>
                </div>
            </div>

            {/* Webhooks */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1C6AFF] flex items-center justify-center">
                        <Zap size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Webhooks</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Set up event notifications</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                            <Zap size={32} className="text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No webhooks configured</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Set up webhooks to receive real-time notifications about events in your workspace
                        </p>
                        <button className="px-4 py-2 bg-[#1C6AFF] text-white rounded-lg hover:bg-[#1557d8] transition-colors text-sm font-medium">
                            Create Webhook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppInner({ currentUser, onSignOut }: { currentUser?: any; onSignOut?: () => void } = {}) {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { focusModeEnabled, setFocusModeEnabled, focusModeHideSidebar } = useSettings();

    // Shared state for recent activities
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

    // Fetch recent activities and set up real-time subscription
    useEffect(() => {
        fetchRecentActivities();

        const subscription = supabase
            .channel('recent_activities_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'recent_activities' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setRecentActivities((current) => [payload.new as RecentActivity, ...current].slice(0, 20));
                    } else if (payload.eventType === 'UPDATE') {
                        setRecentActivities((current) =>
                            current.map((activity) =>
                                activity.id === payload.new.id ? (payload.new as RecentActivity) : activity
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
            console.error('[Dashboard] Error fetching recent activities:', error);
        } else {
            console.log('[Dashboard] Recent activities fetched:', data);
            setRecentActivities(data || []);
        }
    };

    // Keyboard shortcut for focus mode (Ctrl/Cmd + Shift + F)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                setFocusModeEnabled(!focusModeEnabled);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusModeEnabled, setFocusModeEnabled]);

    // Determine if sidebar should be shown
    const shouldShowSidebar = !(focusModeEnabled && focusModeHideSidebar);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {shouldShowSidebar && (
                <DashboardSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    currentUser={currentUser}
                    onSignOut={onSignOut}
                />
            )}

            <div
                className="transition-all duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen"
                style={{
                    marginLeft: shouldShowSidebar && sidebarOpen ? 'var(--sidebar-width, 250px)' : '0'
                }}
            >
                <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} currentUser={currentUser} />

                <main className="p-6 bg-gray-50 dark:bg-gray-900">
                    {currentPage === "dashboard" && <DashboardPage onNavigate={setCurrentPage} recentActivities={recentActivities} />}
                    {currentPage === "tasks" && <TasksPage recentActivities={recentActivities} setRecentActivities={setRecentActivities} />}
                    {currentPage === "team" && <TeamPage recentActivities={recentActivities} setRecentActivities={setRecentActivities} />}
                    {currentPage === "wellbeing" && <WellbeingPage />}
                    {currentPage === "ai-assistant" && <AIAssistantPage />}
                    {currentPage === "settings" && <SettingsPage />}
                </main>
            </div>

            <CustomiseButton />
        </div>
    );
}

export default function Dashboard() {
    return (
        <SettingsProvider>
            <WidgetProvider>
                <AppInner />
            </WidgetProvider>
        </SettingsProvider>
    );
}

// Export for Firebase integration
export function DashboardLayout({ currentUser, onSignOut }: { currentUser?: any; onSignOut?: () => void }) {
    return <AppInner currentUser={currentUser} onSignOut={onSignOut} />;
}

function DashboardPage({ onNavigate, recentActivities = [] }: { onNavigate?: (page: string) => void; recentActivities?: RecentActivity[] }) {
    const { widgets } = useWidgets();
    const visibleWidgets = widgets.filter((w) => w.isVisible);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {visibleWidgets.map((widget) => {
                    if (!widget.isVisible) return null;

                    switch (widget.id) {
                        case "productivity":
                            return (
                                <WidgetWrapper key={widget.id} size={widget.size}>
                                    <ProductivityCard />
                                </WidgetWrapper>
                            );
                        case "aiSuggestions":
                            return (
                                <WidgetWrapper key={widget.id} size={widget.size}>
                                    <AISuggestionsCard />
                                </WidgetWrapper>
                            );
                        case "wellbeing":
                            return (
                                <WidgetWrapper key={widget.id} size={widget.size}>
                                    <WellbeingCard />
                                </WidgetWrapper>
                            );
                        case "collaboration":
                            return (
                                <WidgetWrapper key={widget.id} size={widget.size}>
                                    <CollaborationCard recentActivities={recentActivities} />
                                </WidgetWrapper>
                            );
                        case "tasks":
                            return (
                                <WidgetWrapper key={widget.id} size={widget.size}>
                                    <QuickTasksCard />
                                </WidgetWrapper>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </>
    );
}

function TasksPage({ recentActivities, setRecentActivities }: { recentActivities: any[]; setRecentActivities: (activities: any[]) => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeFilter, setActiveFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);

    // Fetch tasks from Supabase and set up real-time subscription
    useEffect(() => {
        fetchTasks();

        const subscription = supabase
            .channel('dashboard_tasks_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tasks' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setTasks((current) => [...current, payload.new as Task]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTasks((current) =>
                            current.map((task) =>
                                task.id === payload.new.id ? (payload.new as Task) : task
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
            // Silently handle table not found errors (PGRST205)
            if (error.code === 'PGRST205') {
                setTasks([]);
            } else {
                console.error('Error fetching tasks:', error);
            }
        } else {
            setTasks(data || []);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "completed") return task.completed;
        if (activeFilter === "active") return !task.completed;
        if (activeFilter === "high") return task.priority === "high";
        return true;
    });

    const addRecentActivity = async (type: string, description: string, user: string = "You") => {
        // Parse description to extract action and entity_name
        // Format: "Created task: Task Name" or "Completed task: Task Name"
        const parts = description.split(': ');
        const action = parts[0] || description;
        const entity_name = parts[1] || '';

        const activity: Omit<RecentActivity, 'created_at'> = {
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
        }
    };

    const toggleTaskComplete = async (id: string) => {
        const task = tasks.find(t => t.id === id);
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

        // If task was just completed, add to recent activities
        if (nowCompleted && !wasCompleted) {
            await addRecentActivity('task_completed', `Completed task: ${task.title}`, 'You');
        }
    };

    const deleteTask = async (id: string) => {
        const task = tasks.find(t => t.id === id);

        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
            return;
        }

        // Add activity to Recent Activities
        if (task) {
            await addRecentActivity('task', `Deleted task: ${task.title}`, 'You');
        }
    };

    const saveEditedTask = async (updatedTask: any) => {
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

        // Add activity to Recent Activities
        await addRecentActivity('task', `Updated task: ${updatedTask.title}`, 'You');

        setShowEditModal(false);
        setEditingTask(null);
    };

    const addNewTask = async (newTask: any) => {
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

        // Add activity to Recent Activities
        await addRecentActivity('task', `Created task: ${taskToInsert.title}`, 'You');

        setShowAddModal(false);
    };

    const priorityColors: Record<string, string> = {
        high: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
        low: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    };

    return (
        <div className="-m-6 bg-gray-50 dark:bg-gray-900">
            <TaskHeader
                onAddTask={() => setShowAddModal(true)}
            />

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <TaskStats tasks={tasks} />
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-6">
                <TaskFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                <div className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all border border-gray-100 dark:border-gray-700 hover:shadow-md"
                            >
                                <div className="flex items-start gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskComplete(task.id);
                                        }}
                                        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer mt-1 transition-colors flex-shrink-0 ${
                                            task.completed
                                                ? "bg-[#1C6AFF] border-[#1C6AFF]"
                                                : "border-gray-300 dark:border-gray-600 hover:border-[#1C6AFF]"
                                        }`}
                                    >
                                        {task.completed && <Check size={16} className="text-white" />}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className={`font-semibold text-gray-900 dark:text-white ${
                                                task.completed ? "line-through opacity-60" : ""
                                            }`}
                                        >
                                            {task.title}
                                        </h4>
                                        {task.description && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${task.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {task.completed ? "Completed" : "Active"}
                        </span>
                                            {task.dueDate && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar size={12} />
                                                    {task.dueDate}
                          </span>
                                            )}
                                            {task.category && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Tag size={12} />
                                                    {task.category}
                          </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => {
                                                setEditingTask(task);
                                                setShowEditModal(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-[#1C6AFF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {showAddModal && (
                <AddTaskModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAdd={addNewTask}
                />
            )}

            {/* Edit Task Modal */}
            {showEditModal && editingTask && (
                <EditTaskModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingTask(null);
                    }}
                    task={editingTask}
                    onSave={saveEditedTask}
                />
            )}
        </div>
    );
}

export function TeamPage({ onNavigate, profileImage, onSignOut, recentActivities = [], setRecentActivities = () => {} }: { onNavigate?: (page: string) => void; profileImage?: string | null; onSignOut?: () => void; recentActivities?: any[]; setRecentActivities?: (activities: any[]) => void }) {
    const [members, setMembers] = useState<TeamMember[]>([]);

    const [projects, setProjects] = useState<Project[]>([]);

    // Fetch data from Supabase and set up real-time subscriptions
    useEffect(() => {
        fetchMembers();
        fetchProjects();

        // Set up real-time subscriptions for team members
        const membersSubscription = supabase
            .channel('team_members_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'team_members' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        const newMember = {
                            ...payload.new,
                            avatar: payload.new.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                        };
                        setMembers((current) => [...current, newMember as TeamMember]);
                    } else if (payload.eventType === 'UPDATE') {
                        const updatedMember = {
                            ...payload.new,
                            avatar: payload.new.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                        };
                        setMembers((current) =>
                            current.map((member) =>
                                member.id === payload.new.id ? (updatedMember as TeamMember) : member
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setMembers((current) =>
                            current.filter((member) => member.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        // Set up real-time subscriptions for projects
        const projectsSubscription = supabase
            .channel('projects_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'projects' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setProjects((current) => [...current, payload.new as Project]);
                    } else if (payload.eventType === 'UPDATE') {
                        setProjects((current) =>
                            current.map((project) =>
                                project.id === payload.new.id ? (payload.new as Project) : project
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setProjects((current) =>
                            current.filter((project) => project.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            membersSubscription.unsubscribe();
            projectsSubscription.unsubscribe();
        };
    }, []);

    const fetchMembers = async () => {
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            // Handle table not found errors (PGRST205)
            if (error.code === 'PGRST205') {
                setMembers([]);
            } else {
                console.error('Error fetching team members:', error);
            }
        } else {
            // Add avatar initials to each member
            const membersWithAvatars = (data || []).map(member => ({
                ...member,
                avatar: member.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
            }));
            setMembers(membersWithAvatars);
        }
    };

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            // Silently handle table not found errors (PGRST205)
            if (error.code === 'PGRST205') {
                setProjects([]);
            } else {
                console.error('Error fetching projects:', error);
            }
        } else {
            setProjects(data || []);
        }
    };

    const addRecentActivity = async (type: string, description: string, user: string = "You") => {
        // Parse description to extract action and entity_name
        // Format: "Created task: Task Name" or "Added team member: Member Name"
        const parts = description.split(': ');
        const action = parts[0] || description;
        const entity_name = parts[1] || '';

        const activity: Omit<RecentActivity, 'created_at'> = {
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
        }
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const { primary, secondary } = useGradientColors();

    // Project CRUD state
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Project filter state
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const [filterProjectPriority, setFilterProjectPriority] = useState("all");
    const [filterProjectStatus, setFilterProjectStatus] = useState("all");
    const [filterProjectDueDate, setFilterProjectDueDate] = useState("all");

    // Filter members
    const filteredMembers = members.filter((member) => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
        const matchesStatus = filterStatus === "all" || member.status === filterStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Get unique departments
    const departments = ["all", ...Array.from(new Set(members.map(m => m.department)))];

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
            (project.description || '').toLowerCase().includes(projectSearchQuery.toLowerCase());
        const matchesPriority = filterProjectPriority === "all" || project.priority === filterProjectPriority;
        const matchesStatus = filterProjectStatus === "all" || project.status === filterProjectStatus;

        // Due date filter logic
        let matchesDueDate = true;
        if (filterProjectDueDate !== "all") {
            const today = new Date();
            const projectDueDate = project.due_date || project.dueDate;
            if (!projectDueDate) {
                matchesDueDate = false;
            } else {
                const dueDate = new Date(projectDueDate);
                const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                if (filterProjectDueDate === "overdue") {
                    matchesDueDate = daysUntilDue < 0;
                } else if (filterProjectDueDate === "week") {
                    matchesDueDate = daysUntilDue >= 0 && daysUntilDue <= 7;
                } else if (filterProjectDueDate === "month") {
                    matchesDueDate = daysUntilDue >= 0 && daysUntilDue <= 30;
                }
            }
        }

        return matchesSearch && matchesPriority && matchesStatus && matchesDueDate;
    });

    // Add member
    const addMember = async (memberData: any) => {
        // Transform camelCase to snake_case for Supabase
        const newMember = {
            id: crypto.randomUUID(),
            name: memberData.name,
            email: memberData.email,
            role: memberData.role,
            department: memberData.department,
            phone: memberData.phone || null,
            status: memberData.status,
            join_date: memberData.joinDate || null,
            avatar_url: memberData.avatarUrl || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('team_members')
            .insert([newMember]);

        if (error) {
            console.error('Error adding team member:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('member', `Added team member: ${newMember.name}`, 'You');

        setIsAddModalOpen(false);
    };

    // Edit member
    const editMember = async (memberData: any) => {
        // Transform camelCase to snake_case for Supabase
        const updateData = {
            name: memberData.name,
            email: memberData.email,
            role: memberData.role,
            department: memberData.department,
            phone: memberData.phone || null,
            status: memberData.status,
            join_date: memberData.joinDate || null,
            avatar_url: memberData.avatarUrl || null,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('team_members')
            .update(updateData)
            .eq('id', memberData.id);

        if (error) {
            console.error('Error updating team member:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('member', `Updated team member: ${memberData.name}`, 'You');

        setIsEditModalOpen(false);
        setSelectedMember(null);
    };

    // Delete member
    const deleteMember = async () => {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('id', selectedMember.id);

        if (error) {
            console.error('Error deleting team member:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('member', `Removed team member: ${selectedMember.name}`, 'You');

        setIsDeleteModalOpen(false);
        setSelectedMember(null);
    };

    // Project CRUD functions
    const addProject = async (projectData: any) => {
        // Transform to snake_case for Supabase
        const newProject = {
            id: crypto.randomUUID(),
            name: projectData.name,
            description: projectData.description,
            status: projectData.status,
            progress: projectData.progress,
            priority: projectData.priority,
            start_date: projectData.start_date || projectData.startDate || null,
            due_date: projectData.due_date || projectData.dueDate || null,
            team_lead_id: projectData.team_lead_id || projectData.teamLeadId || null,
            assigned_members: projectData.team_members || projectData.assigned_members || projectData.assignedMembers || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('projects')
            .insert([newProject]);

        if (error) {
            console.error('Error adding project:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('project', `Created project: ${newProject.name}`, 'You');

        setIsAddProjectModalOpen(false);
    };

    const editProject = async (projectData: any) => {
        // Transform to snake_case for Supabase
        const updateData = {
            name: projectData.name,
            description: projectData.description,
            status: projectData.status,
            progress: projectData.progress,
            priority: projectData.priority,
            start_date: projectData.start_date || projectData.startDate || null,
            due_date: projectData.due_date || projectData.dueDate || null,
            team_lead_id: projectData.team_lead_id || projectData.teamLeadId || null,
            assigned_members: projectData.team_members || projectData.assigned_members || projectData.assignedMembers || [],
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', projectData.id);

        if (error) {
            console.error('Error updating project:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('project', `Updated project: ${projectData.name}`, 'You');

        setIsEditProjectModalOpen(false);
        setSelectedProject(null);
    };

    const deleteProject = async () => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', selectedProject.id);

        if (error) {
            console.error('Error deleting project:', error);
            return;
        }

        // Add activity to Recent Activities
        await addRecentActivity('project', `Deleted project: ${selectedProject.name}`, 'You');

        setIsDeleteProjectModalOpen(false);
        setSelectedProject(null);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useSettings();

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: theme === "dark" ? "#0A0E1A" : "#F4F6FA" }}
        >
            {/* Left Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNavigate={onNavigate || (() => {})}
                activePage="team"
                profileImage={profileImage || null}
                onSignOut={onSignOut}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <TeamHeader
                    onAddMember={() => setIsAddModalOpen(true)}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-hidden flex">
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto space-y-6">
                            {/* Search and Filters */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search members..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0"
                                            style={{ '--tw-ring-color': primary } as any}
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={filterDepartment}
                                            onChange={(e) => setFilterDepartment(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                            style={{ '--tw-ring-color': primary } as any}
                                        >
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>
                                                    {dept === "all" ? "All Departments" : dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                            style={{ '--tw-ring-color': primary } as any}
                                        >
                                            <option value="all">All Status</option>
                                            <option value="online">Online</option>
                                            <option value="away">Away</option>
                                            <option value="offline">Offline</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Users className="text-blue-600 dark:text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Members</p>
                                            <p className="text-2xl text-gray-900 dark:text-white">{members.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                                            <p className="text-2xl text-gray-900 dark:text-white">{members.filter(m => m.status === "online").length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Away</p>
                                            <p className="text-2xl text-gray-900 dark:text-white">{members.filter(m => m.status === "away").length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                            <Briefcase className="text-purple-600 dark:text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Departments</p>
                                            <p className="text-2xl text-gray-900 dark:text-white">{new Set(members.map(m => m.department)).size}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Members Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredMembers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Users className="text-gray-300 dark:text-gray-600" size={48} />
                                                        <p className="text-gray-500 dark:text-gray-400">No members found</p>
                                                        <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredMembers.map((member) => (
                                                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative">
                                                                <div
                                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                                                                    style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                                                                >
                                                                    {member.avatar}
                                                                </div>
                                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                                                                    member.status === "online" ? "bg-green-500" :
                                                                        member.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                                                                }`} />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-gray-900 dark:text-white">{member.role}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {member.department}
                      </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                <Mail size={14} />
                                                                {member.email}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                <Phone size={14} />
                                                                {member.phone}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "online" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                              member.status === "away" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedMember(member);
                                                                    setIsEditModalOpen(true);
                                                                }}
                                                                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                                title="Edit member"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedMember(member);
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                title="Delete member"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Active Projects Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Team project assignments and progress</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                        {filteredProjects.length} Projects
                      </span>
                                            <button
                                                onClick={() => setIsAddProjectModalOpen(true)}
                                                className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 flex items-center gap-2"
                                                style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                                            >
                                                <Plus size={18} />
                                                Add Project
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filter Controls */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        {/* Search */}
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search projects..."
                                                value={projectSearchQuery}
                                                onChange={(e) => setProjectSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm"
                                            />
                                        </div>

                                        {/* Priority Filter */}
                                        <select
                                            value={filterProjectPriority}
                                            onChange={(e) => setFilterProjectPriority(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm"
                                        >
                                            <option value="all">All Priorities</option>
                                            <option value="high">High Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="low">Low Priority</option>
                                        </select>

                                        {/* Status Filter */}
                                        <select
                                            value={filterProjectStatus}
                                            onChange={(e) => setFilterProjectStatus(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                            <option value="on-hold">On Hold</option>
                                        </select>

                                        {/* Due Date Filter */}
                                        <select
                                            value={filterProjectDueDate}
                                            onChange={(e) => setFilterProjectDueDate(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm"
                                        >
                                            <option value="all">All Due Dates</option>
                                            <option value="overdue">Overdue</option>
                                            <option value="week">Due This Week</option>
                                            <option value="month">Due This Month</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team Members</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredProjects.map((project) => {
                                            const memberIds = project.assigned_members || project.assignedMembers || [];
                                            const assignedTeam = members.filter(m => memberIds.includes(m.id));
                                            const dueDate = project.due_date || project.dueDate;
                                            const daysUntilDue = dueDate ? Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

                                            return (
                                                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.description}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center -space-x-2">
                                                            {assignedTeam.slice(0, 3).map((member, idx) => (
                                                                <div
                                                                    key={member.id}
                                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800 relative hover:z-10 transition-transform hover:scale-110"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                                                                        zIndex: assignedTeam.length - idx
                                                                    }}
                                                                    title={member.name}
                                                                >
                                                                    {member.avatar}
                                                                </div>
                                                            ))}
                                                            {assignedTeam.length > 3 && (
                                                                <div
                                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800"
                                                                    title={`+${assignedTeam.length - 3} more`}
                                                                >
                                                                    +{assignedTeam.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-full">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                <div
                                                                    className="h-2 rounded-full transition-all duration-300"
                                                                    style={{
                                                                        width: `${project.progress}%`,
                                                                        background: `linear-gradient(90deg, ${primary}, ${secondary})`
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  project.priority === "high" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                                      project.priority === "medium" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                                          "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              }`}>
                                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                              </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            {dueDate ? (
                                                                <>
                                                                    <p className="text-sm text-gray-900 dark:text-white">{new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                                    <p className={`text-xs ${
                                                                        daysUntilDue < 0 ? "text-red-600 dark:text-red-400" :
                                                                            daysUntilDue < 7 ? "text-orange-600 dark:text-orange-400" :
                                                                                "text-gray-500 dark:text-gray-400"
                                                                    }`}>
                                                                        {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                                                                            daysUntilDue === 0 ? "Due today" :
                                                                                daysUntilDue === 1 ? "Due tomorrow" :
                                                                                    `${daysUntilDue} days left`}
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">No due date</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  project.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                                      project.status === "completed" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                                          "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                              }`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                              </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedProject(project);
                                                                    setIsEditProjectModalOpen(true);
                                                                }}
                                                                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                                title="Edit project"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedProject(project);
                                                                    setIsDeleteProjectModalOpen(true);
                                                                }}
                                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                title="Delete project"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Activities Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completed tasks from all team members</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                      {recentActivities.length} Activities
                    </span>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team Member</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task Completed</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed At</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {recentActivities.map((activity) => {
                                            const completedDate = new Date(activity.timestamp);
                                            const now = new Date();
                                            const diffInHours = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60));

                                            let timeAgo = '';
                                            if (diffInHours < 1) {
                                                const diffInMinutes = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60));
                                                timeAgo = `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
                                            } else if (diffInHours < 24) {
                                                timeAgo = `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
                                            } else {
                                                const diffInDays = Math.floor(diffInHours / 24);
                                                timeAgo = `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
                                            }

                                            return (
                                                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${primary}, ${secondary})`
                                                                }}
                                                            >
                                                                {(activity.user_name || 'Unknown').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                            </div>
                                                            <span className="font-medium text-gray-900 dark:text-white">{activity.user_name || 'Unknown'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                                <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
                                                            </div>
                                                            <span className="text-gray-900 dark:text-white">{activity.entity_name || 'Task'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                {activity.metadata || 'General'}
                              </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <Clock size={16} />
                                                            {timeAgo}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <TeamSidebar />
                </div>
            </div>

            {/* Modals */}
            {isAddModalOpen && (
                <TeamMemberModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={addMember}
                    title="Add Team Member"
                />
            )}

            {isEditModalOpen && selectedMember && (
                <TeamMemberModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedMember(null);
                    }}
                    onSave={editMember}
                    member={selectedMember}
                    title="Edit Team Member"
                />
            )}

            {isDeleteModalOpen && selectedMember && (
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedMember(null);
                    }}
                    onConfirm={deleteMember}
                    memberName={selectedMember.name}
                />
            )}

            {/* Project Modals */}
            {isAddProjectModalOpen && (
                <ProjectModal
                    isOpen={isAddProjectModalOpen}
                    onClose={() => setIsAddProjectModalOpen(false)}
                    onSave={addProject}
                    members={members}
                    title="Add New Project"
                />
            )}

            {isEditProjectModalOpen && selectedProject && (
                <ProjectModal
                    isOpen={isEditProjectModalOpen}
                    onClose={() => {
                        setIsEditProjectModalOpen(false);
                        setSelectedProject(null);
                    }}
                    onSave={editProject}
                    project={selectedProject}
                    members={members}
                    title="Edit Project"
                />
            )}

            {isDeleteProjectModalOpen && selectedProject && (
                <DeleteProjectModal
                    isOpen={isDeleteProjectModalOpen}
                    onClose={() => {
                        setIsDeleteProjectModalOpen(false);
                        setSelectedProject(null);
                    }}
                    onConfirm={deleteProject}
                    projectName={selectedProject.name}
                />
            )}
        </div>
    );
}

// Team Member Modal Component
export function TeamMemberModal({
                                    isOpen,
                                    onClose,
                                    onSave,
                                    member,
                                    title
                                }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    member?: any;
    title: string;
}) {
    const [formData, setFormData] = useState({
        id: member?.id || 0,
        name: member?.name || "",
        email: member?.email || "",
        role: member?.role || "",
        department: member?.department || "",
        phone: member?.phone || "",
        status: member?.status || "online",
        joinDate: member?.join_date || member?.joinDate || new Date().toISOString().split('T')[0],
    });

    const { primary, secondary } = useGradientColors();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                <div
                    className="p-6 border-b border-gray-200 dark:border-gray-700"
                    style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="Enter full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="email@colony.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Role *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="e.g., Product Manager"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Department *
                            </label>
                            <select
                                required
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                            >
                                <option value="">Select department</option>
                                <option value="Product">Product</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status *
                            </label>
                            <select
                                required
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                            >
                                <option value="online">Online</option>
                                <option value="away">Away</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Join Date
                            </label>
                            <input
                                type="date"
                                value={formData.joinDate}
                                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                            className="flex-1 px-6 py-2.5 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                            {member ? "Update Member" : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Delete Confirmation Modal
export function DeleteConfirmModal({
                                       isOpen,
                                       onClose,
                                       onConfirm,
                                       memberName
                                   }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    memberName: string;
}) {
    const { primary, secondary } = useGradientColors();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
                        <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
                    </div>
                    <h2 className="text-center text-gray-900 dark:text-white mb-2">Delete Team Member</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Are you sure you want to delete <span className="font-semibold">{memberName}</span>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Project Modal Component
export function ProjectModal({
                                 isOpen,
                                 onClose,
                                 onSave,
                                 project,
                                 members,
                                 title
                             }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    project?: any;
    members: any[];
    title: string;
}) {
    const { primary, secondary } = useGradientColors();
    const [formData, setFormData] = useState({
        name: project?.name || "",
        description: project?.description || "",
        status: project?.status || "active",
        progress: project?.progress || 0,
        startDate: project?.start_date || project?.startDate || "",
        dueDate: project?.due_date || project?.dueDate || "",
        priority: project?.priority || "medium",
        assignedMembers: project?.assigned_members || project?.team_members || project?.assignedMembers || []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Transform form data to match database schema
        const projectData = {
            name: formData.name,
            description: formData.description,
            status: formData.status,
            progress: formData.progress,
            priority: formData.priority,
            start_date: formData.startDate || null,
            due_date: formData.dueDate || null,
            dueDate: formData.dueDate || null, // Keep for compatibility
            team_members: formData.assignedMembers
        };

        if (project) {
            onSave({ ...project, ...projectData });
        } else {
            onSave(projectData);
        }
    };

    const toggleMember = (memberId: number) => {
        setFormData({
            ...formData,
            assignedMembers: formData.assignedMembers.includes(memberId)
                ? formData.assignedMembers.filter((id: number) => id !== memberId)
                : [...formData.assignedMembers, memberId]
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full my-8">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl text-gray-900 dark:text-white">{title}</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="Enter project name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                style={{ '--tw-ring-color': primary } as any}
                                placeholder="Enter project description"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                    style={{ '--tw-ring-color': primary } as any}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                    style={{ '--tw-ring-color': primary } as any}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                    style={{ '--tw-ring-color': primary } as any}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-0"
                                    style={{ '--tw-ring-color': primary } as any}
                                >
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="on-hold">On Hold</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Progress: {formData.progress}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.progress}
                                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Assign Team Members
                            </label>
                            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 max-h-48 overflow-y-auto">
                                {members.map((member) => (
                                    <label
                                        key={member.id}
                                        className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 rounded transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.assignedMembers.includes(member.id)}
                                            onChange={() => toggleMember(member.id)}
                                            className="w-4 h-4 rounded"
                                            style={{ accentColor: primary }}
                                        />
                                        <div className="flex items-center gap-2 flex-1">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                                                style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                                            >
                                                {member.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                            className="flex-1 px-6 py-2.5 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                            {project ? "Update Project" : "Add Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Delete Project Confirmation Modal
export function DeleteProjectModal({
                                       isOpen,
                                       onClose,
                                       onConfirm,
                                       projectName
                                   }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    projectName: string;
}) {
    const { primary, secondary } = useGradientColors();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
                        <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
                    </div>
                    <h2 className="text-center text-gray-900 dark:text-white mb-2">Delete Project</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Are you sure you want to delete <span className="font-semibold">{projectName}</span>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

