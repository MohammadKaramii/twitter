import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: 1,
      name: "mohammad Karami",
      username: "mrak",
      userImg: "https://placehold.co/600x400/png",
      img: "https://picsum.photos/id/237/600/400",
      text: "cute dog!",
      timestamp: "3 hours ago",
    },
    {
      id: 2,
      name: "mohammad Karami",
      username: "mrak",
      userImg: "https://placehold.co/600x400/png",
      img: "https://picsum.photos/id/238/600/400",
      text: "city b&w",
      timestamp: "2 weeks ago",
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
