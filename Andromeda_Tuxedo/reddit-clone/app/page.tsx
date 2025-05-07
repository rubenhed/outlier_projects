"use client";

import { BsReddit } from "react-icons/bs";
import {
  FaBell,
  FaChevronDown,
  FaUserFriends,
  FaHome,
  FaFire,
  FaStar,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import { IoChatbubbleEllipses, IoShareSocial } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

interface Post {
  userImage: string;
  userName: string;
  postDate: string;
  postTitle: string;
  postContent: string;
  upvotes: number;
  comments: number;
  shares: number;
}

const mockPosts: Post[] = [
  {
    userImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7w_wnReFEbpX3ZVhYXmlL0SNVbR7EbWZsOg&s",
    userName: "u/JohnDoe",
    postDate: "2 days ago",
    postTitle: "This is a post title",
    postContent: "Lorem ipsum dolor sit amet...",
    upvotes: 3,
    comments: 2,
    shares: 1,
  },
  {
    userImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7w_wnReFEbpX3ZVhYXmlL0SNVbR7EbWZsOg&s",
    userName: "u/JaneDoe",
    postDate: "3 days ago",
    postTitle: "This is another post title",
    postContent: "Lorem ipsum dolor sit amet...",
    upvotes: 5,
    comments: 3,
    shares: 2,
  },
  {
    userImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7w_wnReFEbpX3ZVhYXmlL0SNVbR7EbWZsOg&s",
    userName: "u/JaneDoe",
    postDate: "4 days ago",
    postTitle: "This is a third post title",
    postContent: "Lorem ipsum dolor sit amet...",
    upvotes: 7,
    comments: 7,
    shares: 3,
  },
];

const Navbar = () => (
  <nav className="bg-white dark:bg-gray-800 shadow-sm">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center">
          <BsReddit className="text-3xl text-red-500 mr-2" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">reddit</span>
        </div>
        <div className="flex-1 mx-4 max-w-[560px]">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              type="search"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white dark:focus:bg-gray-800"
              placeholder="Search Reddit"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <FaBell className="text-xl" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <FaUserFriends className="text-xl" />
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <span className="text-sm">u/username</span>
            <FaChevronDown className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => (
  <aside className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen p-4 mx-3 ${className}`}>
    <nav className="mb-6">
      <ul className="space-y-2">
        <li className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer">
          <FaHome className="mr-2" />
          <span>Home</span>
        </li>
        <li className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer">
          <FaFire className="mr-2" />
          <span>Popular</span>
        </li>
        <li className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer">
          <FaStar className="mr-2" />
          <span>All</span>
        </li>
      </ul>
    </nav>

    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Communities</h2>
        <FaPlus className="text-gray-500 dark:text-gray-300 cursor-pointer" />
      </div>
      <ul className="space-y-2">
        <li className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer">
          <FaUser className="mr-2" />
          <span>r/reactjs</span>
        </li>
        <li className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer">
          <FaUser className="mr-2" />
          <span>r/typescript</span>
        </li>
      </ul>
    </div>

    <div>
      <button className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-3">
        <span>More</span>
        <IoMdArrowDropdown className="ml-1" />
      </button>
    </div>
  </aside>
);

const VoteButton = ({ count }: { count: number }) => (
  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
    </svg>
    <span className="text-sm">{count}</span>
  </button>
);

const IconText = ({ icon, text }: { icon: React.ReactNode; text: number }) => (
  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{text}</span>
  </button>
);

const MainContent = ({ posts }: { posts: Post[] }) => (
  <div className="md:col-span-3 max-w-[800px]">
    {posts.map((post, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex items-center mb-4">
          <img src={post.userImage} alt={post.userName} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.postDate}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{post.postTitle}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{post.postContent}</p>
        <div className="flex items-center space-x-4">
          <VoteButton count={post.upvotes} />
          <IconText icon={<IoChatbubbleEllipses />} text={post.comments} />
          <IconText icon={<IoShareSocial />} text={post.shares} />
        </div>
      </div>
    ))}
  </div>
);

const RightSidebar = ({ posts }: { posts: Post[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Posts</h2>
    <ul className="space-y-3">
      {posts.map((post, index) => (
        <li key={index} className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{post.userName}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{post.postDate}</div>
          </div>
          <div className="text-sm font-semibold text-gray-800 dark:text-white">{post.postTitle}</div>
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{post.upvotes} upvotes</span>
            <span>{post.comments} comments</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default function App() {

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="mx-auto py-3 px-2">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <Sidebar className="hidden lg:block lg:col-span-1" />
            <div className="flex flex-row gap-6 col-span-5 lg:ml-32 xl:ml-48">
              <div className="flex-[2]">
                <MainContent posts={mockPosts} />
              </div>
              <div className="hidden lg:block flex-[1] max-w-[200px]">
                <RightSidebar posts={mockPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
