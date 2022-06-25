const button = document.querySelector('button');

button.addEventListener('click', async ()=>{
    const img = document.querySelector('img');
    const newCat = await getNewCat();
    console.log(newCat);
    img.src = newCat[0].url;
});

async function getNewCat(){
    return await fetch('https://api.thecatapi.com/v1/images/search?size=full', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/html; charset=UTF-8',
            'x-api-key': '139c3eb9-f0d6-4b3e-9e2e-fdc465aa1ee3'
          },
        mode: 'cors'
    })
    .then(response => response.json());
}

