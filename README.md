Article Extractor and Summarizer
Esta aplicação React foi criada para resumir artigos, utilizando a API Article Extractor and Summarizer da OpenAI acessível através do RapidAPI. A aplicação permite que os usuários insiram um URL de artigo, e automaticamente gera e exibe um resumo.

Funcionalidades
Entrada de URL: O usuário pode inserir ou colar o URL de um artigo na interface da aplicação para obter o resumo.
Resumo Automático: Ao submeter o URL, a aplicação chama a API Article Extractor and Summarizer para gerar o resumo.
Armazenamento Local: A aplicação mantém uma lista de artigos já resumidos usando o armazenamento do navegador. Se um artigo for selecionado novamente, o resumo será carregado a partir do armazenamento, evitando chamadas desnecessárias à API.
Tratamento de Erros: A aplicação trata erros da API, como URLs inválidas ou não encontradas, exibindo uma mensagem adequada para o usuário.
Tecnologias Utilizadas
React: Framework JavaScript para construção da interface de usuário.
Tailwind CSS: Framework CSS para estilização.
API Article Extractor and Summarizer (OpenAI): API utilizada para gerar resumos dos artigos.
RapidAPI: Plataforma que fornece acesso à API.
Local Storage: Para salvar e recuperar artigos já resumidos.
