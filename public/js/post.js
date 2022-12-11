const commentEl = document.getElementById('comment');
const formEl = document.getElementById('comment-form');

// Submit handler for new comment
const submitNewComment = async (event) => {
    event.preventDefault();

    // Create a new object to pass as the API req.body
    const newComment = {
        user_id: event.target.getAttribute('data-user-id'),
        post_id: event.target.getAttribute('data-post-id'),
        text: commentEl.value.trim()
    };

    // POST request to the server
    const response = await fetch(`/api/posts/${newComment.post_id}`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

formEl.addEventListener('submit', submitNewComment);