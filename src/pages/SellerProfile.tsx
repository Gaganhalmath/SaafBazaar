
import React, { useRef, useState } from "react";

const MAX_FILE_SIZE_MB = 2;

const SellerProfile: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError("Profile picture must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !location) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    // Here you would typically send the data to your backend or update context
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto bg-[#232631] p-8 rounded-xl shadow-lg text-white mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Seller Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <img
              src={profilePic || "https://ui-avatars.com/api/?name=Seller&background=232631&color=fff"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#39FFA0] object-cover"
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePicChange}
            />
            <div className="text-xs text-gray-400 mt-1 text-center">Click image to change (max 2MB)</div>
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#191C22] border border-[#39FFA0] text-white"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-[#191C22] border border-[#39FFA0] text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 rounded bg-[#191C22] border border-[#39FFA0] text-white"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Location</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#191C22] border border-[#39FFA0] text-white"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#39FFA0] text-[#232631] font-bold py-2 px-4 rounded hover:bg-[#2ecc71] transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default SellerProfile;
