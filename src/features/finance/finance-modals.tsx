'use client';

import React, { useState } from 'react';
import { useFinanceData } from '@/features/finance/finance-context';
import { X, Landmark, Receipt, CreditCard, PieChart, Plus, Loader2 } from 'lucide-react';
import { centsToCurrency } from '@/lib/money';

export function FinanceModals() {
  const {
    isAddAccountOpen,
    setIsAddAccountOpen,
    isAddTransactionOpen,
    setIsAddTransactionOpen,
    isAddCardOpen,
    setIsAddCardOpen,
    addAccount,
    addTransaction,
    addCard,
    accounts,
  } = useFinanceData();

  // Modal 1: Adicionar Conta
  const [accName, setAccName] = useState('');
  const [accType, setAccType] = useState<'Conta Corrente' | 'Poupança' | 'Investimento' | 'Dinheiro Vivo'>('Conta Corrente');
  const [accInstitution, setAccInstitution] = useState('');
  const [accBalance, setAccBalance] = useState('');

  // Modal 2: Nova Transação
  const [txDesc, setTxDesc] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [txCategory, setTxCategory] = useState('Geral');
  const [txAccount, setTxAccount] = useState('');

  // Modal 3: Novo Cartão
  const [cardName, setCardName] = useState('');
  const [cardBrand, setCardBrand] = useState('Mastercard Black');
  const [cardLast4, setCardLast4] = useState('');
  const [cardLimit, setCardLimit] = useState('');

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accName || !accInstitution) return;

    const balanceFloat = parseFloat(accBalance.replace(/\./g, '').replace(',', '.')) || 0;
    const balanceCents = Math.round(balanceFloat * 100);

    const colors = ['bg-amber-600', 'bg-purple-700', 'bg-[#FF5722]', 'bg-blue-600', 'bg-emerald-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addAccount({
      name: accName,
      type: accType,
      institutionName: accInstitution,
      balanceCents,
      color: randomColor,
      status: 'Ativa',
    });

    setAccName('');
    setAccInstitution('');
    setAccBalance('');
    setIsAddAccountOpen(false);
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc || !txAmount) return;

    const amountFloat = parseFloat(txAmount.replace(/\./g, '').replace(',', '.')) || 0;
    const amountCents = Math.round(amountFloat * 100);

    addTransaction({
      description: txDesc,
      amountCents,
      type: txType,
      category: txCategory,
      account: txAccount || (accounts[0]?.name || 'Conta Padrão'),
      date: new Date(),
    });

    setTxDesc('');
    setTxAmount('');
    setIsAddTransactionOpen(false);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardLimit) return;

    const limitFloat = parseFloat(cardLimit.replace(/\./g, '').replace(',', '.')) || 0;
    const limitCents = Math.round(limitFloat * 100);

    addCard({
      name: cardName,
      brand: cardBrand,
      last4: cardLast4 || '0000',
      colorTheme: 'from-zinc-900 via-zinc-900 to-black border-zinc-800 text-white',
      limitCents,
      usedCents: 0,
      closingDay: 20,
      dueDay: 27,
      status: 'Fatura Aberta',
    });

    setCardName('');
    setCardLast4('');
    setCardLimit('');
    setIsAddCardOpen(false);
  };

  return (
    <>
      {/* Modal 1: Adicionar Conta */}
      {isAddAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddAccountOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722]">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cadastrar Conta Bancária
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Adicione sua conta ou carteira real para iniciar seu saldo.
                </p>
              </div>
            </div>

            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nome da Conta (Apelido)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nubank Principal, Itaú Salário"
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Instituição Financeira
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Nubank, Itaú, Inter"
                    value={accInstitution}
                    onChange={(e) => setAccInstitution(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tipo de Conta
                  </label>
                  <select
                    value={accType}
                    onChange={(e) => setAccType(e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  >
                    <option value="Conta Corrente">Conta Corrente</option>
                    <option value="Poupança">Poupança & Reserva</option>
                    <option value="Investimento">Investimentos</option>
                    <option value="Dinheiro Vivo">Dinheiro em Espécie</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Saldo Inicial (R$)
                </label>
                <input
                  type="text"
                  placeholder="0,00"
                  value={accBalance}
                  onChange={(e) => setAccBalance(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddAccountOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-border text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Salvar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Nova Transação */}
      {isAddTransactionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddTransactionOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722]">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Novo Lançamento Financeiro
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Registre uma receita ou despesa manual em seu extrato.
                </p>
              </div>
            </div>

            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              {/* Type Switch */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setTxType('EXPENSE')}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    txType === 'EXPENSE'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  onClick={() => setTxType('INCOME')}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    txType === 'INCOME'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Receita
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Descrição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Supermercado, Salário, Internet"
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Moradia">Moradia</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Salário">Salário / Renda</option>
                    <option value="Lazer">Lazer & Viagens</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Geral">Outros</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Conta de Origem / Destino
                </label>
                <select
                  value={txAccount}
                  onChange={(e) => setTxAccount(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                >
                  {accounts.length > 0 ? (
                    accounts.map((acc) => (
                      <option key={acc.id} value={acc.name}>
                        {acc.name} ({acc.institutionName || acc.type})
                      </option>
                    ))
                  ) : (
                    <option value="Conta Principal">Conta Principal</option>
                  )}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddTransactionOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-border text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Confirmar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Adicionar Cartão */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddCardOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cadastrar Cartão de Crédito
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Acompanhe limites, fatura aberta e data de fechamento.
                </p>
              </div>
            </div>

            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nome do Cartão (Apelido)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nubank Ultravioleta, C6 Carbon"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Bandeira
                  </label>
                  <select
                    value={cardBrand}
                    onChange={(e) => setCardBrand(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  >
                    <option value="Mastercard Black">Mastercard Black</option>
                    <option value="Visa Infinite">Visa Infinite</option>
                    <option value="Mastercard Platinum">Mastercard Platinum</option>
                    <option value="Visa Signature">Visa Signature</option>
                    <option value="Elo Nanquim">Elo Nanquim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Últimos 4 Dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Ex: 8841"
                    value={cardLast4}
                    onChange={(e) => setCardLast4(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Limite Total do Cartão (R$)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 10.000,00"
                  value={cardLimit}
                  onChange={(e) => setCardLimit(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddCardOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-border text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Salvar Cartão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

