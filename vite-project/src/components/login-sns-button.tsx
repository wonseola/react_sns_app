import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";



const Button = styled.span`
background-color:white;
/* font-weight:500; */
padding: 10px 20px;
border-radius:50px;
width:20%;
color:black;
border : 0;
margin-top:50px;
display:flex;
gap:5px;
cursor: pointer;
align-items:center;
justify-content:center;
`;

const Logo = styled.img`
height: 25px;
`;

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");

        }
        catch (error) {
            console.error(error);
        }

    };
    return <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />

    </Button>
}