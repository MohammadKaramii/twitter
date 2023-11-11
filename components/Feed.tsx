"use client"
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { database } from "@/firebase";
import Input from "./Input";
import Post from "./Post";

const Feed : any = () => {
 const [posts, setPosts] = useState<any>([])
 useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(database, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {
      const postsData = snapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
      console.log(postsData);
      
    }
  );

  return () => {
    // Clean up the listener when the component unmounts
    unsubscribe();
  };
}, []);

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post : any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
