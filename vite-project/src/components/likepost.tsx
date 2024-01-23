import { useState } from "react";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function LikePost() {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const user = auth.currentUser;

    const handleLike = async () => {
        try {
            if (user) {
                const postRef = doc(db, "posts", user?.uid);

                if (isLiked) {
                    setIsLiked(false);
                    setLikeCount((prevLikeCount) => prevLikeCount - 1);

                    await updateDoc(postRef, {
                        like: likeCount - 1
                    });
                } else {
                    // 좋아요를 누르지 않았다면 좋아요 추가
                    setIsLiked(true);
                    setLikeCount((prevLikeCount) => prevLikeCount + 1);

                    await updateDoc(postRef, {
                        like: likeCount + 1,
                        likedBy: user.displayName
                    });
                }
            }
        } catch (error) {
            console.error("좋아요 처리 중 오류 발생: ", error);
        }
    };

    return (
        <div>
            <button onClick={handleLike} disabled={!user}>
                {isLiked ? "좋아요 취소" : "좋아요"}
            </button>
            <p>{likeCount}</p>
        </div>
    );
}
