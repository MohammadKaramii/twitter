"use client";
import React, { useState, useRef } from "react";
import person from "../public/images/person.jpg";
import Image from "next/image";
import {
  PhotoIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { database, storage } from "../firebase";
import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const filePickerRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(database, "posts"), {
      id: 1,
      text: input,
      userImg: "https://placehold.co/600x400",
      timestamp: serverTimestamp(),
      name: "mrak",
      username: "Mrak",

    
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(database, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };
  return (
    <div className="flex  border-b border-gray-200 p-3 space-x-3">
      <Image
        alt="user-img"
        src={person}
        className="h-11 w-11 rounded-full cursor-pointer hover: brightness-95"
      />
      <div className="w-full divide-y divide-gray-200 ">
        <div >
          <textarea
            rows={2}
            placeholder="What's happening?"
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {selectedFile && (
          <div className="relative py-2">
            <XMarkIcon
              onClick={() => setSelectedFile(null)}
              className=" h-5 text-black absolute cursor-pointer bg-gray-100/30 m-1 rounded-full"
            />
            <img
              src={selectedFile}
              className={`${loading && "animate-pulse"}  rounded-xl`}
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          {!loading && (
            <>
              <div className="flex">
                <div onClick={() => filePickerRef.current?.click()}>
                  <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                </div>
                <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </div>
              <button
                onClick={sendPost}
                disabled={!input.trim()}
                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                Tweet
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
