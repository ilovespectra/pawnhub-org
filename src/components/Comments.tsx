import React from 'react';

const CommentsSection: React.FC = () => {
  // Pretend comments data
  const comments = [
    { id: 1, author: 'reallyreal69', content: 'Pawn is BEST!' },
    { id: 2, author: 'wen_moon420', content: 'Up only.' },
    { id: 3, author: 'newuser', content: '69 420 69 420 69 420 69!' },
  ];

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
