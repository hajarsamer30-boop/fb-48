import axios from "axios";

export async function likePost(postId:string) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`,null,
    {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    },
  );

  return data;
}
