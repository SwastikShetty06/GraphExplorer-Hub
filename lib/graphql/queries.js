import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
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

export const SEARCH_REPOS = gql`
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

export const GET_REPO_ISSUES = gql`
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

export const GET_REPO_DETAILS = gql`
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
