import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Profile from "../routes/profile";
import { Icons, Linkto, Menu, MenuItem, Menutext, Wrapper } from "./menu-conponents";
import styled from "styled-components";


const Img = styled.img`
    height:50px;
    cursor: pointer;
`

export default function Layout() {
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
                <Linkto to="/"><Img src="/bint2.svg" /></Linkto>
                <Profile />
                <Linkto to="/">
                    <MenuItem>
                        <Icons src="/home.svg" />
                        <Menutext>HOME</Menutext>
                    </MenuItem>
                </Linkto>
                <Linkto to="/profile">
                    <MenuItem>
                        <Icons src="/profile.svg" />
                        <Menutext>PROFILE</Menutext>
                    </MenuItem>
                </Linkto>

                <Linkto to="/profile">
                    <MenuItem>
                        <Icons src="/bookmart.svg" />
                        <Menutext>BOOKMARK</Menutext>
                    </MenuItem>
                </Linkto>
                <Linkto to="/search">
                    <MenuItem>
                        <Icons src="/search.svg" />
                        <Menutext>SEARCH</Menutext>
                    </MenuItem>
                </Linkto>

                <Linkto to="/favorite">
                    <MenuItem>
                        <Icons src="/heart.svg" />
                        <Menutext>FAVORITE</Menutext>
                    </MenuItem>
                </Linkto>
                <MenuItem className="logout" onClick={onLogOut}>
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" />
                        <path clipRule="evenodd" fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" />
                    </svg>
                    <Menutext>LOGOUT</Menutext>
                </MenuItem>

            </Menu>
            <Outlet />
        </Wrapper>
    );
}