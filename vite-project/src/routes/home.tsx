import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  max-width:100%
`;

const Input = styled.div`
    display:flex;
    flex-direction:row;
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