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
  width: 200px;
  animation: ${bounce} 0.8s infinite;
`;

export const MiddleText = styled.h3`
  color:black;
  font-size:2vmax;
  font-weight:800;
  position:relative;
  top:30px;

`



export const Title = styled.h1`
  font-size: 7vmax;
  color:rgb(8,193,134);
  font-weight:400;
  font-family:'Black Han Sans',sans-serif;
  font-style:italic;
  text-shadow: 5px 5px 2px rgba(0, 0, 0, 0.1);
  /* text-align:center; */
  position:relative;
  top:10px;

`;


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
    border-color:rgb(8,193,134);
;
  }
  &[type="submit"] {
    /* background-color:white; */
    background-color:rgb(8,193,134);
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



