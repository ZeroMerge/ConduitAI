'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Workflow', href: '/workflow-builder', icon: '⚙️' },
  { name: 'Apps', href: '/app-connections', icon: '🔗' },
  { name: 'History', href: '/execution-history', icon: '📜' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="grid grid-cols-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center py-3
                transition-colors duration-200
                ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-900'
                }
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
