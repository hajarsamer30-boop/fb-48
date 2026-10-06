import axios from "axios";

export async function getNotify() {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/notifications?unread=false&page=1&limit=10`,
    {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    },
  );

  return data;
}
export async function getNotifyCount() {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/notifications/unread-count`,
    {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    },
  );

  return data;
}
export async function notifyRead() {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/notifications/read-all`,null,
    {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    },
  );

  return data;
}
