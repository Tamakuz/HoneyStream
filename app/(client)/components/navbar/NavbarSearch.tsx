import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const NavbarSearch = () => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search movies or anime..."
        className="pl-8 pr-4 rounded bg-secondary"
      />
    </div>
  )
}

export default NavbarSearch