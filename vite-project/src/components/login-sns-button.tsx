import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.span`
background-color:white;
padding: 10px 20px;
border-radius:100%;
display:flex;
gap:5px;
cursor: pointer;
align-items:center;
justify-content:center;
width:25%;
`;


const Logo = styled.img`
height: 25px;
`;

export default function GithubButton() {
    const navigate = useNavigate();
    const onClickGit = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");

        }
        catch (error) {
            console.error(error);
        }

    };

    const onClickGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");

        }
        catch (error) {
            console.error(error);
        }

    };


    return (
        <ButtonWrapper>
            <Button onClick={onClickGit}>
                <Logo src="/github-logo.svg" />
            </Button>
            <Button onClick={onClickGoogle}>
                <Logo src="/google.svg" />
            </Button>
        </ButtonWrapper>
    );
}