/**
 * Centrior Transactional Email Service
 * Responsável pelo envio de e-mails transacionais com templates HTML no padrão Fintech Centrior.
 * Suporta Resend, provedores SMTP e fallback para simulação em console/logs (Safe Dev Mode).
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  metadata?: Record<string, any>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}

/**
 * Envia um e-mail transacional via Resend (se configurado) ou Simulação Segura.
 */
export async function sendTransactionalEmail(payload: EmailPayload): Promise<EmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'Centrior <onboarding@resend.dev>';

  // Se houver chave do Resend configurada, realiza disparo real
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text || 'Visualize este e-mail em formato HTML.',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Falha no envio via Resend:', errorData);
        return { success: false, error: JSON.stringify(errorData) };
      }

      const data = await response.json();
      return { success: true, messageId: data.id, simulated: false };
    } catch (err: any) {
      console.error('Erro de conexão com provedor de e-mail:', err);
      return { success: false, error: err.message };
    }
  }

  // MODO SEGURO / SIMULAÇÃO (Sandbox)
  // Permite desenvolvimento e testes sem necessidade de chaves externas pagas
  console.log(`[SIMULAÇÃO DE E-MAIL TRANSACIONAL]
Para: ${payload.to}
Assunto: ${payload.subject}
Enviado via: Centrior Email Sandbox Dispatcher
Tamanho HTML: ${payload.html.length} caracteres
Timestamp: ${new Date().toISOString()}`);

  return {
    success: true,
    messageId: `simulated-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    simulated: true,
  };
}

// ==============================================================================
// TEMPLATES HTML TRANSACIONAIS COM BRANDING CENTRIOR (Laranja #FF5722 e Preto)
// ==============================================================================

function getBaseEmailLayout(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #1E293B; }
    .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #0F172A; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; }
    .logo-badge { background-color: #FF5722; color: #FFFFFF; width: 32px; height: 32px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; line-height: 32px; text-align: center; }
    .logo-text { color: #FFFFFF; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-left: 10px; display: inline-block; vertical-align: middle; }
    .content { padding: 32px; }
    .title { font-size: 20px; font-weight: 800; color: #0F172A; margin: 0 0 12px; }
    .paragraph { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px; }
    .highlight-card { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; margin: 20px 0; }
    .btn { display: inline-block; background-color: #FF5722; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 13px; margin-top: 10px; }
    .footer { background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 32px; text-align: center; font-size: 11px; color: #94A3B8; line-height: 1.5; }
    .footer a { color: #64748B; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <span class="logo-badge">C</span>
        <span class="logo-text">Centrior.</span>
      </div>
      <div style="color: #94A3B8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
        Alerta Financeiro
      </div>
    </div>
    <div class="content">
      ${bodyContent}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px;">Este é um comunicado de segurança e monitoramento automático da sua conta Centrior.</p>
      <p style="margin: 0;">Centrior Tecnologia Financeira Ltda. • CNPJ 00.000.000/0001-00 • Belo Horizonte/MG<br>
      <a href="http://localhost:3000/settings">Gerenciar Preferências de Notificação</a> • <a href="http://localhost:3000/privacy">Política de Privacidade & LGPD</a></p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Template de Alerta de Fatura a Vencer
 */
export function buildInvoiceDueEmail(data: {
  userName: string;
  cardName: string;
  amountFormatted: string;
  dueDate: string;
}): string {
  const content = `
    <h1 class="title">Fatura Próxima do Vencimento 💳</h1>
    <p class="paragraph">Olá, <strong>${data.userName}</strong>. Identificamos que a fatura do seu cartão <strong>${data.cardName}</strong> vencerá em breve.</p>
    
    <div class="highlight-card">
      <div style="font-size: 11px; color: #64748B; font-weight: 600; text-transform: uppercase;">Valor Consolidado</div>
      <div style="font-size: 26px; font-weight: 800; color: #0F172A; margin: 4px 0 8px;">${data.amountFormatted}</div>
      <div style="font-size: 12px; color: #EA580C; font-weight: 600;">Data de Vencimento: ${data.dueDate}</div>
    </div>

    <p class="paragraph">Mantenha seu fluxo de caixa equilibrado efetuando o pagamento ou registrando a quitação para atualização em tempo real do seu saldo patrimonial.</p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="http://localhost:3000/credit-cards" class="btn">Visualizar Fatura no Centrior</a>
    </div>
  `;
  return getBaseEmailLayout('Alerta de Vencimento de Fatura | Centrior', content);
}

/**
 * Template de Alerta de Estouro / Teto de Orçamento
 */
export function buildBudgetAlertEmail(data: {
  userName: string;
  categoryName: string;
  spentFormatted: string;
  limitFormatted: string;
  percentage: number;
}): string {
  const content = `
    <h1 class="title">Atenção ao Teto de Orçamento ⚠️</h1>
    <p class="paragraph">Olá, <strong>${data.userName}</strong>. Seus lançamentos recentes aproximaram ou ultrapassaram a meta da categoria <strong>${data.categoryName}</strong>.</p>
    
    <div class="highlight-card">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 12px; font-weight: 700; color: #0F172A;">${data.categoryName}</span>
        <span style="font-size: 12px; font-weight: 800; color: #DC2626;">${data.percentage}% atingido</span>
      </div>
      <div style="background-color: #E2E8F0; border-radius: 9999px; height: 8px; overflow: hidden; margin-bottom: 12px;">
        <div style="background-color: #FF5722; height: 100%; width: ${Math.min(100, data.percentage)}%;"></div>
      </div>
      <div style="font-size: 12px; color: #64748B;">
        Total Gasto: <strong>${data.spentFormatted}</strong> de um teto de <strong>${data.limitFormatted}</strong>
      </div>
    </div>

    <p class="paragraph">O Copiloto IA sugere revisar os próximos gastos nesta categoria para garantir que suas reservas de segurança permaneçam intactas este mês.</p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="http://localhost:3000/budgets" class="btn">Ajustar Teto de Orçamento</a>
    </div>
  `;
  return getBaseEmailLayout('Alerta de Limite de Orçamento | Centrior', content);
}

/**
 * Template de Alerta de Segurança (Novo Login)
 */
export function buildSecurityAlertEmail(data: {
  userName: string;
  ipAddress: string;
  device: string;
  timeFormatted: string;
}): string {
  const content = `
    <h1 class="title">Novo Acesso Detectado 🔒</h1>
    <p class="paragraph">Olá, <strong>${data.userName}</strong>. Registramos um novo início de sessão na sua conta Centrior.</p>
    
    <div class="highlight-card">
      <div style="font-size: 12px; color: #475569; margin-bottom: 4px;"><strong>Data & Hora:</strong> ${data.timeFormatted}</div>
      <div style="font-size: 12px; color: #475569; margin-bottom: 4px;"><strong>Dispositivo / Navegador:</strong> ${data.device}</div>
      <div style="font-size: 12px; color: #475569;"><strong>Endereço IP:</strong> ${data.ipAddress}</div>
    </div>

    <p class="paragraph">Se você reconhece este acesso, nenhuma ação é necessária. Se desconfia de atividade incomum, encerre todas as sessões ativas imediatamente.</p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="http://localhost:3000/settings" class="btn">Revisar Segurança da Conta</a>
    </div>
  `;
  return getBaseEmailLayout('Alerta de Segurança da Conta | Centrior', content);
}

