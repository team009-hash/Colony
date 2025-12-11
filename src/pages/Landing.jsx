import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    CheckSquare, 
    Sparkles, 
    Heart, 
    Users, 
    BarChart3, 
    Zap,
    Play,
    Check,
    Lightbulb,
    TrendingUp,
    MessageSquare,
    Calendar,
    ArrowRight,
    Star,
    Shield,
    Lock
} from "lucide-react";
import "../styles/landing.css";
import Navigation from "../components/landing/Navigation";
import Footer from "../components/landing/Footer";

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: CheckSquare,
            title: "Smart Task Management",
            description: "Organize your work with intelligent task prioritization and automatic scheduling that adapts to your workflow.",
            iconClass: "blue"
        },
        {
            icon: Sparkles,
            title: "AI-Powered Insights",
            description: "Get personalized recommendations and productivity insights powered by advanced machine learning algorithms.",
            iconClass: "purple"
        },
        {
            icon: Heart,
            title: "Wellbeing Tracking",
            description: "Monitor your mental and physical wellbeing with mood tracking, break reminders, and balance insights.",
            iconClass: "green"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Work seamlessly with your team through real-time updates, shared workspaces, and collaborative tools.",
            iconClass: "orange"
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Visualize your productivity trends, track progress, and make data-driven decisions with comprehensive analytics.",
            iconClass: "indigo"
        },
        {
            icon: Zap,
            title: "Automation Tools",
            description: "Automate repetitive tasks, set up smart workflows, and focus on what matters most with powerful automation.",
            iconClass: "lime"
        }
    ];

    const aiFeatures = [
        {
            icon: Lightbulb,
            title: "Smart Suggestions",
            description: "AI analyzes your work patterns and suggests optimal times for tasks"
        },
        {
            icon: TrendingUp,
            title: "Productivity Insights",
            description: "Get actionable insights on improving your workflow efficiency"
        },
        {
            icon: MessageSquare,
            title: "Natural Language",
            description: "Create tasks and schedules using natural conversational language"
        },
        {
            icon: Calendar,
            title: "Auto-Scheduling",
            description: "Intelligent calendar management adapts to your priorities"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechCorp",
            image: "https://i.pravatar.cc/150?img=1",
            content: "Colony has transformed how our team works. The AI suggestions are incredibly accurate and have boosted our productivity by 40%."
        },
        {
            name: "Michael Chen",
            role: "Designer",
            company: "Creative Studio",
            image: "https://i.pravatar.cc/150?img=3",
            content: "The wellbeing features are a game-changer. I'm more productive and feel better about my work-life balance."
        },
        {
            name: "Emily Rodriguez",
            role: "Engineering Lead",
            company: "StartupXYZ",
            image: "https://i.pravatar.cc/150?img=5",
            content: "Best productivity tool I've used. The automation features save me hours every week. Highly recommend!"
        }
    ];

    return (
        <div className="landing-page">
            {/* Navigation */}
            <Navigation />

            {/* Hero Section */}
            <section className="landing-hero">
                {/* Gradient Orbs */}
                <div className="landing-hero-orb landing-hero-orb-1"></div>
                <div className="landing-hero-orb landing-hero-orb-2"></div>
                <div className="landing-hero-orb landing-hero-orb-3"></div>

                <div className="landing-hero-container">
                    <div className="landing-hero-grid">
                        {/* Left Content */}
                        <div className="landing-hero-content">
                            {/* Badge */}
                            <div className="landing-hero-badge">
                                <div className="landing-hero-badge-dot"></div>
                                <span className="landing-hero-badge-text">Trusted by 10,000+ professionals</span>
                            </div>

                            {/* Heading */}
                            <div className="landing-hero-heading">
                                <h1 className="landing-hero-h1">
                                    <span>Work smarter,</span>
                                    <span className="landing-hero-h1-gradient">
                                        Live better
                                    </span>
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="landing-hero-description">
                                Colony is the hybrid productivity and wellbeing platform that helps you achieve more while maintaining balance. Powered by AI, designed for humans.
                            </p>

                            {/* CTA Buttons */}
                            <div className="landing-hero-cta">
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="landing-btn-primary"
                                >
                                    Get Started Free
                                    <ArrowRight />
                                </button>
                                <button className="landing-btn-secondary">
                                    <Play />
                                    Watch Demo
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="landing-hero-stats">
                                <div className="landing-hero-stat">
                                    <div className="landing-hero-stat-value">98%</div>
                                    <div className="landing-hero-stat-label">User Satisfaction</div>
                                </div>
                                <div className="landing-hero-stat">
                                    <div className="landing-hero-stat-value purple">50K+</div>
                                    <div className="landing-hero-stat-label">Active Users</div>
                                </div>
                                <div className="landing-hero-stat">
                                    <div className="landing-hero-stat-value pink">4.9</div>
                                    <div className="landing-hero-stat-label">App Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Mockup */}
                        <div className="landing-hero-mockup">
                            {/* Floating Badge */}
                            <div className="landing-hero-floating-badge">
                                <Sparkles />
                            </div>

                            {/* Main Card */}
                            <div className="landing-hero-main-card">
                                {/* Browser Dots */}
                                <div className="landing-hero-browser-dots">
                                    <div className="landing-hero-dot red"></div>
                                    <div className="landing-hero-dot yellow"></div>
                                    <div className="landing-hero-dot green"></div>
                                </div>

                                {/* Cards Grid */}
                                <div className="landing-hero-cards-grid">
                                    <div className="landing-hero-feature-card blue">
                                        <CheckSquare className="landing-hero-feature-icon blue" />
                                        <div className="landing-hero-feature-bars">
                                            <div className="landing-hero-feature-bar w-75"></div>
                                            <div className="landing-hero-feature-bar w-50"></div>
                                        </div>
                                    </div>
                                    <div className="landing-hero-feature-card purple">
                                        <Sparkles className="landing-hero-feature-icon purple" />
                                        <div className="landing-hero-feature-bars">
                                            <div className="landing-hero-feature-bar w-75"></div>
                                            <div className="landing-hero-feature-bar w-50"></div>
                                        </div>
                                    </div>
                                    <div className="landing-hero-feature-card green">
                                        <Heart className="landing-hero-feature-icon green" />
                                        <div className="landing-hero-feature-bars">
                                            <div className="landing-hero-feature-bar w-75"></div>
                                            <div className="landing-hero-feature-bar w-50"></div>
                                        </div>
                                    </div>
                                    <div className="landing-hero-feature-card orange">
                                        <BarChart3 className="landing-hero-feature-icon orange" />
                                        <div className="landing-hero-feature-bars">
                                            <div className="landing-hero-feature-bar w-75"></div>
                                            <div className="landing-hero-feature-bar w-50"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Badge */}
                            <div className="landing-hero-bottom-badge">
                                <div className="landing-hero-bottom-badge-content">
                                    <div className="landing-hero-bottom-badge-icon">
                                        <TrendingUp />
                                    </div>
                                    <div>
                                        <div className="landing-hero-bottom-badge-value">+23%</div>
                                        <div className="landing-hero-bottom-badge-label">Productivity</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="landing-features">
                <div className="landing-section-container">
                    {/* Header */}
                    <div className="landing-section-header">
                        <div className="landing-section-badge">
                            <Sparkles />
                            <span className="landing-section-badge-text">Features</span>
                        </div>
                        
                        <h2 className="landing-section-title">
                            Everything you need to thrive
                        </h2>
                        <p className="landing-section-description">
                            Colony combines powerful productivity tools with wellbeing features to help you achieve your goals while maintaining a healthy work-life balance.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="landing-features-grid">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="landing-feature-card">
                                    <div className={`landing-feature-icon ${feature.iconClass}`}>
                                        <Icon />
                                    </div>
                                    <h3 className="landing-feature-title">
                                        {feature.title}
                                    </h3>
                                    <p className="landing-feature-description">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="landing-features-cta">
                        <p>
                            And many more features to discover.{" "}
                            <button
                                onClick={() => navigate("/auth")}
                                className="landing-features-cta-link"
                            >
                                Start your free trial
                                <ArrowRight />
                            </button>
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works / AI Section */}
            <section id="how-it-works" className="landing-ai">
                <div className="landing-section-container">
                    {/* Header */}
                    <div className="landing-section-header">
                        <div className="landing-section-badge purple">
                            <Sparkles />
                            <span className="landing-section-badge-text">AI-Powered</span>
                        </div>
                        
                        <h2 className="landing-section-title">
                            Your intelligent productivity partner
                        </h2>
                        <p className="landing-section-description">
                            Colony&apos;s AI understands your work patterns, adapts to your style, and provides personalized guidance to help you work smarter, not harder.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="landing-ai-grid">
                        {/* AI Assistant Card */}
                        <div className="landing-ai-card">
                            {/* Header */}
                            <div className="landing-ai-card-header">
                                <div className="landing-ai-icon">
                                    <Sparkles />
                                </div>
                                <div>
                                    <h3 className="landing-ai-card-title">AI Assistant</h3>
                                    <p className="landing-ai-card-subtitle">Always ready to help</p>
                                </div>
                            </div>

                            {/* Chat Bubble */}
                            <div className="landing-ai-chat-bubble">
                                <p>What should I focus on today?</p>
                            </div>

                            {/* Suggestions */}
                            <p className="landing-ai-suggestions-label">Based on your schedule, I recommend:</p>
                            
                            <div className="landing-ai-suggestions">
                                <div className="landing-ai-suggestion">
                                    <div className="landing-ai-suggestion-icon green">
                                        <Check />
                                    </div>
                                    <span className="landing-ai-suggestion-text">Complete project proposal (2h focus time)</span>
                                </div>
                                <div className="landing-ai-suggestion">
                                    <div className="landing-ai-suggestion-icon blue">
                                        <Calendar />
                                    </div>
                                    <span className="landing-ai-suggestion-text">Take a 15 min wellbeing break</span>
                                </div>
                                <div className="landing-ai-suggestion">
                                    <div className="landing-ai-suggestion-icon purple">
                                        <Users />
                                    </div>
                                    <span className="landing-ai-suggestion-text">Team sync at 3 PM</span>
                                </div>
                            </div>

                            {/* Stats Badge */}
                            <div className="landing-ai-stats-badge">
                                <div className="landing-ai-stats-value">+23%</div>
                                <div className="landing-ai-stats-label">Productivity</div>
                            </div>
                        </div>

                        {/* AI Features Grid */}
                        <div className="landing-ai-features-grid">
                            {aiFeatures.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="landing-ai-feature-card">
                                        <div className="landing-ai-feature-icon">
                                            <Icon />
                                        </div>
                                        <h4 className="landing-ai-feature-title">
                                            {feature.title}
                                        </h4>
                                        <p className="landing-ai-feature-description">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI Stats */}
                    <div className="landing-ai-stats">
                        <div className="landing-ai-stat">
                            <div className="landing-ai-stat-value blue">85%</div>
                            <div className="landing-ai-stat-label">Time Saved</div>
                        </div>
                        <div className="landing-ai-stat">
                            <div className="landing-ai-stat-value purple">10x</div>
                            <div className="landing-ai-stat-label">Faster Tasks</div>
                        </div>
                        <div className="landing-ai-stat">
                            <div className="landing-ai-stat-value orange">99%</div>
                            <div className="landing-ai-stat-label">Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="landing-testimonials">
                <div className="landing-section-container">
                    <div className="landing-section-header">
                        <div className="landing-section-badge yellow">
                            <Star />
                            <span className="landing-section-badge-text">Customer Stories</span>
                        </div>
                        <h2 className="landing-section-title">Loved by productive teams everywhere</h2>
                        <p className="landing-section-description">
                            See what our users have to say about transforming their productivity and wellbeing with Colony.
                        </p>
                    </div>

                    <div className="landing-testimonials-grid">
                        <div className="landing-testimonial-card">
                            <div className="landing-testimonial-stars">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <p className="landing-testimonial-content">
                                &quot;Colony has completely changed how I manage my work and wellbeing. The AI insights are incredibly helpful, and I&apos;ve never felt more balanced.&quot;
                            </p>
                            <div className="landing-testimonial-author">
                                <img 
                                    src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1MzExNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Sarah Chen"
                                    className="landing-testimonial-avatar"
                                />
                                <div>
                                    <p className="landing-testimonial-name">Sarah Chen</p>
                                    <p className="landing-testimonial-role">Product Manager, TechCorp</p>
                                </div>
                            </div>
                        </div>

                        <div className="landing-testimonial-card">
                            <div className="landing-testimonial-stars">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <p className="landing-testimonial-content">
                                &quot;The hybrid approach of productivity and wellbeing is genius. I get more done while actually taking care of myself. It&apos;s a game-changer.&quot;
                            </p>
                            <div className="landing-testimonial-author">
                                <img 
                                    src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTMxMTU2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Marcus Rodriguez"
                                    className="landing-testimonial-avatar"
                                />
                                <div>
                                    <p className="landing-testimonial-name">Marcus Rodriguez</p>
                                    <p className="landing-testimonial-role">Founder, StartupXYZ</p>
                                </div>
                            </div>
                        </div>

                        <div className="landing-testimonial-card">
                            <div className="landing-testimonial-stars">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <p className="landing-testimonial-content">
                                &quot;Our team&apos;s productivity has skyrocketed, and burnout is way down. Colony helped us build a healthier work culture.&quot;
                            </p>
                            <div className="landing-testimonial-author">
                                <img 
                                    src="https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTMxMTU2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Emily Thompson"
                                    className="landing-testimonial-avatar"
                                />
                                <div>
                                    <p className="landing-testimonial-name">Emily Thompson</p>
                                    <p className="landing-testimonial-role">HR Director, Global Inc</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats inside Testimonials */}
                    <div className="landing-testimonials-stats">
                        <div className="landing-testimonials-stat-item">
                            <div className="landing-testimonials-stat-value blue">85%</div>
                            <p className="landing-testimonials-stat-label">Time Saved</p>
                        </div>
                        <div className="landing-testimonials-stat-item">
                            <div className="landing-testimonials-stat-value purple">10x</div>
                            <p className="landing-testimonials-stat-label">Faster Tasks</p>
                        </div>
                        <div className="landing-testimonials-stat-item">
                            <div className="landing-testimonials-stat-value yellow">99%</div>
                            <p className="landing-testimonials-stat-label">Accuracy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="landing-pricing">
                <div className="landing-section-container">
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">Simple, Transparent Pricing</h2>
                        <p className="landing-section-description">
                            Choose the perfect plan for your productivity journey. All plans include a 14-day free trial.
                        </p>
                    </div>

                    <div className="landing-pricing-grid">
                        {/* Free Plan */}
                        <div className="landing-pricing-card">
                            <div className="landing-pricing-icon">
                                <Users />
                            </div>
                            <h3 className="landing-pricing-title">Free</h3>
                            <p className="landing-pricing-subtitle">Perfect for individuals getting started</p>
                            <div className="landing-pricing-price">
                                <span className="landing-pricing-amount">$0</span>
                                <span className="landing-pricing-period">/ forever</span>
                            </div>
                            <button className="landing-pricing-button primary" onClick={() => navigate("/auth")}>
                                Get Started
                            </button>
                            <ul className="landing-pricing-features">
                                <li>
                                    <Check />
                                    <span>Up to 10 tasks per day</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Basic wellbeing tracking</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Personal AI assistant</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Mobile app access</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Email support</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pro Plan */}
                        <div className="landing-pricing-card featured">
                            <div className="landing-pricing-badge">Most Popular</div>
                            <div className="landing-pricing-icon">
                                <Users />
                            </div>
                            <h3 className="landing-pricing-title">Pro</h3>
                            <p className="landing-pricing-subtitle">For professionals who need more power</p>
                            <div className="landing-pricing-price">
                                <span className="landing-pricing-amount">$12</span>
                                <span className="landing-pricing-period">/ per month</span>
                            </div>
                            <button className="landing-pricing-button primary" onClick={() => navigate("/auth")}>
                                Start Free Trial
                            </button>
                            <ul className="landing-pricing-features">
                                <li>
                                    <Check />
                                    <span>Unlimited tasks</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Advanced wellbeing insights</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Priority AI assistance</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Team collaboration (up to 5)</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Custom integrations</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Priority support</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Analytics dashboard</span>
                                </li>
                            </ul>
                        </div>

                        {/* Team Plan */}
                        <div className="landing-pricing-card">
                            <div className="landing-pricing-icon">
                                <Users />
                            </div>
                            <h3 className="landing-pricing-title">Team</h3>
                            <p className="landing-pricing-subtitle">For teams that want to thrive together</p>
                            <div className="landing-pricing-price">
                                <span className="landing-pricing-amount">$36</span>
                                <span className="landing-pricing-period">/ per month</span>
                            </div>
                            <button className="landing-pricing-button primary" onClick={() => navigate("/auth")}>
                                Contact Sales
                            </button>
                            <ul className="landing-pricing-features">
                                <li>
                                    <Check />
                                    <span>Everything in Pro</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Unlimited team members</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Advanced team analytics</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Custom workflows</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>Dedicated account manager</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>SSO & advanced security</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>API access</span>
                                </li>
                                <li>
                                    <Check />
                                    <span>24/7 phone support</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="landing-pricing-footer">
                        <p>Have questions? <a href="#contact" className="landing-pricing-link">Contact our team</a></p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta">
                {/* Background Gradient */}
                <div className="landing-cta-bg"></div>
                
                {/* Animated Circles */}
                <div className="landing-cta-circle landing-cta-circle-1"></div>
                <div className="landing-cta-circle landing-cta-circle-2"></div>

                <div className="landing-cta-container">
                    <div className="landing-cta-content">
                        {/* Limited Time Offer Badge */}
                        <div className="landing-cta-badge">
                            <Sparkles />
                            <span>Limited Time Offer</span>
                        </div>

                        <h2 className="landing-cta-title">
                            Ready to transform your productivity &amp; wellbeing?
                        </h2>
                        <p className="landing-cta-description">
                            Join thousands of professionals who are working smarter and living better with Colony. Start your free trial today.
                        </p>

                        {/* Feature Bullets */}
                        <div className="landing-cta-features">
                            <div className="landing-cta-feature">
                                <Check />
                                <span>14-day free trial</span>
                            </div>
                            <div className="landing-cta-feature">
                                <Check />
                                <span>No credit card required</span>
                            </div>
                            <div className="landing-cta-feature">
                                <Check />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="landing-cta-feature">
                                <Check />
                                <span>Full access to all features</span>
                            </div>
                        </div>

                        {/* Email Input and Buttons */}
                        <div className="landing-cta-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email address"
                                className="landing-cta-input"
                            />
                            <div className="landing-cta-buttons">
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="landing-cta-button primary"
                                >
                                    Start Free Trial
                                </button>
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="landing-cta-button secondary"
                                >
                                    Schedule a Demo
                                </button>
                            </div>
                        </div>

                        <p className="landing-cta-note">
                            Get started in less than 2 minutes. No technical knowledge required.
                        </p>

                        {/* Security Badges */}
                        <div className="landing-cta-badges">
                            <div className="landing-cta-security-badge">
                                <Shield />
                                <span>GDPR Compliant</span>
                            </div>
                            <div className="landing-cta-security-badge">
                                <Lock />
                                <span>SOC 2 Certified</span>
                            </div>
                            <div className="landing-cta-security-badge">
                                <Lock />
                                <span>256-bit Encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Landing;