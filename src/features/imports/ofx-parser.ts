import Decimal from 'decimal.js';

export interface OFXTransaction {
  id: string;
  date: Date;
  amountCents: number;
  description: string;
  memo: string;
  type: 'INCOME' | 'EXPENSE';
}

/**
 * Basic OFX Parser for SGML-like OFX files common in Brazil.
 * This is a lightweight implementation for demo purposes.
 */
export function parseOFX(content: string): OFXTransaction[] {
  const transactions: OFXTransaction[] = [];

  // Extract transaction blocks
  const stmtTrnBlocks = content.split(/<STMTTRN>/i).slice(1);

  for (const block of stmtTrnBlocks) {
    const cleanBlock = block.split(/<\/STMTTRN>/i)[0];

    const trnType = getTagContent(cleanBlock, 'TRNTYPE');
    const dtPosted = getTagContent(cleanBlock, 'DTPOSTED');
    const trnAmt = getTagContent(cleanBlock, 'TRNAMT');
    const fitId = getTagContent(cleanBlock, 'FITID');
    const name = getTagContent(cleanBlock, 'NAME');
    const memo = getTagContent(cleanBlock, 'MEMO');

    if (!dtPosted || !trnAmt) continue;

    // Parse date: YYYYMMDD...
    const year = parseInt(dtPosted.substring(0, 4));
    const month = parseInt(dtPosted.substring(4, 6)) - 1;
    const day = parseInt(dtPosted.substring(6, 8));
    const date = new Date(year, month, day);

    // Parse amount to cents
    const amount = new Decimal(trnAmt.replace(',', '.'));
    const amountCents = amount.mul(100).round().toNumber();

    transactions.push({
      id: fitId || Math.random().toString(36).substring(7),
      date,
      amountCents: Math.abs(amountCents),
      description: name || memo || 'Transação sem nome',
      memo: memo || '',
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
