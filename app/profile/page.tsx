"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ uid }: { uid: string }) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/getUserProfile', { uid });
      console.log(response.data);
      setUserProfile(response.data);
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
      setError(error.response?.data?.error || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchUserProfile();
    }
  }, [uid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userProfile) return <h1>No user profile found</h1>;

  return (
    <div>
      <h1>{userProfile.authData.displayName}</h1>
      <p>{userProfile.authData.email}</p>
      <p>{userProfile.profileData.additionalInfo}</p>
    </div>
  );
}

export default UserProfile;
