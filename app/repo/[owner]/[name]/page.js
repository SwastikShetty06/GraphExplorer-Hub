import { auth } from "@/lib/auth";
import { getClient } from "@/lib/apollo-client";
import { GET_REPO_DETAILS } from "@/lib/graphql/queries";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, GitFork, Eye, Globe, Scale, BookOpen, Clock, HardDrive, ArrowLeft, CircleDot, ExternalLink } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown.css';

export default async function RepoOverviewPage({ params }) {
    const session = await auth();
    if (!session) redirect("/");

    const { owner, name } = await params;

    const client = getClient(session.accessToken);

    let repo;
    try {
        const { data } = await client.query({
            query: GET_REPO_DETAILS,
            variables: { owner, name },
        });
        repo = data.repository;
    } catch (error) {
        console.error("Error fetching repo details:", error);
        if (error.message.includes("Could not resolve to a Repository")) {
            notFound();
        }
    }

    if (!repo) notFound();

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans pb-12">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-md border-b border-white/10 px-4 pt-4 pb-0">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-3">
                            <Image
                                src={repo.owner.avatarUrl}
                                alt={repo.owner.login}
                                width={32}
                                height={32}
                                className="rounded-full border border-gray-700"
                            />
                            <h1 className="text-lg font-bold truncate">
                                <Link href={`/user/${repo.owner.login}`} className="text-gray-400 font-normal hover:underline hover:text-blue-400">
                                    {repo.owner.login}
                                </Link>
                                <span className="text-gray-600 mx-1">/</span>
                                <a href={repo.url} target="_blank" className="hover:underline hover:text-blue-400">{repo.name}</a>
                            </h1>
                            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-800 border border-gray-700 text-gray-300">
                                {repo.isPrivate ? 'Private' : 'Public'}
                            </span>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <a href={repo.url} target="_blank" className="p-2 text-gray-400 hover:text-white transition-colors" title="Open on GitHub">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 text-sm font-medium text-gray-400">
                        <Link
                            href={`/repo/${owner}/${name}`}
                            className="pb-3 border-b-2 border-orange-500 text-white flex items-center gap-2"
                        >
                            <BookOpen size={16} /> Overview
                        </Link>
                        <Link
                            href={`/repo/${owner}/${name}/issues`}
                            className="pb-3 border-b-2 border-transparent hover:text-gray-200 hover:border-gray-700 transition-all flex items-center gap-2"
                        >
                            <CircleDot size={16} /> Issues
                            <span className="bg-gray-800 text-xs px-1.5 py-0.5 rounded-full">{new Intl.NumberFormat('en', { notation: "compact" }).format(repo.openIssues.totalCount)}</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column: README */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900/30 border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2 text-sm font-semibold">
                            <BookOpen size={16} className="text-gray-400" /> API Reference / README
                        </div>
                        <div className="p-6 md:p-10 markdown-body" style={{ backgroundColor: 'transparent', color: '#c9d1d9' }}>
                            {repo.readme ? (
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{repo.readme.text}</ReactMarkdown>
                            ) : (
                                <div className="text-center py-12 text-gray-500 italic">
                                    No README found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar Info */}
                <div className="space-y-6">

                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">About</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {repo.description || "No description available."}
                        </p>
                        {repo.homepageUrl && (
                            <div className="flex items-center gap-2 text-blue-400 break-all text-sm font-medium">
                                <Globe size={16} className="shrink-0" />
                                <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {repo.homepageUrl}
                                </a>
                            </div>
                        )}

                        {repo.repositoryTopics.nodes.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {repo.repositoryTopics.nodes.map(({ topic }) => (
                                    <span key={topic.name} className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                                        {topic.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Stats */}
                    <div className="space-y-3 text-sm text-gray-400">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2"><Star size={16} /> Stars</span>
                            <span className="text-white font-mono font-bold">{new Intl.NumberFormat().format(repo.stargazerCount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2"><Eye size={16} /> Watchers</span>
                            <span className="text-white font-mono font-bold">{new Intl.NumberFormat().format(repo.watchers.totalCount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2"><GitFork size={16} /> Forks</span>
                            <span className="text-white font-mono font-bold">{new Intl.NumberFormat().format(repo.forkCount)}</span>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Releases & Packages */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-200">Releases</h3>
                            {repo.latestRelease ? (
                                <a href={repo.latestRelease.url} target="_blank" className="flex items-center gap-2 text-green-400 text-sm hover:underline">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="font-mono font-bold">{repo.latestRelease.tagName}</span>
                                    <span className="text-gray-500 ml-auto text-xs">{new Date(repo.latestRelease.publishedAt).toLocaleDateString()}</span>
                                </a>
                            ) : (
                                <p className="text-sm text-gray-500">No releases published</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-200">License</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Scale size={16} />
                                {repo.licenseInfo ? repo.licenseInfo.name : "No license specified"}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Meta */}
                    <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            Updated {new Date(repo.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            Created {new Date(repo.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <HardDrive size={14} /> {Math.round(repo.diskUsage / 1024)} MB
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
