import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr auto;
  max-width:100%;
  padding: 0 100px 0px 0;
  overflow-y: scroll;


`;


const Input = styled.div`
    display:flex;
    flex-direction:column;
`


export default function Home() {
    return (
        <Wrapper>
            <Input>
                <PostTweetForm />
            </Input>
            <Timeline />
        </Wrapper>
    );
}