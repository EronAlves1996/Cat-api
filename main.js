const button = document.querySelector('button');

button.addEventListener('click', ()=>{
    const img = document.querySelector('img');
    const newCat = getNewCat();
    img.src = newCat.url;
});

async function getNewCat(){
    await fetch('https://thatcopy.pw/catapi/rest/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(json => JSON.parse(json));
}

