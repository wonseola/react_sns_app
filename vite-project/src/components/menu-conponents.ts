import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
display:grid;
grid-template-columns:20% auto;
height:100%;
width:100%;
gap:20px;
padding: 20px 0px;
width:100%;
background-color:white;
`;

export const Menu = styled.div`
display: flex;
flex-direction:column;
align-items:center;
gap:20px;

`;

export const MenuItem = styled.div`
cursor: pointer;
display:flex;
justify-content:flex-start;
align-items:center;
height:50px;
width:200px;
max-width:100%;
padding-left: 20px; 
border-radius:20px;
position: relative;
transition: background-color 0.3s ;
  &:hover {
    background-color: #b3d2ff; 
}

`;


export const Menutext = styled.h2`
    font-size:12px;
    margin-left:20px;
    color:black;
    @media (max-width: 1200px) {
    display: none;
  }
`;


export const Icons = styled.img`
    width:25px;
    height:25px;
    max-width:100%;
    max-height:100%;
`

export const Linkto = styled(Link)`
  text-decoration: none;
  max-width:100%;
`;
