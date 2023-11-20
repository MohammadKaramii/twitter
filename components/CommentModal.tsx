import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import Modal from "react-modal";
import {
  XMarkIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import { userState } from "../atom/userAtom";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { PostType } from "@/types";
export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [currentUser] = useRecoilState(userState);
  const [post, setPost] = useState<PostType>();
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(database, "posts", postId),
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          const postData = snapshot.data() as PostType; // Cast the data to 'Post' type
          setPost(postData);
        } else {
          setPost(undefined); // Set 'undefined' if the snapshot doesn't exist
        }
      }
    );

    return () => unsubscribe();
  }, [postId, database]);

  async function sendComment() {
    await addDoc(collection(database, "posts", postId, "comments"), {
      comment: input,
      name: currentUser?.name,
      username: currentUser?.username,
      userImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
      userId: currentUser?.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XMarkIcon className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.userImg}
                alt="user-img"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.text}
            </p>

            <div className="flex  p-3 space-x-3">
              <img
                src={currentUser?.userImg}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows={2}
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      // onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
