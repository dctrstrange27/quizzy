import React from 'react'
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalContext } from '@/utils/ContextTypes';

type Props = {
  picture:string
  name:string
}

const Profile = ({picture,name}:Props) => {

  const{setShowProfile,showProfile} = useContext(GlobalContext)

      return (
        <>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Avatar>
                     <AvatarImage src={picture} alt="@shadcn" />
                     <AvatarFallback>
                        {name.substring(0, 1)}
                     </AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56 dark:bg-background">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                     </DropdownMenuItem>

                     <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {/* <LogOut /> */}
               </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Profile