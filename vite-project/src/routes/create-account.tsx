import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Error, Input, Switcher, Title, Wrapper, Form1, Img, Form2, MiddleText, Divlayout } from "../components/auth-components";
import GithubButton from "../components/login-sns-button";



export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <Title>FxStreet</Title>

            <Form1>

                <Form2><Img src="/1.svg" /></Form2>
                <Divlayout>
                    <MiddleText>Join In</MiddleText>
                    <Form onSubmit={onSubmit}>
                        <Input
                            onChange={onChange}
                            name="name"
                            value={name}
                            placeholder="Name"
                            type="text"
                            required
                        />
                        <Input
                            onChange={onChange}
                            name="email"
                            value={email}
                            placeholder="Email"
                            type="email"
                            required
                        />
                        <Input
                            onChange={onChange}
                            value={password}
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <Input
                            type="submit"
                            value={isLoading ? "Loading..." : "Create Account"}
                        />
                    </Form>
                    {error !== "" ? <Error>{error}</Error> : null}
                    <GithubButton />

                    <Switcher>
                        Already have an account ?{" "}
                        <br></br>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Login &rarr;
                        </Link>

                    </Switcher>
                </Divlayout>
            </Form1>
        </Wrapper >
    );
}