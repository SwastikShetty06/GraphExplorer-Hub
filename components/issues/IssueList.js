"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_REPO_ISSUES } from "@/lib/graphql/queries";
import Link from "next/link";
import { MessageCircle, Loader2, CheckCircle2, CircleDot } from "lucide-react";

export default function IssueList({ initialIssues, initialPageInfo, owner, name }) {
    const [issues, setIssues] = useState(initialIssues);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // We use useLazyQuery to fetch the next page manually
    const [fetchIssues] = useLazyQuery(GET_REPO_ISSUES);

    // Intersection Observer Ref
    const observerRef = useRef();

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !pageInfo.hasNextPage) return;

        setIsLoadingMore(true);

        try {
            const { data } = await fetchIssues({
                variables: {
                    owner,
                    name,
                    first: 20,
                    after: pageInfo.endCursor,
                    states: ["OPEN"]
                }
            });

            const newEdges = data.repository.issues.edges;
            const newPageInfo = data.repository.issues.pageInfo;

            setIssues(prev => [...prev, ...newEdges.map(e => e.node)]);
            setPageInfo(newPageInfo);

        } catch (err) {
            console.error("Error fetching more issues:", err);
        } finally {
            setIsLoadingMore(false);
        }
    }, [fetchIssues, isLoadingMore, pageInfo, owner, name]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && pageInfo.hasNextPage) {
                    loadMore();
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [loadMore, pageInfo.hasNextPage]);

    return (
        <div className="space-y-4">
            {issues.map((issue) => (
                <div key={issue.id} className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                        <div className="mt-1 shrink-0">
                            {issue.state === 'OPEN' ? (
                                <CircleDot className="text-green-400" size={18} />
                            ) : (
                                <CheckCircle2 className="text-purple-400" size={18} />
                            )}
                        </div>
                        <div className="space-y-2 flex-1">
                            <Link href={`https://github.com/${owner}/${name}/issues/${issue.number}`} target="_blank" className="block">
                                <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors line-clamp-1">{issue.title}</h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400">
                                <span className="font-mono text-gray-500">
                                    #{issue.number}
                                </span>
                                <span>opened {new Date(issue.createdAt).toLocaleDateString()} by <span className="text-gray-300 font-medium">{issue.author?.login}</span></span>
                                {issue.labels.nodes.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {issue.labels.nodes.map(label => (
                                            <span
                                                key={label.name}
                                                className="px-2 py-0.5 rounded-full text-[10px] font-bold border opacity-80"
                                                style={{
                                                    borderColor: `#${label.color}`,
                                                    backgroundColor: `#${label.color}15`,
                                                    color: `#${label.color}`
                                                }}
                                            >
                                                {label.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {issue.comments.totalCount > 0 && (
                            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                <MessageCircle size={16} />
                                {issue.comments.totalCount}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Loading Sentinel */}
            <div ref={observerRef} className="py-8 flex justify-center w-full">
                {isLoadingMore && <Loader2 className="animate-spin text-blue-500" size={32} />}
                {!pageInfo.hasNextPage && issues.length > 0 && (
                    <p className="text-gray-600 text-sm">All issues loaded.</p>
                )}
            </div>
        </div>
    );
}
