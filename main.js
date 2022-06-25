const buttonCat = document.querySelector('#cats button');
const buttonDog = document.querySelector('#dogs button');
const dogSelection = document.querySelector("#select-dog");
let DogList;

buttonCat.addEventListener('click', changePet);
buttonDog.addEventListener('click', changePet);

async function changePet(e) {
    const imgDog = document.querySelector('#dogs .pet-img');
    const imgCat = document.querySelector('#cats .pet-img');

    if (e.target.className === "dog") {
        let newDog;
        try {
            const subBreed = document.querySelector("#subselect-dog");
            newDog = await getNewDog(dogSelection.value, subBreed.value);
        } catch (e) {
            console.log("Sub-breed not found");
            newDog = await getNewDog(dogSelection.value);
        }
        imgDog.src = newDog.message;
    } else if (e.target.className === "cat") {
        const newCat = await getNewCat();
        imgCat.src = newCat[0].url;
    } else {
        const newDog = await getNewDog("random");
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

async function getNewDog(breed, subbreed = "none"){
    if(breed === "random") return await fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json());
    else {
        let FORMATTED_URL;
        if(subbreed !== "none") FORMATTED_URL = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`;
        else FORMATTED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;

        return await fetch(FORMATTED_URL)
        .then(response => response.json());
    }
}

addEventListener("DOMContentLoaded", changePet);
document.addEventListener("DOMContentLoaded", async ()=> {
    
    dogList = await fetch(" https://dog.ceo/api/breeds/list/all")
    .then(response => response.json());

    let randomOption = document.createElement("option");
    randomOption.textContent = "random";
    randomOption.value = "random";
    dogSelection.appendChild(randomOption);

    for(let arrays in dogList.message) {
        let option = document.createElement("option");
        option.textContent = arrays;
        option.value = arrays;
        dogSelection.appendChild(option);
    }
});

dogSelection.addEventListener('change', ()=>{
    const verifyArray = dogList.message[dogSelection.value];
    const selectBreed =  document.querySelector("#selectBreed");

    if(selectBreed.children.length > 1) {
        selectBreed.removeChild(selectBreed.children[1]);
    }
    if(verifyArray.length > 0) {
        const subSelect = document.createElement("select");
        subSelect.id = "subselect-dog";
        verifyArray.forEach(n=>{
            const subOption = document.createElement("option");
            subOption.textContent = n;
            subOption.value = n;
            subSelect.append(subOption);
        });
        selectBreed.appendChild(subSelect);
    }
})