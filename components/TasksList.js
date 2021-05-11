import styled from 'styled-components';
import Task from './Task';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from '../firebase';
import { useState } from 'react';

const TasksList = () => {
    const [user] = useAuthState(auth);
    const [tasksSort, setTasksSort] = useState('all');
    const [completedSnapshot] = useCollection(db.collection('tasks').doc(user.uid).collection('userTasks').where('completed', '==', true));
    const [tasksSnapshot] = tasksSort === 'all' ? useCollection(db.collection('tasks').doc(user.uid).collection('userTasks')) : tasksSort === 'active' ?  useCollection(db.collection('tasks').doc(user.uid).collection('userTasks').where('completed', '==', false)) : useCollection(db.collection('tasks').doc(user.uid).collection('userTasks').where('completed', '==', true));

    const showTasks = () => {
        if(tasksSnapshot) {
            return tasksSnapshot.docs.map(task => (
                <Task dataKey={task.id} key={task.id} title={task.data().title}  completed={task.data().completed} />
            ))
        }
    }

    const clearCompleted = () => {
        let x = confirm('are you sure you want to delete all completed tasks ?');
        if(x) {
            completedSnapshot.forEach(task => db.collection('tasks').doc(user.uid).collection('userTasks').doc(task.id).delete());
        }  else {
            return 0;
        }
    }

    document.querySelectorAll('.shuffleButtons button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.shuffleButtons button').forEach(btn => btn.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    return (
        <Container>
            {showTasks()}
            <div className="info">
                <p className="tasks-count">
                    {tasksSnapshot?.docs?.length} items left
                </p>
                <div className="shuffleButtons">
                    <button className="all selected" onClick={() => setTasksSort('all')}>All</button>
                    <button className="active" onClick={() => setTasksSort('active')}>Active</button>
                    <button className="completed" onClick={() => setTasksSort('com-pleted')}>Completed</button>
                </div>
                <button onClick={clearCompleted} className="clear-completed">
                    Clear Completed
                </button>
            </div>
            <ShuffleButtons className="shuffleButtons">
                <button className="all selected" onClick={() => setTasksSort('all')}>All</button>
                <button className="active" onClick={() => setTasksSort('active')}>Active</button>
                <button className="completed" onClick={() => setTasksSort('com-pleted')}>Completed</button>
            </ShuffleButtons>
            <p>Drag and drop to reorder list</p>
        </Container>
    );
}

export default TasksList;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top:-20px;
    padding:0 15px;
    .info {
        display:flex;
        background-color:#FFF;
        border-bottom-left-radius:5px;
        border-bottom-right-radius:5px;
        justify-content:space-between;
        align-items:center;
        width:80%;
        padding:15px;
        .shuffleButtons {
            display:flex;
            justify-content:space-evenly;
            align-items:center;
            @media(max-width:767px) {
                display:none;
            }
            button {
                color:hsl(236, 9%, 61%);
                outline:none;
                border:none;
                font-size:16px;
                font-weight:bold;
                background:none;
                cursor:pointer;
                transition:all ease-in-out 0.3s;
                &.selected {
                    color:hsl(220, 98%, 61%) !important;
                }
            }
        }
        p {
            color:hsl(236, 9%, 61%);
        }
        .clear-completed {
            color:hsl(236, 9%, 61%);
            border:none;
            outline:none;
            background:none;
            cursor:pointer;
        }
        @media(min-width:767px) {
            width:50%;
        }
    }
    > p {
        font-size:15px;
        color:hsl(236, 9%, 61%);
        margin-top:30px;
    }
`;

const ShuffleButtons = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    background-color:white;
    width:80%;
    margin-top:20px;
    border-radius:5px;
    padding:15px;
    button {
        color:hsl(236, 9%, 61%);
        outline:none;
        border:none;
        font-size:16px;
        font-weight:bold;
        background:none;
        cursor:pointer;
        transition:all ease-in-out 0.3s;
        &.selected {
            color:hsl(220, 98%, 61%);
        }
    }
    @media(min-width:767px) {
        display:none;
    }
`;
