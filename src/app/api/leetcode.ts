import { LeetCodeUser } from "@/types";

export async function fetchLeetCodeUserInfo(username: string): Promise<LeetCodeUser> {
    try {
        // Using a public LeetCode API proxy
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch LeetCode user info for ${username}:`, error);
        throw new Error(`Could not fetch LeetCode user info for ${username}`);
    }
}
