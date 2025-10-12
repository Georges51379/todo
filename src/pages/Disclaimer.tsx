import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Disclaimer
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <Card className="task-card p-8">
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                1. General Disclaimer
              </h2>
              <p>
                The information provided by TO DO & TASK is for general informational
                purposes only. All information on the platform is provided in good faith,
                however we make no representation or warranty of any kind, express or
                implied, regarding the accuracy, adequacy, validity, reliability,
                availability or completeness of any information on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                2. No Professional Advice
              </h2>
              <p>
                TO DO & TASK is a productivity tool designed to help you organize tasks
                and projects. It does not provide professional, legal, financial, or any
                other form of advice. You should consult with appropriate professionals
                for specific advice tailored to your situation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                3. Data Loss and Backup
              </h2>
              <p>
                While we strive to provide a reliable service, TO DO & TASK stores all
                data locally on your device. We are not responsible for any loss of data
                due to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Browser cache clearing or data deletion</li>
                <li>Device malfunction or replacement</li>
                <li>Browser updates or changes</li>
                <li>Any other circumstances beyond our control</li>
              </ul>
              <p>
                Users are strongly encouraged to regularly back up important information
                stored in the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                4. Service Availability
              </h2>
              <p>
                We do not guarantee that the service will be available at all times or
                that it will be free from errors, viruses, or other harmful components.
                We reserve the right to modify, suspend, or discontinue any part of the
                service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                5. User Responsibility
              </h2>
              <p>
                Users are solely responsible for:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>The content they create and store in the application</li>
                <li>Ensuring their use complies with applicable laws and regulations</li>
                <li>Maintaining appropriate backups of their data</li>
                <li>The security of their device and browser</li>
                <li>Any consequences arising from their use of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                6. External Links
              </h2>
              <p>
                Our platform may contain links to external websites. We have no control
                over the content and availability of those sites and are not responsible
                for any content, advertising, products, or other materials on or
                available from such websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                Under no circumstance shall we have any liability to you for any loss or
                damage of any kind incurred as a result of the use of the platform or
                reliance on any information provided. Your use of the platform and your
                reliance on any information is solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                8. Changes to This Disclaimer
              </h2>
              <p>
                We reserve the right to update or change this disclaimer at any time.
                Any changes will be effective immediately upon posting to this page with
                an updated revision date.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Disclaimer;
