import { useQuery } from "@tanstack/react-query";
import { getNotify } from "./api/notify.api";
import Loading from "../../components/Loading";
import type { NotificationInterface } from "./interfaces/notify.interface";
import { timeAgo } from "../../utilitis/time-ago";


export default function Notification() {
  const { data, isLoading } = useQuery({
    queryKey: ["notify"],
    queryFn: getNotify,
  });

  if (isLoading) return <Loading></Loading>;

  if(data?.data?.notifications?.length){
  return (
    <div>
      {data?.data?.notifications?.map((item: NotificationInterface) => (
        <NotificationItem key={item._id} item={item}></NotificationItem>
      ))}
    </div>
  );
}

if(!data?.data?.notifications?.length)
{
  return <h2 className="text-center my-4 text-5xl">no notification</h2>
}

}

function NotificationItem({ item }: { item: NotificationInterface }) {
  return (
    <>
     <title>
      Notification Com
     </title>
       <meta name="description" content="test" />
      <div className="flex my-3 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-2 bg-blue-400" />
        <div className="flex items-center px-2 py-3 bg-blue-200 w-full">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={item.actor.photo}
          />
          <span className="mx-3">{timeAgo(item.createdAt)}</span>
          <div className="mx-3">
            <h2 className="text-xl font-semibold text-gray-800">{item.actor.name}</h2>
            <p className="text-gray-600">
               {item.type}
             
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
