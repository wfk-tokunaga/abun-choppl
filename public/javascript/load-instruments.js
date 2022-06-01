// Get all instruments
window.onload = async function loadInstrumentChoices(event) {
    const instrumentListEl = document.querySelector('#instrument-choices');
    const response = await fetch('/api/instruments');
    const dbInstrumentData = await response.json();
    dbInstrumentData.map(instrumentInfo => {
        const instrumentInfoEl = document.createElement('option');
        console.log(instrumentInfo);
        instrumentInfoEl.value = `${instrumentInfo.id}: ${instrumentInfo.name}`;
        instrumentListEl.append(instrumentInfoEl);
    })
}
