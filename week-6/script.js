// Function to add a new todo item
function addTodo() {
    let input = document.getElementById('todo-input');
    let taskText = input.value.trim();
    
    // Check if user entered an empty text
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    
    let list = document.getElementById('todo-list');
    
    // Create li element
    let li = document.createElement('li');
    
    // Create span for task text
    let span = document.createElement('span');
    span.innerText = taskText;
    
    // Toggle completion when clicking the text
    span.onclick = function() {
        span.classList.toggle('completed-task');
    };
    
    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    
    // Remove task when delete button is clicked
    deleteBtn.onclick = function() {
        list.removeChild(li);
    };
    
    // Append text span and delete button to the li element
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // Append li to the main list
    list.appendChild(li);
    
    // Clear input field for the next entry
    input.value = "";
}

// Add event listener to allow pressing Enter key to add task
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
