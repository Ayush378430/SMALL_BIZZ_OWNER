import React, { useEffect, useState } from "react";
import Side from "./Side";
import axios from "axios";
import "./home.css";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/shops/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data.shop);
        setPromotions(response.data.promotions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <div className="header" >Small Bizz</div>
      <Side />
      <div className="profile-container">
        <div className="profile-content">
          <h2>Profile</h2>
          <p>
            <strong>Shop Name:</strong> {profile.shopName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Owner Name:</strong> {profile.ownerName}
          </p>
          <p>
            <strong>Mobile No:</strong> {profile.mobileNo}
          </p>
          <p>
            <strong>Pin Code:</strong> {profile.pinCode}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Category:</strong> {profile.category}
          </p>
          <h3>Achievements</h3>
          {promotions.length > 0 ? (
            <ul>
              {promotions.map((promotion) => (
                <li key={promotion._id}>
                  <div className="achievement-title">{promotion.title}</div>
                  <div className="achievement-description">
                    {promotion.description}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;