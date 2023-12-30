import { styled } from "styled-components"



const Button = styled.span`
background-color:white;
font-weight:500;
padding: 10px 20px;
border-radius:50px;
border : 0;
display:flex;
gap:5px;
align-items:center;
justify-content:center;
`;

const Logo = styled.img`
height: 25px;
`;

export default function GithubButton() {
    return <Button>
        <Logo src="public/github-logo.svg" />
        continue with Github
    </Button>
}