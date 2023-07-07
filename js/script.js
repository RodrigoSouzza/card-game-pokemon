const imagemPokemon = document.querySelector('.imagem')
const nomePokemon = document.querySelector('.nome')
const idPokemon = document.querySelector('.numero')
const tipoPokemon = document.querySelector('.tipo')
const ataquePokemon = document.querySelector('.ataque')
const vidaPokemon = document.querySelector('.vida')

async function pokeApi(pokemon){
    const url = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const dados = await url.json()
    return dados
}

function gerarAtaque(){
    return Math.floor(Math.random() * 91) + 10
}

function gerarVida(){
    let minimo = 50
    let maximo = 100
    let vida = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
    return vida
}

async function criaCarta(pokemon){

    const data = await pokeApi(pokemon)

    nomePokemon.innerHTML = data.name
    idPokemon.innerHTML = data.id
    tipoPokemon.innerHTML = `Type: ${data.types[0].type.name}`                        
    ataquePokemon.innerHTML = `Attack: ${gerarAtaque()}`
    vidaPokemon.innerHTML = `Life: ${gerarVida()}`    
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
}

function numeroAleatorio(){
    return Math.floor(Math.random() * 247) +1
}

criaCarta(numeroAleatorio())



