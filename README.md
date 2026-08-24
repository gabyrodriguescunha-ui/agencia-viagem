# Sakura Trip — Agência de Viagens para o Japão

Aplicação web desenvolvida em Angular para simular uma agência especializada em viagens temáticas para o Japão.

O projeto reúne uma área pública para consulta e reserva de roteiros e uma área administrativa para gerenciamento de reservas, roteiros, funcionários e informações financeiras.

## Acesse o projeto

🔗 [Visualizar Sakura Trip](https://sakura-trip.netlify.app/)

## Funcionalidades

### Área pública

- Página inicial de apresentação da agência;
- Listagem dos roteiros disponíveis;
- Cards com informações resumidas das viagens;
- Página de detalhes de cada roteiro;
- Exibição de destino, duração, preço, datas e vagas;
- Itinerário e serviços incluídos;
- Formulário para realização de reservas;
- Seleção da data da viagem;
- Escolha da quantidade de viajantes;
- Cálculo automático do valor total;
- Pagamento por Pix, boleto ou cartão;
- Parcelamento em até 12 vezes;
- Validação dos dados do viajante;
- Página institucional sobre a agência.

### Área administrativa

- Dashboard com indicadores;
- Visualização de reservas pendentes e confirmadas;
- Cálculo do faturamento das reservas confirmadas;
- Listagem das reservas mais recentes;
- Confirmação, cancelamento e exclusão de reservas;
- Cadastro e edição de roteiros;
- Exclusão de roteiros;
- Controle de vagas e informações das viagens;
- Cadastro e edição de funcionários;
- Alteração da situação entre ativo e inativo;
- Exclusão de funcionários;
- Página de acompanhamento financeiro.

## Roteiros disponíveis

A aplicação possui inicialmente três experiências:

- **Tóquio Otaku:** passeio por Akihabara, cafés temáticos e lojas de mangás e colecionáveis;
- **Japão em Cena:** visita a locais que inspiraram cenários de animes;
- **Mundos Temáticos:** roteiro por parques, museus e atrações da cultura pop japonesa.

## Validações da reserva

O formulário de reserva utiliza Reactive Forms e possui validações para:

- Data da viagem obrigatória;
- Quantidade mínima e máxima de viajantes;
- Nome com no mínimo três caracteres;
- CPF contendo 11 números;
- E-mail em formato válido;
- Telefone contendo 10 ou 11 números;
- Forma de pagamento obrigatória;
- Parcelamento entre 1 e 12 vezes.

Toda nova reserva é criada inicialmente com o status **Pendente**.

## Persistência de dados

Os dados da aplicação são armazenados no `localStorage` do navegador.

São armazenados localmente:

- Reservas;
- Roteiros;
- Funcionários;
- Status das reservas;
- Alterações realizadas pela área administrativa.

> Como o projeto não possui um back-end integrado, os dados permanecem somente no navegador em que foram cadastrados.

## Tecnologias

- Angular 22;
- TypeScript;
- HTML;
- CSS;
- Angular Router;
- Angular Signals;
- Reactive Forms;
- RxJS;
- LocalStorage;
- Vitest;
- Git e GitHub;
- Netlify.

## Conceitos aplicados

- Componentes standalone;
- Componentização da interface;
- Navegação com Angular Router;
- Rotas dinâmicas com parâmetros;
- Formulários reativos;
- Validação de formulários;
- Gerenciamento de estado com Signals;
- Serviços Angular;
- Interfaces TypeScript;
- Persistência com LocalStorage;
- Operações de cadastro, edição e exclusão;
- Cálculos dinâmicos;
- Layout responsivo;
- Testes unitários.

## Rotas da aplicação

| Rota | Página |
|---|---|
| `/` | Página inicial |
| `/roteiros` | Lista de roteiros |
| `/roteiros/:id` | Detalhes do roteiro |
| `/reserva/:id` | Formulário de reserva |
| `/sobre` | Sobre a agência |
| `/admin/dashboard` | Dashboard administrativo |
| `/admin/reservas` | Gerenciamento de reservas |
| `/admin/roteiros` | Gerenciamento de roteiros |
| `/admin/financeiro` | Controle financeiro |
| `/admin/funcionarios` | Gerenciamento de funcionários |

## Estrutura do projeto

```text
src/app/
├── components/
│   ├── cabecalho/
│   ├── card-roteiro/
│   ├── petalas/
│   └── rodape/
├── models/
│   ├── funcionario.ts
│   ├── reserva.ts
│   └── roteiro.ts
├── pages/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── financeiro/
│   │   ├── funcionarios/
│   │   ├── gerenciar-roteiros/
│   │   ├── menu-admin/
│   │   └── reservas/
│   ├── detalhes-roteiro/
│   ├── inicio/
│   ├── reserva/
│   ├── roteiros/
│   └── sobre/
├── services/
│   ├── funcionario.service.ts
│   ├── reserva.service.ts
│   └── roteiro.service.ts
├── app.config.ts
├── app.routes.ts
└── app.ts
```

## Como executar o projeto

### Pré-requisitos

Antes de começar, tenha instalado:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/gabyrodriguescunha-ui/agencia-viagem.git
```

Entre na pasta:

```bash
cd agencia-viagem
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Acesse no navegador:

```text
http://localhost:4200
```

## Como executar os testes

Execute os testes uma única vez:

```bash
npm test -- --watch=false
```

Para manter os testes em execução durante as alterações:

```bash
npm test
```

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos compilados serão armazenados na pasta `dist/`.

## Responsividade

A interface foi desenvolvida para se adaptar a computadores, tablets e celulares.

Os cards, formulários, tabelas e elementos de navegação são reorganizados de acordo com o tamanho da tela, mantendo a identidade visual inspirada no Japão.

## Observação

Este é um projeto educacional. As viagens, valores, reservas, funcionários e informações financeiras são fictícios e utilizados apenas para demonstrar o funcionamento da aplicação.

## Autora

Desenvolvido por **Gabriela Rodrigues**.

- [Portfólio](https://portfolio-gabriela-rodrigues.netlify.app/)
- [GitHub](https://github.com/gabyrodriguescunha-ui)
- [LinkedIn](https://www.linkedin.com/in/gabriela-rodrigues-b7289119a/)
