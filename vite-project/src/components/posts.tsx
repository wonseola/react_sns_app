import styled from "styled-components";
import { IPost } from "./timeline";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import Editpost from "./editpost";

const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 20fr 1fr;
    padding:20px;
    border-bottom:1px solid gray;
    
`;

const Column = styled.div`

`;

const Form = styled.div`
display:flex;
flex-direction:row;
`;

const Photo = styled.img`
    width:100px;
    height:100px;
    border-radius:15px;
`;

const Username = styled.span`
    font-weight:600;
    font-size:20px;
`;

const Payload = styled.p`
    margin:10px 0px;
    font-size: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export default function Post({ username, photo, post, userId, id, createAt }: IPost) {

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



    return <Wrapper>
        <Column>
            <Username>
                <Avatar src={avatarUrl} alt="Avatar" />
                {username}
            </Username>
            <Payload dangerouslySetInnerHTML={{ __html: post.replace(/\n/g, '<br>') }} />

        </Column>
        <Form>
            {photo ? (<Column>
                <Photo src={photo} />
            </Column>) : null}
            <Editpost photo={photo} post={post} userId={userId} id={id} username={username} createAt={createAt} />
        </Form>
    </Wrapper>
}