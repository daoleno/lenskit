import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PROFILE_ID } from "../../lensapi/config";
import { ProfileMetadata } from "../../lensapi/interfaces/profile-metadata";
import { setProfileMetadata } from "../../lensapi/profile/set-update-profile-metadata";

export function UpdateProfile(props: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const handleUpdateProfile = async (event: any) => {
    setLoading(true);

    event.preventDefault();
    const profileMetadata: ProfileMetadata = {
      version: "lenskit-profile-v1",
      metadata_id: uuidv4(),

      name: event.target.name.value,
      bio: event.target.bio.value,
      cover_picture: event.target.cover_picture.value,
      attributes: [
        {
          traitType: "string",
          value: "yes this is custom",
          key: "custom_field",
        },
      ],
    };

    try {
      const data = await setProfileMetadata(PROFILE_ID, profileMetadata);
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="py-12 border-basil border-2 rounded-lg flex flex-col justify-center items-center mx-auto mt-7 text-basil">
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src="lens-logo.svg"
            alt=""
            className="bg-basil bg-opacity-10 rounded-full h-32 aspect-square p-2 border-2 border-basil"
          />
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-row gap-2">
              <label htmlFor="name" className="text-basil">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="lenskit"
                className="border-b border-basil bg-peas focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor="bio" className="text-basil">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                id="bio"
                defaultValue="The easiest way to integrate with Lens Protocol"
                className="border-b border-basil bg-peas focus:outline-none"
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor="cover_picture" className="text-basil">
                Cover Picture
              </label>
              <input
                type="text"
                name="cover_picture"
                id="cover_picture"
                defaultValue="https://ideas.lens.xyz/profiles/profile-4.png"
                className="border-b border-basil bg-peas focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-basil px-6 py-3 text-peas rounded-2xl focus:ring-1 focus:ring-basil flex items-center gap-2 mx-auto uppercase mt-7">
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
        {!loading && data && <CheckCircleIcon className="h-5 w-5" />}
        Update
      </button>
    </form>
  );
}
