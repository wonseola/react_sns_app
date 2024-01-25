import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";




const Form = styled.form`
display:flex;
flex-direction:column;
gap :10px;
padding-top:40px;
width:100%;
`;


const TextArea = styled.textarea`
border:none;
border-bottom:2px solid lightgray;
padding :20px;
border-radius: 0;
font-size: 16px;
color:black;
background-color:white;
width:100%;
resize:none;
&::placeholder{
    font-size:16px;

}
&:focus{
    outline:none;
    border-color:#2667C6;
}
`;

const AttaxhFileButton = styled.label`
padding: 10px 0px;
color: #2667C6;
text-align:center;
border-radius:20px;
/* border:1px solid #2667C6; */
font-size:14px;
font-weight:600;
cursor:pointer;
/* width:200px; */

`;

const AttachFileInput = styled.input`
display:none;
`;

const Btn = styled.div`
    width:20px;
    /* height:20px; */
`

const SubmitBtn = styled.input`
background-color:#2667C6;
color:white;
border:none;
padding:10px 0px ;
border-radius:20px;
font-size:16px;
width:200px;
cursor: pointer;
&:hover,
&:active{
    opacity:0.8;
}

`;

const Buttons = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding: 0 20px 0 20px;
`

const Imageview = styled.img`
    width:400px;
    height:400px;
    margin:20px;
`



export default function PostTweetForm() {

    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);




    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const file = (files[0]);
            if (file.size <= 1024 * 1024) {
                setFile(file);
                setImagePreview(URL.createObjectURL(file));
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
                like: 0,
            });
            if (file) {
                const locationRef = ref(
                    storage,
                    `posts/${user.uid}/${doc.id}`
                );
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setPost("");
            setImagePreview(null);
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
            <TextArea required rows={1} maxLength={300} onChange={onChange} value={post} placeholder="Let's talk !" />
            <Buttons>
                <AttaxhFileButton htmlFor="file" >{file ? "Photo Added" : <Btn><img src="/addimg.svg" /></Btn>}</AttaxhFileButton>
                <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
                <SubmitBtn type="submit" value={isLoading ? "Posting . . ." : "Post"} />
            </Buttons>
            {imagePreview && <Imageview src={imagePreview} />}
        </Form>

    );
}
