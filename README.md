# Audio to Text 🎤➡️📝

Este projeto é uma aplicação frontend que converte arquivos de áudio em texto utilizando inteligência artificial com a API Whisper da OpenAI.

## 🚀 Tecnologias Utilizadas

- **[ReactJS](https://reactjs.org/)**: Biblioteca JavaScript para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida e eficiente.
- **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS para estilização moderna.
- **[ShadCN UI](https://shadcn.dev/)**: Biblioteca para componentes UI acessíveis e elegantes.
- **[OpenAI Whisper API](https://platform.openai.com/)**: API de transcrição de áudio baseada em inteligência artificial.
- **Git**: Controle de versão para desenvolvimento colaborativo.

## 📝 Funcionalidades

- **Transcrição de Áudio**: Faça upload de arquivos MP3 e obtenha o texto transcrito em segundos.
- **Cópia Fácil**: Copie o texto gerado para a área de transferência com um clique.
- **Feedback Visual**: Indicadores de carregamento para garantir uma boa experiência ao usuário.
- **Interface Responsiva**: Compatível com dispositivos móveis e desktops.

## 🛠️ Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/viniciusnreno/audio-to-text.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd audio-to-text
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a variável de ambiente para a API Key da OpenAI:

   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     VITE_OPENAI_API_KEY=YOUR_API_KEY
     ```
     Substitua `YOUR_API_KEY` pela sua chave da OpenAI.

5. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse a aplicação em: [http://localhost:5173](http://localhost:5173)

## 🌐 Link Hospedado

Acesse a versão online do projeto: [https://audiotranscriber.vercel.app/](https://audiotranscriber.vercel.app/)

## 🌟 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias ou correções.

---

💡 Desenvolvido por [Vinícius N. Renó](https://viniciusreno.vercel.app/).
