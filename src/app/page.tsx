'use client';

import dynamic from 'next/dynamic';

// WebXRコンポーネントを動的にインポート（SSRを無効化）
const WebXRScene = dynamic(() => import('./components/WebXRScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full h-screen bg-black">
      <WebXRScene />
    </div>
  );
}
