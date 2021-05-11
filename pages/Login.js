import Head from 'next/head';
import styled from 'styled-components';
import {auth, provider} from '../firebase';

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <>
        <Head>
            <title>myTodo App - Login</title>
        </Head>
        <Container>
            <h1>Welcome to myTodo App</h1>
            <p>Your way to orgranize your day.</p>
            <Button onClick={signIn}>Login in with Google</Button>
        </Container>
        </>
    );
}

export default Login;

const Container = styled.div`
    width:50%;
    height:500px;
    background-color:whitesmoke;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:15px;
    text-align:center;
    h1 {
        margin:0;
    }
    p {
        color:gray;
    }
    @media (max-width:767px) {
        width:100%;
    } 
`;
const Button = styled.button`
    background-color:black;
    border:none;
    outline:none;
    cursor: pointer;
    padding:1em;
    font-size:1rem;
    border-radius:15px;
    color:whitesmoke;
`;