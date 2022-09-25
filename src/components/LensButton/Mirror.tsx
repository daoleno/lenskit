import { useState } from "react";
import { approveModule } from "../../lensapi/module/approve-module";
import { collect } from "../../lensapi/module/collect";

const post = {
  name: "The Lake Isle of Innisfree",
  description:
    "I will arise and go now, and go to Innisfree, And a small cabin build there, of clay and wattles made.",
  cover: "cover.jpeg",
};
const pubId = "0x4875-0x01";

export function Mirror(props: any) {
  const [loading, setLoading] = useState(false);
  const handleMirror = async () => {
    setLoading(true);
    try {
      // approve fee module
      await approveModule();
      // collect post
      await collect(pubId);
    } catch (e: any) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="rounded-xl cursor-pointer flex flex-col justify-between space-y-4 p-4 text-basil">
        <div className="flex flex-col justify-center items-center rounded-lg shadow-sm shadow-basil">
          <img src={post.cover} className="w-full rounded-lg" alt="cover" />
          <div className="flex flex-col justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold text-center">
                {post.name}
                <div className="text-sm font-normal text-center">
                  {post.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <span className="font-bold text-center">FREE</span>
          <span className="font-bold text-center">12 mirrors</span>
        </div>
        <button
          className="bg-basil px-6 py-5 rounded-2xl bg-opacity-80 text-peas focus:ring-1 gap-2 mx-3 uppercase leading-3 hover:bg-basil hover:text-peas flex flex-row justify-center items-center"
          onClick={handleMirror}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Mirror
        </button>
      </div>
    </>
  );
}
