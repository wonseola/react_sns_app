import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import Profile from "../routes/profile";

export const Title = styled.h1`
  font-size: 3vmax;
  color:rgb(8,193,134);
  font-weight:400;
  font-family:'Black Han Sans',sans-serif;
  font-style:italic;
  text-shadow: 5px 5px 2px rgba(0, 0, 0, 0.1);
  text-align:center;
    margin:30px;
`;

const Wrapper = styled.div`
  gap: 20px;
  padding: 50px 0px;
  width: 20%;
  background-color: #ffffff;
  margin: 0 auto;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  width: 100%;
`;

const MenuItem = styled.div`
cursor: pointer;
display:flex;
align-items:center;
justify-content:center;
height:30px;
width:60px;
margin-top:10px;
svg{
    width:30px;
    fill:black;
}
&.logout{
    border-color:#07b07b;
    svg{
        fill:#07b07b;
    }
}

`;


export default function Test() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("Are you sure you want to log out?");
        if (ok) {
            auth.signOut();
            navigate("/login");
        }

    };
    return (
        <Wrapper>
            <Menu>
                <Title>FxStreet</Title>
                <Profile />
                <Link to="/">

                    <MenuItem>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
                        </svg>
                    </MenuItem>
                </Link>
                <Link to="/profile">
                    <MenuItem>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                        </svg>
                    </MenuItem>
                </Link>
                <MenuItem className="logout" onClick={onLogOut}>
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" />
                        <path clipRule="evenodd" fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" />
                    </svg>
                </MenuItem>
            </Menu>
        </Wrapper>
    );
}