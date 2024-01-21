import styled from "styled-components";
import { IPost } from "./timeline";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import Editpost from "./editpost";


const Wrapper = styled.div`
    display:grid;
    grid-template-columns:10fr 1fr;
    padding:20px;
    border-bottom:1px solid gray;
    
`;

const Postbottom = styled.div`
    display:flex;
    display:row;
    padding:4px;
`

const Time = styled.h2`
    font-size:10px;
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
`;

const Username = styled.span`
    font-weight:600;
    font-size:15px;
`;

const Payload = styled.p`
    margin:10px 0px;
    font-size: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Heart = styled.div`
    width:20px;
    height:20px;

`


const Heartimg = styled.img`
    /* transition: filter 0.3s ease; */
    &:hover{
        filter: invert(27%) sepia(88%) saturate(5417%) hue-rotate(2deg) brightness(98%) contrast(102%);
    }

`


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



export default function Post({ username, photo, post, userId, id, createdAt }: IPost) {

    const [avatarUrl, setAvatarUrl] = useState("");

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
            {photo ? (<Column>
                <Photo src={photo} />
            </Column>) : null}
            <Editpost photo={photo} post={post} userId={userId} id={id} username={username} createdAt={createdAt} />
        </Form>
        <Postbottom>
            <Heart  >
                <Heartimg src="/heart.svg" />
            </Heart>
            <span>likes</span>
        </Postbottom>
    </Wrapper>
}
