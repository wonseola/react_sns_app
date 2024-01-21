import { useCallback, useEffect, useState } from "react";
import { IPost } from "./timeline";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import Post from "./posts";
import styled from "styled-components";



const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`

export default function Myposts() {

    const [posts, setposts] = useState<IPost[]>([]);
    const user = auth.currentUser;

    const fetchPosts = useCallback(async () => {
        const PostQuety = query(
            collection(db, "posts"),
            where("userId", "==", user?.uid),
            orderBy("createdAt", "desc"),
            limit(100)
        );

        const snapshot = await getDocs(PostQuety);
        console.log("Snapshot:", snapshot.docs.map(doc => doc.data()));
        console.log("Snapshot:", snapshot.docs.map(doc => doc.data()));
        const posts = snapshot.docs.map(doc => {
            const { post, createdAt, userId, username, photo } = doc.data();
            return {
                post, createdAt, userId, username, photo, id: doc.id,
            };
        });
        setposts(posts);
    }, [user]);


    useEffect(() => {
        const fetchData = async () => {
            await fetchPosts();
        };
        fetchData();
    }, [fetchPosts]);



    return (
        <Wrapper>
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Wrapper>
    )
}