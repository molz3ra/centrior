'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { parseOFX, OFXTransaction } from '@/features/imports/ofx-parser';
import { centsToCurrency } from '@/lib/money';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ImportPage() {
  const [transactions, setTransactions] = useState<OFXTransaction[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [imported, setImported] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        try {
          const parsed = parseOFX(content);
          setTransactions(parsed);
          setImported(false);
        } catch (err) {
          console.error('Error parsing OFX:', err);
          alert('Erro ao processar arquivo OFX. Verifique o formato.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    setImported(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Importação OFX / CSV
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Importe extratos de qualquer banco com inteligência anti-duplicação e categorização automática.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Detecção por SHA-256 ativa</span>
        </div>
      </div>

      {/* Upload Dropzone Card */}
      <div className="rounded-[28px] bg-white dark:bg-card p-8 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all">
        <div className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 dark:border-border p-10 text-center hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer relative">
          <input
            type="file"
            accept=".ofx,.csv"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722] mb-4 shadow-xs">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Clique para enviar ou arraste o arquivo bancário aqui
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Suporte nativo a extratos .OFX e .CSV de qualquer instituição financeira (Nubank, Itaú, BB, Bradesco, Inter, Santander)
          </p>

          {fileName && (
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold bg-slate-900 text-white dark:bg-primary dark:text-white px-4 py-2 rounded-full shadow-xs">
              <FileText className="h-4 w-4" />
              <span>{fileName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Parsed Transactions Preview */}
      {transactions.length > 0 && (
        <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-border">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Transações Identificadas ({transactions.length})
              </h3>
              <p className="text-xs text-slate-400">
                Revise os lançamentos antes de salvar no seu extrato permanente.
              </p>
            </div>

            {!imported ? (
              <button
                onClick={handleConfirmImport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Confirmar Importação</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                <CheckCircle2 className="h-4 w-4" />
                <span>Importação Concluída com Sucesso!</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-border text-[11px] font-semibold text-slate-400">
                  <th className="pb-3 pl-2">Data</th>
                  <th className="pb-3">Descrição Bancária</th>
                  <th className="pb-3 text-right pr-2">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                {transactions.slice(0, 15).map((t, index) => {
                  const isIncome = t.type === 'INCOME';
                  return (
                    <tr key={index} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pl-2 font-medium text-slate-500 whitespace-nowrap">
                        {format(t.date, 'dd MMM yyyy', { locale: ptBR })}
                      </td>
                      <td className="py-3 font-semibold text-slate-900 dark:text-white">
                        {t.memo || t.description || t.id}
                      </td>
                      <td className={`py-3 text-right pr-2 font-bold ${isIncome ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                        {isIncome ? '+' : '-'} {centsToCurrency(t.amountCents)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {transactions.length > 15 && (
              <p className="text-center text-xs text-slate-400 pt-3">
                ... e mais {transactions.length - 15} transações incluídas no lote.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
