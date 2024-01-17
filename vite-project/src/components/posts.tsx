import styled from "styled-components";
import { IPost } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


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


export default function Post({ username, photo, post, userId, id }: IPost) {
    const user = auth.currentUser;
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
            //
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
            {user?.uid === userId ?
                <DeleteButton onClick={onDelete}><Cancel src="/cancel.svg" /></DeleteButton> : null}
        </Form>
    </Wrapper>
}