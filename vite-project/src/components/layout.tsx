import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Icons, Linkto, Menu, MenuItem, Menutext, Wrapper } from "./menu-conponents";
import styled from "styled-components";
import Myprofile from "./myprofile";


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
                <Myprofile />
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

                <Linkto to="/bookmark">
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
                    <Icons src="/logout.svg" />
                    <Menutext>LOGOUT</Menutext>
                </MenuItem>

            </Menu>
            <Outlet />
        </Wrapper>
    );
}