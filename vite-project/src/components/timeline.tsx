import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Post from "./posts";
import { Unsubscribe } from "firebase/auth";


export interface IPost {
    id: string
    photo?: string;
    post: string;
    userId: string;
    username: string;
    createdAt: number;
    like: number;
}

const Wrapper = styled.div`
display:flex;
gap:10px;
flex-direction:column;
overflow-y: scroll;
`;


export default function Timeline() {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchPosts = async () => {
            const postQuery = query(
                collection(db, "posts"),
                orderBy("createdAt", "desc"),
                limit(50)
            );
            // const snapshot = await getDocs(postQuery);
            // const posts = snapshot.docs.map((doc) => {
            //     const { post, createAt, userId, username, photo } = doc.data();
            //     return {
            //         post, createAt, userId, username, photo, id: doc.id
            //     };
            // });
            unsubscribe = onSnapshot(postQuery, (snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    const { post, createdAt, userId, username, photo, like } = doc.data();
                    return {
                        post, createdAt, userId, username, photo, id: doc.id, like
                    };
                });
                setPosts(posts);
            });
        };

        fetchPosts();

        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    return (
        <Wrapper>
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Wrapper>

    );
}