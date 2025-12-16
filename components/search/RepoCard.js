"use client";

import Image from "next/image";

import { useMutation } from "@apollo/client/react";
import { Star, GitFork } from "lucide-react";
import Link from "next/link";
import { ADD_STAR, REMOVE_STAR } from "@/lib/graphql/mutations";

export default function RepoCard({ repo }) {
    const [addStar] = useMutation(ADD_STAR, {
        optimisticResponse: {
            addStar: {
                starrable: {
                    id: repo.id,
                    stargazerCount: repo.stargazerCount + 1,
                    viewerHasStarred: true,
                    __typename: "Repository",
                },
                __typename: "AddStarPayload",
            },
        },
    });

    const [removeStar] = useMutation(REMOVE_STAR, {
        optimisticResponse: {
            removeStar: {
                starrable: {
                    id: repo.id,
                    stargazerCount: repo.stargazerCount - 1,
                    viewerHasStarred: false,
                    __typename: "Repository",
                },
                __typename: "RemoveStarPayload",
            },
            // You must update the cache manually or ensure fragment matching works for auto-update.
            // Since we return the same ID and fields, Apollo Cache should update automatically.
        },
    });

    const handleToggleStar = () => {
        if (repo.viewerHasStarred) {
            removeStar({ variables: { starrableId: repo.id } });
        } else {
            addStar({ variables: { starrableId: repo.id } });
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Image
                        src={repo.owner.avatarUrl}
                        alt={repo.owner.login}
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-700 shrink-0"
                    />
                    <div className="min-w-0">
                        <Link
                            href={`/repo/${repo.owner.login}/${repo.name}/issues`}
                            className="text-lg font-bold text-blue-400 hover:underline flex items-center gap-2 truncate"
                        >
                            <span className="truncate">{repo.owner.login} / {repo.name}</span>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggleStar}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${repo.viewerHasStarred
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20"
                        : "bg-gray-800 text-gray-400 border-gray-700 hover:text-white hover:border-gray-500"
                        }`}
                >
                    <Star
                        size={16}
                        className={repo.viewerHasStarred ? "fill-yellow-400" : ""}
                    />
                    <span>
                        {new Intl.NumberFormat('en-US', { notation: "compact" }).format(repo.stargazerCount)}
                    </span>
                </button>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
                {repo.description || "No description provided."}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
                {repo.primaryLanguage && (
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: repo.primaryLanguage.color }}
                        />
                        {repo.primaryLanguage.name}
                    </div>
                )}
                <span title="Updated at">
                    Updated {new Date(repo.updatedAt).toLocaleDateString()}
                </span>
            </div>

            {repo.repositoryTopics?.nodes.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {repo.repositoryTopics.nodes.map(t => (
                        <span key={t.topic.name} className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                            {t.topic.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
