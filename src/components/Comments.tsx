import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const commentsCollection = collection(db, 'comments');

const usernames = [
  'PAWNhunter69',
  'pawn_ape420',
  'pawnwhale',
  'ilovepawn',
  'pawnisBEST',
  '69PAWN420',
  'uponlyPAWN',
  'bullish_on_pawn',
  'pawnboi_fangirl',
  'dm_me_pawnboi69',
  'pawnislife',
  'lettherebePAWN',
  'PAWNofthedead',
  'PawnStar69',
  'PawnAddict101',
  'Pawn_Industry',
  'PAWNographer',
  'tradeitforPAWN',
  'PAWN_that_sh420',
  'long_PAWN',
  'NFA_BUYPAWN_NFA',
  'early_on_PAWN'
];

const generateRandomUsername = () => {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  return usernames[randomIndex];
};

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(commentsCollection, where('pageUrl', '==', window.location.href), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          author: doc.data().author.toString(),
          content: doc.data().content,
          parentId: doc.data().parentId || null, // Add parentId if available
          replies: doc.data().replies || [] // Load replies if available
        }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    fetchComments();
  }, [newComment]);

  const handleAddComment = async () => {
    try {
      const generatedUsername = generateRandomUsername();
      const docRef = await addDoc(commentsCollection, {
        author: generatedUsername,
        content: newComment,
        pageUrl: window.location.href,
        timestamp: new Date().getTime(),
      });
      console.log('Comment added with ID: ', docRef.id);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReply = async (parentId: string, replyContent: string) => {
    try {
      const generatedUsername = generateRandomUsername();
      const docRef = await addDoc(commentsCollection, {
        author: generatedUsername,
        content: replyContent,
        pageUrl: window.location.href,
        timestamp: new Date().getTime(),
        parentId: parentId, // Include parentId to establish the relationship
      });
      console.log('Reply added with ID: ', docRef.id);
      // Update state after adding reply
      setComments(prevComments => {
        const updatedComments = prevComments.map(comment => {
          if (comment.id === parentId) {
            // If the replied comment is found, update its replies array
            return {
              ...comment,
              replies: [...(comment.replies || []), { id: docRef.id, author: generatedUsername, content: replyContent }]
            };
          } else if (comment.replies) {
            // Recursively update replies
            return {
              ...comment,
              replies: updateReplies(comment.replies, parentId, docRef.id, generatedUsername, replyContent)
            };
          }
          return comment;
        });
        return updatedComments;
      });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const updateReplies = (replies: any[], parentId: string, replyId: string, author: string, content: string) => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        // If the parent reply is found, add the new reply
        return {
          ...reply,
          replies: [...(reply.replies || []), { id: replyId, author: author, content: content }]
        };
      } else if (reply.replies) {
        // Recursively update replies
        return {
          ...reply,
          replies: updateReplies(reply.replies, parentId, replyId, author, content)
        };
      }
      return reply;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <div>
        <input
          type="text"
          placeholder="Enter your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            color: 'white',
            background: 'none',
            height: '2rem',
            width: '100%',
            border: 'none',
            padding: '0.5rem',
            marginBottom: '1rem'
          }}
        />
        <button
          onClick={handleAddComment}
          className="bg-purple-800 text-white ml-4 px-4 py-2 rounded custom-button"
          style={{ backgroundColor: 'purple' }}
        >
          Submit
        </button>
      </div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}:</strong> {comment.content}
            <div>
              <input
                type="text"
                placeholder="Reply to this comment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleReply(comment.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'none',
                  color: 'inherit',
                  padding: '0.5rem',
                  marginBottom: '0.5rem'
                }}
              />
            </div>
            {renderReplies(comment.replies, handleReply)} {/* Pass handleReply as a parameter */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderReplies = (replies: any[], handleReply: Function) => {
  if (!replies || replies.length === 0) return null;
  return (
    <ul style={{ paddingLeft: '20px', borderLeft: '1px solid gray' }}>
      {replies.map(reply => (
        <li key={reply.id}>
          <strong style={{ color: 'purple', fontWeight: 'bold' }}>{reply.author}:</strong> {reply.content}
          <div>
            <input
              type="text"
              placeholder="Reply to this comment"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleReply(reply.id, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              style={{
                width: '100%',
                border: 'none',
                background: 'none',
                color: 'inherit',
                padding: '0.5rem',
                marginBottom: '0.5rem'
              }}
            />
          </div>
          {renderReplies(reply.replies, handleReply)} {/* Pass reply.replies as a parameter */}
        </li>
      ))}
    </ul>
  );
};


export default CommentsSection;
