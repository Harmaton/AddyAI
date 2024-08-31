"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { ArrowRightCircle, MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import { NavigationMenuDemo } from "./shadcn-navbar";
import { auth } from "@/firebase";
import { useAuth } from "@/providers/AuthProvider";


export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 flex h-16 w-full items-center justify-between px-4 md:px-6 p-4 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out z-50 border-b border-gray-200">
        <div className="absolute inset-0 bg-gray-50/90 backdrop-blur-sm z-[-1]"></div>
      <Link
        href="/"
        className="font-normal flex items-center text-sm text-black py-1 relative z-20"
        prefetch={false}
      >
        <div className="flex items-center">
          <motion.img src="/logosvg.svg" alt="Logo" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-20 w-20 max-w-xs object-contain" />
          <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-bold ml-4">ADI</motion.span>
        </div>
      </Link>

      <div className="flex items-center gap-6 p-4">
        <Sheet>
          <SheetTrigger asChild>
            <nav className="flex items-center gap-6 md:hidden ">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </nav>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-background mt-4 mr-4 p-4"
          >
            <SheetHeader className="mb-4">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 mb-4 ">
              <Link
                href="/dashboard/ai-lending"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                AI Lending
              </Link>
              <Link
                href="/dashboard/loan-origination"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Loan Origination
              </Link>
              <Link
                href="/dashboard/document-lending"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Document Lending
              </Link>

              
             
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <>
                  <Button onClick={() => signOut(auth)} variant="outline">
                    Log out
                  </Button>
                  <Link href="/dashboard">
                    <Button className="bg-background border text-center border-violet-500 m-auto">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-background">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex justify-center mr-8 items-center gap-6">
          <nav className="flex items-center gap-6">
          <NavigationMenuDemo />
            </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button onClick={() => signOut(auth)} variant="outline">
                <span className="text-xl mr-2 font-mono">Log out</span>
              </Button>
              <Link href={"/dashboard"}>
                <Button className="bg-violet-500 hover:bg-blue-300 text-white p-2 border border-violet-500 m-auto">
                  <span className="text-xl mr-2 font-mono">Dashboard</span>
                  <ArrowRightCircle className="h-6 w-6 mr-2" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


