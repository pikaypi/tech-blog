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
}

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
    deleteBtn.setAttribute('data-post-id', `${post_id}`)
    deleteBtn.classList.add('btn', 'delete-btn');
    deleteBtn.innerHTML = 'delete'

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
}