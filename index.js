document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. GERAL - NAVEGAÇÃO E CONTROLE DE MENUS
     ========================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');

  // Função para navegar entre as seções
  window.navigateTo = function(sectionId) {
    // Esconde todas as seções e remove a classe ativa dos links
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Mostra a seção ativa
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Marca o link como ativo
    const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Fecha a barra lateral no celular
    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      const icon = menuToggle.querySelector('span');
      if (icon) icon.textContent = 'menu';
    }
  };

  // Listeners para os links da navegação
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      navigateTo(targetSection);
    });
  });

  // Toggle do menu mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      const icon = menuToggle.querySelector('span');
      if (icon) {
        icon.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
      }
    });
  }

  // Helper para acionar a renderização em lote usando Auto-Render
  window.autoRenderMath = function(element = document.body) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      } catch (err) {
        console.error("Erro Auto-Render:", err);
      }
    }
  };

  // Renderizar LaTeX em toda a página inicial de forma robusta contra lentidão da rede (polling)
  function runInitialMathRender() {
    if (window.renderMathInElement) {
      const senoFormula = document.getElementById('katex-seno');
      if (senoFormula) senoFormula.innerHTML = '$$\\text{sen}(\\theta) = \\frac{\\text{CO}}{\\text{H}}$$';
      
      const cossenoFormula = document.getElementById('katex-cosseno');
      if (cossenoFormula) cossenoFormula.innerHTML = '$$\\text{cos}(\\theta) = \\frac{\\text{CA}}{\\text{H}}$$';
      
      const tangenteFormula = document.getElementById('katex-tangente');
      if (tangenteFormula) tangenteFormula.innerHTML = '$$\\text{tg}(\\theta) = \\frac{\\text{CO}}{\\text{CA}}$$';

      autoRenderMath(document.body);
    } else {
      setTimeout(runInitialMathRender, 50);
    }
  }

  runInitialMathRender();


  /* ==========================================
     2. SEÇÃO 1: ELEMENTOS DO TRIÂNGULO (α vs β)
     ========================================== */
  const lineH = document.getElementById('line-h');
  const lineA = document.getElementById('line-a');
  const lineB = document.getElementById('line-b');
  const lblSideA = document.getElementById('lbl-side-a');
  const lblSideB = document.getElementById('lbl-side-b');
  const arcAlpha = document.getElementById('arc-alpha');
  const arcBeta = document.getElementById('arc-beta');
  const textAlpha = document.getElementById('text-alpha');
  const textBeta = document.getElementById('text-beta');
  const opArrow = document.getElementById('op-arrow');

  const cardH = document.getElementById('card-h');
  const cardCO = document.getElementById('card-co');
  const cardCA = document.getElementById('card-ca');

  const descCO = document.getElementById('desc-co');
  const descCA = document.getElementById('desc-ca');

  window.selectElementAngle = function(angleType) {
    const btnAlpha = document.getElementById('btn-alpha');
    const btnBeta = document.getElementById('btn-beta');

    if (angleType === 'alpha') {
      btnAlpha.classList.add('active');
      btnBeta.classList.remove('active');

      // Alpha Ativo (canto inferior esquerdo)
      arcAlpha.setAttribute('stroke-width', '5');
      arcAlpha.setAttribute('stroke', 'hsl(260, 95%, 65%)');
      arcBeta.setAttribute('stroke-width', '2');
      arcBeta.setAttribute('stroke', 'rgba(255,255,255,0.2)');
      textAlpha.setAttribute('fill', 'hsl(260, 95%, 65%)');
      textBeta.setAttribute('fill', 'rgba(255,255,255,0.4)');

      // Hipotenusa: Ciano
      lineH.setAttribute('stroke', 'var(--accent-cyan)');
      cardH.style.borderColor = 'var(--accent-cyan)';
      cardH.classList.add('active');

      // Cateto Oposto: Vertical (a) -> Rosa/Magenta
      lineA.setAttribute('stroke', 'var(--accent-magenta)');
      lblSideA.textContent = 'CATETO OPOSTO (a)';
      lblSideA.setAttribute('fill', 'var(--accent-magenta)');
      cardCO.style.borderColor = 'var(--accent-magenta)';
      cardCO.classList.add('active');
      descCO.innerHTML = 'Para o ângulo <strong>Alpha (α)</strong>, o Cateto Oposto é a altura vertical <strong>(BC)</strong>, que fica diretamente de frente para ele.';

      // Cateto Adjacente: Base (b) -> Roxo
      lineB.setAttribute('stroke', 'var(--accent-purple)');
      lblSideB.textContent = 'CATETO ADJACENTE (b)';
      lblSideB.setAttribute('fill', 'var(--accent-purple)');
      cardCA.style.borderColor = 'var(--accent-purple)';
      cardCA.classList.add('active');
      descCA.innerHTML = 'Para o ângulo <strong>Alpha (α)</strong>, o Cateto Adjacente é a base <strong>(AC)</strong> que serve de apoio, ajudando a formar o ângulo.';

      // Ajusta a seta para apontar para a altura (cateto oposto)
      opArrow.setAttribute('x1', '135');
      opArrow.setAttribute('y1', '285');
      opArrow.setAttribute('x2', '380');
      opArrow.setAttribute('y2', '200');
      opArrow.setAttribute('stroke', 'var(--accent-magenta)');

    } else {
      btnBeta.classList.add('active');
      btnAlpha.classList.remove('active');

      // Beta Ativo (canto superior direito)
      arcAlpha.setAttribute('stroke-width', '2');
      arcAlpha.setAttribute('stroke', 'rgba(255,255,255,0.2)');
      arcBeta.setAttribute('stroke-width', '5');
      arcBeta.setAttribute('stroke', 'hsl(320, 100%, 60%)');
      textAlpha.setAttribute('fill', 'rgba(255,255,255,0.4)');
      textBeta.setAttribute('fill', 'hsl(320, 100%, 60%)');

      // Hipotenusa: Ciano
      lineH.setAttribute('stroke', 'var(--accent-cyan)');
      cardH.style.borderColor = 'var(--accent-cyan)';
      cardH.classList.add('active');

      // Cateto Oposto: Horizontal (b) -> Rosa/Magenta
      lineB.setAttribute('stroke', 'var(--accent-magenta)');
      lblSideB.textContent = 'CATETO OPOSTO (b)';
      lblSideB.setAttribute('fill', 'var(--accent-magenta)');
      cardCO.style.borderColor = 'var(--accent-magenta)';
      cardCO.classList.add('active');
      descCO.innerHTML = 'Para o ângulo <strong>Beta (β)</strong>, o Cateto Oposto é o lado de base deitada <strong>(AC)</strong>, pois fica oposto (de frente) a ele.';

      // Cateto Adjacente: Vertical (a) -> Roxo
      lineA.setAttribute('stroke', 'var(--accent-purple)');
      lblSideA.textContent = 'CATETO ADJACENTE (a)';
      lblSideA.setAttribute('fill', 'var(--accent-purple)');
      cardCA.style.borderColor = 'var(--accent-purple)';
      cardCA.classList.add('active');
      descCA.innerHTML = 'Para o ângulo <strong>Beta (β)</strong>, o Cateto Adjacente é o lado em pé <strong>(BC)</strong>, que ajuda a formar o ângulo no topo do triângulo.';

      // Ajusta a seta para apontar para a base (cateto oposto)
      opArrow.setAttribute('x1', '375');
      opArrow.setAttribute('y1', '125');
      opArrow.setAttribute('x2', '250');
      opArrow.setAttribute('y2', '290');
      opArrow.setAttribute('stroke', 'var(--accent-magenta)');
    }
  };

  // Inicializar a Seção 1
  selectElementAngle('alpha');


  /* ==========================================
     3. SEÇÃO 2: SIMULADOR TRIGONOMÉTRICO
     ========================================== */
  const angleSlider = document.getElementById('angle-slider');
  const sliderValSpan = document.getElementById('slider-val');
  const simAxes = document.getElementById('sim-axes');
  const circleToggleText = document.getElementById('circle-toggle-text');
  const insightText = document.getElementById('insight-text');

  // Elementos do SVG do Simulador
  const lineCos = document.getElementById('line-cos');
  const lineSin = document.getElementById('line-sin');
  const lineHyp = document.getElementById('line-hyp');
  const lineTan = document.getElementById('line-tan');
  const simPoly = document.getElementById('sim-poly');
  const simAngleArc = document.getElementById('sim-angle-arc');
  const simHandle = document.getElementById('sim-handle');
  const simRightAngle = document.getElementById('sim-right-angle');

  const lblSimAngle = document.getElementById('lbl-sim-angle');
  const lblSimCos = document.getElementById('lbl-sim-cos');
  const lblSimSin = document.getElementById('lbl-sim-sin');
  const lblSimHyp = document.getElementById('lbl-sim-hyp');

  // Barras de progresso e textos de cálculo
  const barSen = document.getElementById('bar-sen');
  const barCos = document.getElementById('bar-cos');
  const barTan = document.getElementById('bar-tan');

  let currentSimMode = 'triangle'; // 'triangle' ou 'circle'

  window.toggleSimMode = function() {
    if (currentSimMode === 'triangle') {
      currentSimMode = 'circle';
      simAxes.setAttribute('opacity', '1');
      circleToggleText.textContent = 'Ocultar Círculo';
      lineTan.setAttribute('opacity', '0.7');
    } else {
      currentSimMode = 'triangle';
      simAxes.setAttribute('opacity', '0');
      circleToggleText.textContent = 'Ver Círculo Unitário';
      lineTan.setAttribute('opacity', '0');
    }
    updateSimulator();
  };

  function updateSimulator() {
    const angle = parseInt(angleSlider.value);
    sliderValSpan.textContent = angle;

    const rad = angle * Math.PI / 180;
    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    const tanVal = Math.tan(rad);

    // Configurações do Triângulo SVG
    const R = 200; // Raio/Hipotenusa fixo em 200 pixels
    const cx = 50;  // Centro inicial x
    const cy = 250; // Centro inicial y (chão)

    // Coordenadas calculadas
    const xc = cx + R * cosVal; // Coordenada do ângulo reto (x)
    const yc = cy;              // Coordenada do ângulo reto (y)
    const xb = cx + R * cosVal; // Topo (x)
    const yb = cy - R * sinVal; // Topo (y)

    // Atualiza elementos SVG principais
    lineCos.setAttribute('x1', cx);
    lineCos.setAttribute('y1', cy);
    lineCos.setAttribute('x2', xc);
    lineCos.setAttribute('y2', yc);

    lineSin.setAttribute('x1', xc);
    lineSin.setAttribute('y1', yc);
    lineSin.setAttribute('x2', xb);
    lineSin.setAttribute('y2', yb);

    lineHyp.setAttribute('x1', cx);
    lineHyp.setAttribute('y1', cy);
    lineHyp.setAttribute('x2', xb);
    lineHyp.setAttribute('y2', yb);

    simPoly.setAttribute('points', `${cx},${cy} ${xc},${yc} ${xb},${yb}`);
    simHandle.setAttribute('cx', xb);
    simHandle.setAttribute('cy', yb);

    // Ajusta o marcador de ângulo reto
    const size = 12;
    simRightAngle.setAttribute('d', `M ${xc - size},${yc} L ${xc - size},${yc - size} L ${xc},${yc - size}`);

    // Ajusta o arco do ângulo θ
    const arcRadius = 30;
    const arcX = cx + arcRadius * Math.cos(rad);
    const arcY = cy - arcRadius * Math.sin(rad);
    simAngleArc.setAttribute('d', `M ${cx + arcRadius},${cy} A ${arcRadius},${arcRadius} 0 0,0 ${arcX},${arcY}`);

    // Ajusta os rótulos de texto
    lblSimAngle.setAttribute('x', cx + 38);
    lblSimAngle.setAttribute('y', cy - 10);
    lblSimAngle.textContent = `${angle}°`;

    lblSimCos.setAttribute('x', cx + (R * cosVal) / 2);
    lblSimCos.setAttribute('y', cy + 20);
    lblSimCos.textContent = `CA = ${cosVal.toFixed(2)}`;

    lblSimSin.setAttribute('x', xc + 10);
    lblSimSin.setAttribute('y', cy - (R * sinVal) / 2);
    lblSimSin.textContent = `CO = ${sinVal.toFixed(2)}`;

    // Hipotenusa texto rotacionado
    const midX = cx + (R * cosVal) / 2;
    const midY = cy - (R * sinVal) / 2;
    lblSimHyp.setAttribute('x', midX);
    lblSimHyp.setAttribute('y', midY - 10);
    lblSimHyp.setAttribute('transform', `rotate(${-angle}, ${midX}, ${midY})`);

    // Linha da Tangente
    if (currentSimMode === 'circle') {
      // Tangente é traçada na linha vertical x = cx + R (raio unitário completo)
      const xtan = cx + R;
      const ytan = cy - R * tanVal;
      
      lineTan.setAttribute('x1', xtan);
      lineTan.setAttribute('y1', cy);
      lineTan.setAttribute('x2', xtan);
      lineTan.setAttribute('y2', ytan > -50 ? ytan : -50); // Capping para não sumir da tela
      lineTan.setAttribute('opacity', '0.7');
    } else {
      lineTan.setAttribute('opacity', '0');
    }

    // Atualiza barras de progresso do dashboard
    barSen.style.width = `${sinVal * 100}%`;
    barCos.style.width = `${cosVal * 100}%`;
    // Para tangente, como ela pode passar de 1, limitamos a barra visual a 100%
    barTan.style.width = `${Math.min(tanVal, 1.8) * 55}%`;

    // Atualiza equações dinâmicas via KaTeX
    const calcSen = document.getElementById('calc-sen');
    const calcCos = document.getElementById('calc-cos');
    const calcTan = document.getElementById('calc-tan');

    if (calcSen) calcSen.innerHTML = `$$\\text{sen}(${angle}^\\circ) = \\frac{${sinVal.toFixed(2)}}{1.00} = ${sinVal.toFixed(2)}$$`;
    if (calcCos) calcCos.innerHTML = `$$\\text{cos}(${angle}^\\circ) = \\frac{${cosVal.toFixed(2)}}{1.00} = ${cosVal.toFixed(2)}$$`;
    if (calcTan) calcTan.innerHTML = `$$\\text{tg}(${angle}^\\circ) = \\frac{${sinVal.toFixed(2)}}{${cosVal.toFixed(2)}} = ${tanVal.toFixed(2)}$$`;

    autoRenderMath(document.querySelector('.sim-dashboard'));

    // Insights pedagógicos baseados no ângulo
    if (angle < 30) {
      insightText.innerHTML = `Com apenas <strong>${angle}°</strong> de inclinação, a altura (Seno) é bem pequena e o Cosseno é muito próximo de 1. A rampa é suave, ideal para subidas sem esforço.`;
    } else if (angle >= 30 && angle <= 60) {
      insightText.innerHTML = `O ângulo de <strong>${angle}°</strong> equilibra as forças. À medida que você sobe, o Seno aumenta proporcionalmente ao encolhimento do Cosseno. A tangente é equilibrada.`;
    } else {
      insightText.innerHTML = `Com <strong>${angle}°</strong>, o triângulo ficou muito alto! O Seno é quase 1 e o Cosseno encolheu. A inclinação (tangente: <strong>${tanVal.toFixed(2)}</strong>) está extremamente íngreme.`;
    }
  }

  // Listener do Slider
  if (angleSlider) {
    angleSlider.addEventListener('input', updateSimulator);
    updateSimulator(); // Primeira execução
  }


  /* ==========================================
     4. SEÇÃO 3: TABELA DE ÂNGULOS NOTÁVEIS
     ========================================== */
  const tableCells = document.querySelectorAll('.trig-table td.hoverable');

  tableCells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      const angle = cell.getAttribute('data-angle');
      if (angle && angleSlider) {
        angleSlider.value = angle;
        updateSimulator();
        cell.classList.add('active-highlight');
      }
    });

    cell.addEventListener('mouseleave', () => {
      cell.classList.remove('active-highlight');
    });

    // Suporte para clique em celulares
    cell.addEventListener('click', () => {
      const angle = cell.getAttribute('data-angle');
      if (angle && angleSlider) {
        angleSlider.value = angle;
        updateSimulator();
        // Remove destaque das outras e coloca nesta
        tableCells.forEach(c => c.classList.remove('active-highlight'));
        cell.classList.add('active-highlight');
        // Rola até o simulador para visualização
        setTimeout(() => {
          navigateTo('simulador');
        }, 300);
      }
    });
  });

  // Toggles de Derivações Geométricas (Abas)
  window.switchDerivation = function(derivType, btn) {
    const tabs = document.querySelectorAll('.btn-tab');
    const content45 = document.getElementById('deriv-45');
    const content3060 = document.getElementById('deriv-30-60');

    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (derivType === '45') {
      content45.classList.remove('hidden');
      content3060.classList.add('hidden');
    } else {
      content45.classList.add('hidden');
      content3060.classList.remove('hidden');
    }
  };


  /* ==========================================
     5. SEÇÃO 4: EXERCÍCIOS RESOLVIDOS (DESAFIOS)
     ========================================== */
  const challenges = [
    {
      id: 1,
      badge: "Cotidiano • Alturas",
      title: "1. A Altura da Torre de Energia",
      statement: "Um técnico em telecomunicações está a uma distância de 40 metros de uma antena de celular. Ele usa um teodolito (instrumento para medir ângulos) e observa o ponto mais alto da torre sob um ângulo de 30°. Sabendo que a altura do instrumento é desprezível, qual é a altura aproximada da torre?",
      formula: "$$\\text{tg}(30^\\circ) = \\frac{\\text{Altura}}{\\text{Distância}}$$ ",
      illustration: `
        <svg viewBox="0 0 260 200">
          <!-- Ground line -->
          <line x1="10" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <!-- Tower -->
          <line x1="210" y1="180" x2="210" y2="40" stroke="var(--accent-purple)" stroke-width="4"/>
          <line x1="200" y1="180" x2="220" y2="180" stroke="var(--accent-purple)" stroke-width="2"/>
          <!-- Lattice structures on tower -->
          <path d="M 210,40 L 205,180 M 210,40 L 215,180 M 207,100 L 213,100" stroke="var(--accent-purple)" stroke-width="1.5" opacity="0.6"/>
          <!-- Observer line of sight -->
          <line x1="50" y1="180" x2="210" y2="40" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Angle arc -->
          <path d="M 80,180 A 30,30 0 0,0 76,157" fill="none" stroke="var(--accent-magenta)" stroke-width="2"/>
          <!-- Labels -->
          <text x="88" y="174" fill="var(--accent-magenta)" font-size="12" font-weight="bold">30°</text>
          <text x="130" y="195" fill="var(--text-secondary)" font-size="11" text-anchor="middle">40 metros</text>
          <text x="225" y="110" fill="var(--accent-purple)" font-size="12" font-weight="bold">h (Torre)</text>
          <!-- Eye icon representing observer -->
          <circle cx="50" cy="180" r="4" fill="#ffffff"/>
        </svg>
      `,
      steps: [
        "Primeiro, identificamos os elementos do triângulo formados na situação:",
        "O lado que queremos descobrir é a altura da torre, que em relação ao ângulo de 30° é o <strong>Cateto Oposto (CO)</strong>.",
        "A distância de 40 metros até a base da torre é o nosso <strong>Cateto Adjacente (CA)</strong>.",
        "A razão trigonométrica que relaciona Cateto Oposto e Cateto Adjacente é a <strong>Tangente</strong>: $\\text{tg}(30^\\circ) = \\frac{\\text{CO}}{\\text{CA}}$",
        "Substituímos os valores conhecidos na fórmula: $\\frac{\\sqrt{3}}{3} = \\frac{h}{40}$",
        "Multiplicando cruzado: $3 \\cdot h = 40\\sqrt{3} \\Rightarrow h = \\frac{40\\sqrt{3}}{3}$",
        "Considerando que $\\sqrt{3} \\approx 1.73$, temos: $h \\approx \\frac{40 \\cdot 1.73}{3} \\approx \\frac{69.2}{3} \\approx 23.1 \\text{ metros}$.",
        "<strong>Resposta:</strong> A altura da torre é de aproximadamente <strong>23,1 metros</strong>."
      ]
    },
    {
      id: 2,
      badge: "Diversão • Alturas",
      title: "2. O Voo Empolgante da Pipa",
      statement: "Lucas está brincando no parque em um dia ensolarado. Ele soltou toda a linha de seu carretel, totalizando 80 metros de fio. Devido ao vento forte, a linha fica totalmente esticada e faz um ângulo de 60° com a linha do horizonte. A que altura a pipa está voando acima das mãos de Lucas?",
      formula: "$$\\text{sen}(60^\\circ) = \\frac{\\text{Altura}}{\\text{Linha}}$$",
      illustration: `
        <svg viewBox="0 0 260 200">
          <line x1="10" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <!-- Line -->
          <line x1="40" y1="180" x2="190" y2="50" stroke="var(--accent-cyan)" stroke-width="3"/>
          <!-- Kite -->
          <polygon points="190,50 205,40 195,25 180,35" fill="var(--accent-magenta)" stroke="#fff" stroke-width="1"/>
          <line x1="190" y1="50" x2="198" y2="75" stroke="var(--accent-magenta)" stroke-width="1"/>
          <!-- Projection -->
          <line x1="190" y1="50" x2="190" y2="180" stroke="var(--accent-purple)" stroke-width="2" stroke-dasharray="4,4"/>
          <path d="M 70,180 A 30,30 0 0,0 60,163" fill="none" stroke="var(--accent-magenta)" stroke-width="2"/>
          <!-- Labels -->
          <text x="68" y="174" fill="var(--accent-magenta)" font-size="12" font-weight="bold">60°</text>
          <text x="105" y="105" fill="var(--accent-cyan)" font-size="11" font-weight="bold" transform="rotate(-40, 105, 105)">80 metros (H)</text>
          <text x="202" y="110" fill="var(--accent-purple)" font-size="12" font-weight="bold">h (Altura)</text>
          <circle cx="40" cy="180" r="4" fill="#ffffff"/>
        </svg>
      `,
      steps: [
        "Identificamos os lados com base no ângulo de 60°:",
        "O comprimento da linha esticada (80m) é a <strong>Hipotenusa (H)</strong> do triângulo.",
        "A altura que a pipa atinge em relação às mãos é o <strong>Cateto Oposto (CO)</strong>.",
        "A relação correta que usa CO e H é o <strong>Seno</strong>: $\\text{sen}(60^\\circ) = \\frac{\\text{CO}}{\\text{H}}$",
        "Substituindo os valores da nossa tabela de notáveis: $\\frac{\\sqrt{3}}{2} = \\frac{h}{80}$",
        "Isolamos a variável multiplicando cruzado: $2 \\cdot h = 80\\sqrt{3} \\Rightarrow h = 40\\sqrt{3}$",
        "Substituindo o valor aproximado da raiz: $h \\approx 40 \\cdot 1.73 \\approx 69.2 \\text{ metros}$.",
        "<strong>Resposta:</strong> A pipa está voando a aproximadamente <strong>69,2 metros</strong> de altura."
      ]
    },
    {
      id: 3,
      badge: "Inclusão • Rampas",
      title: "3. Rampa de Acessibilidade",
      statement: "Uma escola resolveu construir uma rampa metálica de acessibilidade para ligar o pátio a uma plataforma elevada de 2 metros de altura. Por regras de segurança para cadeirantes, a rampa deve ter uma inclinação máxima de 30° com o solo. Qual deve ser o comprimento da pista da rampa?",
      formula: "$$\\text{sen}(30^\\circ) = \\frac{\\text{Altura}}{\\text{Comprimento}}$$",
      illustration: `
        <svg viewBox="0 0 260 200">
          <line x1="10" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <!-- Ramp platform -->
          <rect x="200" y="120" width="40" height="60" fill="rgba(255,255,255,0.05)" stroke="var(--accent-purple)" stroke-width="2"/>
          <!-- Ramp track -->
          <line x1="40" y1="180" x2="200" y2="120" stroke="var(--accent-cyan)" stroke-width="4"/>
          <!-- Angle -->
          <path d="M 70,180 A 30,30 0 0,0 67,170" fill="none" stroke="var(--accent-magenta)" stroke-width="2"/>
          <!-- Labels -->
          <text x="73" y="176" fill="var(--accent-magenta)" font-size="12" font-weight="bold">30°</text>
          <text x="120" y="140" fill="var(--accent-cyan)" font-size="11" font-weight="bold" transform="rotate(-20, 120, 140)">d (Rampa)</text>
          <text x="215" y="100" fill="var(--accent-purple)" font-size="11" text-anchor="middle">Plataforma</text>
          <text x="215" y="150" fill="var(--accent-purple)" font-size="12" font-weight="bold" text-anchor="middle">2 m</text>
        </svg>
      `,
      steps: [
        "A rampa forma uma hipotenusa e a subida de 2m representa o cateto oposto ao ângulo:",
        "Altura da plataforma = 2m é o <strong>Cateto Oposto (CO)</strong>.",
        "O comprimento total da pista da rampa (d) é a <strong>Hipotenusa (H)</strong>.",
        "Usamos a fórmula do <strong>Seno</strong>: $\\text{sen}(30^\\circ) = \\frac{\\text{CO}}{\\text{H}}$",
        "Substituindo a razão de 30° da tabela: $\\frac{1}{2} = \\frac{2}{d}$",
        "Multiplicando cruzado: $d \\cdot 1 = 2 \\cdot 2 \\Rightarrow d = 4 \\text{ metros}$.",
        "<strong>Resposta:</strong> O comprimento da pista da rampa deve ser de exatamente <strong>4 metros</strong>."
      ]
    }
  ];

  function renderChallenges() {
    const listContainer = document.getElementById('challenges-list');
    if (!listContainer) return;

    listContainer.innerHTML = challenges.map((ch, idx) => `
      <div class="card desafio-card">
        <div class="desafio-info">
          <span class="badge desafio-badge">${ch.badge}</span>
          <h3>${ch.title}</h3>
          <p class="desafio-statement">${ch.statement}</p>
          <button class="btn btn-secondary btn-icon" onclick="toggleResolution(${ch.id}, this)">
            <span class="material-symbols-rounded">visibility</span>
            <span>Revelar Resolução Passo a Passo</span>
          </button>
        </div>
        <div class="desafio-illustration">
          ${ch.illustration}
        </div>
        <div class="resolution-wrapper" id="resolution-wrapper-${ch.id}">
          <div class="resolution-card">
            <h4>
              <span class="material-symbols-rounded">check_circle</span>
              Resolução Prática
            </h4>
            <p><strong>Fórmula Aplicada:</strong></p>
            <div class="katex-block">${ch.formula}</div>
            <ol>
              ${ch.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `).join('');

    // Renderiza toda a matemática do bloco
    autoRenderMath(listContainer);
  }

  window.toggleResolution = function(id, btn) {
    const resWrapper = document.getElementById(`resolution-wrapper-${id}`);
    const icon = btn.querySelector('span');
    const txt = btn.querySelector('span:nth-child(2)');

    if (resWrapper.classList.contains('visible')) {
      resWrapper.classList.remove('visible');
      if (icon) icon.textContent = 'visibility';
      if (txt) txt.textContent = 'Revelar Resolução Passo a Passo';
    } else {
      resWrapper.classList.add('visible');
      if (icon) icon.textContent = 'visibility_off';
      if (txt) txt.textContent = 'Ocultar Resolução';
    }
  };

  // Renderizar desafios ao iniciar
  renderChallenges();


  /* ==========================================
     6. SEÇÃO 6: QUIZ INTERATIVO
     ========================================== */
  const quizQuestions = [
    {
      id: 1,
      tag: "Fundamentos",
      question: "No triângulo retângulo, qual é a definição correta de Hipotenusa?",
      options: [
        "O menor cateto, colado ao ângulo de 90°.",
        "O lado oposto ao ângulo reto (90°), sendo sempre o maior lado do triângulo.",
        "Qualquer lado que fique na vertical.",
        "O lado que está vizinho ao ângulo reto mas na diagonal."
      ],
      correct: 1, // B
      explanation: "A Hipotenusa é, por definição fundamental, o lado localizado de frente (oposto) ao ângulo reto de $90^\\circ$. Em qualquer triângulo retângulo, a hipotenusa também será sempre o lado mais comprido."
    },
    {
      id: 2,
      tag: "Catetos",
      question: "Se estivermos no vértice A e definirmos o ângulo agudo α neste canto, quem será o 'Cateto Adjacente'?",
      options: [
        "A própria hipotenusa.",
        "O lado oposto ao ângulo reto.",
        "O cateto que está de frente para α, no outro lado.",
        "O cateto que ajuda a formar o ângulo α (está colado a ele)."
      ],
      correct: 3, // D
      explanation: "A palavra 'adjacente' significa vizinho ou encostado. Portanto, o Cateto Adjacente ao ângulo $\\alpha$ é o cateto que ajuda a compor este ângulo, servindo de base para o mesmo."
    },
    {
      id: 3,
      tag: "Cálculo Rápido",
      question: "Um escorregador infantil tem uma pista de descida de 6 metros. O ângulo de subida de sua rampa de escada com o chão é de 30°. Qual é a altura vertical h do topo do escorregador?",
      options: [
        "3 metros",
        "4.5 metros",
        "2.5 metros",
        "3.5 metros"
      ],
      correct: 0, // A
      explanation: "A pista de 6m é a Hipotenusa e a altura é o Cateto Oposto ao ângulo de $30^\\circ$. Usamos $\\text{sen}(30^\\circ) = \\frac{h}{6}$. Como $\\text{sen}(30^\\circ) = 0.5$, temos: $0.5 = \\frac{h}{6} \\Rightarrow h = 3\\text{m}$."
    },
    {
      id: 4,
      tag: "Notáveis",
      question: "Em qual dos ângulos notáveis abaixo o valor do Seno é exatamente igual ao valor do Cosseno?",
      options: [
        "30°",
        "60°",
        "45°",
        "90°"
      ],
      correct: 2, // C
      explanation: "No ângulo de $45^\\circ$, o triângulo retângulo é isósceles (os dois catetos são idênticos). Logo, a razão CO/H e CA/H dão exatamente a mesma medida: $\\frac{\\sqrt{2}}{2}$."
    },
    {
      id: 5,
      tag: "Aplicação Avançada",
      question: "Uma pessoa observa o topo de um farol sob um ângulo de elevação de 60°. Sabendo que ela está a uma distância horizontal de 10 metros da base do farol, qual é a altura total do farol?",
      options: [
        "5 metros",
        "20 metros",
        "$10\\sqrt{3}$ metros",
        "10 metros"
      ],
      correct: 2, // C
      explanation: "A altura é o Cateto Oposto e a distância de 10m é o Cateto Adjacente. Usamos a Tangente: $\\text{tg}(60^\\circ) = \\frac{h}{10}$. Como $\\text{tg}(60^\\circ) = \\sqrt{3}$, temos: $\\sqrt{3} = \\frac{h}{10} \\Rightarrow h = 10\\sqrt{3}\\text{m}$."
    }
  ];

  let currentQuestionIndex = 0;
  let quizScore = 0;

  function renderQuizQuestion() {
    const cardContent = document.getElementById('quiz-card-content');
    const btnNext = document.getElementById('btn-next-question');
    if (!cardContent) return;

    // Oculta o botão de avançar na renderização inicial da questão
    btnNext.classList.add('hidden');

    // Se terminamos as perguntas
    if (currentQuestionIndex >= quizQuestions.length) {
      showQuizScore();
      return;
    }

    const q = quizQuestions[currentQuestionIndex];
    
    // Atualiza cabeçalho de progresso
    document.getElementById('quiz-question-num').textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    document.getElementById('quiz-score-num').textContent = `Pontuação: ${quizScore}`;
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progressPercent}%`;

    cardContent.innerHTML = `
      <span class="quiz-question-tag">${q.tag}</span>
      <h2>${q.question}</h2>
      <div class="quiz-options">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option" onclick="selectQuizOption(${idx})">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div id="quiz-feedback-box" class="quiz-feedback hidden">
        <span class="material-symbols-rounded" id="feedback-icon">check_circle</span>
        <div class="feedback-content">
          <h4 id="feedback-title">Correto!</h4>
          <p id="feedback-desc"></p>
        </div>
      </div>
    `;
    autoRenderMath(cardContent);
  }

  window.selectQuizOption = function(selectedIdx) {
    const q = quizQuestions[currentQuestionIndex];
    const optionsButtons = document.querySelectorAll('.quiz-option');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const fbIcon = document.getElementById('feedback-icon');
    const fbTitle = document.getElementById('feedback-title');
    const fbDesc = document.getElementById('feedback-desc');
    const btnNext = document.getElementById('btn-next-question');

    // Desativa cliques extras
    optionsButtons.forEach(btn => btn.setAttribute('disabled', 'true'));

    // Verifica se está correto
    const isCorrect = selectedIdx === q.correct;
    
    if (isCorrect) {
      quizScore++;
      optionsButtons[selectedIdx].classList.add('correct');
      feedbackBox.className = "quiz-feedback correct-bg";
      fbIcon.textContent = 'check_circle';
      fbIcon.style.color = 'var(--accent-green)';
      fbTitle.textContent = 'Excelente! Você acertou.';
      fbTitle.className = 'color-green';
    } else {
      optionsButtons[selectedIdx].classList.add('wrong');
      optionsButtons[q.correct].classList.add('correct'); // Revela correta
      feedbackBox.className = "quiz-feedback wrong-bg";
      fbIcon.textContent = 'cancel';
      fbIcon.style.color = 'var(--accent-red)';
      fbTitle.textContent = 'Oops! Não foi dessa vez.';
      fbTitle.className = 'color-red';
    }

    // Atualiza pontuação no painel superior
    document.getElementById('quiz-score-num').textContent = `Pontuação: ${quizScore}`;

    // Renderiza a explicação com suporte LaTeX
    fbDesc.innerHTML = q.explanation;
    feedbackBox.classList.remove('hidden');

    // Renderiza KaTeX no box de feedback e na área da questão
    autoRenderMath(feedbackBox);
    autoRenderMath(document.getElementById('quiz-card-content'));

    btnNext.classList.remove('hidden');
  };

  window.nextQuizQuestion = function() {
    currentQuestionIndex++;
    renderQuizQuestion();
  };

  function showQuizScore() {
    const cardContent = document.getElementById('quiz-card-content');
    const btnNext = document.getElementById('btn-next-question');
    if (btnNext) btnNext.classList.add('hidden');

    // Finaliza a barra em 100%
    document.getElementById('quiz-progress').style.width = '100%';
    document.getElementById('quiz-question-num').textContent = `Quiz Finalizado!`;

    const pct = (quizScore / quizQuestions.length) * 100;
    const isPass = pct >= 60;
    
    cardContent.innerHTML = `
      <div class="score-screen">
        <div class="score-visual ${isPass ? 'pass' : 'fail'}">
          ${quizScore}/${quizQuestions.length}
        </div>
        <h2>${isPass ? 'Parabéns, Mestre dos Triângulos!' : 'Continue Praticando!'}</h2>
        <p>
          Você acertou <strong>${quizScore}</strong> de <strong>${quizQuestions.length}</strong> perguntas (${pct}% de aproveitamento). 
          ${isPass 
            ? 'Você domina as relações de seno, cosseno e tangente e está pronto para o Ensino Médio!' 
            : 'Revise o Simulador Dinâmico e os Exercícios Resolvidos para fixar as proporções.'}
        </p>
        <button class="btn btn-primary" onclick="restartQuiz()">
          Tentar Novamente <span class="material-symbols-rounded">replay</span>
        </button>
      </div>
    `;
  }

  window.restartQuiz = function() {
    currentQuestionIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
  };

  /* ==========================================
     7. LÓGICA E CONTROLES DA PARTE 2
     ========================================== */

  let currentPart = 1;

  // Modifica a função navigateTo para atualizar automaticamente a aba selecionada no menu
  const originalNavigateTo = window.navigateTo;
  window.navigateTo = function(sectionId) {
    originalNavigateTo(sectionId);
    
    // Auto-ajusta o switcher de partes com base na seção de destino
    const p2Sections = ['p2-intro', 'p2-tabela', 'p2-modelagem', 'p2-leisenos', 'p2-exercicios', 'p2-quiz'];
    if (p2Sections.includes(sectionId)) {
      currentPart = 2;
      const btnPart1 = document.getElementById('part-btn-1');
      const btnPart2 = document.getElementById('part-btn-2');
      if (btnPart1) btnPart1.classList.remove('active');
      if (btnPart2) btnPart2.classList.add('active');
      const linksP1 = document.getElementById('links-parte-1');
      const linksP2 = document.getElementById('links-parte-2');
      if (linksP1) linksP1.classList.add('hidden');
      if (linksP2) linksP2.classList.remove('hidden');
    } else if (sectionId !== 'home') {
      currentPart = 1;
      const btnPart1 = document.getElementById('part-btn-1');
      const btnPart2 = document.getElementById('part-btn-2');
      if (btnPart1) btnPart1.classList.add('active');
      if (btnPart2) btnPart2.classList.remove('active');
      const linksP1 = document.getElementById('links-parte-1');
      const linksP2 = document.getElementById('links-parte-2');
      if (linksP1) linksP1.classList.remove('hidden');
      if (linksP2) linksP2.classList.add('hidden');
    }
  };

  window.switchPart = function(partNum, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    currentPart = partNum;

    const btnPart1 = document.getElementById('part-btn-1');
    const btnPart2 = document.getElementById('part-btn-2');
    const linksP1 = document.getElementById('links-parte-1');
    const linksP2 = document.getElementById('links-parte-2');

    if (partNum === 1) {
      if (btnPart1) btnPart1.classList.add('active');
      if (btnPart2) btnPart2.classList.remove('active');
      if (linksP1) linksP1.classList.remove('hidden');
      if (linksP2) linksP2.classList.add('hidden');
    } else {
      if (btnPart1) btnPart1.classList.remove('active');
      if (btnPart2) btnPart2.classList.add('active');
      if (linksP1) linksP1.classList.add('hidden');
      if (linksP2) linksP2.classList.remove('hidden');
    }

    // Ao alternar partes, se o aluno estiver em uma seção interna, volta para a home
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection && activeSection.id !== 'home') {
      navigateTo('home');
    }
  };

  /* Mini-jogo da Tabela Notável */
  let selectedRow = -1;
  let selectedCol = -1;
  const correctGameAnswers = [
    ["1/2", "√2/2", "√3/2"],
    ["√3/2", "√2/2", "1/2"],
    ["√3/3", "1", "√3"]
  ];
  let userGameAnswers = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  window.selectGameCell = function(row, col) {
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(c => c.classList.remove('selected'));

    selectedRow = row;
    selectedCol = col;

    const targetCell = document.querySelector(`.game-cell[data-row="${row}"][data-col="${col}"]`);
    if (targetCell) {
      targetCell.classList.add('selected');
    }
  };

  window.placePoolValue = function(val) {
    if (selectedRow === -1 || selectedCol === -1) return;

    userGameAnswers[selectedRow][selectedCol] = val;

    const targetCell = document.querySelector(`.game-cell[data-row="${selectedRow}"][data-col="${selectedCol}"]`);
    if (targetCell) {
      targetCell.classList.remove('selected');
      targetCell.classList.add('filled');
      
      let mathVal = val;
      if (val === '1/2') mathVal = '\\frac{1}{2}';
      else if (val === '√2/2') mathVal = '\\frac{\\sqrt{2}}{2}';
      else if (val === '√3/2') mathVal = '\\frac{\\sqrt{3}}{2}';
      else if (val === '√3/3') mathVal = '\\frac{\\sqrt{3}}{3}';
      else if (val === '√3') mathVal = '\\sqrt{3}';
      
      targetCell.innerHTML = `$$${mathVal}$$`;
      autoRenderMath(targetCell);
    }
    
    // Auto-seleciona a próxima célula para facilitar a experiência do usuário
    selectedCol++;
    if (selectedCol > 2) {
      selectedCol = 0;
      selectedRow++;
    }
    if (selectedRow > 2) {
      selectedRow = -1;
      selectedCol = -1;
    } else {
      selectGameCell(selectedRow, selectedCol);
    }
  };

  window.resetGameTable = function() {
    selectedRow = -1;
    selectedCol = -1;
    userGameAnswers = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => {
      cell.textContent = '?';
      cell.className = 'game-cell';
    });

    const feedback = document.getElementById('game-feedback');
    if (feedback) feedback.classList.add('hidden');

    const exampleCard = document.getElementById('p2-example-1-card');
    if (exampleCard) {
      exampleCard.classList.add('locked-example');
      const overlay = document.getElementById('example-1-lock');
      if (overlay) overlay.style.display = 'flex';
    }
  };

  window.validateGameTable = function() {
    let allCorrect = true;
    let allFilled = true;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const val = userGameAnswers[r][c];
        const cell = document.querySelector(`.game-cell[data-row="${r}"][data-col="${c}"]`);
        if (!val) {
          allFilled = false;
          allCorrect = false;
          if (cell) cell.className = 'game-cell';
          continue;
        }

        const isCorrect = val === correctGameAnswers[r][c];
        if (cell) {
          if (isCorrect) {
            cell.className = 'game-cell correct-cell';
          } else {
            cell.className = 'game-cell wrong-cell';
            allCorrect = false;
          }
        }
      }
    }

    const feedback = document.getElementById('game-feedback');
    const fbIcon = document.getElementById('game-feedback-icon');
    const fbTitle = document.getElementById('game-feedback-title');
    const fbDesc = document.getElementById('game-feedback-desc');

    if (!feedback) return;

    if (!allFilled) {
      feedback.className = "quiz-feedback wrong-bg";
      fbIcon.textContent = 'warning';
      fbIcon.style.color = 'var(--accent-orange)';
      fbTitle.textContent = 'Atenção!';
      fbTitle.className = 'color-orange';
      fbDesc.innerHTML = 'Por favor, preencha todas as células da tabela antes de validar.';
      feedback.classList.remove('hidden');
      return;
    }

    if (allCorrect) {
      feedback.className = "quiz-feedback correct-bg";
      fbIcon.textContent = 'check_circle';
      fbIcon.style.color = 'var(--accent-green)';
      fbTitle.textContent = 'Excelente! Tabela preenchida com sucesso.';
      fbTitle.className = 'color-green';
      fbDesc.innerHTML = 'Você relembrou perfeitamente os ângulos notáveis! O <strong>Exemplo Prático 1</strong> foi desbloqueado abaixo.';
      feedback.classList.remove('hidden');

      const exampleCard = document.getElementById('p2-example-1-card');
      if (exampleCard) {
        exampleCard.classList.remove('locked-example');
        const overlay = document.getElementById('example-1-lock');
        if (overlay) overlay.style.display = 'none';
      }
    } else {
      feedback.className = "quiz-feedback wrong-bg";
      fbIcon.textContent = 'cancel';
      fbIcon.style.color = 'var(--accent-red)';
      fbTitle.textContent = 'Algumas respostas estão incorretas!';
      fbTitle.className = 'color-red';
      fbDesc.innerHTML = 'Verifique as células marcadas em vermelho. Dica: recorde os valores do seno e do cosseno de 30° e 60°!';
      feedback.classList.remove('hidden');
    }
  };

  /* Elevação e Depressão */
  window.selectModelAngle = function(type) {
    const btnElev = document.getElementById('btn-elevacao');
    const btnDep = document.getElementById('btn-depressao');
    const horizBottom = document.getElementById('model-horiz-bottom');
    const horizTop = document.getElementById('model-horiz-top');
    const arcElev = document.getElementById('arc-elev');
    const arcDep = document.getElementById('arc-dep');
    const nodeBoat = document.getElementById('node-boat-obs');
    const nodeLight = document.getElementById('node-light-obs');
    const lblElev = document.getElementById('lbl-model-elev');
    const lblDep = document.getElementById('lbl-model-dep');
    
    const cardInfo = document.getElementById('model-card-info');
    const titleText = document.getElementById('model-title-text');
    const descText = document.getElementById('model-desc-text');

    if (!btnElev) return;

    if (type === 'elevacao') {
      btnElev.classList.add('active');
      if (btnDep) btnDep.classList.remove('active');

      if (horizBottom) horizBottom.setAttribute('opacity', '1');
      if (horizTop) horizTop.setAttribute('opacity', '0');
      if (arcElev) arcElev.setAttribute('opacity', '1');
      if (arcDep) arcDep.setAttribute('opacity', '0');
      if (lblElev) lblElev.setAttribute('opacity', '1');
      if (lblDep) lblDep.setAttribute('opacity', '0');
      
      if (nodeBoat) {
        nodeBoat.setAttribute('stroke', 'var(--accent-magenta)');
        nodeBoat.setAttribute('stroke-width', '3');
      }
      if (nodeLight) nodeLight.setAttribute('stroke', 'none');

      if (cardInfo) cardInfo.style.borderColor = 'var(--accent-magenta)';
      if (titleText) {
        titleText.className = 'term-title color-magenta';
        titleText.innerHTML = '<span class="material-symbols-rounded">arrow_upward</span><h4>Ângulo de Elevação</h4>';
      }
      if (descText) {
        descText.innerHTML = 'Formado entre a <strong>linha horizontal de visão</strong> (chão ou nível dos olhos) e a <strong>linha visual de mira</strong> direcionada para <strong>cima</strong>. É o ângulo que formamos ao olhar da base para o topo de uma torre, farol ou montanha.';
      }
    } else {
      if (btnDep) btnDep.classList.add('active');
      btnElev.classList.remove('active');

      if (horizBottom) horizBottom.setAttribute('opacity', '0');
      if (horizTop) horizTop.setAttribute('opacity', '1');
      if (arcElev) arcElev.setAttribute('opacity', '0');
      if (arcDep) arcDep.setAttribute('opacity', '1');
      if (lblElev) lblElev.setAttribute('opacity', '0');
      if (lblDep) lblDep.setAttribute('opacity', '1');

      if (nodeLight) {
        nodeLight.setAttribute('stroke', 'var(--accent-orange)');
        nodeLight.setAttribute('stroke-width', '3');
      }
      if (nodeBoat) nodeBoat.setAttribute('stroke', 'none');

      if (cardInfo) cardInfo.style.borderColor = 'var(--accent-orange)';
      if (titleText) {
        titleText.className = 'term-title color-orange';
        titleText.innerHTML = '<span class="material-symbols-rounded">arrow_downward</span><h4>Ângulo de Depressão</h4>';
      }
      if (descText) {
        descText.innerHTML = 'Formado entre a <strong>linha horizontal de visão</strong> (medida na altura dos olhos do observador no topo) e a <strong>linha visual de mira</strong> direcionada para <strong>baixo</strong>. É o ângulo formado por um piloto de avião observando o solo ou por alguém no topo de um farol mirando em um barco.';
      }
    }
  };

  /* Lei dos Senos - Triângulo Oblíquo SVG Arrastável */
  let vertexA = { x: 100, y: 280 };
  let vertexB = { x: 400, y: 280 };
  let vertexC = { x: 250, y: 100 };
  
  let isDragging = false;
  let activeHandleId = null;

  function initObliqueTriangle() {
    const obliqueSvg = document.getElementById('oblique-svg');
    if (!obliqueSvg) return;

    const handles = [
      { id: 'A', element: document.getElementById('handle-A') },
      { id: 'B', element: document.getElementById('handle-B') },
      { id: 'C', element: document.getElementById('handle-C') }
    ];

    handles.forEach(h => {
      if (!h.element) return;
      
      const startDrag = (e) => {
        e.preventDefault();
        isDragging = true;
        activeHandleId = h.id;
      };

      h.element.addEventListener('mousedown', startDrag);
      h.element.addEventListener('touchstart', startDrag, { passive: false });
    });

    const drag = (e) => {
      if (!isDragging || !activeHandleId) return;
      
      const coords = getSVGCoords(e, obliqueSvg);
      
      // Restrições de arraste para manter dentro das dimensões seguras do SVG
      let x = Math.max(35, Math.min(465, coords.x));
      let y = Math.max(35, Math.min(310, coords.y));

      if (activeHandleId === 'A') {
        vertexA.x = Math.min(vertexB.x - 60, x);
        vertexA.y = y;
      } else if (activeHandleId === 'B') {
        vertexB.x = Math.max(vertexA.x + 60, x);
        vertexB.y = y;
      } else if (activeHandleId === 'C') {
        vertexC.x = x;
        // Mantém o vértice C com uma distância vertical mínima para evitar triângulos colapsados
        const maxAllowedY = Math.min(vertexA.y, vertexB.y) - 50;
        vertexC.y = Math.min(maxAllowedY, y);
      }

      updateObliqueTriangle();
    };

    const stopDrag = () => {
      isDragging = false;
      activeHandleId = null;
    };

    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag, { passive: false });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    updateObliqueTriangle();
  }

  function getSVGCoords(e, svg) {
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = (clientX - rect.left) * (500 / rect.width);
    const y = (clientY - rect.top) * (380 / rect.height);
    return { x, y };
  }

  function getAngleArcPath(center, pt1, pt2, radius) {
    const v1 = { x: pt1.x - center.x, y: pt1.y - center.y };
    const v2 = { x: pt2.x - center.x, y: pt2.y - center.y };
    const len1 = Math.sqrt(v1.x*v1.x + v1.y*v1.y);
    const len2 = Math.sqrt(v2.x*v2.x + v2.y*v2.y);
    const u1 = { x: v1.x / len1, y: v1.y / len1 };
    const u2 = { x: v2.x / len2, y: v2.y / len2 };
    
    const a1 = Math.atan2(u1.y, u1.x);
    const a2 = Math.atan2(u2.y, u2.x);
    
    const start = { x: center.x + radius * Math.cos(a1), y: center.y + radius * Math.sin(a1) };
    const end = { x: center.x + radius * Math.cos(a2), y: center.y + radius * Math.sin(a2) };
    
    let diff = a2 - a1;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    const sweepFlag = diff > 0 ? 1 : 0;
    
    return `M ${start.x},${start.y} A ${radius},${radius} 0 0,${sweepFlag} ${end.x},${end.y}`;
  }

  function updateObliqueTriangle() {
    const poly = document.getElementById('oblique-poly');
    const handleA = document.getElementById('handle-A');
    const handleB = document.getElementById('handle-B');
    const handleC = document.getElementById('handle-C');
    
    const lblA = document.getElementById('lbl-vert-A');
    const lblB = document.getElementById('lbl-vert-B');
    const lblC = document.getElementById('lbl-vert-C');

    const lblSideA = document.getElementById('lbl-side-a');
    const lblSideB = document.getElementById('lbl-side-b');
    const lblSideC = document.getElementById('lbl-side-c');

    const arcA = document.getElementById('arc-A');
    const arcB = document.getElementById('arc-B');
    const arcC = document.getElementById('arc-C');

    if (!poly) return;

    // Atualiza polígono e alças
    poly.setAttribute('points', `${vertexA.x},${vertexA.y} ${vertexB.x},${vertexB.y} ${vertexC.x},${vertexC.y}`);
    handleA.setAttribute('cx', vertexA.x);
    handleA.setAttribute('cy', vertexA.y);
    handleB.setAttribute('cx', vertexB.x);
    handleB.setAttribute('cy', vertexB.y);
    handleC.setAttribute('cx', vertexC.x);
    handleC.setAttribute('cy', vertexC.y);

    // Ajusta rótulos dos vértices
    lblA.setAttribute('x', vertexA.x - 20);
    lblA.setAttribute('y', vertexA.y + 20);
    lblB.setAttribute('x', vertexB.x + 10);
    lblB.setAttribute('y', vertexB.y + 20);
    lblC.setAttribute('x', vertexC.x - 8);
    lblC.setAttribute('y', vertexC.y - 18);

    // Calcula comprimentos
    const dist = (p1, p2) => Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    const side_a = dist(vertexB, vertexC); // oposto a A
    const side_b = dist(vertexA, vertexC); // oposto a B
    const side_c = dist(vertexA, vertexB); // oposto a C

    // Escala
    const scaleFactor = 25;
    const val_a = side_a / scaleFactor;
    const val_b = side_b / scaleFactor;
    const val_c = side_c / scaleFactor;

    // Rótulos de lados
    lblSideA.setAttribute('x', (vertexB.x + vertexC.x) / 2 + 20);
    lblSideA.setAttribute('y', (vertexB.y + vertexC.y) / 2 - 4);
    lblSideA.textContent = `a = ${val_a.toFixed(1)}`;

    lblSideB.setAttribute('x', (vertexA.x + vertexC.x) / 2 - 20);
    lblSideB.setAttribute('y', (vertexA.y + vertexC.y) / 2 - 4);
    lblSideB.textContent = `b = ${val_b.toFixed(1)}`;

    lblSideC.setAttribute('x', (vertexA.x + vertexB.x) / 2);
    lblSideC.setAttribute('y', (vertexA.y + vertexB.y) / 2 + 22);
    lblSideC.textContent = `c = ${val_c.toFixed(1)}`;

    // Lei dos Cossenos para ângulos
    const angleA_rad = Math.acos((side_b**2 + side_c**2 - side_a**2) / (2 * side_b * side_c));
    const angleB_rad = Math.acos((side_a**2 + side_c**2 - side_b**2) / (2 * side_a * side_c));
    const angleC_rad = Math.PI - (angleA_rad + angleB_rad);

    const degA = angleA_rad * 180 / Math.PI;
    const degB = angleB_rad * 180 / Math.PI;
    const degC = angleC_rad * 180 / Math.PI;

    // Arcos
    const R_arc = 20;
    arcA.setAttribute('d', getAngleArcPath(vertexA, vertexC, vertexB, R_arc));
    arcB.setAttribute('d', getAngleArcPath(vertexB, vertexA, vertexC, R_arc));
    arcC.setAttribute('d', getAngleArcPath(vertexC, vertexB, vertexA, R_arc));

    // Senos
    const sinA = Math.sin(angleA_rad);
    const sinB = Math.sin(angleB_rad);
    const sinC = Math.sin(angleC_rad);

    // Razões
    const ratioA = val_a / sinA;
    const ratioB = val_b / sinB;
    const ratioC = val_c / sinC;

    // Atualiza no DOM
    const propA = document.getElementById('val-ratio-a');
    const propB = document.getElementById('val-ratio-b');
    const propC = document.getElementById('val-ratio-c');

    if (propA) propA.innerHTML = `$$\\frac{${val_a.toFixed(1)}}{\\text{sen}(${Math.round(degA)}^\\circ)} = \\frac{${val_a.toFixed(1)}}{${sinA.toFixed(2)}} = ${ratioA.toFixed(1)}$$`;
    if (propB) propB.innerHTML = `$$\\frac{${val_b.toFixed(1)}}{\\text{sen}(${Math.round(degB)}^\\circ)} = \\frac{${val_b.toFixed(1)}}{${sinB.toFixed(2)}} = ${ratioB.toFixed(1)}$$`;
    if (propC) propC.innerHTML = `$$\\frac{${val_c.toFixed(1)}}{\\text{sen}(${Math.round(degC)}^\\circ)} = \\frac{${val_c.toFixed(1)}}{${sinC.toFixed(2)}} = ${ratioC.toFixed(1)}$$`;

    autoRenderMath(document.querySelector('.leisenos-proportions'));
  }

  /* Exercícios Resolvidos P2 (OBMEP, FUVEST, Desafio) */
  const challengesP2 = [
    {
      id: 1,
      badge: "OBMEP Adaptada",
      title: "1. A Praça Triangular",
      statement: "Uma praça tem o formato de um triângulo cujos vértices são A, B e C. Sabe-se que o lado AB mede 80 metros, o ângulo no vértice A mede 30° e o ângulo no vértice B mede 45°. Um pedestre quer caminhar de C até o ponto B seguindo o perímetro da praça. Qual é a distância do trecho BC em metros? (Considere $\\text{sen}(105^\\circ) \\approx 0.97$).",
      formula: "$$\\frac{BC}{\\text{sen}(30^\\circ)} = \\frac{AB}{\\text{sen}(C)}$$ ",
      illustration: `
        <svg viewBox="0 0 260 200">
          <line x1="10" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <polygon points="30,180 230,180 170,80" fill="rgba(180, 100%, 50%, 0.1)" stroke="var(--accent-purple)" stroke-width="2"/>
          <path d="M 60,180 A 30,30 0 0,0 56,159" fill="none" stroke="var(--accent-orange)" stroke-width="2"/>
          <path d="M 200,180 A 30,30 0 0,1 215,154" fill="none" stroke="var(--accent-orange)" stroke-width="2"/>
          <text x="65" y="174" fill="var(--accent-orange)" font-size="11" font-weight="bold">30°</text>
          <text x="190" y="174" fill="var(--accent-orange)" font-size="11" font-weight="bold">45°</text>
          <text x="130" y="195" fill="var(--text-secondary)" font-size="11" text-anchor="middle">80 metros (AB)</text>
          <text x="210" y="130" fill="var(--accent-cyan)" font-size="11" font-weight="bold">BC = d</text>
          <text x="25" y="195" fill="var(--text-secondary)" font-size="9">A</text>
          <text x="235" y="195" fill="var(--text-secondary)" font-size="9">B</text>
          <text x="170" y="70" fill="var(--text-secondary)" font-size="9" text-anchor="middle">C</text>
        </svg>
      `,
      steps: [
        "Identificamos os ângulos conhecidos do triângulo ABC: $A = 30^\\circ$ e $B = 45^\\circ$. O lado oposto ao vértice C é $AB = 80\\text{ m}$. O trecho que queremos achar é $BC$, que fica oposto ao ângulo $A = 30^\\circ$.",
        "Como a soma dos ângulos internos de um triângulo é sempre $180^\\circ$, podemos encontrar o terceiro ângulo no vértice C: $C = 180^\\circ - (30^\\circ + 45^\\circ) = 180^\\circ - 75^\\circ = 105^\\circ$.",
        "Aplicamos a Lei dos Senos relacionando os lados $BC$ e $AB$ com seus respectivos senos opostos: $\\frac{BC}{\\text{sen}(A)} = \\frac{AB}{\\text{sen}(C)}$.",
        "Substituímos os valores conhecidos na fórmula: $\\frac{d}{\\text{sen}(30^\\circ)} = \\frac{80}{\\text{sen}(105^\\circ)}$.",
        "Usando os senos aproximados da tabela e do enunciado: $\\frac{d}{0.5} = \\frac{80}{0.97}$.",
        "Multiplicando cruzado: $d \\cdot 0.97 = 80 \\cdot 0.5 \\Rightarrow d \\cdot 0.97 = 40$.",
        "Dividindo para encontrar a distância: $d = \\frac{40}{0.97} \\approx 41.2\\text{ metros}$.",
        "<strong>Resposta:</strong> A distância do trecho BC é de aproximadamente <strong>41,2 metros</strong>."
      ]
    },
    {
      id: 2,
      badge: "FUVEST Adaptada",
      title: "2. Altura de um Farol com Afastamento",
      statement: "Um navegador avista o topo de um farol sob um ângulo de elevação de 30° com o horizonte. Navegando 150 metros em linha reta na direção direta do farol, ele passa a avistar o mesmo topo sob um ângulo de elevação de 60°. Sabendo que o barco e a base do farol estão no mesmo nível horizontal, qual é a altura aproximada do farol?",
      formula: "$$\\text{tg}(60^\\circ) = \\frac{h}{x} \\quad \\text{e} \\quad \\text{tg}(30^\\circ) = \\frac{h}{x + 150}$$",
      illustration: `
        <svg viewBox="0 0 260 200">
          <line x1="10" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <line x1="220" y1="180" x2="220" y2="50" stroke="var(--accent-purple)" stroke-width="4"/>
          <line x1="30" y1="180" x2="220" y2="50" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="3,3"/>
          <line x1="140" y1="180" x2="220" y2="50" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="3,3"/>
          <path d="M 60,180 A 30,30 0 0,0 56,165" fill="none" stroke="var(--accent-orange)" stroke-width="2"/>
          <path d="M 160,180 A 20,20 0 0,0 150,163" fill="none" stroke="var(--accent-orange)" stroke-width="2"/>
          <text x="65" y="174" fill="var(--accent-orange)" font-size="11" font-weight="bold">30°</text>
          <text x="156" y="172" fill="var(--accent-orange)" font-size="11" font-weight="bold">60°</text>
          <text x="85" y="195" fill="var(--text-secondary)" font-size="10" text-anchor="middle">150m</text>
          <text x="180" y="195" fill="var(--text-secondary)" font-size="10" text-anchor="middle">x</text>
          <text x="235" y="110" fill="var(--accent-purple)" font-size="12" font-weight="bold">h (Farol)</text>
        </svg>
      `,
      steps: [
        "Temos dois triângulos retângulos formados: o menor (ângulo de 60°, base $x$ e altura $h$) e o maior (ângulo de 30°, base $x + 150$ e altura $h$).",
        "Pelo triângulo de 60°: $\\text{tg}(60^\\circ) = \\frac{h}{x} \\Rightarrow \\sqrt{3} = \\frac{h}{x} \\Rightarrow h = x\\sqrt{3}$.",
        "Pelo triângulo de 30°: $\\text{tg}(30^\\circ) = \\frac{h}{x + 150} \\Rightarrow \\frac{\\sqrt{3}}{3} = \\frac{h}{x + 150}$.",
        "Substituímos o valor de $h = x\\sqrt{3}$ na segunda equação: $\\frac{\\sqrt{3}}{3} = \\frac{x\\sqrt{3}}{x + 150}$.",
        "Podemos simplificar a $\\sqrt{3}$ em ambos os lados dividindo a equação: $\\frac{1}{3} = \\frac{x}{x + 150}$.",
        "Multiplicando cruzado: $x + 150 = 3x \\Rightarrow 2x = 150 \\Rightarrow x = 75\\text{ metros}$.",
        "Agora que temos $x$, calculamos $h$: $h = 75\\sqrt{3}$. Sabendo que $\\sqrt{3} \\approx 1.73$, temos $h \\approx 75 \\cdot 1.73 \\approx 129.75\\text{ metros}$.",
        "<strong>Resposta:</strong> A altura do farol é de aproximadamente <strong>130 metros</strong>."
      ]
    },
    {
      id: 3,
      badge: "Desafio • Roda Gigante",
      title: "3. O Raio da Roda Gigante",
      statement: "Um brinquedo em um parque de diversões contém uma estrutura em forma de triângulo não retângulo inscrito em uma roda gigante circular. Um dos lados desse triângulo mede 12 metros e fica de frente para um ângulo interno de 45° no topo. Qual é o raio total dessa roda gigante?",
      formula: "$$\\frac{a}{\\text{sen}(A)} = 2R$$",
      illustration: `
        <svg viewBox="0 0 260 200">
          <circle cx="130" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
          <polygon points="80,160 180,160 130,40" fill="rgba(320, 100%, 60%, 0.1)" stroke="var(--accent-purple)" stroke-width="2"/>
          <path d="M 125,52 A 15,15 0 0,0 141,51" fill="none" stroke="var(--accent-orange)" stroke-width="2"/>
          <text x="130" y="66" fill="var(--accent-orange)" font-size="11" font-weight="bold" text-anchor="middle">45°</text>
          <text x="130" y="178" fill="var(--accent-cyan)" font-size="12" font-weight="bold" text-anchor="middle">12 metros</text>
          <circle cx="130" cy="100" r="3" fill="#fff"/>
          <line x1="130" y1="100" x2="210" y2="100" stroke="var(--accent-magenta)" stroke-width="1.5" stroke-dasharray="3,3"/>
          <text x="170" y="93" fill="var(--accent-magenta)" font-size="11" font-weight="bold">R</text>
        </svg>
      `,
      steps: [
        "Este problema exige a extensão da Lei dos Senos: em qualquer triângulo inscrito em uma circunferência de raio R, a razão entre qualquer lado e o seno do ângulo oposto é igual ao diâmetro ($2R$): $\\frac{a}{\\text{sen}(A)} = 2R$.",
        "Temos o lado oposto $a = 12\\text{ m}$ e o ângulo oposto correspondente $A = 45^\\circ$.",
        "Sabemos que $\\text{sen}(45^\\circ) = \\frac{\\sqrt{2}}{2}$.",
        "Montamos a equação: $\\frac{12}{\\text{sen}(45^\\circ)} = 2R \\Rightarrow \\frac{12}{\\sqrt{2}/2} = 2R$.",
        "Simplificando a fração: $2R = 12 \\cdot \\frac{2}{\\sqrt{2}} \\Rightarrow 2R = \\frac{24}{\\sqrt{2}} \\Rightarrow R = \\frac{12}{\\sqrt{2}}$.",
        "Racionalizando o denominador multiplicando por $\\sqrt{2}$: $R = \\frac{12\\sqrt{2}}{2} = 6\\sqrt{2}\\text{ metros}$.",
        "Substituindo o valor decimal aproximado $\\sqrt{2} \\approx 1.414$, temos: $R \\approx 6 \\cdot 1.414 \\approx 8.48\\text{ metros}$.",
        "<strong>Resposta:</strong> O raio da roda gigante é de aproximadamente <strong>8,5 metros</strong>."
      ]
    }
  ];

  function renderChallengesP2() {
    const listContainer = document.getElementById('p2-exercicios-list');
    if (!listContainer) return;

    listContainer.innerHTML = challengesP2.map((ch, idx) => `
      <div class="card desafio-card">
        <div class="desafio-info">
          <span class="badge desafio-badge">${ch.badge}</span>
          <h3>${ch.title}</h3>
          <p class="desafio-statement">${ch.statement}</p>
          <button class="btn btn-secondary btn-icon" onclick="toggleResolution('p2-ch-${ch.id}', this)">
            <span class="material-symbols-rounded">visibility</span>
            <span>Revelar Resolução Passo a Passo</span>
          </button>
        </div>
        <div class="desafio-illustration">
          ${ch.illustration}
        </div>
        <div class="resolution-wrapper" id="resolution-wrapper-p2-ch-${ch.id}">
          <div class="resolution-card">
            <h4>
              <span class="material-symbols-rounded">check_circle</span>
              Resolução Prática
            </h4>
            <p><strong>Fórmula Aplicada:</strong></p>
            <div class="katex-block">${ch.formula}</div>
            <ol>
              ${ch.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `).join('');

    autoRenderMath(listContainer);
  }

  /* Quiz 2 da Parte 2 */
  const quizQuestions2 = [
    {
      id: 1,
      tag: "História",
      question: "Qual cientista grego calculou a circunferência e o raio da Terra usando proporções geométricas e sombras no solstício de verão?",
      options: [
        "Pitágoras de Samos",
        "Eratóstenes de Cirene",
        "Euclides de Alexandria",
        "Arquimedes de Siracusa"
      ],
      correct: 1,
      explanation: "Eratóstenes observou as diferenças nas sombras projetadas por estacas em Siena e Alexandria ao mesmo tempo no solstício de verão para calcular a curvatura e as dimensões da Terra com extraordinária precisão."
    },
    {
      id: 2,
      tag: "Modelagem",
      question: "Se um mergulhador posicionado no fundo do mar vê um barco sob um ângulo de elevação de 35°, qual é o ângulo de depressão sob o qual o capitão do barco vê o mergulhador?",
      options: [
        "55°",
        "45°",
        "35°",
        "Depende da profundidade da água"
      ],
      correct: 2,
      explanation: "Como as duas linhas de horizonte (nível dos olhos do mergulhador e do capitão) são paralelas, os ângulos são alternos internos, o que significa que o ângulo de elevação é exatamente igual ao de depressão ($35^\\circ$)."
    },
    {
      id: 3,
      tag: "Teoria",
      question: "Em quais tipos de triângulos podemos aplicar as regras da Lei dos Senos?",
      options: [
        "Apenas em triângulos que possuem um ângulo de 90° (retângulos).",
        "Apenas em triângulos que têm todos os lados iguais (equiláteros).",
        "Em qualquer triângulo do plano, seja retângulo ou não (oblíquos).",
        "Apenas em triângulos onde a soma dos ângulos é maior que 180°."
      ],
      correct: 2,
      explanation: "A Lei dos Senos é uma lei geral que se aplica a **qualquer triângulo** (seja ele retângulo, acutângulo ou obtuso). A trigonometria do triângulo retângulo tradicional é apenas um caso especial dessa lei."
    },
    {
      id: 4,
      tag: "Cálculo Prático",
      question: "Em um triângulo qualquer ABC, o lado a mede 10cm e o ângulo oposto A mede 30°. Se o ângulo B mede 45°, quanto mede o lado b oposto a B?",
      options: [
        "$10\\sqrt{2}$ cm",
        "5 cm",
        "10 cm",
        "$5\\sqrt{3}$ cm"
      ],
      correct: 0,
      explanation: "Aplicamos a Lei dos Senos: $\\frac{10}{\\text{sen}(30^\\circ)} = \\frac{b}{\\text{sen}(45^\\circ)} \\Rightarrow \\frac{10}{0.5} = \\frac{b}{\\sqrt{2}/2} \\Rightarrow 20 = \\frac{b}{\\sqrt{2}/2} \\Rightarrow b = 20 \\cdot \\frac{\\sqrt{2}}{2} = 10\\sqrt{2}$ cm."
    },
    {
      id: 5,
      tag: "Modelagem de Altura",
      question: "Você está posicionado a 20m de uma árvore e vê seu topo sob um ângulo de elevação de 60°. Ignorando sua altura, qual fórmula você aplica para achar a altura h da árvore?",
      options: [
        "$\\text{sen}(60^\\circ) = \\frac{h}{20}$",
        "$\\text{cos}(60^\\circ) = \\frac{20}{h}$",
        "$\\text{tg}(60^\\circ) = \\frac{h}{20}$",
        "$\\text{tg}(60^\\circ) = \\frac{20}{h}$"
      ],
      correct: 2,
      explanation: "A altura da árvore é o Cateto Oposto (CO) ao ângulo de 60° e a distância de 20m é o Cateto Adjacente (CA). A razão que usa CO e CA é a Tangente: $\\text{tg}(60^\\circ) = \\frac{h}{20}$."
    }
  ];

  let currentQuestionIndex2 = 0;
  let quizScore2 = 0;

  function renderQuiz2Question() {
    const cardContent = document.getElementById('quiz2-card-content');
    const btnNext = document.getElementById('btn-next-question-2');
    if (!cardContent) return;

    btnNext.classList.add('hidden');

    if (currentQuestionIndex2 >= quizQuestions2.length) {
      showQuiz2Score();
      return;
    }

    const q = quizQuestions2[currentQuestionIndex2];
    
    document.getElementById('quiz2-question-num').textContent = `Pergunta ${currentQuestionIndex2 + 1} de ${quizQuestions2.length}`;
    document.getElementById('quiz2-score-num').textContent = `Pontuação: ${quizScore2}`;
    const progressPercent = (currentQuestionIndex2 / quizQuestions2.length) * 100;
    document.getElementById('quiz2-progress').style.width = `${progressPercent}%`;

    cardContent.innerHTML = `
      <span class="quiz-question-tag">${q.tag}</span>
      <h2>${q.question}</h2>
      <div class="quiz-options">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option" onclick="selectQuiz2Option(${idx})">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div id="quiz2-feedback-box" class="quiz-feedback hidden">
        <span class="material-symbols-rounded" id="feedback2-icon">check_circle</span>
        <div class="feedback-content">
          <h4 id="feedback2-title">Correto!</h4>
          <p id="feedback2-desc"></p>
        </div>
      </div>
    `;
    autoRenderMath(cardContent);
  }

  window.selectQuiz2Option = function(selectedIdx) {
    const q = quizQuestions2[currentQuestionIndex2];
    const optionsButtons = document.querySelectorAll('#quiz2-card-content .quiz-option');
    const feedbackBox = document.getElementById('quiz2-feedback-box');
    const fbIcon = document.getElementById('feedback2-icon');
    const fbTitle = document.getElementById('feedback2-title');
    const fbDesc = document.getElementById('feedback2-desc');
    const btnNext = document.getElementById('btn-next-question-2');

    optionsButtons.forEach(btn => btn.setAttribute('disabled', 'true'));

    const isCorrect = selectedIdx === q.correct;
    
    if (isCorrect) {
      quizScore2++;
      optionsButtons[selectedIdx].classList.add('correct');
      feedbackBox.className = "quiz-feedback correct-bg";
      fbIcon.textContent = 'check_circle';
      fbIcon.style.color = 'var(--accent-green)';
      fbTitle.textContent = 'Excelente! Você acertou.';
      fbTitle.className = 'color-green';
    } else {
      optionsButtons[selectedIdx].classList.add('wrong');
      optionsButtons[q.correct].classList.add('correct');
      feedbackBox.className = "quiz-feedback wrong-bg";
      fbIcon.textContent = 'cancel';
      fbIcon.style.color = 'var(--accent-red)';
      fbTitle.textContent = 'Oops! Não foi dessa vez.';
      fbTitle.className = 'color-red';
    }

    document.getElementById('quiz2-score-num').textContent = `Pontuação: ${quizScore2}`;

    fbDesc.innerHTML = q.explanation;
    feedbackBox.classList.remove('hidden');

    autoRenderMath(feedbackBox);
    autoRenderMath(document.getElementById('quiz2-card-content'));

    btnNext.classList.remove('hidden');
  };

  window.nextQuiz2Question = function() {
    currentQuestionIndex2++;
    renderQuiz2Question();
  };

  function showQuiz2Score() {
    const cardContent = document.getElementById('quiz2-card-content');
    const btnNext = document.getElementById('btn-next-question-2');
    if (btnNext) btnNext.classList.add('hidden');

    document.getElementById('quiz2-progress').style.width = '100%';
    document.getElementById('quiz2-question-num').textContent = `Quiz Finalizado!`;

    const pct = (quizScore2 / quizQuestions2.length) * 100;
    const isPass = pct >= 60;
    
    cardContent.innerHTML = `
      <div class="score-screen">
        <div class="score-visual ${isPass ? 'pass' : 'fail'}">
          ${quizScore2}/${quizQuestions2.length}
        </div>
        <h2>${isPass ? 'Parabéns, Mestre da Modelagem!' : 'Continue Praticando!'}</h2>
        <p>
          Você acertou <strong>${quizScore2}</strong> de <strong>${quizQuestions2.length}</strong> perguntas (${pct}% de aproveitamento). 
          ${isPass 
            ? 'Você domina os conceitos da Lei dos Senos e modelagem real de problemas trigonométricos!' 
            : 'Revise os Simuladores e resolva os exercícios para fixar os conceitos.'}
        </p>
        <button class="btn btn-primary" onclick="restartQuiz2()">
          Tentar Novamente <span class="material-symbols-rounded">replay</span>
        </button>
      </div>
    `;
  }

  window.restartQuiz2 = function() {
    currentQuestionIndex2 = 0;
    quizScore2 = 0;
    renderQuiz2Question();
  };

  // Inicializações da Parte 2
  renderChallengesP2();
  renderQuiz2Question();
  initObliqueTriangle();
  selectModelAngle('elevacao');

  // Inicializar o Quiz da Parte 1
  renderQuizQuestion();
});
