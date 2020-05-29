# Transformando seu website em chatbot - Meetup Itu Developers 30/05/2020

Olá! Esse repositório serve para compartilhar todos os arquivos que utilizei nas demos e apresentação de minha palestra no 6º Meetup Itu Developers, que ocorreu no dia 30/05/2020.

Explicarei brevemente cada um dos projetos para que, quem quiser, possa clonar e executar ou até mesmo construir um projeto semelhante do zero.

## Apresentação / Slides

O arquivo PDF da apresentação pode ser encontrado na pasta [Slides](Slides/).

## Projetos

**Atenção:** Todos os projetos foram criados utilizando .NET Core 3.1, para rodá-los em sua máquina, certifique-se de instalar [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download)

### Classes

Projeto construído utilizando o template de Class Library do .NET Core `dotnet new classlib`.

Nada mais é do que um projeto para armazenar todas as classes comuns utilizadas em todos os projetos, como as definições de `Destination` e `Trip`.

Não é necessário rodar esse projeto, uma vez que ele é utilizado apenas como referência nos projetos de API, Chatbot e Website.

### API

A API foi construída utilizando o template de WebAPI do .NET Core `dotnet new webapi`.

A API possui dois Controllers, um que gerencia a entidade `Destinations` e outro que gerencia a entidade `Trips`, com métodos GET, POST, PUT e DELETE para ambos (você pode consultar as rotas e parâmetros necessários dentro dos arquivos [DestinationController.cs](Api/Controllers/DestinationsController.cs) e [TripsController.cs](Api/Controllers/TripsController.cs)).

O projeto utiliza o [Entity Framework Core](https://docs.microsoft.com/pt-br/ef/core/) como O/RM (Object-relational mapper), fazendo conexão com um banco de dados [SQLite](https://www.sqlite.org/index.html), baseado em arquivo (esse arquivo se chama `database.db` e pode ser encontrado dentro da pasta Api).

#### Executando o projeto

Na pasta raíz do repositório, execute no seu terminal / cmd: `cd Api && dotnet run`

A aplicação deverá ser executada no endereço `https://localhost:5003`. 
Caso você já tenha algum outro serviço rodando nessa porta, basta alterar o arquivo [launchSettings.json](Api/Properties/launchSettings.json), mais especificamente a propriedade `"applicationUrl"`.

**Atenção:** A API deve estar rodando em todos os momentos para que os outros projetos, Website e/ou Chatbot, funcionem.

### Chatbot

O Chatbot foi construído utilizando o template de EchoBot para .NET Core CLI, disponível para [download aqui](https://github.com/microsoft/BotBuilder-Samples/tree/master/generators/dotnet-templates). Se você estiver rodando o Visual Studio 2019, é possível fazer o download da extensão .vsix com os templates no [Marketplace do Visual Studio](https://marketplace.visualstudio.com/items?itemName=BotBuilder.botbuilderv4).

O arquivo mais importante nesse projeto é o [Bot.cs](Chatbot/Bots/Bot.cs), que possui a classe Bot que implementa a classe [ActivityHandler](https://docs.microsoft.com/en-us/dotnet/api/microsoft.bot.builder.activityhandler?view=botbuilder-dotnet-stable), responsável por implementar diversos métodos que são chamados quando eventos são ocorridos, como por exemplo, quando o Bot recebe uma mensagem.

#### Executando o projeto

Na pasta raíz do repositório, execute no seu terminal / cmd: `cd Chatbot && dotnet run`

A aplicação deverá ser executada no endereço `http://localhost:3978`.

#### Testando o projeto

Você pode testar o chatbot, conectando o endereço onde o projeto está rodando no [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator/releases).

**Atenção:** não se esqueça de manter a API rodando para que o projeto funcione.

### Website

O Website foi construído utilizando o template de ASP.NET MVC + React `dotnet new react`.

A única coisa alterada do template, foi a adição do [TypeScript](https://www.typescriptlang.org/) (que é um superset de JavaScript, adicionando capacidades de linguagens tipadas, como C# e Java, ao JavaScript), que se integra muito bem com React.

O projeto é baseado no modelo MVC do ASP.NET, porém com todo o front-end da applicação sendo controlado por componentes de [React](https://pt-br.reactjs.org/).

#### Executando o projeto

*Ao rodar a aplicação pela primeira vez, executar no terminal / cmd o seguinte comando: `cd Website/ClientApp && npm i`*

Na pasta raíz do repositório, execute no seu terminal / cmd: `cd Website && dotnet run`

A aplicação deverá ser executada no endereço `https://localhost:5001`.

**Atenção:** é necessário ter o Noje.js + npm instalados para rodar esse projeto. Você pode fazer o [download aqui](https://nodejs.org/pt-br/download/).

**Atenção 2:** não se esqueça de manter a API rodando para que o projeto funcione.

## Outras pastas

### LUIS

Possui dois arquivos JSON, um deles é um exemplo de retorno de uma chamada ao serviço do [LUIS](https://luis.ai/), que foi utilizado para a criação da classe `LuisModel` no projeto Classes.

O outro é o app do LUIS exportado, caso você queira criar um projeto seu e utilizar o meu exemplo como modelo. Na criação do app no [portal do LUIS](https://luis.ai), basta selecionar a opção "Import as JSON" e selecionar esse arquivo.

### Images

Apesar um repositório de imagens utilizadas pelo Chatbot e pelo Website.

## Contato

Em caso de dúvidas, você pode me mandar um e-mail em [gmobrice@outlook.com](mailto:gmobrice@outlook.com)
