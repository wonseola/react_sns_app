import styled from "styled-components";
import { IPost } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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

const Editbtn = styled.span`
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

const Buttonimg = styled.img`
    width:20px;
    height:20px;
    margin:5px;
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
    const [editedPost, setEditedPost] = useState(post);
    const [showModal, setShowModal] = useState(false);


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

    const onEdit = async () => {
        try {
            // 수정된 내용을 데이터베이스에 업데이트
            await updateDoc(doc(db, "posts", id), {
                post: editedPost,
            });
            setShowModal(false); // 모달 닫기
        } catch (e) {
            console.error("Error editing post:", e);
        }
    };

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
                    <Editbtn onClick={() => setShowDropdown(!showDropdown)}>
                        <Buttonimg src="/more2.svg" />
                    </Editbtn>
                    {showDropdown && (
                        <Morebtn ref={dropdownRef}>
                            <Editbtn onClick={onDelete}><Buttonimg src="/cancel.svg" /></Editbtn>
                            <Editbtn onClick={() => {
                                setShowModal(true);
                                setEditedPost(post);
                            }}><Buttonimg src="/edit.svg" /></Editbtn>
                            <Editbtn onClick={() => setShowDropdown(false)}>cancel</Editbtn>
                        </Morebtn>
                    )}
                </>
            ) : null}
            {showModal && (
                <div className="edit-modal">
                    <textarea
                        value={editedPost}
                        onChange={(e) => setEditedPost(e.target.value)}
                        rows={4}
                        cols={50}
                    />
                    <button onClick={onEdit}>Save</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </Form>
    </Wrapper>
}