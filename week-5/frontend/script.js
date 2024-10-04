const apiUrl = "http://localhost:3000/api";

function checkForToken() {
    const token = localStorage.getItem('token');
    if (token) {
        loadTodos();
        document.getElementById('auth').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
    } else {
        document.getElementById('todo-section').style.display = 'none';
    }
}

checkForToken();

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        document.getElementById('auth').style.display = 'none';
        loadTodos();
        document.getElementById('todo-section').style.display = 'block';
    } else {
        console.log("Login failed");
    }
});

document.getElementById('signup-form').addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch(`${apiUrl}/users/signup`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({name, email, password})
    });

    if (response.ok) {
        console.log('Signup successful! You can now log in.');
    } else {
        console.log('Signup failed');
    }
});

document.getElementById("todo-form").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const todoInput = document.getElementById('todo-input').value;
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${apiUrl}/todos/`, {
        method: "POST",
        headers : ({
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }),
        body : JSON.stringify({todo : todoInput})
    });

    if (response.ok) {
        loadTodos(); // Reload todos after adding
        document.getElementById('todo-input').value = ''; // Clear input
    } else {
        console.log('Failed to add todo');
    }
});

async function loadTodos() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/todos/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const todos = await response.json();
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = ''; // Clear existing todos

        todos.forEach(todo => {
            const li = document.createElement('li');

            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.done; // Set checked state based on the todo's status
            checkbox.addEventListener('change', async () => {
                const updatedTodo = {
                    done: checkbox.checked // Update status based on checkbox
                };

                const updateResponse = await fetch(`${apiUrl}/todos/${todo._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedTodo)
                });

                if (updateResponse.ok) {
                    // Optionally, reload todos to reflect changes
                    loadTodos();
                } else {
                    alert('Failed to update todo status');
                }
            });

            if (todo.done) {
                li.style.textDecoration = 'line-through';
            }

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(todo.todo));
            todoList.appendChild(li);
        });
    }
}

document.getElementById("logout").addEventListener("click", async (e) =>{
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/users/logout`, {
        method :"POST",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });

    if(response.ok){
        localStorage.removeItem("token");
        location.reload();
    }else{
    }
})