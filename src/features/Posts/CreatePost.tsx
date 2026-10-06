import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { addPost } from "./apis/add-post.api";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");

  const queryClient =  useQueryClient()
  const {  isPending, mutate } = useMutation({
    mutationFn: addPost,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['posts']})
    }
  });

  function handleBody(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
  }

  async function handlePost() {
    const formData = new FormData();
    formData.append("body", body);
    if (image) formData.append("image", image);
    mutate(formData);
    handleCancel()
  }

  

  function handleCancel() {
    setImage(null);
    setBody("");
    setImgPreview("");
  }

  

  return (
    <div>
      {/* component */}
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      <div className="editor mx-auto rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg w-1/2">
        <textarea
          onChange={handleBody}
          className="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={body}
        />
        {/* icons */}
        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="inputFile">
            <GrAttachment className="text-xl cursor-pointer"></GrAttachment>
          </label>
          <input
            type="file"
            id="inputFile"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {imgPreview && (
          <div className="text-center my-3 relative">
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

        {/* buttons */}
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <button
            disabled={body.length==0}
            onClick={handlePost}
            className="btn disabled:opacity-50 border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            {isPending? 'Post...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
