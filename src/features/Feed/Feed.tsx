import { getPosts } from "./apis/posts.api";
import type { Post } from "../../interfaces/posts.interface";
import PostItem from "../PostItem";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../Posts/CreatePost";

export default function Feed() {
  //GET
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
    <CreatePost></CreatePost>
    <div className="flex flex-wrap my-3">
      <div className="w-1/4"></div>
      <div className="w-1/2">
        {data?.data?.posts?.map((post: Post) => (
          <PostItem  key={post._id} post={post}></PostItem>
        ))}
      </div>
      <div className="w-1/4"></div>
    </div>
    </>
  );
}
