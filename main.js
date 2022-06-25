const buttonCat = document.querySelector('#cats button');
const buttonDog = document.querySelector('#dogs button');
const dogSelection = document.querySelector("#selectDog");

buttonCat.addEventListener('click', changePet);
buttonDog.addEventListener('click', changePet);

async function changePet(e) {
    const imgDog = document.querySelector('#dogs .pet-img');
    const imgCat = document.querySelector('#cats .pet-img');

    if (e.target.className === "dog") {
        const newDog = await getNewDog();
        imgDog.src = newDog.message;
    } else if (e.target.className === "cat") {
        const newCat = await getNewCat();
        imgCat.src = newCat[0].url;
    } else {
        const newDog = await getNewDog();
        imgDog.src = newDog.message;
        const newCat = await getNewCat();
        imgCat.src = newCat[0].url;
    }
} 

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

async function getNewDog(){
    return await fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json());
}

addEventListener("DOMContentLoaded", changePet);
document.addEventListener("DOMContentLoaded", async ()=> {
    const dogList = await fetch(" https://dog.ceo/api/breeds/list/all")
    .then(response => response.json());
    console.log(dogList.message);
    for(let arrays in dogList.message) {
        console.log(arrays);
        let option = document.createElement("option");
        option.textContent = arrays;
        option.value = arrays;
        dogSelection.appendChild(option);
    }
});