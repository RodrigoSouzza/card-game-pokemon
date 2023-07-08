async function pokeApi(pokemon){
    const url = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const dados = await url.json()
    return dados
}

function gerarAtaque(){
    let minimo = 10
    let maximo = 100
    let ataque = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
    return ataque
}

function gerarVida(){
    let minimo = 30
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
    ataquePokemon.innerHTML = `Attack: ${gerarAtaque()}/100`
    vidaPokemon.innerHTML = `Life: ${gerarVida()}/100`    
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']    
}

function criaListaCartas() {
    const listaCartas = document.getElementById('lista_pokemons')
  
    for (let indice = 1; indice < 601; indice++) {
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

      const botao = document.createElement('button')
      botao.className = 'selecionar'
      botao.textContent = '+' 
      botao.addEventListener('click', adicionar)
  
      texto.appendChild(nome)
      texto.appendChild(numero)      
      texto.appendChild(tipo)      
      texto.appendChild(ataque)
      texto.appendChild(vida) 
      texto.appendChild(botao)

      carta.appendChild(imagem)
      carta.appendChild(texto)

      listaCartas.appendChild(carta)
  
      criaCarta(indice, carta)
    }
}

criaListaCartas()

function adicionar(event){
    const cartaSelecionada = event.target.parentNode.parentNode

    if(cartaSelecionada.classList.contains('selecionada')){
        removerSeleção(cartaSelecionada)
        return
    }   

    const timePokemon = document.getElementById('time_pokemon')

    const cartaClonada = cartaSelecionada.cloneNode(true)

    const botao = cartaClonada.querySelector('.selecionar')    
    
    botao.parentNode.removeChild(botao)
    cartaSelecionada.classList.add('selecionada')

    const botaoExcluir = document.createElement('button')
    botaoExcluir.className = 'excluir'
    botaoExcluir.textContent = '-'
    botaoExcluir.addEventListener('click', function(){
        removerSeleção(cartaClonada)
    })
    cartaClonada.querySelector('.carta_texto').appendChild(botaoExcluir)
    timePokemon.appendChild(cartaClonada)    
}

function removerSeleção(carta){
    const timePokemon = document.getElementById('time_pokemon')
    
    timePokemon.removeChild(carta)

    const cartaOriginalId = carta.id.replace('carta_','')
    const cartaOriginal = document.getElementById(`carta_${cartaOriginalId}`)
    cartaOriginal.classList.remove('selecionada')
}