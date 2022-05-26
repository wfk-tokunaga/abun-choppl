// Event listener for when somebody clicks the add composition button

async function addCompositionListener(event) {
    event.preventDefault();
    // const pieceInfo = {
    //     title: document.querySelector('input[name="composition-title"]').value.trim(),
    //     length: document.querySelector('input[name="composition-length"]').value.trim(),
    //     date: document.querySelector('input[name="composition-date"]').value.trim(),
    //     score_url: document.querySelector('input[name="composition-score_url"]').value.trim(),
    //     recording_url: document.querySelector('input[name="composition-recording_url"]').value.trim(),
    //     // THis part will be a bit tricky
    //     instrument_ids: document.querySelector('input[name="composition-instruments"]').value.trim(),
    // };
    const title = document.querySelector('input[name="composition-title"]').value.trim();
    const length = document.querySelector('input[name="composition-length"]').value.trim();
    const date = document.querySelector('input[name="composition-date"]').value.trim();
    var score_url = document.querySelector('input[name="composition-score_url"]').value.trim();
    var recording_url = document.querySelector('input[name="composition-recording_url"]').value.trim();
    // THis part will be a bit tricky
    const instrumentIds = [];
    // const instrument_ids = document.querySelector('input[name="composition-instruments"]').value.trim();


    console.log("\n\nscore_url: " + score_url, recording_url)
        // console.log('\n==========\n' + JSON.stringify(pieceInfo));
        // Make an api call 
    if (!(title && length)) {
        // Tell the user they have to have it
        console.log('Must have a title and text');
        return;
    }
    if (!score_url) {
        score_url = null;
    }
    if (!recording_url) {
        recording_url = null;
    }
    const response = await fetch('/api/compositions', {
        method: 'POST',
        // The reason I don't need the user_id is because the POST route gets it from the session in the request, not the body!
        body: JSON.stringify({
            title,
            length,
            date,
            score_url,
            recording_url,
            // Have to make this into an array
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

document.querySelector('.new-composition-form').addEventListener('submit', addCompositionListener);


// async function newFormHandler(event) {
//     event.preventDefault();

//     const title = document.querySelector('input[name="composition-title"]').value.trim();
//     const composition_url = document.querySelector('input[name="composition-url"]').value.trim();

//     console.log(title, composition_url);
//     const response = await fetch(`/api/compositions`, {
//         method: 'POST',
//         // The reason I don't need the user_id is because the POST route gets it from the session in the request, not the body!
//         body: JSON.stringify({
//             title,
//             composition_url
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.new-composition-form').addEventListener('submit', newFormHandler);