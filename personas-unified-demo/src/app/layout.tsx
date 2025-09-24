import type { Metadata } from "next";
// import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Personas Demo - Multi-thème",
  description: "Application de démonstration des personas pour l'éducation aux médias et l'exposition Pasteur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background-light: #F1F5F9;
              --card-light: #FFFFFF;
              --text-primary-light: #0F172A;
              --text-secondary-light: #334155;
              --text-tertiary-light: #64748B;
              --border-light: #CBD5E1;
              --primary-accent: #4F46E5;
              --primary-accent-light: #EEF2FF;
            }

            body {
              font-family: 'Inter', sans-serif;
              background-color: var(--background-light);
              color: var(--text-secondary-light);
            }

            h1, h2, h3, h4, h5, h6 {
              color: var(--text-primary-light);
              font-weight: 600;
            }

            .material-symbols-outlined {
              font-variation-settings:
              'FILL' 0,
              'wght' 400,
              'GRAD' 0,
              'opsz' 24;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-[var(--background-light)] text-[var(--text-secondary-light)]">
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
