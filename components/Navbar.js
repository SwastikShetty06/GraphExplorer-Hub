"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, Search, User, LogOut, Github } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    if (!session) return null;

    const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

    return (
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-1.5 rounded-lg">
                            <Github size={20} className="text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
                            GraphExplorer
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${pathname === "/dashboard"
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <Link
                            href="/search"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive("/search") || isActive("/repo")
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Search size={18} />
                            Browse
                        </Link>
                        <Link
                            href={`/user/${session.user.username || session.user.name}`}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive("/user")
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <User size={18} />
                            Profile
                        </Link>
                    </div>

                    {/* User & Logout */}
                    <div className="flex items-center gap-4">
                        {session.user.image && (
                            <Image
                                src={session.user.image}
                                alt="User"
                                width={32}
                                height={32}
                                className="rounded-full border border-gray-700 hidden sm:block"
                            />
                        )}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav (Bottom Bar style or simple stack? Let's keep it simple for now) */}
            {/* Usually bottom nav is better for mobile, but for speed let's just use the top links on small screens if needed, 
           or just rely on the dashboard as the hub. The desktop nav disappears on mobile. 
           Let's add a simple mobile row below if space permits, or just rely on main pages. 
           Actually, let's keep it clean. */}
        </nav>
    );
}
