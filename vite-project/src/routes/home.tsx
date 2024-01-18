import styled from "styled-components";
import Timeline from "../components/timeline";
import PostTweetForm from "../components/post-tweet-form";


const Wrapper = styled.div`
/* display: grid; */
gap:50px;
overflow-y: scroll;
/* grid-template-rows: 1fr 4fr; */
`;


export default function Home() {

    return <Wrapper>
        <PostTweetForm />
        <Timeline />
    </Wrapper>;
}