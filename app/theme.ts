/**
 * Tema do KM1 — ÚNICA fonte dos hexes de marca do projeto.
 *
 * Regra do projeto: nenhum hex de marca fora daqui. Os tokens abaixo são
 * emitidos como custom properties `--km1-*` no <html> (ver `themeCss`), e o
 * `@theme` de app/globals.css apenas aponta para elas. Trocar uma cor aqui
 * muda o site inteiro; o CSS não precisa ser editado.
 *
 * Paleta extraída do deck comercial "KM1 2027 — Thomé & Santos":
 * preto profundo dominante, amarelo em títulos-chave, ícones, eyebrows e
 * números, e um slide de impacto que inverte a lógica (fundo amarelo, texto
 * preto).
 */
export const theme = {
  colors: {
    /** Fundo dominante da página. */
    background: "#0D0D0D",
    /** Um degrau abaixo, para separar blocos sem desenhar borda. */
    backgroundAlt: "#000000",
    /**
     * Amarelo de marca. As artes prontas trazem tons próprios, medidos nos
     * arquivos: o logo (public/images/km1-logo.png) é #FFD802 sobre
     * transparência e o favicon (app/favicon.ico) é chapa #FFDA00 com o KM1 em
     * preto. A diferença para o token do deck é de ~2° de matiz e nunca aparece
     * lado a lado; o valor do deck continua sendo a verdade da identidade. Se um
     * dia o logo vetorial chegar, reconfira os três.
     */
    accent: "#F5D700",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    /**
     * Slide de impacto do deck: fundo 100% accent, texto no background.
     * São os mesmos dois valores acima invertidos — ficam explícitos aqui
     * porque no deck a inversão é um padrão de layout, não um acaso.
     */
    inverseBackground: "#F5D700",
    inverseText: "#0D0D0D",
  },

  typography: {
    /**
     * Display condensada, pesada, caixa alta — o "cartaz" do KM1.
     * A família é escolhida em app/fonts.ts (Saira Condensed 800); as métricas
     * abaixo foram medidas NESSE arquivo de fonte e só valem para ele.
     */
    display: "condensed-bold-uppercase",
    eyebrow: {
      case: "uppercase",
      tracking: "wide",
      color: "accent",
    },
  },

  /**
   * Métricas de cartaz — calibradas por fonte. NÃO copie de outro projeto.
   *
   * Medidas na Saira Condensed 800 (unitsPerEm 1000, lidas do próprio TTF):
   *   caixa alta ....... 0.696em acima da baseline
   *   Á/É/Í/Ó/Ú/Ã ...... 0.898em (é o acento que estoura a caixa de linha)
   *   Ç/Q .............. até 0.189em abaixo da baseline
   *   hhea asc/desc .... +1.135 / -0.439 (iguais a typo e win: o cálculo
   *                      abaixo vale igual em Chrome, Firefox e Safari)
   *
   * `headlineLeading` 1.04: a distância entre baselines precisa ser maior que
   * o acento da linha de baixo (0.898) para ele não encostar na base da linha
   * de cima. Sobra 0.142em — o dobro da folga que a Anton exigia no projeto
   * irmão, e o suficiente para "SÃO JOSÉ" sobre "DOS PINHAIS" ler como duas
   * linhas. Abaixo de 1.0 o acento encosta; acima de 1.1 a pilha perde o
   * aspecto de cartaz (a caixa alta é baixa, 0.696em, e o vão vira buraco).
   *
   * `headlineMaskPadTop` 0.10em: dentro da máscara de reveal (overflow hidden)
   * a tinta do acento fica 0.03em acima do topo da caixa de linha e seria
   * decepada — "SÃO JOSÉ" viraria "SAO JOSE". 0.10em é ~3x o necessário, para
   * absorver arredondamento de subpixel. A margem negativa de mesmo valor
   * devolve o espaço ao fluxo.
   *
   * `headlineMaskPadBottom` 0.08em: a cauda do Ç desce 0.189em e a caixa de
   * linha termina 0.172em abaixo da baseline — sem essa folga, "COMEÇA" perde
   * a cedilha na máscara.
   */
  metrics: {
    headlineLeading: "1.04",
    headlineMaskPadTop: "0.10em",
    headlineMaskPadBottom: "0.08em",
    /** A Saira Condensed já é estreita; tracking negativo forte fecha demais. */
    headlineTracking: "-0.01em",
    /** Eyebrow/label: caixa alta pede tracking positivo para respirar. */
    labelTracking: "0.16em",
  },
} as const;

/**
 * Tema emitido como CSS. Injetado uma vez no <head> pelo layout raiz.
 *
 * Os nomes têm prefixo `--km1-` de propósito: os tokens do Tailwind
 * (`--color-*`, em globals.css) apontam para estes. Se as duas camadas
 * usassem o mesmo nome, uma sobrescreveria a outra.
 */
export const themeCss = `:root{
  --km1-background:${theme.colors.background};
  --km1-background-alt:${theme.colors.backgroundAlt};
  --km1-accent:${theme.colors.accent};
  --km1-text:${theme.colors.text};
  --km1-text-muted:${theme.colors.textMuted};
  --km1-inverse-background:${theme.colors.inverseBackground};
  --km1-inverse-text:${theme.colors.inverseText};
  --km1-headline-leading:${theme.metrics.headlineLeading};
  --km1-headline-mask-pad-top:${theme.metrics.headlineMaskPadTop};
  --km1-headline-mask-pad-bottom:${theme.metrics.headlineMaskPadBottom};
  --km1-headline-tracking:${theme.metrics.headlineTracking};
  --km1-label-tracking:${theme.metrics.labelTracking};
}`;
