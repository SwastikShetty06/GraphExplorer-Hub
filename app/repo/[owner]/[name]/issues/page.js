import { auth } from "@/lib/auth";
import { getClient } from "@/lib/apollo-client";
import { GET_REPO_ISSUES } from "@/lib/graphql/queries";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, GitFork, ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import IssueList from "@/components/issues/IssueList";

// For infinite scroll, we will need a client component for the list.
// But for now, let's render the initial server-side page.

export default async function IssuesPage({ params }) {
    const session = await auth();
    if (!session) redirect("/");

    const { owner, name } = await params;

    const client = getClient(session.accessToken);

    let repoData;
    try {
        const { data } = await client.query({
            query: GET_REPO_ISSUES,
            variables: { owner, name, first: 20, states: ["OPEN"] },
        });
        repoData = data.repository;
    } catch (error) {
        console.error("Error fetching repo:", error);
        // If repo not found or error, show 404
        if (error.message.includes("Could not resolve to a Repository")) {
            notFound();
        }
    }

    if (!repoData) notFound();

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-md border-b border-white/10 px-4 pt-4 pb-0">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-3">
                            <Image
                                src={repoData.owner.avatarUrl}
                                alt={repoData.owner.login}
                                width={32}
                                height={32}
                                className="rounded-full border border-gray-700"
                            />
                            <h1 className="text-lg font-bold truncate">
                                <Link href={`/user/${repoData.owner.login}`} className="text-gray-400 font-normal hover:underline hover:text-blue-400">
                                    {repoData.owner.login}
                                </Link>
                                <span className="text-gray-600 mx-1">/</span>
                                <a href={repoData.url} target="_blank" className="hover:underline hover:text-blue-400">{repoData.Name}</a>
                            </h1>
                            <div className="hidden md:flex ml-3 items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs">
                                <Star size={12} className="text-yellow-500" />
                                <span className="font-mono text-gray-300">{new Intl.NumberFormat('en', { notation: 'compact' }).format(repoData.stargazerCount)}</span>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <a href={repoData.url} target="_blank" className="p-2 text-gray-400 hover:text-white transition-colors" title="Open on GitHub">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 text-sm font-medium text-gray-400">
                        <Link
                            href={`/repo/${owner}/${name}`}
                            className="pb-3 border-b-2 border-transparent hover:text-gray-200 hover:border-gray-700 transition-all"
                        >
                            Overview
                        </Link>
                        <Link
                            href={`/repo/${owner}/${name}/issues`}
                            className="pb-3 border-b-2 border-orange-500 text-white flex items-center gap-2"
                        >
                            Issues
                            <span className="bg-gray-800 text-xs px-1.5 py-0.5 rounded-full">{new Intl.NumberFormat().format(repoData.issues.totalCount)}</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        Issues
                        <span className="text-lg font-normal text-gray-500 bg-white/5 px-3 py-0.5 rounded-full border border-white/10">
                            {new Intl.NumberFormat().format(repoData.issues.totalCount)}
                        </span>
                    </h2>
                </div>

                {/* Issue List Client Component */}
                <IssueList
                    initialIssues={repoData.issues.edges.map(e => e.node)}
                    initialPageInfo={repoData.issues.pageInfo}
                    owner={repoData.owner.login}
                    name={repoData.Name}
                />
            </main>

        </div>
    );
}
