# TrigonoMind - O Segredo dos Triângulos 📐✨

Uma plataforma educacional interativa de alto impacto visual desenvolvida para desmistificar a **Trigonometria no Triângulo Retângulo** para alunos do 9º ano do Ensino Fundamental.

Este projeto está preparado para hospedagem direta no GitHub Pages no repositório [AulaJovemTec-Geometria](https://github.com/zolhos/AulaJovemTec-Geometria.git).

---

## 👤 Autoria e Proposta
*   **Autor e Idealizador:** Diego Gonçalves
*   **Proposta da Experiência:**
    Muitas vezes, a trigonometria é introduzida nas escolas como um conjunto rígido de fórmulas e tabelas abstratas para decorar. A proposta do **TrigonoMind** é inverter essa lógica, oferecendo uma experiência imersiva e responsiva onde o aluno pode **tocar, interagir e visualizar** a matemática em movimento.
    
    Unindo um design moderno (**Glassmorphic Theme**) com tecnologias web leves e rápidas, o projeto permite que os estudantes compreendam:
    1.  **A relatividade dos catetos:** Que um lado não é "oposto" ou "adjacente" por natureza, mas sim dependendo do olhar (ângulo $\alpha$ ou $\beta$).
    2.  **O dinamismo das razões trigonométricas:** Como o Seno, Cosseno e a Tangente crescem e diminuem de forma síncrona conforme mudamos a inclinação de uma rampa ou triângulo.
    3.  **A origem geométrica dos ângulos notáveis:** Demonstrando visualmente como os valores mágicos de $30^\circ$, $45^\circ$ e $60^\circ$ derivam da diagonal de um quadrado ou da altura de um triângulo equilátero.
    4.  **A aplicação prática:** Resolução interativa de problemas cotidianos (como altura de antenas, voos de pipa e rampas acessíveis) seguidos de um quiz gamificado para autoavaliação.

---

## 🛠️ Recursos Técnicos e Tecnologias
Para garantir um carregamento instantâneo em redes escolares e celulares de baixo desempenho, a aplicação foi construída com tecnologias nativas:
*   **HTML5 Estrutural & Semântico:** Pronto para mecanismos de busca e leitores de acessibilidade.
*   **CSS3 Vanilla (Mobile-First):** Layouts fluidos usando CSS Grid e Flexbox, tipografia moderna (Outfit e Inter do Google Fonts) e efeitos de vidro translúcido (`backdrop-filter`).
*   **JavaScript ES6+ (Sem dependências pesadas):** Controla as interações, estados e o motor matemático.
*   **SVG Vetorial Dinâmico:** Usado para desenhar os triângulos e o círculo trigonométrico, garantindo que as imagens escalem perfeitamente em telas de celulares pequenos sem perder nitidez.
*   **KaTeX (CDN superleve):** Renderiza fórmulas e anotações em notação LaTeX profissional de forma extremamente veloz.

---

## 📱 Otimização Mobile
A interface foi projetada especificamente com foco nos smartphones dos alunos:
*   **Menu Drawer Lateral:** Oculto automaticamente em telas pequenas e acessível por um botão no topo.
*   **Áreas de Toque Expandidas:** Sliders e botões desenhados com altura mínima de 48px para facilitar o toque com o polegar.
*   **SVGs Autoadaptáveis:** Gráficos que mudam de proporção para caber em telas verticais de celulares.
*   **Carregamento Otimizado:** Sem bibliotecas robustas que exijam download excessivo de dados móveis.

---

## 🚀 Como Executar Localmente
Por ser uma aplicação de página única estática (SPA), você não precisa de nenhum compilador ou servidor complexo:
1.  Baixe ou clone este repositório.
2.  Abra o arquivo `index.html` em qualquer navegador (Chrome, Safari, Firefox, Edge).
3.  Para testar a experiência mobile no computador, use o Inspetor de Elementos do Navegador (F12) e ative a visualização em formato de celular.
