import styled from "styled-components";
import { IPost } from "./timeline";


const Photo = styled.img`
    width:100px;
    height:100px;
    border-radius:5px;
`;
export default function Detail({ photo }: IPost) {
    return (

        <Photo src={photo} />
    )
}