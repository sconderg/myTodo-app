import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {auth,db} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';

const Header = () => {
    const [user] = useAuthState(auth);
    const inputRef = useRef('');
    const themeRef = useRef();
    const [userSnapshot] = useCollection(db.collection('users').where('email', '==', user.email));
    const changeTheme = (e) => {
        document.body.classList.toggle('dark');

        if(document.body.classList.contains('dark')) {
            themeRef.current.innerHTML =  `<img src='/images/icon-sun.svg' alt="sun" />`
            db.collection('users').doc(user.uid).set({
                theme:'dark'
            }, {merge:true});
        } else {
            themeRef.current.innerHTML =  `<img src='/images/icon-moon.svg' alt="moon" />`
            db.collection('users').doc(user.uid).set({
                theme:'light'
            }, {merge:true});
        }
    }
    const addTodo = async (e) => {
        e.preventDefault();
        db.collection('tasks').doc(user.uid).collection('userTasks').add({
            title:inputRef.current.value,
            completed:false
        });

        inputRef.current.value = '';
    }
    const userSS = userSnapshot?.docs?.[0]?.data();
    useEffect(() => {
        if(userSS?.theme === 'dark') {
            document.body.classList.add('dark');
            themeRef.current.innerHTML =  `<img src='/images/icon-moon.svg' alt="moon" />`
        }
    }, [userSS?.theme])
    return (
        <Container className="header">
            <div className="up">
                <h1 onClick={() => auth.signOut()}>todo</h1>
                <button className="btn-theme" onClick={changeTheme} ref={themeRef}>
                    <img src='/images/icon-moon.svg' alt="moon" />
                </button>
            </div>
            <InputContainer className="inputContainer">
                <button type="submit" onClick={addTodo}></button>
                <input placeholder="Create a new todo..." type="text" ref={inputRef} />
            </InputContainer>
        </Container>
    );
}

export default Header;

const Container  = styled.div`
    background:url('../images/bg-mobile-light.jpg') no-repeat;
    background-size:cover;
    height:30vh;
    padding:40px 15px;
    display:flex;
    align-items:center;
    flex-direction:column;
    .up {
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        h1 {
            font-size:2em;
            letter-spacing:15px;
            text-transform:uppercase;
            color:#FFF;
            margin:0;
            cursor:pointer;
        }
        .btn-theme {
            background:none;
            border:none;
            cursor:pointer;
            outline:none;
        }
        @media(min-width:767px) {
            width:50%;
        }
    }
    @media(min-width:767px) {
        background-image:url('../images/bg-desktop-light.jpg');
    }
`;

const InputContainer = styled.form`
    display:flex;
    align-items:center;
    margin-top:2em;
    background-color:#FFF;
    border-radius:5px;
    width:80%;
    padding:15px;
    button {
        width:20px;
        height:20px;
        margin:0;
        cursor:pointer;
        margin-right:10px;
        background:transparent;
        border-radius:50%;
        border:1px solid hsl(236, 33%, 92%);
    }
    input {
        flex:1;
        border:0;
        outline:none;
        background:none;
        ::placeholder {
            color:hsl(236, 9%, 61%);
        }
    }
    @media(min-width:767px) {
        width:50%;
    }
`;