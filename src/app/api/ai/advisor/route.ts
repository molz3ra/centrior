import { NextRequest } from 'next/server';

/**
 * Endpoint de Streaming de Consultoria Financeira com IA (Regra 13).
 * Transmite tokens em tempo real via ReadableStream HTTP para latência sub-300ms.
 */
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const sampleResponses = [
      `Analisando sua posição financeira consolidada:\n\n`,
      `1. **Liquidez**: Seu saldo consolidado de **R$ 689.372,00** apresenta uma margem de reserva excelente (5.4% acima da média do mês anterior).\n`,
      `2. **Cartões de Crédito**: A fatura atual está em **25% do limite** total, bem abaixo da zona de alerta de 70%.\n`,
      `3. **Orçamentos**: O teto de Moradia & Contas Fixas está em 96% de consumo. Recomendo pausar despesas variáveis nesta categoria até o dia 28.\n`,
      `4. **Recomendação Estratégica**: Direcionar o excedente de **R$ 10.600,00** de lucro líquido para aportes em Tesouro IPCA+ ou reinvestimento com liquidez diária.`,
    ];

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for (const block of sampleResponses) {
          // Simula streaming token a token ultra rápido (Regra 13)
          const words = block.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '));
            await new Promise((resolve) => setTimeout(resolve, 25));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao gerar análise' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

