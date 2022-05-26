// Event listener for when somebody clicks the delete composition button
async function deleteCompositionListener(event) {
    event.preventDefault();

    const composition_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Make an api call 
    const response = await fetch(`/api/compositions/${composition_id}`, {
        method: 'DELETE',
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

document.querySelector('#delete-composition-btn').addEventListener('click', deleteCompositionListener);