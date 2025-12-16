import { auth } from "@/lib/auth";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client"; // We need to create this server-side client
import { GET_USER_PROFILE } from "@/lib/graphql/queries";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Star, GitFork, Users, MapPin, Link as LinkIcon, Building } from "lucide-react";

export default async function UserProfile({ params }) {
    const session = await auth();
    if (!session) redirect("/");

    const { username } = await params;

    // Fetch data
    const client = getClient(session.accessToken);
    const { data } = await client.query({
        query: GET_USER_PROFILE,
        variables: { login: username },
    });

    const user = data?.user;

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-950 text-white p-8 flex justify-center">
                <h1 className="text-2xl">User not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Profile Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-gray-800 shadow-2xl shrink-0"
                    />
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                                {user.name}
                            </h1>
                            <p className="text-xl text-gray-400 font-mono">@{username}</p>
                        </div>

                        {user.bio && <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">{user.bio}</p>}

                        <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-2">
                            {user.company && (
                                <span className="flex items-center gap-2 text-gray-400"><Building size={16} className="text-blue-400" /> {user.company}</span>
                            )}
                            {user.websiteUrl && (
                                <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                                    <LinkIcon size={16} /> Website
                                </a>
                            )}
                            <span className="flex items-center gap-2 text-gray-400"><MapPin size={16} className="text-red-400" /> {user.location || 'Earth'}</span>
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-8 justify-center md:justify-start pt-4 border-t border-gray-800 mt-6">
                            <div className="text-center md:text-left">
                                <span className="block text-2xl font-bold text-white">{new Intl.NumberFormat('en', { notation: "compact" }).format(user.followers.totalCount)}</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Followers</span>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="block text-2xl font-bold text-white">{new Intl.NumberFormat('en', { notation: "compact" }).format(user.following.totalCount)}</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Following</span>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="block text-2xl font-bold text-white">{user.repositories.totalCount}</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Repos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pinned Repositories */}
                {user.pinnedItems.nodes.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Star className="text-yellow-500" /> Pinned Repositories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.pinnedItems.nodes.map((repo) => (
                                <Link
                                    href={`/repo/${username}/${repo.name}/issues`}
                                    key={repo.id}
                                    className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <GitFork size={16} />
                                            </div>
                                            <span className="font-bold truncate text-gray-200 group-hover:text-blue-400 transition-colors">{repo.name}</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                            {new Intl.NumberFormat('en', { notation: "compact" }).format(repo.stargazerCount)}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                        {repo.description || "No description provided."}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-gray-800">
                                        {repo.primaryLanguage && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                                                {repo.primaryLanguage.name}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Repositories Grid */}
                {user.repositories.nodes.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <GitFork className="text-blue-500" /> Recent Activity
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.repositories.nodes.slice(0, 6).map(repo => (
                                <Link
                                    href={`/repo/${username}/${repo.name}/issues`}
                                    key={repo.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-gray-900/20 hover:bg-gray-900 hover:border-gray-700 transition-all"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">Updated {new Date(repo.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        {repo.primaryLanguage && (
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
                                                {repo.primaryLanguage.name}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={12} /> {repo.stargazerCount}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <a
                                href={`https://github.com/${username}?tab=repositories`}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                View all repositories on GitHub <LinkIcon size={12} />
                            </a>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
