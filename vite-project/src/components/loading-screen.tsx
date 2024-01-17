import { styled } from "styled-components"


const Wrapper = styled.div`
    display: flex;
    justify-items: center;
    align-items:center;
`;

const Load = styled.img``;

export default function LoadingScreen() {
    return <Wrapper>
        <Load src="/loading.svg" />
    </Wrapper>
}