import styled from "styled-components";
import { auth, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Name = styled.span`
  font-size: 22px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  opacity:1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:5px;
  padding:5px;
  border: 2px outset #2667C6;

  &:hover{
    opacity:0.7;
    &::after {
      content: 'Edit';
      position:absolute;
      color: #434242;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const Div = styled.div`
    
`

const AvatarImg = styled.img`
  object-fit: fill;
  width: 100%;
  border-radius:5px;
  height: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
export default function Myprofile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };
    return (
        <Div>
            <AvatarUpload htmlFor="avatar">
                {avatar ? (
                    <>
                        <AvatarImg src={avatar} />
                    </>
                ) : <AvatarImg src="bint2.svg" />}
            </AvatarUpload>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <Name>{user?.displayName ?? "Anonymous"}</Name>
        </Div>
    )
}