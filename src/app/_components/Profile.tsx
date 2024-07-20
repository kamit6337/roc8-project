"use client";

import handleLogout from "~/actions/handleLogout";
import ReactIcons from "~/assets/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Toastify from "./Toastify";
import { usePathname } from "next/navigation";

const Profile = ({ name }: { name: string }) => {
  const { ToastContainer, showErrorMessage } = Toastify();
  const pathname = usePathname();

  const logout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      showErrorMessage({ message: error?.message || "Something went wrong" });
    }
  };

  if (pathname !== "/") {
    return (
      <button className="flex h-full items-center gap-2 px-2">
        <p>Hi, {name}</p>
      </button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-full items-center gap-2 px-2">
            <p>Hi, {name}</p>
            <p>
              <ReactIcons.downArrow />
            </p>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white hover:bg-gray-50">
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer tracking-wider"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
    </>
  );
};

export default Profile;