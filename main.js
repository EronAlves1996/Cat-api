const button = document.querySelector('button');

button.addEventListener('click', ()=>{
    const img = document.querySelector('img');
    const newCat = getNewCat();
    img.src = newCat.url;
});

async function getNewCat(){
    const thisHeaders = new Headers();
    thisHeaders.append('content-type', 'text/html');
    thisHeaders.append('referrer-policy', 'same-origin');
    await fetch('https://api.thecatapi.com/v1/images/search?size=full', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/html; charset=UTF-8',
            'x-api-key': '139c3eb9-f0d6-4b3e-9e2e-fdc465aa1ee3'
          },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(json => JSON.parse(json));
}

