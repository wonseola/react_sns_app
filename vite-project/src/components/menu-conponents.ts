import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3vmax;
  color:rgb(63, 66, 218);
  font-weight:400;
  font-family:'Black Han Sans',sans-serif;
  font-style:italic;
  text-shadow: 5px 5px 2px rgba(0, 0, 0, 0.1);
  text-align:center;
    margin:30px;
`;

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
padding-left: 20px; 
border-radius:20px;
position: relative;
transition: background-color 0.3s ;
  &:hover {
    background-color: #b3d2ff; 
}
svg{
    width:30px;
    fill:black;
}

&.logout{
    border-color:#2667C6;
    svg{
        fill:#2667C6;
    }
}
`;


export const Menutext = styled.h2`
    font-size:18px;
    margin-left:20px;
    color:black;
`

export const Icons = styled.img`
    width:25px;
    height:25px;

`

export const Linkto = styled(Link)`
  text-decoration: none;
`;
