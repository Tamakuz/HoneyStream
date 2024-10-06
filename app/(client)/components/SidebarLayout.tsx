'use client'
import React from 'react'
import { Home, Compass, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const sidebarItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Discover', icon: Compass, href: '/discover' },
    { name: 'Popular', icon: TrendingUp, href: '/popular' },
    { name: 'Top Rated', icon: Star, href: '/top-rated' },
  ]

  return (
    <div className="flex gap-10 container pt-20 h-fit">
      <aside className="relative w-40">
        <nav className="space-y-1 sticky top-20">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={isActive ? 'font-semibold' : ''}>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default SidebarLayout