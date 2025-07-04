import { LeetCodeUser } from "@/types";

interface ProblemSolvingStatsProps {
  userInfo: LeetCodeUser;
  getProgressPercentage: (solved: number, total: number) => number;
}

const ProblemSolvingStats = ({
  userInfo,
  getProgressPercentage,
}: ProblemSolvingStatsProps) => {
  return (
    <div className="pt-4 border-t border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Problem Solving
      </h3>

      {/* Total Problems */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Total Solved
          </span>
          <span className="text-lg font-bold text-gray-900">
            {userInfo.totalSolved}/{userInfo.totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${getProgressPercentage(
                userInfo.totalSolved,
                userInfo.totalQuestions
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-sm font-semibold text-green-600">Easy</div>
          <div className="text-xs text-gray-600">
            {userInfo.easySolved}/{userInfo.totalEasy}
          </div>
          <div className="text-xs text-green-500 font-medium">
            {getProgressPercentage(userInfo.easySolved, userInfo.totalEasy)}%
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-2 text-center">
          <div className="text-sm font-semibold text-yellow-600">Medium</div>
          <div className="text-xs text-gray-600">
            {userInfo.mediumSolved}/{userInfo.totalMedium}
          </div>
          <div className="text-xs text-yellow-500 font-medium">
            {getProgressPercentage(userInfo.mediumSolved, userInfo.totalMedium)}
            %
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-sm font-semibold text-red-600">Hard</div>
          <div className="text-xs text-gray-600">
            {userInfo.hardSolved}/{userInfo.totalHard}
          </div>
          <div className="text-xs text-red-500 font-medium">
            {getProgressPercentage(userInfo.hardSolved, userInfo.totalHard)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingStats;
