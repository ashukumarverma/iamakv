import GithubInfo from "@/components/github/GithubInfo";
import LeetCodeInfo from "@/components/leetcode/LeetCodeInfo";

export default function Home() {
  return (
    <div className="w-full flex flex-col lg:flex-row max-md:items-center lg:gap-8 gap-4">
      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl border-gray-100 p-6">
        <GithubInfo />
      </div>
      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl border-gray-100 p-6">
        <LeetCodeInfo />
      </div>
    </div>
  );
}
