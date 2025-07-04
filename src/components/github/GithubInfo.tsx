"use client";
import { useEffect, useState } from "react";
import { GitHubUser } from "@/types";
import { fetchUserInfo } from "@/app/api/github";
import Image from "next/image";
import { formatDate } from "@/utils/format";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Users,
  GitBranch,
  FileText,
  Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const GithubInfo = () => {
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputUsername, setInputUsername] = useState("ashukumarverma");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(inputUsername);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [inputUsername]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(e.target.value);
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
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-100 text-center">
        <div className="text-gray-500">No user information available.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white transition-shadow duration-300 text-gray-900">
      {/* Header Section */}
      <div className="p-4 flex flex-col gap-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            onChange={handleUsernameChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter GitHub username for stats"
          />
        </div>
        {userInfo.html_url ? (
          <div className="flex gap-4 items-start">
            {userInfo && userInfo.avatar_url && (
              <Image
                src={userInfo.avatar_url}
                alt={`${userInfo.login}'s avatar`}
                width={150}
                height={150}
                className="rounded-xl shadow-md"
              />
            )}

            <div className="flex-1 min-w-0">
              {userInfo.name && (
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {userInfo.name}
                </h2>
              )}
              <a
                href={userInfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 group"
              >
                @{userInfo.login}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {userInfo.bio ? (
                <p className="text-gray-600 text-xs">{userInfo.bio}</p>
              ) : (
                <div className="text-xs text-gray-600 pb-1 mb-1 border-b border-gray-300 ">
                  GitHub Profile
                </div>
              )}
              {userInfo.location && (
                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{userInfo.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <Calendar className="w-3 h-3" />
                <span>Joined {formatDate(userInfo.created_at)}</span>
              </div>

              {userInfo.blog && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-gray-600" />
                  <a
                    href={
                      userInfo.blog.startsWith("http")
                        ? userInfo.blog
                        : `https://${userInfo.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs hover:underline flex items-center gap-1"
                  >
                    {userInfo.blog.replace(/^https?:\/\//, "")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {userInfo.twitter_username && (
                <div className="flex gap-2">
                  <span className="text-gray-600">🐦</span>
                  <a
                    href={`https://twitter.com/${userInfo.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs hover:underline flex items-center gap-1"
                  >
                    @{userInfo.twitter_username}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">User not found</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      {userInfo.html_url && (
        <div className="p-6 space-y-4">
          {/* Location and Join Date */}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {userInfo.followers}
                </div>
                <div className="text-xs text-gray-600">Followers</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {userInfo.following}
                </div>
                <div className="text-xs text-gray-600">Following</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <GitBranch className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {userInfo.public_repos}
                </div>
                <div className="text-xs text-gray-600">Repositories</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {userInfo.public_gists}
                </div>
                <div className="text-xs text-gray-600">Gists</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <a
              href={userInfo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              View GitHub Profile
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubInfo;
