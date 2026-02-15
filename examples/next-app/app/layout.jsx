import "brand-shell/default.css";
import "./globals.css";

export const metadata = {
  title: "Brand Shell Next Demo",
  description: "Next.js consumer demo for brand-shell",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
