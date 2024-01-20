import { styled, keyframes } from "styled-components";



export const Wrapper = styled.div`
   height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin: 0 auto;
  background-color:white;
  height:600px;
  margin:auto;
  /* border-radius:75% 25% 39% 61% / 47% 43% 57% 53% ; */
  border-radius:4%;
  box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.1);
  padding: 0px 40px;
`;

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
`;

export const Img = styled.img`
  width: 400px;
  animation: ${bounce} 0.8s infinite;
`;

export const MiddleText = styled.h3`
  color:black;
  font-size:2vmax;
  font-weight:800;
  position:relative;
  top:30px;

`



export const Logo = styled.img`
width : 100%;
height:100px;
`


export const Form = styled.form`
  margin-top: 50px;
  margin-bottom:10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Divlayout = styled.div`
  margin-top: 50px;
  margin-bottom:10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;



export const Form2 = styled.div`
  display: flex;
  width: 100%;
  flex-direction:column;
`;

export const Form1 = styled.div`
  margin-bottom:10px;
  display: flex;
  flex-direction:row;
  gap: 10px;
  justify-content:center;
  align-items:center;
`;

export const Input = styled.input`
  padding: 5px 10px;
  /* border-radius: 30%; */
  margin-top:5px;
  border:none;
  border-bottom: 2px solid #EEEEEE;
;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: transparent;
  &:focus{
    outline:none;
    border-color:#2667C6;
;
  }
  &[type="submit"] {
    /* background-color:white; */
    background-color:#2667C6;
    color:white;
    border-radius:30px;
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

export const SubTitle = styled.text`
font-size:14px;
`



