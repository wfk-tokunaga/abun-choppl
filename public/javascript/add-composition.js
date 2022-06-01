// Event listener for when somebody clicks the add composition button

// Get all instruments
// window.onload = async function loadInstrumentChoices(event) {
//     const instrumentListEl = document.querySelector('#instrument-choices');
//     const response = await fetch('/api/instruments');
//     const dbInstrumentData = await response.json();
//     dbInstrumentData.map(instrumentInfo => {
//         const instrumentInfoEl = document.createElement('option');
//         instrumentInfoEl.value = instrumentInfo.name;
//         instrumentListEl.append(instrumentInfoEl);
//     })
// }

async function addCompositionListener(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="composition-title"]').value.trim();
    const length = document.querySelector('input[name="composition-length"]').value.trim();
    const date = document.querySelector('input[name="composition-date"]').value.trim();
    var score_url = document.querySelector('input[name="composition-score_url"]').value.trim();
    var recording_url = document.querySelector('input[name="composition-recording_url"]').value.trim();
    
    // Our form will return a list of instruments by name I think
    const instrumentIds = [];

    // Should fetch ids of instruments from names? Nah, let's make this more simple.

    const selectedInstruments = document.querySelector('input[name="composition-instruments"]').value.trim();
    const instrumentId = selectedInstruments.split(':')[0];
    console.log(instrumentId);
    instrumentIds.push(parseInt(instrumentId));

    // console.log(selectedInstruments.getAttribute("data-instrument-id"));
    // Can we attach the id to the element?
    // const instrument_ids = document.querySelector('input[name="composition-instruments"]').value.trim();

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
        // document.location.replace('/dashboard');
    } else {
        console.log('Something went wrong');
        alert(response.statusText);
    }
}

document.querySelector('.new-composition-form').addEventListener('submit', addCompositionListener);