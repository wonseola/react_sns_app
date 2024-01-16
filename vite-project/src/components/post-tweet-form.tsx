import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Form = styled.form`
display:flex;
flex-direction:column;
gap :10px;

`;

const TextArea = styled.textarea`
border:2px solid white;
padding :20px;
border-radius: 20px;
font-size: 16px;
color:white;
background-color:white;
width:100%;
resize:none;
font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
&::placeholder{
    font-size:16px;

}
&:focus{
    outline:none;
    border-color:#FF4000;
}
`;

const AttaxhFileButton = styled.label`
padding: 10px 0px;
color: #FF4000;
text-align:center;
border-radius:20px;
border:1px solid #FF4000;
font-size:14px;
font-weight:600;
cursor:pointer;
`;

const AttachFileInput = styled.input`
display:none;
`;

const SubmitBtn = styled.input`
background-color:#FF4000;
color:white;
border:none;
padding:10px 0px ;
border-radius:20px;
font-size:16px;
cursor: pointer;
&:hover,
&:active{
    opacity:0.8;
}

`;




export default function PostTweetForm() {

    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState("");
    const [file, setFile] = useState<File | null>(null);



    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const file = (files[0]);
            if (file.size <= 1024 * 1024) {
                setFile(file);
            }
            else {
                alert("파일 넘 큼 ");
            }
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || post === "" || post.length > 180) return;

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "posts"), {
                post,
                createdAt: Date.now(),
                username: user.displayName || "Annoymous",
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(
                    storage,
                    `posts/${user.uid}-${user.displayName}/${doc.id}`
                );
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setPost("");
            setFile(null);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5} maxLength={180} onChange={onChange} value={post} placeholder="What is happening?" />
            <AttaxhFileButton htmlFor="file" >{file ? "Photo Added" : "Add photo"}</AttaxhFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting . . ." : "Post"} />
        </Form>);
}