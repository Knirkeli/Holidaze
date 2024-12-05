import { Button, buttonVariants } from "../../components/ui/button";
import Router from "next/router";

export function ProfileInfo({ profile }: { profile: any }) {
  return (
    <div className="shadow-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center w-full">
        {profile.name}
      </h1>
      <div className="w-full flex flex-col md:flex-row md:items-start">
        <img
          src={profile.avatar.url}
          alt={profile.avatar.alt}
          className="h-36 w-36 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />
        <div className="flex flex-col">
          <p className="text-lg mb-4">{profile.bio}</p>
          <p className="text-lg mb-4">{profile.email}</p>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 md:self-end"
          onClick={() => Router.push(`/EditProfile`)}
        >
          Edit profile
        </Button>
      </div>
    </div>
  );
}
