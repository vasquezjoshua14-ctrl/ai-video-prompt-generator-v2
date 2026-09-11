import "./globals.css";

export const metadata = {
  title: "AI Video Prompt Generator HYUNA",
  description: "AI Video Prompt Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
