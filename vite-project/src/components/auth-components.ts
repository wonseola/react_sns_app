import { styled } from "styled-components";




export const Wrapper = styled.div`
   height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin: 0 auto;
  background-color:#DBE2EF;
  height:600px;
  margin:auto;
  border-radius:20px;
  box-shadow: 5px 5px 0px rgba(63, 114, 175, 0.7);
  padding: 0px 40px;
`;

export const Img = styled.img`
  width:300px;
  justify-content:center;
`


export const Title = styled.h1`
  font-size: 42px;
  color:black;
`;
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom:10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Form1 = styled.form`
  margin-bottom:10px;
  display: flex;
  flex-direction:row;
  gap: 10px;
  justify-content:center;
  align-items:center;
`;

export const Input = styled.input`
  padding: 5px 10px;
  /* border-radius: 20px; */
  margin-top:5px;
  border:none;
  border-bottom: 2px solid white;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: transparent;
  &:focus{
    outline:none;
    border-color: #769FCD;
  }
  &[type="submit"] {
    background-color:white;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Error = styled.span`
  font-weight: 600;
  color: tomato;
 `;

export const Switcher = styled.span`
margin-top:20px;
color:darkslategray;

a{
    color : #769FCD;
}
`;


export const Span = styled.h3`
  font-weight: 600;
  color: white;
  font-size:20px;
  text-align:center;
  display:flex;
  flex-direction:center;
  margin:10px;
 `;

