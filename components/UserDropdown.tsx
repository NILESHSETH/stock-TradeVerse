'use client';
// only used when we use reouter functinoality
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} 
from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NavItems from "@/components/NavItems";

const UserDropdown = () => {
  return (






    <DropdownMenu>
      <DropdownMenuTrigger
  render={
    <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" />
        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
          J
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col items-start">
        <span className="text-base font-medium text-gray-400">John</span>
      </div>
    </Button>
  }
/>









      <DropdownMenuContent className="w-64 text-gray-400">
        <DropdownMenuGroup>

  
          <DropdownMenuLabel>
            <div className="flex relative items-center gap-3 py-2">
                <Avatar className="h-10 w-10">
                <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" />
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                  J
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-400">John</span>
                <span className="text-sm text-gray-500 break-all">
                  contact@jsmastery.com
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
{/* --------------------------all the lable part for the info abou the user---------------------------- */}


          <DropdownMenuSeparator className="bg-gray-600" />
{/* ----------------------the downmenu is for log out of the user--------------------- */}
          <DropdownMenuItem className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
            <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
            Logout
          </DropdownMenuItem>

          <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
          <nav className="sm:hidden">
            <NavItems />
          </nav>
        </DropdownMenuGroup>



      </DropdownMenuContent>





    </DropdownMenu>
// {/* <DropdownMenu>
//   <DropdownMenuTrigger>
//     Open
//   </DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuGroup>
//       <DropdownMenuLabel>My Account</DropdownMenuLabel>
//       <DropdownMenuItem>Profile</DropdownMenuItem>
//       <DropdownMenuItem>Billing</DropdownMenuItem>
//     </DropdownMenuGroup>
//     <DropdownMenuSeparator />
//     <DropdownMenuGroup>
//       <DropdownMenuItem>Team</DropdownMenuItem>
//       <DropdownMenuItem>Subscription</DropdownMenuItem>
//     </DropdownMenuGroup>
//   </DropdownMenuContent>
// </DropdownMenu> */}
  );
};

export default UserDropdown;