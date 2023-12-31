import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Layout from "./components/layout";
import Profile from "./routes/profile";
import Home from "./routes/home";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> }
    ]
  },

  { path: "/login", element: <Login /> },
  { path: "/createaccount", element: <CreateAccount /> }
]);


const GlobalStyles = createGlobalStyle`
${reset}; 
* {box-sizing: border-box;}
body{
background-color:black;
color:white;
font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
height:100vh;
display:flex;
justify-content:center;
`;


function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  }
  useEffect(() => {
    init();
  }, []);

  return <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : < RouterProvider router={router} />}
  </Wrapper>;
}

export default App
