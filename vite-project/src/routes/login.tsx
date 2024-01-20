import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Error, Input, Switcher, Wrapper, Form1, Form2, Img, MiddleText, Divlayout } from "../components/auth-components";
import GithubButton from "../components/login-sns-button";
import PasswordReset from "../components/password-reset";



export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
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
            <Form1>
                <Form2><Img src="/bint2.svg" /></Form2>
                <Divlayout>
                    <MiddleText>Login</MiddleText>
                    <Form onSubmit={onSubmit}>
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
                            value={isLoading ? "Loading..." : "Login"}
                        />
                        <GithubButton />
                    </Form>
                    {error !== "" ? <Error>{error}</Error> : null}
                    <Switcher>
                        Don't have an account ? <Link to="/createaccount" style={{ textDecoration: "none" }}> <br></br>Create one &rarr;</Link>
                    </Switcher>
                    <PasswordReset />
                </Divlayout>
            </Form1>
        </Wrapper >
    );
}