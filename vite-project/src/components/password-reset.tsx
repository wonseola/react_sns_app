import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import Modal from "react-modal"
import styled from 'styled-components';

export const Switcher = styled.span`
margin-top:20px;
color:darkslategray;

a{
    color : #769FCD;
    cursor: pointer;
}
`;
export const Input = styled.input`
  padding: 5px 10px;
  margin-top:5px;
  border:none;
  border-bottom: 2px solid #EEEEEE;
  width: 90%;
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

export const ModalBtn = styled.a`

`

export const Span = styled.h3`
  font-weight: 400;
  color: #000000;
  font-size:15px;
  text-align:center;
  display:flex;
  flex-direction:center;
  margin:10px;
 `;

export const Span2 = styled.h3`
font-weight: 600;
color: #000000;
font-size:20px;
text-align:center;
position:absolute;
top:20px;
left:20px;
`;


const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 400px;

  
`;

export const Form = styled.form`
  /* margin-top: 50px; */
  margin-bottom:10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  justify-content:center;
  align-items:center;
`;

const ModalContainer = styled.div`

`;

const Cancel = styled.img`
width:20px;
height:20px;
float:right;
margin:20px;
&:hover{
    cursor: pointer;
}
    
`



export default function PasswordReset() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isEmailRegistered = await (inputValue);

        if (isEmailRegistered) {
            try {
                await sendPasswordResetEmail(auth, inputValue);
                setMessage("이메일로 비밀번호 초기화 링크를 보냈어요! 확인해보세요~");
                navigate('/login');
            } catch (error) {
                console.error(error);
                setMessage("메일주소가 틀린거같은딩,, 다시 시도해주세요.");
            }
        } else {
            setMessage("잘못된 주소입니다. 다시 입력 해주세용.");
        }
    };


    return (

        <Switcher>
            <Switcher>
                I forgot my password!🥲
                <ModalBtn onClick={() => { setModalIsOpen(true) }}>
                    <br></br>Find password &rarr;
                </ModalBtn>
            </Switcher>


            <ModalContainer>
                <Modal isOpen={modalIsOpen} style={{
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        overflow: 'visible',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}>
                    <Wrapper>
                        <Span2>🧸 비밀번호 찾기</Span2>
                        <Cancel onClick={() => { setModalIsOpen(false) }} src="/cancel.svg" />


                        <Form onSubmit={handleSubmit}>
                            <Input type="text" value={inputValue} onChange={handleInputChange} placeholder='Input your Email' />
                            <Input type="submit" value="인증 메일 전송하기" />
                        </Form>
                        <Span>
                            {message}
                        </Span>
                    </Wrapper>
                </Modal>
            </ModalContainer>
        </Switcher>
    );
}
