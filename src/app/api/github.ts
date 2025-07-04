import { GitHubUser } from "@/types";

export async function fetchUserInfo(username: string): Promise<GitHubUser> {
    const BASE_URL = 'https://api.github.com';
    try {
        const response = await fetch(`${BASE_URL}/users/${username}`);
        const userInfo: GitHubUser = await response.json();
        return userInfo;
    } catch (error) {
        console.error(`Failed to fetch user info for ${username}:`, error);
        throw new Error(`Could not fetch user info for ${username}`);
    }
}