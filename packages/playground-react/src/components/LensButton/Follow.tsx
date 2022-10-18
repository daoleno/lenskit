// import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import { doesFollow } from "../../lensapi/follow/does-follow";
// import { follow } from "../../lensapi/follow/follow";
// import { unfollow } from "../../lensapi/follow/unfollow";
// import { profile } from "../../lensapi/profile/get-profile";

// export function Follow() {
//   const { address, isConnecting, isDisconnected } = useAccount();
//   const [loading, setLoading] = useState(false);
//   const [followed, setFollowed] = useState(false);
//   const [profileData, setProfileData] = useState<any>();
//   const getProfile = async () => {
//     const data = await profile();
//     setProfileData(data.profile);
//   };
//   const isFollowed = async () => {
//     const data = await doesFollow(profileData.id, address!);
//     setFollowed(data.doesFollow[0].follows);
//   };
//   const handleFollow = async () => {
//     setLoading(true);
//     try {
//       const data = await follow(profileData.id);
//       console.log(data);
//     } catch (error: any) {
//       console.log(error);
//     }
//     setLoading(false);
//   };
//   const handleUnfollow = async () => {
//     setLoading(true);
//     try {
//       const data = await unfollow(profileData.id);
//       console.log(data);
//     } catch (error: any) {
//       console.log(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);

//   useEffect(() => {
//     if (profileData) {
//       isFollowed();
//     }
//   }, [profileData]);

//   return (
//     <div className="rounded-xl cursor-pointer flex flex-col justify-between space-y-4 p-4">
//       <div
//         className="flex flex-col justify-center items-center gap-2"
//         onClick={followed ? handleUnfollow : handleFollow}
//       >
//         <img
//           src="lens/profile-4.png"
//           alt=""
//           className="h-24 w-24 rounded-full"
//         />
//         {/* handle */}
//         <span className="text-basil font-bold text-lg">
//           {profileData?.handle}
//         </span>
//         <div className="flex flex-row gap-2">
//           <span className="text-basil  text-lg">
//             {profileData?.stats?.totalFollowers} followers
//           </span>
//           <span className="text-basil  text-lg">
//             {profileData?.stats?.totalFollowing} following
//           </span>
//         </div>
//         <button className="bg-basil px-6 py-3 text-peas rounded-2xl focus:ring-1 focus:ring-basil flex items-center gap-2 mx-auto uppercase mt-3">
//           {loading && (
//             <svg
//               className="animate-spin h-5 w-5"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 stroke-width="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//           )}
//           {followed ? "Unfollow" : "Follow"}
//         </button>
//       </div>
//     </div>
//   );
// }
