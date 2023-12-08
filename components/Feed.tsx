import { SparklesIcon } from "@heroicons/react/24/outline";
import {
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import Input from "./Input";
import Post from "./Post";
import { DocumentData } from "firebase/firestore";
export default function Feed() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(database, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );


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
        <div key={post.id} className="animate-fadeIn">
          <Post id={post.id} post={post} />
        </div>
      ))}
    </div>
  );
}
