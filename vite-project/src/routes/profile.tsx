import { styled } from "styled-components";
import Myposts from "../components/myposts";
import Myprofile from "../components/myprofile";


const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

const Input = styled.div`
    display:flex;
    flex-direction:row;
`





export default function Profile() {


  return (
    <Wrapper>
      <Input>
        <Myprofile />
      </Input>
      <Myposts />
    </Wrapper>
  );
}
