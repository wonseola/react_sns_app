import { styled } from 'styled-components';
import { Form, useNavigate } from 'react-router-dom';
import { Input, Span, Switcher, Wrapper } from './auth-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const Button = styled.span`
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  width: 100%;
  color: black;
  border: 0;
  margin-top: 50px;
  display: flex;
  gap: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export default function PasswordReset() {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isEmailRegistered = await (inputValue);

        if (isEmailRegistered) {
            try {
                await sendPasswordResetEmail(auth, inputValue);
                setMessage("이메일에 비밀번호 초기화 링크를 보냈어요! 확인해보세요~");
                navigate('/login');
            } catch (error) {
                console.error(error);
                setMessage("비밀번호 초기화 이메일 보내기에 실패했습니다. 다시 시도해주세요.");
            }
        } else {
            setMessage("가입되지 않은 이메일입니다. 다시 확인해주세요.");
        }
    };




    const onClick = async () => {
        try {
            navigate('/login');
            handleOpenPopup();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Wrapper>
            <Button onClick={isPopupOpen ? handleClosePopup : onClick} >{isPopupOpen ? "close" : "Forgot Password !!!! 🥲"}</Button>
            {isPopupOpen && (
                <Switcher>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" value={inputValue} onChange={handleInputChange} placeholder='Input your Email' />
                        <Input type="submit" value="인증 메일 전송하기" />
                    </Form>

                    <Span>
                        {message}
                    </Span>
                </Switcher>
            )}
        </Wrapper>
    );
}
