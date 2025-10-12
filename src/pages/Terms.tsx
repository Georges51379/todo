import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <Card className="task-card p-8">
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using TO DO & TASK, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to
                abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily use TO DO & TASK for personal,
                non-commercial transitory viewing only. This is the grant of a license,
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public display
                </li>
                <li>
                  Attempt to reverse engineer any software contained in TO DO & TASK
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the materials
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                3. User Responsibilities
              </h2>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Maintaining the confidentiality of your data</li>
                <li>All activities that occur under your usage</li>
                <li>Ensuring your use complies with applicable laws and regulations</li>
                <li>Backing up your data as it is stored locally on your device</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                4. Service Modifications
              </h2>
              <p>
                TO DO & TASK reserves the right to modify or discontinue, temporarily or
                permanently, the service (or any part thereof) with or without notice.
                You agree that we shall not be liable to you or to any third party for
                any modification, suspension or discontinuance of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                In no event shall TO DO & TASK or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data or
                profit, or due to business interruption) arising out of the use or
                inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                6. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance
                with applicable laws and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
