const titleEl = document.getElementById('title');
const messageEl = document.getElementById('message');
const postTypeEl = document.getElementById('post-type');
const formEl = document.getElementById('message-form');
const buttonGroupEl = document.getElementById('editor-button-group');
const postListEl = document.getElementById('post-container');

// Creates and renders the button for a new message
const renderNewPostForm = () => {
    // Remove any existing buttons on the form
    while (buttonGroupEl.firstChild) {
        buttonGroupEl.removeChild(buttonGroupEl.firstChild);
    }

    // Clear any text in the input fields
    titleEl.value = '';
    messageEl.value = '';

    // Set the post-type header
    postTypeEl.innerHTML = 'New Post';
    postTypeEl.setAttribute('style', 'color: blue');

    // Create the submit new post button
    const submitNewBtn = document.createElement('button');
    submitNewBtn.setAttribute('id', 'submit-new-btn');
    submitNewBtn.classList.add('btn', 'submit-new-btn');
    submitNewBtn.innerHTML = 'submit';

    // Append the button to the button group
    buttonGroupEl.append(submitNewBtn);

    // Replace the submit edit handler with the submit new handler
    formEl.removeEventListener('submit', submitEditHandler);
    formEl.addEventListener('submit', submitNewHandler);
};

// Creates and renders the buttons for editing an existing post
const renderEditPostForm = (post_id) => {
    while (buttonGroupEl.firstChild) {
        buttonGroupEl.removeChild(buttonGroupEl.firstChild);
    }

    // Set the post-type header
    postTypeEl.innerHTML = 'Edit Post';
    postTypeEl.setAttribute('style', 'color: #eaaa00');

    // Create submit-edit button
    const submitEditBtn = document.createElement('button');
    submitEditBtn.setAttribute('id', 'submit-edit-btn');
    submitEditBtn.classList.add('btn', 'submit-edit-btn');
    submitEditBtn.innerHTML = 'submit';

    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancel-btn');
    cancelBtn.classList.add('btn', 'cancel-btn');
    cancelBtn.innerHTML = 'cancel';

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', 'delete-btn');
    deleteBtn.setAttribute('data-post-id', `${post_id}`);
    deleteBtn.classList.add('btn', 'delete-btn');
    deleteBtn.innerHTML = 'delete';

    // Append the new buttons to the button group
    buttonGroupEl.append(submitEditBtn);
    buttonGroupEl.append(cancelBtn);
    buttonGroupEl.append(deleteBtn);

    // Replace submit new post event listener with submit edit post event listener
    // and add post id to the form element dataset
    formEl.removeEventListener('submit', submitNewHandler);
    formEl.addEventListener('submit', submitEditHandler);
    formEl.setAttribute('data-post-id', `${post_id}`);

    // Add cancel and delete button event listeners
    cancelBtn.addEventListener('click', cancelButtonHandler);
    deleteBtn.addEventListener('click', deletePostHandler);
};

// Button handler to load a post into the post editor
const editPostButtonHandler = async (event) => {
    // Get the id of the post from the html element
    const post_id = event.target.getAttribute('data-post-id');

    // Call the API and store the post data in an object
    const postData = await fetch(`/api/posts/${post_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());

    // Render the edit post form
    titleEl.value = postData.title
    messageEl.value = postData.text
    renderEditPostForm(post_id);
};

// Button handler to reset the form while editing a post
const cancelButtonHandler = (event) => {
    event.preventDefault();
    renderNewPostForm();
};

// Form handler to submit a new post to the database
const submitNewHandler = async (event) => {
    // Create an object to pass as the API req.body
    const newPost = {
        user_id: event.target.getAttribute('data-user-id'),
        title: titleEl.value.trim(),
        text: messageEl.value.trim()
    };

    // POST request to the server
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        renderNewPostForm();
    } else {
        alert(response.statusText);
    }
};

// Form handler to submit edits to an existing post
const submitEditHandler = async (event) => {
    // Unlike submitting a new post, the dashboard does not need  
    // to reload to properly display when a post is edited 
    event.preventDefault();

    // Collect the post_id stored in the form element's dataset
    const post_id = event.target.getAttribute('data-post-id');

    // Create an object to pass the new values into the API request body
    const postData = {
        title: titleEl.value.trim(),
        text: messageEl.value.trim()
    };

    // PUT request to the server to add the post to the database
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        renderNewPostForm();
    } else {
        alert(response.statusText);
    }
};

// Form handler to delete a post from the database
const deletePostHandler = async (event) => {
    // Collect the post_id stored in the form element's dataset
    const post_id = event.target.getAttribute('data-post-id');
    console.log('post_id:', post_id);
    // DELETE request to the server to delete the post from the database
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        renderNewPostForm();
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

const editButtons = document.getElementsByClassName('edit-btn');
for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', editPostButtonHandler);
}

// By default, the editor will load to the new post setting
renderNewPostForm();