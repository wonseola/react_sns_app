import { styled } from "styled-components";
import Myposts from "../components/myposts";
import Myprofile from "../components/myprofile";


const Wrapper = styled.div`
  gap: 50px;
  overflow-y: scroll;
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
