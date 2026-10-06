import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getSinglePost } from "./post-details.api";
import PostItem from "../PostItem";
import CommentCom from "../Comments/CommentCom";

export default function PostDetails() {
  const { id } = useParams();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSinglePost(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const post = data?.data?.post
  if (!post) return <p>Post not found</p>;

  return<> 
  <PostItem post={post} />
  <CommentCom postId={post._id}/>
  </>
}
