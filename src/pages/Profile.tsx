import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p className="text-muted-foreground">This is your profile page. Add your details and manage your account here.</p>
      </div>
    </div>
  );
};

export default Profile;
