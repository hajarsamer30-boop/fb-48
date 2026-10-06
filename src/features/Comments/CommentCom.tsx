import { useQuery } from "@tanstack/react-query";
import { getComments } from "./apis/getComments";
import type { CommentInterface } from "./interfaces/comment.interface";

export default function CommentCom({ postId }: { postId: string }) {
  const { data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  return (
    <div>
      {/* component */}

      {data?.data?.comments.map((comment: CommentInterface) => (
        <CommentItem comment={comment} />
      ))}
    </div>
  );
}

function CommentItem({ comment }: { comment: CommentInterface }) {
  return (
    <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
      <form>
        <div className="flex flex-col">
          <div className="border rounded-md p-3 ml-3 my-3">
            <div className="flex gap-3 items-center">
              <img
                src={comment?.commentCreator?.photo}
                className="object-cover w-8 h-8 rounded-full 
                      border-2 border-emerald-400  shadow-emerald-400
                      "
              />
              <h3 className="font-bold">{comment?.commentCreator?.name}</h3>
            </div>
            <p className="text-gray-600 mt-2">{comment?.content}</p>
          </div>

          <div className="flex gap-3 items-center">
            {comment.image && (
              <img
                src={comment.image}
                className="object-cover w-[95%] mx-auto h-30  
                      
                      "
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
