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

  // Inicializar o Quiz
  renderQuizQuestion();
});
