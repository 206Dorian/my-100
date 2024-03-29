import React from 'react';
import { useNavigate } from 'react-router-dom';

// Test data
const testFriends = [
  {
    name: 'John Doe',
    photo: 'https://via.placeholder.com/50',
  },
  {
    name: 'Jane Smith',
    photo: 'https://via.placeholder.com/50',
  },
];

const testStories = [
  {
    title: 'My First Post',
    body: 'This is my first post. I am excited to share my thoughts and experiences with you!',
  },
  {
    title: 'A Day at the Beach',
    body: 'Yesterday, I spent the entire day at the beach with my friends. We had so much fun swimming and playing beach volleyball!',
  },
];

const SocialFeed = ({ friends = testFriends, stories = testStories }) => {
  const navigate = useNavigate(); // Create navigate object

  // Function to navigate to the profile page
  const goToProfile = () => {
    navigate('/profile');
  };

  // Render loading message if friends or stories are empty
  if (!friends.length || !stories.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="social-feed-container">
      {/* Add button to go back to profile page */}
      <button onClick={goToProfile}>Back to Profile</button>

      {/* Map over friends and stories to display content */}
      {friends.map((friend, index) => (
        <div key={index} className="friend-row">
          <div className="friend-info">
            <img src={friend.photo} alt={`${friend.name}'s profile`} />
            <p>{friend.name}</p>
          </div>
          <div className="story-container">
            <h3>{stories[index].title}</h3>
            <div className="story-content">
              <p>{stories[index].body.substring(0, 100)}...</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
