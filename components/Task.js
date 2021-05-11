import styled from 'styled-components';
import {useCollection} from 'react-firebase-hooks/firestore';
import {db, auth} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

const Task = ({completed, title, dataKey}) => {
    const [user] = useAuthState(auth);

    const makeCompleted = () => {
        db.collection('tasks').doc(user.uid).collection('userTasks').doc(dataKey).set({
            completed:!completed,
        }, {merge:true});
    }

    const deleteTask = () => {
        db.collection('tasks').doc(user.uid).collection('userTasks').doc(dataKey).delete();
    }

    return(
        <Container className={`${completed ? 'completed' : ''} task`}>
            <button className="check" onClick={makeCompleted}>
                <img src="/images/icon-check.svg" alt="check"/>
            </button>
            <p>{title}</p>
            <button onClick={deleteTask} className="delete">
                <img src="/images/icon-cross.svg" alt="delete"/>
            </button>
        </Container>
    );
}

export default Task;

const Container = styled.div`
    display:flex;
    align-items:center;
    background-color:#FFF;
    border-top-right-radius:5px;
    border-top-left-radius:5px;
    width:80%;
    padding:10px 15px;
    border-bottom:1px solid  hsl(233, 11%, 84%);
    overflow:hidden;
    button {
        cursor:pointer;
        &.check {
            width:20px;
            height:20px;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            margin:0;
            margin-right:10px;
            background:transparent;
            border-radius:50%;
            border:1px solid hsl(236, 33%, 92%);
            img {
                display:none;
            }
        }
        &.delete {
            background:none;
            border:none;
            outline:none;
            margin-left:auto;
        }
    }
    p {
        color:hsl(235, 19%, 35%);
        font-size:13px;
    }
    &.completed {
        .check {
            background:linear-gradient(to right bottom,#8348da,#809ff9);
            img {
                display:initial;
            }
        }
        p {
                text-decoration:line-through;
        }
    }
    @media(min-width:767px) {
        width:50%;
        p {
            font-size:16px;
        }
    }
`;