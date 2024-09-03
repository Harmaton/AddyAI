"use client";

import {
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import {
  LineChart,
  PenBox,
  Sparkles
} from "lucide-react";

import Avatar from "@/components/icon-avatar";
import { Logo, LogoIcon } from "@/components/ui/logo";
import Image from "next/image";
import { IconFileAnalytics } from "@tabler/icons-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <main className="text-center mt-10">
        <h2>You are not logged in</h2>
        <Link href="/login">
          <Button className="mt-10 bg-purple-800">Sign In</Button>
        </Link>
      </main>
    );
  }

  const links = [
    {
        label: "Panel",
        href: "/dashboard",
        icon: <LineChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      },
    {
      label: "Conversations",
      href: "/conversations",
      icon: <PenBox className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "DocumentsAI",
      href: "/documentai",
      icon:  <IconFileAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ,
    },
    {
      label: "My Agent",
      href: "/agent",
      icon: <Sparkles className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <MobileSidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Logo />
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <Avatar seed={user?.email || ""} />
              </div>
            </SidebarBody>
          </MobileSidebar>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <SidebarLink
                  link={{
                    label: user.email || "User",
                    href: "#",
                    icon: <Avatar seed={user?.email || ""} />,
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 md:ml-36">
          {/* Inner Navbar */}
          {/* <nav className="bg-white mr-4 shadow-sm p-4 flex justify-between items-center">
            {/* <ul className="flex space-x-4">
              <li><Link href="#" className="text-black hover:underline hover:text-blue-600 active:text-blue-600">Open - </Link></li>
              <li><Link href="/unread" className="text-black hover:underline hover:text-blue-600 active:text-blue-600">Unread</Link></li>
              <li><Link href="/sent" className="text-black hover:underline hover:text-blue-600 active:text-blue-600">Sent</Link></li>
            </ul> */}
            {/* <div className="flex items-center mr-2">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="User profile"
                  className="w-8 h-8 rounded-full mr-4"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </nav> */} 

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="border rounded-lg p-6">
              {children}
            </div>
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;