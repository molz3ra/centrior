import Decimal from 'decimal.js';

export interface OFXTransaction {
  id: string;
  date: Date;
  amountCents: number;
  description: string;
  memo: string;
  type: 'INCOME' | 'EXPENSE';
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB máximo
const MAX_TRANSACTIONS = 2000; // Limite de 2000 transações por arquivo

/**
 * Sanitiza strings extraídas de arquivos OFX para prevenção de XSS e injeção de caracteres de controle.
 */
function sanitizeOFXString(raw: string, maxLength: number = 120): string {
  if (!raw) return '';
  return raw
    .replace(/<[^>]*>/g, '') // Remove quaisquer tags HTML embutidas
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove caracteres de controle ASCII
    .trim()
    .slice(0, maxLength);
}

/**
 * Parser de OFX com Blindagem Defensiva (OWASP Top 10 A03 & A04).
 * Valida tamanho, sanitiza payloads e previne DoS/crash por entradas malformadas.
 */
export function parseOFX(content: string): OFXTransaction[] {
  if (!content || typeof content !== 'string') return [];
  if (content.length > MAX_FILE_SIZE) {
    throw new Error('Arquivo OFX excede o tamanho máximo permitido de 5MB.');
  }

  const transactions: OFXTransaction[] = [];

  // Extrai blocos de transação limitando a quantidade máxima
  const stmtTrnBlocks = content.split(/<STMTTRN>/i).slice(1, MAX_TRANSACTIONS + 1);

  for (const block of stmtTrnBlocks) {
    const cleanBlock = block.split(/<\/STMTTRN>/i)[0];

    const dtPosted = getTagContent(cleanBlock, 'DTPOSTED');
    const trnAmt = getTagContent(cleanBlock, 'TRNAMT');
    const fitId = getTagContent(cleanBlock, 'FITID');
    const name = getTagContent(cleanBlock, 'NAME');
    const memo = getTagContent(cleanBlock, 'MEMO');

    if (!dtPosted || !trnAmt) continue;

    // Parse date: YYYYMMDD...
    const year = parseInt(dtPosted.substring(0, 4), 10);
    const month = parseInt(dtPosted.substring(4, 6), 10) - 1;
    const day = parseInt(dtPosted.substring(6, 8), 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) continue;
    const date = new Date(year, month, day);

    // Parse seguro de valores monetários para centavos (Prevenção de DecimalError Crash)
    let amountCents = 0;
    try {
      const sanitizedAmt = trnAmt.replace(',', '.').replace(/[^0-9.-]/g, '');
      const amount = new Decimal(sanitizedAmt);
      amountCents = amount.mul(100).round().toNumber();
    } catch {
      continue; // Ignora lançamento com valor inválido
    }

    const sanitizedId = sanitizeOFXString(fitId || Math.random().toString(36).substring(7), 64);
    const sanitizedDesc = sanitizeOFXString(name || memo || 'Lançamento Bancário', 120);
    const sanitizedMemo = sanitizeOFXString(memo || '', 120);

    transactions.push({
      id: sanitizedId,
      date,
      amountCents: Math.abs(amountCents),
      description: sanitizedDesc,
      memo: sanitizedMemo,
      type: amountCents > 0 ? 'INCOME' : 'EXPENSE',
    });
  }

  return transactions;
}

function getTagContent(block: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>([^<\\r\\n]+)`, 'i');
  const match = block.match(regex);
  return match ? match[1].trim() : null;
}
