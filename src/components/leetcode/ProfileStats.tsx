import { Trophy, TrendingUp, Award } from "lucide-react";
import { LeetCodeUser } from "@/types";
import { formatNumber } from "@/utils/format";

interface ProfileStatsProps {
  userInfo: LeetCodeUser;
  getAcceptanceRate: () => number;
}

const ProfileStats = ({ userInfo, getAcceptanceRate }: ProfileStatsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <span>Global Ranking: #{formatNumber(userInfo.ranking)}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <TrendingUp className="w-4 h-4 text-blue-500" />
        <span>Acceptance Rate: {getAcceptanceRate()}%</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <Award className="w-4 h-4 text-purple-500" />
        <span>Reputation: {userInfo.reputation}</span>
      </div>
    </div>
  );
};

export default ProfileStats;
