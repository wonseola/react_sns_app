import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";


export interface IPost {
    id: string
    photo: string;
    post: string;
    userId: string;
    username: string;
    createAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const fetchPosts = async () => {
        const postQuery = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(postQuery);
        const posts = snapshot.docs.map((doc) => {
            const { post, createAt, userId, username, photo } = doc.data();
            return {
                post, createAt, userId, username, photo, id: doc.id
            };
        });
        setPosts(posts);
    };
    useEffect(() => { fetchPosts(); }, [])
    return (
        <Wrapper>
            {JSON.stringify(posts)}

        </Wrapper >);
}