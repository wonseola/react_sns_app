import styled from "styled-components";
import { IPost } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRef, useState } from "react";


const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 20fr 1fr;
    padding:20px;
    border:1px solid gray;
    border-radius:15px;
    
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
    font-size:15px;
`;

const Payload = styled.p`
    margin:10px 0px;
    font-size: 25px;
`;

const DeleteButton = styled.span`
    color:white;
    font-weight:600;
    border:0;
    font-size:12px;
    padding:5px  10px;
    text-transform:uppercase;
    border-radius:5px;
    justify-content:center;
    align-items:center;
    cursor: pointer;
`;

const Cancel = styled.img`
    width:20px;
    height:20px;
`
const Morebtn = styled.div`
    position: relative;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    z-index: 1;
    cursor: pointer;
`;

export default function Post({ username, photo, post, userId, id }: IPost) {
    const user = auth.currentUser;
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this post?");

        if (!ok || user?.uid !== userId) return;
        try {
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
            await deleteDoc(doc(db, "posts", id));
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setShowDropdown(false);
        }
    }


    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            <Payload>{post}</Payload>
        </Column>
        <Form>
            {photo ? (<Column>
                <Photo src={photo} />
            </Column>) : null}
            {user?.uid === userId ? (
                <>
                    <DeleteButton onClick={() => setShowDropdown(!showDropdown)}>
                        <Cancel src="/more2.svg" />
                    </DeleteButton>
                    {showDropdown && (
                        <Morebtn ref={dropdownRef}>
                            <button onClick={onDelete}><Cancel src="/cancel.svg" /></button>
                            <button onClick={() => setShowDropdown(false)}>Cancel</button>
                        </Morebtn>
                    )}
                </>
            ) : null}
        </Form>
    </Wrapper>
}