"use client";

import { useQuery } from "@apollo/client/react";
import { SEARCH_REPOS } from "@/lib/graphql/queries";
import RepoCard from "@/components/search/RepoCard";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";

// Debounce helper
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("topic:react");
    const [language, setLanguage] = useState("");
    const [minStars, setMinStars] = useState(1000);
    const [goodFirstIssue, setGoodFirstIssue] = useState(false);
    const [sort, setSort] = useState(""); // stars-desc, forks-desc, updated-desc

    // Construct GitHub Search Query String
    const constructQuery = () => {
        let q = searchTerm;
        if (language) q += ` language:${language}`;
        if (minStars) q += ` stars:>${minStars}`;
        if (goodFirstIssue) q += ` label:"good first issue"`;
        if (sort) q += ` sort:${sort}`;
        return q;
    };

    const finalQueryString = useDebounce(constructQuery(), 500);

    const { data, loading, error } = useQuery(SEARCH_REPOS, {
        variables: { query: finalQueryString },
        skip: !finalQueryString,
    });

    return (
        <div className="flex min-h-screen bg-gray-950 text-white font-sans">
            {/* Sidebar - Fixed on desktop, scrollable on mobile if needed */}
            <aside className="w-80 border-r border-white/10 p-6 flex flex-col gap-8 h-screen sticky top-0 bg-black/40 backdrop-blur-md z-10 hidden md:flex shrink-0">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-8 text-blue-400">
                        <SlidersHorizontal size={20} /> Filters
                    </h2>

                    <div className="space-y-8">
                        {/* Language Custom Select */}
                        <div className="space-y-3">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Language</label>
                            <div className="relative group">
                                <select
                                    className="w-full appearance-none bg-gray-900/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:border-white/20 cursor-pointer"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="">All Languages</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="rust">Rust</option>
                                    <option value="go">Go</option>
                                    <option value="java">Java</option>
                                    <option value="c++">C++</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-gray-300 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort Control */}
                        <div className="space-y-3">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Sort By</label>
                            <div className="relative group">
                                <select
                                    className="w-full appearance-none bg-gray-900/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:border-white/20 cursor-pointer"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="">Best Match</option>
                                    <option value="stars-desc">Most Stars</option>
                                    <option value="forks-desc">Most Forks</option>
                                    <option value="updated-desc">Recently Updated</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-gray-300 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Min Stars Slider Custom Style */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm items-center">
                                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Min Stars</label>
                                <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-mono font-bold border border-blue-500/20">
                                    {new Intl.NumberFormat('en', { notation: "compact" }).format(minStars)}+
                                </span>
                            </div>
                            <div className="relative h-6 flex items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="1000"
                                    className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                                    value={minStars}
                                    onChange={(e) => setMinStars(Number(e.target.value))}
                                />
                                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative z-10">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-150 ease-out"
                                        style={{ width: `${(minStars / 50000) * 100}%` }}
                                    />
                                </div>
                                <div
                                    className="absolute h-4 w-4 bg-white rounded-full shadow-lg border-2 border-blue-500 z-10 pointer-events-none transition-all duration-150 ease-out"
                                    style={{ left: `calc(${Math.min(Math.max((minStars / 50000) * 100, 0), 96)}% + 2px)` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-600 font-mono uppercase">
                                <span>0 Stars</span>
                                <span>50k+ Stars</span>
                            </div>
                        </div>

                        {/* Good First Issue Custom Toggle */}
                        <div
                            onClick={() => setGoodFirstIssue(!goodFirstIssue)}
                            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                        >
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Good First Issue</span>
                            <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${goodFirstIssue ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                <div
                                    className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${goodFirstIssue ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                        <p className="mb-2 uppercase tracking-widest text-[10px] text-gray-500 font-bold">Live Query</p>
                        <code className="text-blue-300/80 break-all text-xs font-mono">{finalQueryString}</code>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Top Search Bar */}
                <div className="relative mb-8 max-w-3xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-500" size={20} />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition shadow-lg"
                        placeholder="Search topics, repos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Results Area */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                        <h1 className="text-2xl font-bold">Repositories</h1>
                        {data && <span className="text-gray-400 text-sm">Found {new Intl.NumberFormat().format(data.search.repositoryCount)} results</span>}
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="animate-spin text-blue-500" size={40} />
                        </div>
                    )}

                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg">
                            Error: {error.message}
                        </div>
                    )}

                    {!loading && !error && data && (
                        <div className="grid grid-cols-1 gap-4">
                            {data.search.edges.map(({ node }) => (
                                <RepoCard key={node.id} repo={node} />
                            ))}
                        </div>
                    )}

                    {!loading && data?.search.repositoryCount === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No repositories found matching your criteria.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
