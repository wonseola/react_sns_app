import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRef, useState } from "react";
import styled from "styled-components";
import { IPost } from "./timeline";

const Editbtn = styled.div`
    color: black;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Buttonimg = styled.img`
    width: 20px;
    height: 20px;
    margin: 5px;
    
`;

const Morebtn = styled.div`
    position: relative;
    display:flex;
    flex-direction:row;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    align-items:center;
    padding: 10px;
    cursor: pointer;
    z-index:1;
`;



export default function Editpost({ photo, post, userId, id }: IPost) {
    const user = auth.currentUser;
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [editedPost, setEditedPost] = useState('');
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
        } catch (e) {
            console.error(e);
        } finally {
            setShowDropdown(false);
        }
    };


    const onEdit = async () => {
        try {
            await updateDoc(doc(db, "posts", id), {
                post: editedPost,
            });
            setShowModal(false);
            setShowDropdown(false);
        } catch (e) {
            console.error("Error editing post:", e);
        } finally {
            setShowModal(false);
        }
    };


    return (
        <>
            {user?.uid === userId && (
                <>

                    <Editbtn onClick={() => setShowDropdown(!showDropdown)}>
                        <Buttonimg src="/more2.svg" />
                    </Editbtn>
                    {showDropdown && (

                        <Morebtn ref={dropdownRef} onClick={() => setShowDropdown(false)}>
                            <Editbtn onClick={onDelete}>
                                <Buttonimg src="/cancel.svg" /></Editbtn>
                            <Editbtn onClick={() => {
                                setShowModal(true);
                                setEditedPost(post);
                            }}>
                                <Buttonimg src="/write.svg" /></Editbtn>
                            <Editbtn onClick={() => setShowDropdown(false)}>
                                <Buttonimg src="/cancel.svg" /></Editbtn>
                        </Morebtn>
                    )}
                </>
            )}
            {showModal && (

                <div>
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
        </>
    );
}

