export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name?: string | null;
    company?: string | null;
    blog?: string;
    location?: string | null;
    email?: string | null;
    hireable?: boolean | null;
    bio?: string | null;
    twitter_username?: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface LeetCodeUser {
    totalSolved: number;
    totalSubmissions: Array<{
        difficulty: string;
        count: number;
        submissions: number;
    }>;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    ranking: number;
    contributionPoint: number;
    reputation: number;
    submissionCalendar: Record<string, number>;
    recentSubmissions: Array<{
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
        __typename?: string;
    }>;
    matchedUserStats: {
        acSubmissionNum: Array<{
            difficulty: string;
            count: number;
            submissions: number;
        }>;
        totalSubmissionNum: Array<{
            difficulty: string;
            count: number;
            submissions: number;
        }>;
    };
}