import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="h-screen absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-300">
        <AiOutlineLoading3Quarters className="text-5xl"/>
    </div>
  )
}
