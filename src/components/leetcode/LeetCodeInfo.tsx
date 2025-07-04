"use client";
import { useEffect, useState } from "react";
import { fetchLeetCodeUserInfo } from "@/app/api/leetcode";
import { LeetCodeUser } from "@/types";
import { ExternalLink } from "lucide-react";
import ProfileStats from "./ProfileStats";
import ProblemSolvingStats from "./ProblemSolvingStats";
// import SubmissionCalendar from "./SubmissionCalendar";
import RecentSubmissions from "./RecentSubmissions";
import Image from "next/image";

const LeetCodeInfo = () => {
  const [userInfo, setUserInfo] = useState<LeetCodeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setError(null);
        const data = await fetchLeetCodeUserInfo("ashukumarverma");
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching LeetCode user info:", error);
        setError("Failed to load LeetCode profile");
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const getProgressPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  const getAcceptanceRate = () => {
    if (
      !userInfo?.matchedUserStats?.acSubmissionNum ||
      !userInfo?.matchedUserStats?.totalSubmissionNum
    )
      return 0;

    const accepted =
      userInfo.matchedUserStats.acSubmissionNum.find(
        (item) => item.difficulty === "All"
      )?.count || 0;
    const total =
      userInfo.matchedUserStats.totalSubmissionNum.find(
        (item) => item.difficulty === "All"
      )?.count || 1;

    return Math.round((accepted / total) * 100);
  };

  if (loading) {
    return (
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-100">
        <div className="animate-pulse">
          <div className="flex gap-4 items-center p-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-100 text-center">
        <div className="text-gray-500">
          {error || "No LeetCode information available."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white transition-shadow duration-300 text-gray-900">
      {/* Header Section */}
      <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="flex gap-4 items-start">
          <Image
            src={
              "https://assets.leetcode.com/users/ashukumarverma/avatar_1744845713.png"
            }
            alt={`profile image`}
            width={150}
            height={150}
            className="rounded-xl shadow-md"
          />

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">LeetCode Stats</h2>
            <a
              href="https://leetcode.com/ashukumarverma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 font-medium flex items-center gap-1 group"
            >
              @ashukumarverma
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            {/* Profile Stats */}
            <ProfileStats
              userInfo={userInfo}
              getAcceptanceRate={getAcceptanceRate}
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 space-y-4">
        {/* Problem Solving Stats */}
        <ProblemSolvingStats
          userInfo={userInfo}
          getProgressPercentage={getProgressPercentage}
        />

        {/* Submission Calendar */}
        {/* <SubmissionCalendar userInfo={userInfo} /> */}

        {/* Recent Submissions */}
        <RecentSubmissions userInfo={userInfo} />

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <a
            href="https://leetcode.com/ashukumarverma"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            View LeetCode Profile
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeInfo;
