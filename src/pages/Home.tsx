import { Link } from "react-router-dom";
import { CheckSquare, ListTodo, Zap, Shield, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thank you for your feedback! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
                Organize Your Life. <br />
                <span className="text-white/90">One Task at a Time.</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                The modern productivity platform that helps you manage tasks and projects
                with ease. Stay focused, organized, and achieve more every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Link to="/tasks">
                  <Button size="lg" className="btn-hero w-full sm:w-auto">
                    <CheckSquare className="mr-2 h-5 w-5" />
                    Go to Tasks
                  </Button>
                </Link>
                <Link to="/todo">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/30">
                    <ListTodo className="mr-2 h-5 w-5" />
                    Go to Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose TO DO & TASK?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've built a platform that combines simplicity with powerful features
                to help you stay productive and organized. Whether you're managing
                personal tasks or complex projects, we've got you covered.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More About Us
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Card className="task-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Blazing fast performance ensures you can add, edit, and manage tasks instantly.
                </p>
              </Card>

              <Card className="task-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data stays on your device with local storage. Complete privacy guaranteed.
                </p>
              </Card>

              <Card className="task-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
                <p className="text-muted-foreground">
                  A clean, modern interface with dark mode support for comfortable use anytime.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Choose Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Would You Like to Manage Today?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link to="/tasks" className="group">
                <Card className="task-card p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <CheckSquare className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Manage My Tasks</h3>
                  <p className="text-muted-foreground mb-6">
                    Quick task management with priorities, pins, and filters. Perfect for
                    daily to-dos and quick items.
                  </p>
                  <Button className="btn-primary">Go to Tasks</Button>
                </Card>
              </Link>

              <Link to="/todo" className="group">
                <Card className="task-card p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <ListTodo className="h-16 w-16 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Manage My Projects</h3>
                  <p className="text-muted-foreground mb-6">
                    Organize tasks into projects with priorities and detailed tracking.
                    Ideal for complex workflows.
                  </p>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Go to Projects
                  </Button>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Have feedback, suggestions, or questions? Send us a message and we'll
                get back to you as soon as possible.
              </p>

              <Card className="task-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us what you think..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="btn-primary w-full">
                    Send Feedback
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
