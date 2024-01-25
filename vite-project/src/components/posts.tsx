import styled, { keyframes } from "styled-components";
import { IPost } from "./timeline";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import Editpost from "./editpost";
import LikePost from "./likepost";


const Wrapper = styled.div`
    display:grid;
    grid-template-columns:10fr 1fr;
    padding:20px;
    border-bottom:1px solid gray;
    
`;


const Time = styled.h2`
    font-size:11px;
    margin:10px;
`

const Column = styled.div`

`;

const Form = styled.div`
display:flex;
flex-direction:row;
`;

const Photo = styled.img`
    width:100px;
    height:100px;
    border-radius:5px;
    cursor: pointer;
`;

const Username = styled.span`
    font-weight:600;
    font-size:13px;
`;

const Payload = styled.p`
    margin:10px 0px;
    font-size: 15px;
`;


const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  border:1px solid gray;

`;

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.visible {
    opacity: 1; 
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const EnlargedPhoto = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 5px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;


const formatTimeDifference = (createdAt: string | number | Date) => {
    const date = new Date(createdAt);
    const currentDate = new Date();

    const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutesAgo}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hoursAgo}시간 전`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
};



export default function Post({ username, photo, post, userId, id, createdAt, like }: IPost) {

    const [avatarUrl, setAvatarUrl] = useState("");
    const [enlargedPhoto, setEnlargedPhoto] = useState(false);

    const handlePhotoClick = () => {
        setEnlargedPhoto(!enlargedPhoto);
    };
    useEffect(() => {
        const fetchAvatarUrl = async () => {
            const locationRef = ref(storage, `avatars/${userId}`);
            try {
                const url = await getDownloadURL(locationRef);
                setAvatarUrl(url);
            } catch (error) {
                setAvatarUrl("/bint2.svg");
            }
        };

        fetchAvatarUrl();
    }, [userId]);



    const formattedDate = formatTimeDifference(createdAt);



    return <Wrapper>
        <Column>
            <Username>
                <Avatar src={avatarUrl} alt="Avatar" />
                {username}
            </Username>
            <Payload dangerouslySetInnerHTML={{ __html: post.replace(/\n/g, '<br>') }} />
            <Time>{formattedDate}</Time>

        </Column>
        <Form>
            {photo ? (
                <Column>
                    <Photo
                        src={photo}
                        onClick={handlePhotoClick}
                    />
                </Column>
            ) : null}
            <Editpost photo={photo} post={post} userId={userId} id={id} username={username} createdAt={createdAt} like={like} />
        </Form>
        <LikePost />
        {enlargedPhoto && (
            <Div onClick={handlePhotoClick} className={enlargedPhoto ? "visible" : ""}>
                <EnlargedPhoto src={photo} />
            </Div>
        )}
    </Wrapper>
}
