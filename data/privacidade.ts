/**
 * Política de Privacidade do KM1 · Etapa São José dos Pinhais.
 *
 * Base: a política da Meia de Curitiba (PDF da organização, 18/11/2026),
 * ajustada ao que este site faz, conferido no código:
 * - nenhum formulário: a inscrição é na Ticket Sports (registrationCta);
 * - nada gravado no navegador (sem cookie, localStorage ou sessionStorage);
 * - medição só com Vercel Analytics (sem cookie). Sem pixel, sem GA.
 *
 * Antes de ligar uma ferramenta ou formulário novo, atualize esta lista e a
 * data — a página precisa descrever o que o site faz.
 */

export const privacyEmail = "contato@thomeesantos.com.br";

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "address"; lines: string[] };

export type PolicySection = { id: string; title: string; blocks: PolicyBlock[] };

export const privacyPolicy = {
  intro: {
    eyebrow: "LGPD",
    title: "Política de privacidade",
    description:
      "Como a Thomé & Santos coleta, usa, guarda e protege os dados de quem visita o site do KM1 São José dos Pinhais ou se inscreve na prova.",
  },
  lastUpdated: "18 de novembro de 2026",
  lead: "Esta política explica como a Thomé & Santos Eventos Esportivos coleta, usa, guarda e protege os dados pessoais de quem visita o site do KM1 · Etapa São José dos Pinhais ou se inscreve na prova, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018, LGPD).",
  sections: [
    {
      id: "responsavel",
      title: "Quem é o responsável pelos seus dados",
      blocks: [
        {
          type: "address",
          lines: [
            "THOME SANTOS LTDA (Thomé & Santos Eventos Esportivos)",
            "CNPJ 07.472.793/0001-90",
            "Rua Imaculada Conceição, 785, Prado Velho, Curitiba, PR, CEP 80215-182",
            `Contato para privacidade: ${privacyEmail}`,
          ],
        },
      ],
    },
    {
      id: "dados",
      title: "Quais dados coletamos",
      blocks: [
        {
          type: "p",
          text: "Este site não tem formulários e não pede dados pessoais. Os dados que tratamos chegam por dois caminhos:",
        },
        {
          type: "list",
          items: [
            "Inscrição na prova: a inscrição é feita na plataforma Ticket Sports, que coleta os dados necessários (nome, documento, data de nascimento, contato, endereço, modalidade, tamanho de camiseta e respostas do questionário). A Ticket Sports compartilha esses dados conosco para a organização do evento.",
            "Medição sem identificação (Vercel Analytics): página visitada, de onde o acesso veio, país e cidade aproximados, tipo de aparelho e navegador. Não usa cookies e não guarda o seu endereço IP.",
          ],
        },
      ],
    },
    {
      id: "finalidades",
      title: "Para que usamos seus dados",
      blocks: [
        {
          type: "list",
          items: [
            "Organizar a prova: inscrição, retirada de kit, cronometragem, resultados, comunicação sobre o evento e atendimento.",
            "Enviar novidades do Circuito KM1 e de outras provas da Thomé & Santos, quando você autorizar na inscrição.",
            "Saber quantas pessoas visitam o site e quais páginas são mais procuradas, para melhorá-lo.",
            "Cumprir obrigações legais e regulatórias e nos defender em processos.",
          ],
        },
      ],
    },
    {
      id: "bases-legais",
      title: "Bases legais (art. 7º da LGPD)",
      blocks: [
        {
          type: "list",
          items: [
            "Execução de contrato: dados da inscrição e da participação na prova.",
            "Consentimento: novidades e comunicação de marketing, quando autorizadas na inscrição.",
            "Legítimo interesse: medição sem identificação, segurança do site e prevenção de fraudes, sempre respeitando seus direitos.",
            "Cumprimento de obrigação legal: guarda de registros exigida por lei.",
          ],
        },
      ],
    },
    {
      id: "compartilhamento",
      title: "Com quem compartilhamos",
      blocks: [
        { type: "p", text: "Não vendemos seus dados. Compartilhamos apenas o necessário com:" },
        {
          type: "list",
          items: [
            "Ticket Sports, plataforma de inscrição e pagamento.",
            "Empresas de tecnologia que nos ajudam a operar: hospedagem do site (Vercel), hospedagem do nosso sistema de gestão de contatos (Hostinger), envio de e-mails (Brevo), WhatsApp, armazenamento em nuvem (Google) e automação.",
            "Patrocinadores e parceiros oficiais, somente quando você autorizar expressamente.",
            "Autoridades públicas, quando a lei exigir.",
          ],
        },
        {
          type: "p",
          text: "Alguns desses fornecedores guardam dados fora do Brasil. Nesses casos exigimos que sigam padrões de proteção compatíveis com a LGPD.",
        },
      ],
    },
    {
      id: "retencao",
      title: "Por quanto tempo guardamos",
      blocks: [
        {
          type: "list",
          items: [
            "Dados de inscrição: pelo prazo necessário para a prova e pelos prazos legais de guarda.",
            "Marketing: até você cancelar o recebimento ou retirar o consentimento.",
            "Medição sem identificação: o código temporário de cada acesso é descartado em 24 horas; ficam apenas os números somados.",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Este site não usa cookies, pixels de redes sociais, Google Analytics nem anúncios, e não grava nada no seu navegador. A medição de audiência é feita pelo Vercel Analytics, que conta visitas sem cookies e sem identificar você. Ao clicar em “Inscreva-se”, você vai para a Ticket Sports, que tem a sua própria política de privacidade e de cookies.",
        },
      ],
    },
    {
      id: "direitos",
      title: "Seus direitos",
      blocks: [
        { type: "p", text: "Pela LGPD você pode, a qualquer momento:" },
        {
          type: "list",
          items: [
            "Confirmar se tratamos seus dados e ter acesso a eles.",
            "Corrigir dados incompletos ou desatualizados.",
            "Pedir anonimização, bloqueio ou exclusão de dados desnecessários.",
            "Pedir a portabilidade dos dados.",
            "Saber com quem compartilhamos seus dados.",
            "Retirar o consentimento e pedir a exclusão dos dados tratados com base nele.",
            "Se opor a tratamentos feitos com base no legítimo interesse.",
          ],
        },
        {
          type: "p",
          text: `Para exercer seus direitos, escreva para ${privacyEmail}. Respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).`,
        },
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      blocks: [
        {
          type: "p",
          text: "Usamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou vazamento, como conexão segura (HTTPS), acesso restrito por senha e fornecedores com padrões de segurança reconhecidos.",
        },
      ],
    },
    {
      id: "menores",
      title: "Menores de idade",
      blocks: [
        {
          type: "p",
          text: "Inscrições de menores de 18 anos só são aceitas com autorização do responsável legal, conforme o regulamento da prova.",
        },
      ],
    },
    {
      id: "imagem",
      title: "Imagem",
      blocks: [
        {
          type: "p",
          text: "Fotos e vídeos feitos durante o evento podem ser usados na divulgação da prova, nos termos do regulamento aceito na inscrição.",
        },
      ],
    },
    {
      id: "mudancas",
      title: "Mudanças nesta política",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar esta política. A data da última atualização fica sempre no topo desta página.",
        },
      ],
    },
  ] satisfies PolicySection[],
};
