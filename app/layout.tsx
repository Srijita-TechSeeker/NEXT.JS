// app/layout.tsx
import './globals.css';  // if you have global styles

export const metadata = {
  title: 'Event Management System',
  description: 'Manage your events easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
