'use client'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import gsap from 'gsap'

interface Tab {
  name: string;
  type: string;
  icon: string;
}

const NavbarTab: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const [currentType, setCurrentType] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currentType') || searchParams.get('type') || 'movie'
    }
    return searchParams.get('type') || 'movie'
  })

  const tabs: Tab[] = [
    { name: 'Movies', type: 'movie', icon: '🎬' },
    { name: 'Animes', type: 'anime', icon: '🍥' },
  ]

  const handleTabClick = (type: string): void => {
    setCurrentType(type)
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentType', type)
    }
    const params = new URLSearchParams(searchParams)
    params.set('type', type)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    tabsRef.current.forEach((tab) => {
      if (tab) {
        gsap.to(tab, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
      }
    })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (!params.has('type')) {
      params.set('type', currentType)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    } else {
      const typeFromParams = params.get('type')
      if (typeFromParams && typeFromParams !== currentType) {
        setCurrentType(typeFromParams)
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentType', typeFromParams)
        }
      }
    }
  }, [pathname, searchParams, currentType, router])

  return (
    <div className="flex space-x-2 bg-secondary/50 p-1 rounded-lg">
      {tabs.map((tab, index) => {
        const isActive = currentType === tab.type
        return (
          <button
            key={tab.name}
            ref={(el) => {
              if (el) tabsRef.current[index] = el
            }}
            onClick={() => {
              handleTabClick(tab.type)
              const currentTab = tabsRef.current[index]
              if (currentTab) {
                gsap.to(currentTab, {
                  scale: 0.95,
                  duration: 0.1,
                  ease: 'power2.in',
                  onComplete: () => {
                    gsap.to(currentTab, {
                      scale: 1,
                      duration: 0.2,
                      ease: 'power2.out'
                    })
                  }
                })
              }
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center space-x-2 ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}

export default NavbarTab