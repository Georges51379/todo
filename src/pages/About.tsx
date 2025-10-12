import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          About TO DO & TASK
        </h1>

        <div className="prose prose-lg max-w-none">
          <Card className="task-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At TO DO & TASK, our mission is to help individuals and teams achieve
              more by providing a simple, elegant, and powerful task management
              platform. We believe that productivity shouldn't be complicated, and that
              the best tools are the ones that get out of your way and let you focus on
              what matters most.
            </p>
          </Card>

          <Card className="task-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              Our Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We envision a world where everyone can organize their work and life
              effortlessly. Our platform is designed to grow with you, whether you're
              managing a personal to-do list or coordinating complex projects with
              multiple stakeholders.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to continuous improvement and innovation, always
              listening to our users and evolving our platform to meet their needs.
              Your success is our success, and we're here to support you every step of
              the way.
            </p>
          </Card>

          <Card className="task-card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-success" />
              Why Choose Us?
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Privacy First:</strong> Your data stays on your device with
                  local storage. We don't track, sell, or share your information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>No Subscriptions:</strong> Completely free to use with no
                  hidden fees or premium tiers. All features are available to everyone.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Modern Design:</strong> Beautiful, intuitive interface with
                  dark mode support for comfortable use any time of day.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Powerful Features:</strong> Pin tasks, set priorities, filter
                  views, drag-and-drop reordering, and project-based organization.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Responsive Design:</strong> Works seamlessly on desktop,
                  tablet, and mobile devices. Manage your tasks anywhere, anytime.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
