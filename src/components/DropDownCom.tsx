import { useMutation, useQueryClient } from "@tanstack/react-query";
import  { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { deletePost } from "../features/Posts/apis/delete-post.api";

type pageProps = {
  isEdit:boolean
  postId: string;
  fn:()=>void
};

export default function DropDownCom({ postId,isEdit,fn }: pageProps) {
  const [isOpen, setOpen] = useState(false);

  function toggle() {
    setOpen(!isOpen);
  }

  const query = useQueryClient();

  const { mutate,  isPending } = useMutation({
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["posts"] });
    },
    mutationFn: deletePost,
  });

  function handleDeletePost() {
    mutate(postId);
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="relative inline-block text-left">
        <button
          onClick={toggle}
          aria-label="More options"
          className="text-gray-900 dark:text-gray-100 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        {isOpen && (
          <div
            id="dropdown-menu"
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <a
                onClick={handleDeletePost}
                className="flex gap-3 items-center rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                role="menuitem"
              >
                {isPending ? (
                  <>Delete ... </>
                ) : (
                  <>
                    <FaRegTrashAlt color="#f99" /> <span>Delete</span>
                  </>
                )}
              </a>
              
              <a 
               
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                role="menuitem"
              >
               {isEdit&& <><FaRegEdit color="#09c" onClick={fn} /> <span>Update </span></>}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
