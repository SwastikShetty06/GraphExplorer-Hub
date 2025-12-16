# GraphExplorer Hub 🚀

**GraphExplorer Hub** is a premium, high-performance GitHub repository explorer built to provide a superior browsing experience for developers. Leveraging the power of **Next.js 14**, **GraphQL**, and **Tailwind CSS**, it offers deep insights into repositories, users, and issues with blazing-fast speeds and a modern, glassmorphic UI.

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated GitHub OAuth via NextAuth.js for secure session management.
- **⚡ Advanced Repository Search**: 
  - Dynamic filtering by Language, Stars, and Topics.
  - Sorting capabilities (Best Match, Most Stars, Recently Updated).
  - Optimistic UI updates for starring/unstarring repositories.
- **📊 Deep Insights Dashboard**: 
  - Personalized user analytics.
  - Quick access to pinned repositories and organizations.
- **📝 Comprehensive Repository Deets**:
  - Full README rendering with Markdown support.
  - Detailed release notes, license info, and disk usage stats.
  - Seamless navigation between Overview and Issues.
- **🐞 Enhanced Issue Tracker**:
  - Infinite scroll pagination for seamless browsing.
  - State filtering and rich metadata display.
- **🎨 Premium UI/UX**:
  - Fully responsive design.
  - Modern "Dark Mode" aesthetic with glassmorphism effects.
  - Fluid micro-interactions and animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/) (GraphQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Markdown Rendering**: `react-markdown` + `rehype-raw` + `github-markdown-css`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed.
- A GitHub Account (for OAuth App setup).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/graph-explorer-hub.git
   cd graph-explorer-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your GitHub credentials:
   
   ```env
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   NEXTAUTH_SECRET=your_random_secret_string
   ```
   
   > **Note:** You need to create an OAuth App in your GitHub Developer Settings. Set the **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.
