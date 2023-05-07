import React from 'react';

const SocialFeed = ({ friends, stories }) => {
  return (
    <div className="social-feed-container">
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
