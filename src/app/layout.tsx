import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WebXR AR Partition App',
  description: 'WebXRを使用したARパーティションアプリケーション',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="origin-trial" content="YOUR_ORIGIN_TRIAL_TOKEN_HERE" />
      </head>
      <body className="m-0 p-0 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
