import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, User, Search, ArrowRight, Github } from "lucide-react";

export default async function Dashboard() {
    const session = await auth();
    if (!session) redirect("/");

    // Handle stale sessions (created before username was captured)
    if (!session.user?.username) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Account Sync Required</h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    We've updated our system to better handle GitHub profiles.
                    Please sign out and sign back in to refresh your session data.
                </p>
                <Link href="/api/auth/signout" className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-500 transition-colors">
                    Sign Out & Refresh
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 md:p-12 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="z-10 max-w-5xl w-full">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Welcome back, <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {session.user.username}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Explore the GitHub universe with enhanced speed and insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Repository Browser Card */}
                    <Link
                        href="/search"
                        className="group relative overflow-hidden p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Search size={120} className="text-blue-500 -rotate-12 translate-x-12 -translate-y-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="bg-blue-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                                <Search size={24} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                Repository Browser <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Advanced search with instant filters for language, stars, and topics.
                            </p>
                        </div>
                    </Link>

                    {/* Profile Card */}
                    <Link
                        href={`/user/${session.user.username}`}
                        className="group relative overflow-hidden p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <User size={120} className="text-purple-500 rotate-12 translate-x-12 -translate-y-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="bg-purple-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/30 transition-colors">
                                <User size={24} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                Your Profile <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Deep dive into your GitHub stats, pinned repositories, and organizations.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
