(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/graphql/queries.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET_REPO_DETAILS",
    ()=>GET_REPO_DETAILS,
    "GET_REPO_ISSUES",
    ()=>GET_REPO_ISSUES,
    "GET_USER_PROFILE",
    ()=>GET_USER_PROFILE,
    "SEARCH_REPOS",
    ()=>SEARCH_REPOS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-tag/lib/index.js [app-client] (ecmascript)");
;
const GET_USER_PROFILE = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  query GetUserProfile($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      bio
      websiteUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100, isFork: false, ownerAffiliations: OWNER, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes {
            id
            name
            description
            stargazerCount
            updatedAt
            url
            primaryLanguage {
                name
                color
            }
        }
      }
      # Fetching Pinned Items
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            id
            name
            description
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      # Fetching Organizations
      organizations(first: 10) {
        nodes {
          name
          avatarUrl
        }
      }
    }
  }
`;
const SEARCH_REPOS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  query SearchRepos($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
              avatarUrl
            }
            description
            stargazerCount
            viewerHasStarred
            primaryLanguage {
              name
              color
            }
            updatedAt
            repositoryTopics(first: 3) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
const GET_REPO_ISSUES = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  query GetRepoIssues($owner: String!, $name: String!, $first: Int = 20, $after: String, $states: [IssueState!]) {
    repository(owner: $owner, name: $name) {
      id
      Name: name
      owner {
        login
        avatarUrl
      }
      stargazerCount
      viewerHasStarred
      description
      url
      issues(first: $first, after: $after, states: $states, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            number
            state
            createdAt
            author {
              login
              avatarUrl
            }
            comments {
              totalCount
            }
            labels(first: 5) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
const GET_REPO_DETAILS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  query GetRepoDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      owner {
        login
        avatarUrl
      }
      description
      stargazerCount
      forkCount
      watchers {
        totalCount
      }
      openIssues: issues(states: OPEN) {
        totalCount
      }
      latestRelease {
        tagName
        publishedAt
        url
      }
      licenseInfo {
        name
        spdxId
      }
      diskUsage
      isPrivate
      homepageUrl
      url
      createdAt
      updatedAt
      primaryLanguage {
        name
        color
      }
      repositoryTopics(first: 5) {
        nodes {
          topic {
            name
          }
        }
      }
      readme: object(expression: "HEAD:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/graphql/mutations.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADD_STAR",
    ()=>ADD_STAR,
    "REMOVE_STAR",
    ()=>REMOVE_STAR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-tag/lib/index.js [app-client] (ecmascript)");
;
const ADD_STAR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  mutation AddStar($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;
const REMOVE_STAR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  mutation RemoveStar($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/search/RepoCard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RepoCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$graphql$2f$mutations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/graphql/mutations.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function RepoCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(56);
    if ($[0] !== "6ddb986bd32179def341a3e55e5d8d711ea731270fef0c7dc10d94753b0595ae") {
        for(let $i = 0; $i < 56; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6ddb986bd32179def341a3e55e5d8d711ea731270fef0c7dc10d94753b0595ae";
    }
    const { repo } = t0;
    const t1 = repo.stargazerCount + 1;
    let t2;
    if ($[1] !== repo.id || $[2] !== t1) {
        t2 = {
            optimisticResponse: {
                addStar: {
                    starrable: {
                        id: repo.id,
                        stargazerCount: t1,
                        viewerHasStarred: true,
                        __typename: "Repository"
                    },
                    __typename: "AddStarPayload"
                }
            }
        };
        $[1] = repo.id;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const [addStar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$graphql$2f$mutations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADD_STAR"], t2);
    const t3 = repo.stargazerCount - 1;
    let t4;
    if ($[4] !== repo.id || $[5] !== t3) {
        t4 = {
            optimisticResponse: {
                removeStar: {
                    starrable: {
                        id: repo.id,
                        stargazerCount: t3,
                        viewerHasStarred: false,
                        __typename: "Repository"
                    },
                    __typename: "RemoveStarPayload"
                }
            }
        };
        $[4] = repo.id;
        $[5] = t3;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const [removeStar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$graphql$2f$mutations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REMOVE_STAR"], t4);
    let t5;
    if ($[7] !== addStar || $[8] !== removeStar || $[9] !== repo.id || $[10] !== repo.viewerHasStarred) {
        t5 = ({
            "RepoCard[handleToggleStar]": ()=>{
                if (repo.viewerHasStarred) {
                    removeStar({
                        variables: {
                            starrableId: repo.id
                        }
                    });
                } else {
                    addStar({
                        variables: {
                            starrableId: repo.id
                        }
                    });
                }
            }
        })["RepoCard[handleToggleStar]"];
        $[7] = addStar;
        $[8] = removeStar;
        $[9] = repo.id;
        $[10] = repo.viewerHasStarred;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const handleToggleStar = t5;
    let t6;
    if ($[12] !== repo.owner.avatarUrl || $[13] !== repo.owner.login) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: repo.owner.avatarUrl,
            alt: repo.owner.login,
            width: 32,
            height: 32,
            className: "rounded-full border border-gray-700 shrink-0"
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[12] = repo.owner.avatarUrl;
        $[13] = repo.owner.login;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const t7 = `/repo/${repo.owner.login}/${repo.name}/issues`;
    let t8;
    if ($[15] !== repo.name || $[16] !== repo.owner.login) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "truncate",
            children: [
                repo.owner.login,
                " / ",
                repo.name
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[15] = repo.name;
        $[16] = repo.owner.login;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== t7 || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: t7,
                className: "text-lg font-bold text-blue-400 hover:underline flex items-center gap-2 truncate",
                children: t8
            }, void 0, false, {
                fileName: "[project]/components/search/RepoCard.js",
                lineNumber: 115,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== t6 || $[22] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 overflow-hidden",
            children: [
                t6,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[21] = t6;
        $[22] = t9;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    const t11 = `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${repo.viewerHasStarred ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20" : "bg-gray-800 text-gray-400 border-gray-700 hover:text-white hover:border-gray-500"}`;
    const t12 = repo.viewerHasStarred ? "fill-yellow-400" : "";
    let t13;
    if ($[24] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
            size: 16,
            className: t12
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[24] = t12;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== repo.stargazerCount) {
        t14 = new Intl.NumberFormat("en-US", {
            notation: "compact"
        }).format(repo.stargazerCount);
        $[26] = repo.stargazerCount;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t14
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[28] = t14;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== handleToggleStar || $[31] !== t11 || $[32] !== t13 || $[33] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleToggleStar,
            className: t11,
            children: [
                t13,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[30] = handleToggleStar;
        $[31] = t11;
        $[32] = t13;
        $[33] = t15;
        $[34] = t16;
    } else {
        t16 = $[34];
    }
    let t17;
    if ($[35] !== t10 || $[36] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-start mb-3",
            children: [
                t10,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[35] = t10;
        $[36] = t16;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    const t18 = repo.description || "No description provided.";
    let t19;
    if ($[38] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-gray-400 text-sm mb-4 line-clamp-2 h-10",
            children: t18
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[38] = t18;
        $[39] = t19;
    } else {
        t19 = $[39];
    }
    let t20;
    if ($[40] !== repo.primaryLanguage) {
        t20 = repo.primaryLanguage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-3 h-3 rounded-full",
                    style: {
                        backgroundColor: repo.primaryLanguage.color
                    }
                }, void 0, false, {
                    fileName: "[project]/components/search/RepoCard.js",
                    lineNumber: 190,
                    columnNumber: 78
                }, this),
                repo.primaryLanguage.name
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 190,
            columnNumber: 35
        }, this);
        $[40] = repo.primaryLanguage;
        $[41] = t20;
    } else {
        t20 = $[41];
    }
    let t21;
    if ($[42] !== repo.updatedAt) {
        t21 = new Date(repo.updatedAt).toLocaleDateString();
        $[42] = repo.updatedAt;
        $[43] = t21;
    } else {
        t21 = $[43];
    }
    let t22;
    if ($[44] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            title: "Updated at",
            children: [
                "Updated ",
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 208,
            columnNumber: 11
        }, this);
        $[44] = t21;
        $[45] = t22;
    } else {
        t22 = $[45];
    }
    let t23;
    if ($[46] !== t20 || $[47] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4 text-xs text-gray-500",
            children: [
                t20,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[46] = t20;
        $[47] = t22;
        $[48] = t23;
    } else {
        t23 = $[48];
    }
    let t24;
    if ($[49] !== repo.repositoryTopics) {
        t24 = repo.repositoryTopics?.nodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 flex flex-wrap gap-2",
            children: repo.repositoryTopics.nodes.map(_RepoCardRepoRepositoryTopicsNodesMap)
        }, void 0, false, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 225,
            columnNumber: 54
        }, this);
        $[49] = repo.repositoryTopics;
        $[50] = t24;
    } else {
        t24 = $[50];
    }
    let t25;
    if ($[51] !== t17 || $[52] !== t19 || $[53] !== t23 || $[54] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-all group",
            children: [
                t17,
                t19,
                t23,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/components/search/RepoCard.js",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[51] = t17;
        $[52] = t19;
        $[53] = t23;
        $[54] = t24;
        $[55] = t25;
    } else {
        t25 = $[55];
    }
    return t25;
}
_s(RepoCard, "QDJFBRZifGVe7emR+5wK6lLA5lY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = RepoCard;
function _RepoCardRepoRepositoryTopicsNodesMap(t) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20",
        children: t.topic.name
    }, t.topic.name, false, {
        fileName: "[project]/components/search/RepoCard.js",
        lineNumber: 245,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "RepoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/search/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$graphql$2f$queries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/graphql/queries.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$search$2f$RepoCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/search/RepoCard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Debounce helper
function useDebounce(value, delay) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "63e99fbc925f2cea2f9ea0dfda9db4b6582a36c44a260c4ea8d3c8bc281ed242") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "63e99fbc925f2cea2f9ea0dfda9db4b6582a36c44a260c4ea8d3c8bc281ed242";
    }
    const [debouncedValue, setDebouncedValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    let t0;
    let t1;
    if ($[1] !== delay || $[2] !== value) {
        t0 = ({
            "useDebounce[useEffect()]": ()=>{
                const handler = setTimeout({
                    "useDebounce[useEffect() > setTimeout()]": ()=>setDebouncedValue(value)
                }["useDebounce[useEffect() > setTimeout()]"], delay);
                return ()=>clearTimeout(handler);
            }
        })["useDebounce[useEffect()]"];
        t1 = [
            value,
            delay
        ];
        $[1] = delay;
        $[2] = value;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    return debouncedValue;
}
_s(useDebounce, "KDuPAtDOgxm8PU6legVJOb3oOmA=");
function SearchPage() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(113);
    if ($[0] !== "63e99fbc925f2cea2f9ea0dfda9db4b6582a36c44a260c4ea8d3c8bc281ed242") {
        for(let $i = 0; $i < 113; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "63e99fbc925f2cea2f9ea0dfda9db4b6582a36c44a260c4ea8d3c8bc281ed242";
    }
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("topic:react");
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [minStars, setMinStars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1000);
    const [goodFirstIssue, setGoodFirstIssue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] !== goodFirstIssue || $[2] !== language || $[3] !== minStars || $[4] !== searchTerm || $[5] !== sort) {
        t0 = ({
            "SearchPage[constructQuery]": ()=>{
                let q = searchTerm;
                if (language) {
                    q = q + ` language:${language}`;
                }
                if (minStars) {
                    q = q + ` stars:>${minStars}`;
                }
                if (goodFirstIssue) {
                    q = q + " label:\"good first issue\"";
                }
                if (sort) {
                    q = q + ` sort:${sort}`;
                }
                return q;
            }
        })["SearchPage[constructQuery]"];
        $[1] = goodFirstIssue;
        $[2] = language;
        $[3] = minStars;
        $[4] = searchTerm;
        $[5] = sort;
        $[6] = t0;
    } else {
        t0 = $[6];
    }
    const constructQuery = t0;
    const finalQueryString = useDebounce(constructQuery(), 500);
    let t1;
    if ($[7] !== finalQueryString) {
        t1 = {
            query: finalQueryString
        };
        $[7] = finalQueryString;
        $[8] = t1;
    } else {
        t1 = $[8];
    }
    const t2 = !finalQueryString;
    let t3;
    if ($[9] !== t1 || $[10] !== t2) {
        t3 = {
            variables: t1,
            skip: t2
        };
        $[9] = t1;
        $[10] = t2;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    const { data, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$graphql$2f$queries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEARCH_REPOS"], t3);
    let t4;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-bold flex items-center gap-2 mb-8 text-blue-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 117,
                    columnNumber: 87
                }, this),
                " Filters"
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[12] = t4;
    } else {
        t4 = $[12];
    }
    let t5;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs text-gray-400 font-bold uppercase tracking-widest",
            children: "Language"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "SearchPage[<select>.onChange]": (e)=>setLanguage(e.target.value)
        })["SearchPage[<select>.onChange]"];
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "All Languages"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 142,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "javascript",
            children: "JavaScript"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 143,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "typescript",
            children: "TypeScript"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 144,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "python",
            children: "Python"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "rust",
            children: "Rust"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "go",
            children: "Go"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 147,
            columnNumber: 11
        }, this);
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "java",
            children: "Java"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 148,
            columnNumber: 11
        }, this);
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "c++",
            children: "C++"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[14] = t10;
        $[15] = t11;
        $[16] = t12;
        $[17] = t13;
        $[18] = t14;
        $[19] = t6;
        $[20] = t7;
        $[21] = t8;
        $[22] = t9;
    } else {
        t10 = $[14];
        t11 = $[15];
        t12 = $[16];
        t13 = $[17];
        t14 = $[18];
        t6 = $[19];
        t7 = $[20];
        t8 = $[21];
        t9 = $[22];
    }
    let t15;
    if ($[23] !== language) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            className: "w-full appearance-none bg-gray-900/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:border-white/20 cursor-pointer",
            value: language,
            onChange: t6,
            children: [
                t7,
                t8,
                t9,
                t10,
                t11,
                t12,
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[23] = language;
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-gray-300 transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m6 9 6 6 6-6"
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 180,
                    columnNumber: 291
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 180,
                columnNumber: 148
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group",
                    children: [
                        t15,
                        t16
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 187,
                    columnNumber: 42
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[26] = t15;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    let t18;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs text-gray-400 font-bold uppercase tracking-widest",
            children: "Sort By"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 195,
            columnNumber: 11
        }, this);
        $[28] = t18;
    } else {
        t18 = $[28];
    }
    let t19;
    let t20;
    let t21;
    let t22;
    let t23;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "SearchPage[<select>.onChange]": (e_0)=>setSort(e_0.target.value)
        })["SearchPage[<select>.onChange]"];
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "Best Match"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "stars-desc",
            children: "Most Stars"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "forks-desc",
            children: "Most Forks"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 211,
            columnNumber: 11
        }, this);
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "updated-desc",
            children: "Recently Updated"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[29] = t19;
        $[30] = t20;
        $[31] = t21;
        $[32] = t22;
        $[33] = t23;
    } else {
        t19 = $[29];
        t20 = $[30];
        t21 = $[31];
        t22 = $[32];
        t23 = $[33];
    }
    let t24;
    if ($[34] !== sort) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            className: "w-full appearance-none bg-gray-900/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:border-white/20 cursor-pointer",
            value: sort,
            onChange: t19,
            children: [
                t20,
                t21,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[34] = sort;
        $[35] = t24;
    } else {
        t24 = $[35];
    }
    let t25;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-gray-300 transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m6 9 6 6 6-6"
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 235,
                    columnNumber: 291
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 235,
                columnNumber: 148
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 235,
            columnNumber: 11
        }, this);
        $[36] = t25;
    } else {
        t25 = $[36];
    }
    let t26;
    if ($[37] !== t24) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group",
                    children: [
                        t24,
                        t25
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 242,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 242,
            columnNumber: 11
        }, this);
        $[37] = t24;
        $[38] = t26;
    } else {
        t26 = $[38];
    }
    let t27;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs text-gray-400 font-bold uppercase tracking-widest",
            children: "Min Stars"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[39] = t27;
    } else {
        t27 = $[39];
    }
    let t28;
    if ($[40] !== minStars) {
        t28 = new Intl.NumberFormat("en", {
            notation: "compact"
        }).format(minStars);
        $[40] = minStars;
        $[41] = t28;
    } else {
        t28 = $[41];
    }
    let t29;
    if ($[42] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between text-sm items-center",
            children: [
                t27,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-mono font-bold border border-blue-500/20",
                    children: [
                        t28,
                        "+"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 267,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[42] = t28;
        $[43] = t29;
    } else {
        t29 = $[43];
    }
    let t30;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = ({
            "SearchPage[<input>.onChange]": (e_1)=>setMinStars(Number(e_1.target.value))
        })["SearchPage[<input>.onChange]"];
        $[44] = t30;
    } else {
        t30 = $[44];
    }
    let t31;
    if ($[45] !== minStars) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "range",
            min: "0",
            max: "50000",
            step: "1000",
            className: "w-full absolute z-20 opacity-0 cursor-pointer h-full",
            value: minStars,
            onChange: t30
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 284,
            columnNumber: 11
        }, this);
        $[45] = minStars;
        $[46] = t31;
    } else {
        t31 = $[46];
    }
    const t32 = `${minStars / 50000 * 100}%`;
    let t33;
    if ($[47] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-1 bg-gray-800 rounded-full overflow-hidden relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full bg-blue-500 transition-all duration-150 ease-out",
                style: {
                    width: t32
                }
            }, void 0, false, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 293,
                columnNumber: 94
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[47] = t32;
        $[48] = t33;
    } else {
        t33 = $[48];
    }
    const t34 = `calc(${Math.min(Math.max(minStars / 50000 * 100, 0), 96)}% + 2px)`;
    let t35;
    if ($[49] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute h-4 w-4 bg-white rounded-full shadow-lg border-2 border-blue-500 z-10 pointer-events-none transition-all duration-150 ease-out",
            style: {
                left: t34
            }
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 304,
            columnNumber: 11
        }, this);
        $[49] = t34;
        $[50] = t35;
    } else {
        t35 = $[50];
    }
    let t36;
    if ($[51] !== t31 || $[52] !== t33 || $[53] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-6 flex items-center",
            children: [
                t31,
                t33,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[51] = t31;
        $[52] = t33;
        $[53] = t35;
        $[54] = t36;
    } else {
        t36 = $[54];
    }
    let t37;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between text-[10px] text-gray-600 font-mono uppercase",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "0 Stars"
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 324,
                    columnNumber: 95
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "50k+ Stars"
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 324,
                    columnNumber: 115
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[55] = t37;
    } else {
        t37 = $[55];
    }
    let t38;
    if ($[56] !== t29 || $[57] !== t36) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t29,
                t36,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[56] = t29;
        $[57] = t36;
        $[58] = t38;
    } else {
        t38 = $[58];
    }
    let t39;
    if ($[59] !== goodFirstIssue) {
        t39 = ({
            "SearchPage[<div>.onClick]": ()=>setGoodFirstIssue(!goodFirstIssue)
        })["SearchPage[<div>.onClick]"];
        $[59] = goodFirstIssue;
        $[60] = t39;
    } else {
        t39 = $[60];
    }
    let t40;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-gray-300 group-hover:text-white transition-colors",
            children: "Good First Issue"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 350,
            columnNumber: 11
        }, this);
        $[61] = t40;
    } else {
        t40 = $[61];
    }
    const t41 = `relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${goodFirstIssue ? "bg-blue-600" : "bg-gray-700"}`;
    const t42 = `absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${goodFirstIssue ? "translate-x-5" : "translate-x-0"}`;
    let t43;
    if ($[62] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t42
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[62] = t42;
        $[63] = t43;
    } else {
        t43 = $[63];
    }
    let t44;
    if ($[64] !== t41 || $[65] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t41,
            children: t43
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[64] = t41;
        $[65] = t43;
        $[66] = t44;
    } else {
        t44 = $[66];
    }
    let t45;
    if ($[67] !== t39 || $[68] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: t39,
            className: "flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group",
            children: [
                t40,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 376,
            columnNumber: 11
        }, this);
        $[67] = t39;
        $[68] = t44;
        $[69] = t45;
    } else {
        t45 = $[69];
    }
    let t46;
    if ($[70] !== t17 || $[71] !== t26 || $[72] !== t38 || $[73] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        t17,
                        t26,
                        t38,
                        t45
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 385,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[70] = t17;
        $[71] = t26;
        $[72] = t38;
        $[73] = t45;
        $[74] = t46;
    } else {
        t46 = $[74];
    }
    let t47;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-2 uppercase tracking-widest text-[10px] text-gray-500 font-bold",
            children: "Live Query"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[75] = t47;
    } else {
        t47 = $[75];
    }
    let t48;
    if ($[76] !== finalQueryString) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-black/20 rounded-xl border border-white/5",
                children: [
                    t47,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "text-blue-300/80 break-all text-xs font-mono",
                        children: finalQueryString
                    }, void 0, false, {
                        fileName: "[project]/app/search/page.js",
                        lineNumber: 403,
                        columnNumber: 107
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 403,
                columnNumber: 36
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[76] = finalQueryString;
        $[77] = t48;
    } else {
        t48 = $[77];
    }
    let t49;
    if ($[78] !== t46 || $[79] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "w-80 border-r border-white/10 p-6 flex flex-col gap-8 h-screen sticky top-0 bg-black/40 backdrop-blur-md z-10 hidden md:flex shrink-0",
            children: [
                t46,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 411,
            columnNumber: 11
        }, this);
        $[78] = t46;
        $[79] = t48;
        $[80] = t49;
    } else {
        t49 = $[80];
    }
    let t50;
    if ($[81] === Symbol.for("react.memo_cache_sentinel")) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                className: "text-gray-500",
                size: 20
            }, void 0, false, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 420,
                columnNumber: 97
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[81] = t50;
    } else {
        t50 = $[81];
    }
    let t51;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t51 = ({
            "SearchPage[<input>.onChange]": (e_2)=>setSearchTerm(e_2.target.value)
        })["SearchPage[<input>.onChange]"];
        $[82] = t51;
    } else {
        t51 = $[82];
    }
    let t52;
    if ($[83] !== searchTerm) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative mb-8 max-w-3xl",
            children: [
                t50,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    className: "w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition shadow-lg",
                    placeholder: "Search topics, repos...",
                    value: searchTerm,
                    onChange: t51
                }, void 0, false, {
                    fileName: "[project]/app/search/page.js",
                    lineNumber: 436,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 436,
            columnNumber: 11
        }, this);
        $[83] = searchTerm;
        $[84] = t52;
    } else {
        t52 = $[84];
    }
    let t53;
    if ($[85] === Symbol.for("react.memo_cache_sentinel")) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-bold",
            children: "Repositories"
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 444,
            columnNumber: 11
        }, this);
        $[85] = t53;
    } else {
        t53 = $[85];
    }
    let t54;
    if ($[86] !== data) {
        t54 = data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-gray-400 text-sm",
            children: [
                "Found ",
                new Intl.NumberFormat().format(data.search.repositoryCount),
                " results"
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 451,
            columnNumber: 19
        }, this);
        $[86] = data;
        $[87] = t54;
    } else {
        t54 = $[87];
    }
    let t55;
    if ($[88] !== t54) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-end border-b border-gray-800 pb-4",
            children: [
                t53,
                t54
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 459,
            columnNumber: 11
        }, this);
        $[88] = t54;
        $[89] = t55;
    } else {
        t55 = $[89];
    }
    let t56;
    if ($[90] !== loading) {
        t56 = loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center py-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin text-blue-500",
                size: 40
            }, void 0, false, {
                fileName: "[project]/app/search/page.js",
                lineNumber: 467,
                columnNumber: 78
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 467,
            columnNumber: 22
        }, this);
        $[90] = loading;
        $[91] = t56;
    } else {
        t56 = $[91];
    }
    let t57;
    if ($[92] !== error) {
        t57 = error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg",
            children: [
                "Error: ",
                error.message
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 475,
            columnNumber: 20
        }, this);
        $[92] = error;
        $[93] = t57;
    } else {
        t57 = $[93];
    }
    let t58;
    if ($[94] !== data || $[95] !== error || $[96] !== loading) {
        t58 = !loading && !error && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-4",
            children: data.search.edges.map(_SearchPageDataSearchEdgesMap)
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 483,
            columnNumber: 41
        }, this);
        $[94] = data;
        $[95] = error;
        $[96] = loading;
        $[97] = t58;
    } else {
        t58 = $[97];
    }
    let t59;
    if ($[98] !== data?.search || $[99] !== loading) {
        t59 = !loading && data?.search.repositoryCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-20 text-gray-500",
            children: "No repositories found matching your criteria."
        }, void 0, false, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 493,
            columnNumber: 61
        }, this);
        $[98] = data?.search;
        $[99] = loading;
        $[100] = t59;
    } else {
        t59 = $[100];
    }
    let t60;
    if ($[101] !== t55 || $[102] !== t56 || $[103] !== t57 || $[104] !== t58 || $[105] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t55,
                t56,
                t57,
                t58,
                t59
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 502,
            columnNumber: 11
        }, this);
        $[101] = t55;
        $[102] = t56;
        $[103] = t57;
        $[104] = t58;
        $[105] = t59;
        $[106] = t60;
    } else {
        t60 = $[106];
    }
    let t61;
    if ($[107] !== t52 || $[108] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 p-8 overflow-y-auto",
            children: [
                t52,
                t60
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 514,
            columnNumber: 11
        }, this);
        $[107] = t52;
        $[108] = t60;
        $[109] = t61;
    } else {
        t61 = $[109];
    }
    let t62;
    if ($[110] !== t49 || $[111] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen bg-gray-950 text-white font-sans",
            children: [
                t49,
                t61
            ]
        }, void 0, true, {
            fileName: "[project]/app/search/page.js",
            lineNumber: 523,
            columnNumber: 11
        }, this);
        $[110] = t49;
        $[111] = t61;
        $[112] = t62;
    } else {
        t62 = $[112];
    }
    return t62;
}
_s1(SearchPage, "rNY/lUIKAlYo14CjTw/UCaNxGFE=", false, function() {
    return [
        useDebounce,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = SearchPage;
function _SearchPageDataSearchEdgesMap(t0) {
    const { node } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$search$2f$RepoCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        repo: node
    }, node.id, false, {
        fileName: "[project]/app/search/page.js",
        lineNumber: 536,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "SearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9dc4c337._.js.map