# BuscaPoke

Aplicação web que consome dados em tempo real da [PokeAPI](https://pokeapi.co) para exibir informações de pokémons, com busca por nome, layout responsivo em Grid e Flexbox, e interface construída com Tailwind CSS.

## Demonstração

* **Página publicada:** https://darkianerocha.github.io/BuscaPoke/
* **Repositório:** https://github.com/Darkiane22/BuscaPoke.git

##Documentação

* **ChekList:** https://docs.google.com/document/d/1G5Hq3iev76s0xYMLNUjQ1Joer3o-A0Y9woEIksirdmE/edit?usp=sharing

## Funcionalidades

* Consumo de dados via `fetch()` a partir de uma API pública, com tratamento de erros e estado de carregamento.
* Busca de pokémon específico pelo nome.
* Botão para restaurar a listagem completa.
* Painel de estatísticas (total de pokémons, tipos diferentes e status da API).
* Layout responsivo utilizando **CSS Grid** para a estrutura geral das seções e **Flexbox** para alinhamento interno dos componentes.
* Interface construída inteiramente com **Tailwind CSS**, sem CSS customizado adicional.

## Tecnologias utilizadas

| Tecnologia             | Uso no projeto                                          |
| ---------------------- | ------------------------------------------------------- |
| HTML5                  | Estrutura semântica da página                           |
| Tailwind CSS           | Estilização, responsividade e componentes visuais       |
| JavaScript (Fetch API) | Consumo de dados da PokeAPI                             |
| CSS Grid               | Organização das seções e do grid de cartões de pokémons |
| Flexbox                | Alinhamento de itens dentro dos cartões e do cabeçalho  |

## Estrutura do projeto

```text
├── index.html      # Estrutura da página e layout
├── script.js       # Lógica de consumo da API e renderização
└── README.md       # Documentação do projeto
```

## Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/Darkiane22/BuscaPoke.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd BuscaPoke
   ```

3. Abra o arquivo `index.html` diretamente no navegador ou utilize uma extensão como o **Live Server**.


## API utilizada

* **Nome:** PokeAPI
* **Endpoint de listagem:** `https://pokeapi.co/api/v2/pokemon?limit=24`
* **Endpoint de busca:** `https://pokeapi.co/api/v2/pokemon/{nome}`
* **Documentação:** https://pokeapi.co/docs/v2

## Finalidade

Projeto desenvolvido para fins acadêmicos, com o objetivo de demonstrar conhecimentos em HTML5, JavaScript, Tailwind CSS, CSS Grid, Flexbox, consumo de APIs com Fetch e versionamento utilizando Git e GitHub.
