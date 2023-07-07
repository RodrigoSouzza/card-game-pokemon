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

async function criaCarta(pokemon, carta){

    const data = await pokeApi(pokemon)

    const nomePokemon = carta.querySelector('.nome')
    const idPokemon = carta.querySelector('.numero')
    const tipoPokemon = carta.querySelector('.tipo')
    const ataquePokemon = carta.querySelector('.ataque')
    const vidaPokemon = carta.querySelector('.vida')
    const imagemPokemon = carta.querySelector('.imagem')

    nomePokemon.innerHTML = data.name
    idPokemon.innerHTML = data.id
    tipoPokemon.innerHTML = `Type: ${data.types[0].type.name}`                        
    ataquePokemon.innerHTML = `Attack: ${gerarAtaque()}`
    vidaPokemon.innerHTML = `Life: ${gerarVida()}`    
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']    
}

function criaListaCartas() {
    const listaCartas = document.getElementById('lista_pokemons')
  
    for (let indice = 1; indice < 9; indice++) {
      const carta = document.createElement('div')
      carta.className = 'carta'
      carta.id = `carta_${indice}`
  
      const imagem = document.createElement('div')
      imagem.className = 'carta_imagem'
      const img = document.createElement('img')
      img.className = 'imagem'
      img.alt = 'imagem do pokemon'
      imagem.appendChild(img)
  
      const texto = document.createElement('div')
      texto.className = 'carta_texto'
      const nome = document.createElement('h1')
      nome.className = 'nome'
      const numero = document.createElement('p')
      numero.className = 'numero'      
      const tipo = document.createElement('p')
      tipo.className = 'tipo'
      const ataque = document.createElement('p')
      ataque.className = 'ataque'
      const vida = document.createElement('p')
      vida.className = 'vida'     
  
      texto.appendChild(nome)
      texto.appendChild(numero)      
      texto.appendChild(tipo)      
      texto.appendChild(ataque)
      texto.appendChild(vida) 

      carta.appendChild(imagem)
      carta.appendChild(texto)

      listaCartas.appendChild(carta)
  
      criaCarta(indice, carta)
    }
}

criaListaCartas()
