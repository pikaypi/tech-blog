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