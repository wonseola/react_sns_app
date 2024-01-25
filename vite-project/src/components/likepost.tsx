import { useState } from "react";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import styled from "styled-components";


const Div = styled.div`
    width: 20px;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;

    &:hover {
        transform: scale(1.1); 
        transition: transform 0.2s ease-in-out;
    }

    &.liked {
        animation: heartBeat 0.5s ease-in-out; 
    }

    @keyframes heartBeat {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const Clickheart = styled.img`
    width :15px;
    height:15px;
`

const Heart = styled.img`
    width :15px;
    height:15px;
`

const Liketext = styled.p`
    font-size:15px;
    margin:0 5px 0 2px;
`
export default function LikePost() {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const user = auth.currentUser;

    const handleLike = async () => {
        try {
            if (user) {
                const postRef = doc(db, "posts", user.uid);

                if (isLiked) {
                    setIsLiked(false);
                    setLikeCount((prevLikeCount) => prevLikeCount - 1);

                    await updateDoc(postRef, {
                        like: likeCount - 1
                    });
                } else {
                    setIsLiked(true);
                    setLikeCount((prevLikeCount) => prevLikeCount + 1);

                    await updateDoc(postRef, {
                        like: likeCount + 1,
                        likedBy: user.displayName
                    });

                    await updateDoc(postRef, {
                        //
                    });
                }
            }
        } catch (error) {
            console.error("에러 발생: ", error);
        }
    };

    return (
        <div>
            <Div className={isLiked ? 'liked' : ''} onClick={handleLike}>
                <Liketext>{likeCount}</Liketext>
                {isLiked ?
                    <Heart src="/fillheart.svg" /> :
                    <Clickheart src="/heart.svg" />}
            </Div>
        </div>
    );
}
