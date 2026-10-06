import { TextInput } from "flowbite-react";
import type { Post } from "../../interfaces/posts.interface";
import { useState } from "react";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "./apis/add-comment.api";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
export default function AddCommentCom({ post }: { post: Post }) {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");


  const query = useQueryClient()
  const { mutate, data } = useMutation({
    mutationFn: addComment,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:["comments", post._id]})
      toast.success('comment created successfully')
    }
  });

  function handleContent(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
  }

  async function handleComment() {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    mutate({ formData, postId: post._id });
    handleCancel();
  }

  function handleCancel() {
    setImage(null);
    setContent("");
    setImgPreview("");
  }

  console.log(data);
  

  return (
    <div className="px-4 pb-4 border-t insta-border mt-2 pt-3">
      <div className="flex  items-center space-x-3">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={post.user.photo}
          alt="Your Avatar"
        />
        <TextInput
          type="text"
          className="w-full"
          placeholder="add comment ... "
          onChange={handleContent}
          value={content}
        />

        {/* icons */}
        <div className="icons flex text-gray-500 m-2">
          <label htmlFor={`inputFile-${post._id}`}>
            <GrAttachment className="text-xl cursor-pointer"></GrAttachment>
          </label>
          <input
            type="file"
            id={`inputFile-${post._id}`}
            className="hidden"
            onChange={handleImage}
          />
        </div>

        
        <button
          onClick={handleComment}
          className="text-sm bg-gray-300 rounded-2xl  p-3 font-semibold text-white hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
        >
          addComment
        </button>
      </div>
       {imgPreview && (
                  <div className="text-center my-3  relative">
                    <img
                      src={imgPreview}
                      className="w-full h-50 object-cover mx-auto rounded-2xl"
                      alt=""
                    />
                    <IoIosCloseCircleOutline
                      onClick={() => setImgPreview("")}
                      className="absolute top-5 right-5"
                    />
                  </div>
                )}
    </div>
  );
}
