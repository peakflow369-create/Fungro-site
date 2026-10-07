'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// three.js never ships in the server bundle; the void background shows while it loads.
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false, loading: () => null });

export default function SceneClient() {
  const path = usePathname();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Scene3D showDevice={path === '/'} />
    </div>
  );
}
