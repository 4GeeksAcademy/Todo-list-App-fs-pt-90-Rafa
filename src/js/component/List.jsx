import React, { useEffect, useState } from "react";

const List = () => {

    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);


    //CREATE USER
    const createUser = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Rafa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });
            if (!response.ok) {
                throw new Error("Respuesta not ok");
            }
            // const data = await response.json();
        }
        catch (err) {
            console.error("Error al crear usuario", err.message);
        }
    };


    // ADD TASK BY PRESSING ENTER FUNCTION
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const newTodo = { label: task, is_done: false };
            const updatedTodos = [...todos, newTodo];
            const response = await fetch('https://playground.4geeks.com/todo/todos/Rafa', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });
            setTodos(updatedTodos);
            setTask("");
            console.log(updatedTodos);
        };
    };

    // GETTODOS FUNCTION
    const getTodos = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/Rafa');
        if (!response.ok) {
            console.log("failed"), createUser();
        }
        const data = await response.json();
        setTodos(data.todos);
    };


    //     USE EFFECT
    useEffect(() => {
        getTodos();
    }, []);


    // DELETE TODOS FUNCTION
    const deleteTodos = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Respuesta not ok");
            }
            getTodos();
        } catch (err) {
            console.error("Todo not deleted", err.message);
        }
    };

    return (<div>
        <h1 className="container">My Todos</h1>
        <input type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <ul>
            {todos.map((todo, index) => {
                return (
                    <li key={index} id="tasks">
                        {todo.label}
                        <i className="fa-solid fa-circle-minus"
                            onClick={() => deleteTodos(todo.id)}></i></li>)
            })
            }
        </ul>
    </div>
    );
};

export default List;