import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <Card className="task-card p-8">
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                1. Information We Collect
              </h2>
              <p>
                TO DO & TASK is designed with privacy in mind. All your tasks, projects,
                and preferences are stored locally on your device using browser local
                storage. We do not collect, store, or transmit any of your personal data
                to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                Since all data is stored locally on your device, we do not have access
                to your tasks, projects, or any personal information. Your data is
                solely used by you for your own productivity and organization purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                3. Data Storage and Security
              </h2>
              <p>
                Your data is stored in your browser's local storage. This means:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Data persists between sessions on the same device and browser</li>
                <li>Data is not synchronized across different devices or browsers</li>
                <li>Clearing your browser data will remove your tasks and projects</li>
                <li>We recommend regularly backing up important information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                4. Cookies and Tracking
              </h2>
              <p>
                We do not use cookies for tracking or analytics. The only browser
                storage we use is local storage for saving your tasks, projects, and
                theme preferences (dark/light mode).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                5. Third-Party Services
              </h2>
              <p>
                TO DO & TASK does not integrate with any third-party services or share
                your data with external parties. Your information remains completely
                private and under your control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                6. Children's Privacy
              </h2>
              <p>
                Our service is available to users of all ages. Since we don't collect
                any personal information, there are no special considerations for
                children's privacy. However, we recommend parental guidance for younger
                users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                7. Changes to This Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you
                of any changes by posting the new Privacy Policy on this page and
                updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us
                through our Contact page.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;
