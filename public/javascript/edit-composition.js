// Event listener for when somebody submits the edit post form
async function editFormHandler(event) {
    console.log('===== Edit Composition Form Submitted =====');
    event.preventDefault();

    const title = document.querySelector('textarea[name="new-title"]').value.trim();
    const length = document.querySelector('textarea[name="new-length"]').value.trim();
    const date = document.querySelector('textarea[name="new-date"]').value.trim();
    var score_url = document.querySelector('textarea[name="new-score_url"]').value.trim();
    var recording_url = document.querySelector('textarea[name="new-recording_url"]').value.trim();
    // THis part will be a bit tricky
    const instrumentIds = [];

    console.log("\n\nscore_url: " + score_url, recording_url)
    if (!(title && length)) {
        // Tell the user they have to have it
        alert('Must have a title and length');
        return;
    }
    if (!score_url) {
        score_url = null;
    }
    if (!recording_url) {
        recording_url = null;
    }

    if (!title || !length) {
        // Tell the user they have to have it
        console.log('Must have a title and text');
        return;
    }

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Make an api call
    const response = await fetch(`/api/compositions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            length,
            date,
            score_url,
            recording_url,
            instrumentIds
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log('Something went wrong');
        alert(response.statusText);
    }
}

document.querySelector('.edit-composition-form').addEventListener('submit', editFormHandler);