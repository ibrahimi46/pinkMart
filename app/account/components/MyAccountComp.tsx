import Image from "next/image";
import assets from "@/assets";
import { useContext, useState } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";
import { AuthContext } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading";

const ProfilePictureUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const authContext = useContext(AuthContext);
  const context = useContext(UserDataContext);
  const { userPfp, setUserPfp, token } = authContext!;
  const { setLoading, loading } = context!;

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);
      if (!token) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderName", "profile-pics");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.imageUrl;

      setUserPfp(imageUrl);

      if (imageUrl) {
        await fetch("/api/upload-profile-pic", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageUrl }),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      <h1 className="font-bold mb-2">Profile Picture</h1>
      <div className="flex justify-between border border-black-300 p-3 bg-white rounded-2xl items-center">
        <div className="flex items-center gap-3">
          {userPfp ? (
            <div className="bg-primary-100 rounded-full flex h-12 w-12 items-center justify-center">
              <Image
                src={userPfp}
                height={60}
                width={60}
                alt="user-pfp"
                className="rounded-full object-cover h-full w-full"
              />
            </div>
          ) : (
            <div className="bg-primary-100 rounded-3xl p-4 flex items-center justify-center">
              <Image
                src={userPfp || assets.icons.upload}
                height={24}
                width={24}
                alt="upload"
              />
            </div>
          )}

          <div>
            <h1 className="font-bold text-body-md">Upload Photo</h1>
            <p className="text-black-400 font-bold text-body-sm">
              {file ? file.name : "No file selected"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <label
            htmlFor="profile-upload"
            className="bg-primary-600 text-white px-3 py-1 rounded-2xl cursor-pointer text-body-sm"
          >
            Choose File
          </label>
          <input
            id="profile-upload"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            className="bg-black-100 px-3 py-1 rounded-2xl border border-primary-600 text-body-sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface AccDetailItems {
  field1?: string;
  field2?: string;
}

const AccDetailItems = ({ field1, field2 }: AccDetailItems) => {
  return (
    <div className="flex justify-between border border-black-300 p-3 bg-white  rounded-2xl">
      <div className="">
        <h1 className="font-bold text-body-md">{field1}</h1>
        <p className="text-black-400 font-bold text-body-sm">
          {field2 ? field2 : `NA`}
        </p>
      </div>
      <Image src={assets.icons.edit} height={20} width={20} alt="edit" />
    </div>
  );
};

const MyAccountComp = () => {
  const authContext = useContext(AuthContext);
  const context = useContext(UserDataContext);
  const { userDetails } = authContext!;
  const { loading } = context!;

  return (
    <div className="flex flex-col gap-4 mt-2">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h1 className="font-bold mb-2 text-body-2xl">Account Details</h1>
        <AccDetailItems field1="Full Name" field2={userDetails?.fullName} />
        <AccDetailItems field1="Mobile Number" field2={userDetails?.phone} />
        <AccDetailItems field1="Email Address" field2={userDetails?.email} />
      </div>
      <div>
        <ProfilePictureUpload />
      </div>
    </div>
  );
};

export default MyAccountComp;
