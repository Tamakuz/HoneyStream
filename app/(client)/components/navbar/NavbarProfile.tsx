import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const NavbarProfile = () => {
  return (
    <Button variant="ghost" className="relative h-10 w-10 rounded">
      <Avatar className="h-10 w-10 rounded">
        <AvatarImage src="/avatars/01.png" alt="@username" />
        <AvatarFallback className='rounded'>UN</AvatarFallback>
      </Avatar>
    </Button>
  )
}

export default NavbarProfile