import { LeetCodeUser } from "@/types";

interface RecentSubmissionsProps {
  userInfo: LeetCodeUser;
}

const RecentSubmissions = ({ userInfo }: RecentSubmissionsProps) => {
  if (!userInfo.recentSubmissions || userInfo.recentSubmissions.length === 0) {
    return null;
  }

  return (
    <div className="pt-4 border-t border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Recent Submissions
      </h3>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {userInfo.recentSubmissions.slice(0, 3).map((submission, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-xs p-2 bg-gray-50 rounded"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                submission.statusDisplay === "Accepted"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
            <div className="flex-1 truncate">
              <div className="font-medium text-gray-900 truncate">
                {submission.title}
              </div>
              <div className="text-gray-500">
                {submission.lang} • {submission.statusDisplay}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSubmissions;
