function switchUnits(unitType) {
    updateURLParameter('unitType', unitType);
    location.reload();
}

function updateURLParameter(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.replaceState({}, document.title, url.href);
}
