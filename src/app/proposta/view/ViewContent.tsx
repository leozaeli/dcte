'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Logo from '@/components/Logo';
import '../proposta.css';

// ─── Decode ───────────────────────────────────────────────────────────────────
function decodeProposal<T>(str: string): T {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const chars = atob(base64 + padding);
  const bytes = new Uint8Array(chars.split('').map(c => c.charCodeAt(0)));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Mat  = { desc: string; qty: number; unit: string; price: number };
type Item = { desc: string; qty: number; unit: string; price: number; mats: Mat[] };
const CNPJ = '65.714.300/0001-88';

type Proposal = {
  number: string; date: string; validity: number;
  clientName: string; clientDoc: string; clientAddr: string; clientPhone: string; clientEmail: string;
  items: Item[];
  laborOverride: number | null;
  discount: number;
  payment: string; paymentNotes: string;
  deadline: string;
  materialsIncluded: boolean;
  observations: string;
};

function addDays(d: string, n: number) {
  const dt = new Date(d+'T12:00:00'); dt.setDate(dt.getDate()+n);
  return dt.toLocaleDateString('pt-BR');
}
function fmtDate(d: string) { return new Date(d+'T12:00:00').toLocaleDateString('pt-BR'); }
function fmtBRL(v: number) { return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

const WHATSAPP = '5571999142157';

// ─── Component ────────────────────────────────────────────────────────────────
export default function ViewContent() {
  const params = useSearchParams();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const proposal = useMemo<Proposal | null>(() => {
    const p = params.get('p');
    if (!p) return null;
    try { return decodeProposal<Proposal>(p); }
    catch { return null; }
  }, [params]);

  if (!proposal) {
    return (
      <div className="view-error">
        <i className="fas fa-exclamation-triangle" />
        <h2>Proposta não encontrada</h2>
        <p>O link pode estar incorreto ou expirado.</p>
      </div>
    );
  }

  const subtotal    = proposal.items.reduce((s, i) => s + i.qty * i.price, 0);
  const discountVal = subtotal * (proposal.discount / 100);
  const calcLabor   = subtotal - discountVal;
  const laborTotal  = proposal.laborOverride ?? calcLabor;
  const matsTotal   = proposal.materialsIncluded
    ? proposal.items.reduce((s, i) => s + (i.mats||[]).reduce((ms, m) => ms + m.qty * m.price, 0), 0)
    : 0;
  const grandTotal  = laborTotal + matsTotal;

  function buildAcceptMsg() {
    const servicesList = proposal!.items.length > 0
      ? proposal!.items.map(i => `• ${i.desc} (${i.qty} ${i.unit})`).join('%0A')
      : '';
    return encodeURIComponent(
      `✅ *ACEITE DE PROPOSTA — DCTE*\n\n` +
      `Proposta: ${proposal!.number}\n` +
      `Cliente: ${proposal!.clientName}\n` +
      (proposal!.clientAddr ? `Local: ${proposal!.clientAddr}\n` : '') +
      `Valor: ${fmtBRL(grandTotal)}\n` +
      (servicesList ? `\n*Serviços contratados:*\n${proposal!.items.map(i => `• ${i.desc} (${i.qty} ${i.unit})`).join('\n')}\n` : '') +
      `\n✅ *Aceito os termos desta proposta e confirmo a contratação dos serviços acima.*`
    );
  }

  function buildRejectMsg(reason: string) {
    return encodeURIComponent(
      `❌ *RECUSA DE PROPOSTA — DCTE*\n\n` +
      `Proposta: ${proposal!.number}\n` +
      `Cliente: ${proposal!.clientName}\n` +
      `Valor: ${fmtBRL(grandTotal)}\n\n` +
      `*Motivo da recusa:*\n${reason}`
    );
  }

  function handleAccept() {
    window.open(`https://wa.me/${WHATSAPP}?text=${buildAcceptMsg()}`, '_blank');
  }

  function handleRejectConfirm() {
    if (!rejectReason.trim()) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${buildRejectMsg(rejectReason)}`, '_blank');
  }

  return (
    <div className="view-root">
      <div className="view-header">
        <Logo height={40} />
      </div>

      <div className="view-container">
        <div className="prop-doc">
          {/* Header */}
          <div className="prop-doc-header">
            <Logo height={52} />
            <div className="prop-doc-header-info">
              <p className="prop-doc-type">PROPOSTA TÉCNICA COMERCIAL</p>
              <p className="prop-doc-number">Nº {proposal.number}</p>
              <p className="prop-doc-meta">Emissão: {fmtDate(proposal.date)}</p>
              <p className="prop-doc-meta">Válida até: {addDays(proposal.date, proposal.validity)}</p>
            </div>
          </div>

          <div className="prop-doc-divider" />

          {/* Client */}
          <div className="prop-doc-section">
            <h4 className="prop-doc-section-title">DADOS DO CLIENTE</h4>
            <div className="prop-doc-client-grid">
              <div><span>Nome</span><p>{proposal.clientName}</p></div>
              {proposal.clientDoc && <div><span>CPF/CNPJ</span><p>{proposal.clientDoc}</p></div>}
              {proposal.clientPhone && <div><span>Telefone</span><p>{proposal.clientPhone}</p></div>}
              {proposal.clientEmail && <div><span>E-mail</span><p>{proposal.clientEmail}</p></div>}
              {proposal.clientAddr && <div className="prop-doc-full-col"><span>Local do serviço</span><p>{proposal.clientAddr}</p></div>}
            </div>
          </div>

          {/* Services + materials per item */}
          {proposal.items.length > 0 && (
            <div className="prop-doc-section">
              <h4 className="prop-doc-section-title">ESCOPO DE SERVIÇOS</h4>
              <div className="prop-doc-table-wrap">
                <table className="prop-doc-table">
                  <thead>
                    <tr><th>#</th><th>Descrição</th><th>Qtd</th><th>Un.</th><th>Unit.</th><th>Total</th></tr>
                  </thead>
                  <tbody>
                    {proposal.items.map((item, idx) => (
                      <>
                        <tr key={idx}>
                          <td className="center">{idx+1}</td>
                          <td>{item.desc}</td>
                          <td className="center">{item.qty}</td>
                          <td className="center">{item.unit}</td>
                          <td className="right">{fmtBRL(item.price)}</td>
                          <td className="right bold">{fmtBRL(item.qty * item.price)}</td>
                        </tr>
                        {proposal.materialsIncluded && item.mats?.map((mat, midx) => (
                          <tr key={`mat-${midx}`} className="prop-doc-mat-row">
                            <td />
                            <td className="prop-doc-mat-cell"><i className="fas fa-cube" /> {mat.desc}</td>
                            <td className="center">{mat.qty}</td>
                            <td className="center">{mat.unit}</td>
                            <td className="right">{fmtBRL(mat.price)}</td>
                            <td className="right">{fmtBRL(mat.qty * mat.price)}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              {!proposal.laborOverride && (() => {
                const matsTotal = proposal.materialsIncluded
                  ? proposal.items.reduce((s, i) => s + (i.mats||[]).reduce((ms,m) => ms + m.qty * m.price, 0), 0)
                  : 0;
                return (
                  <div className="prop-doc-totals">
                    {proposal.discount > 0 && <>
                      <div className="prop-doc-total-row"><span>Subtotal serviços</span><span>{fmtBRL(subtotal)}</span></div>
                      <div className="prop-doc-total-row discount"><span>Desconto ({proposal.discount}%)</span><span>- {fmtBRL(discountVal)}</span></div>
                    </>}
                    {matsTotal > 0 && <div className="prop-doc-total-row"><span>Total materiais</span><span>{fmtBRL(matsTotal)}</span></div>}
                    <div className="prop-doc-total-row final"><span>TOTAL</span><span>{fmtBRL(grandTotal)}</span></div>
                  </div>
                );
              })()}
            </div>
          )}

          {grandTotal > 0 && (
            <div className="prop-doc-section">
              <h4 className="prop-doc-section-title">VALOR DA PROPOSTA</h4>
              <div className="prop-doc-value-breakdown">
                <div className="prop-doc-value-row">
                  <span>Mão de obra</span>
                  <span>{fmtBRL(laborTotal)}</span>
                </div>
                {proposal.materialsIncluded && matsTotal > 0 && (
                  <div className="prop-doc-value-row">
                    <span>Materiais</span>
                    <span>{fmtBRL(matsTotal)}</span>
                  </div>
                )}
                <div className="prop-doc-value-row prop-doc-value-total">
                  <span>TOTAL GERAL</span>
                  <span className="prop-doc-total-hero-value">{fmtBRL(grandTotal)}</span>
                </div>
              </div>
            </div>
          )}


          {/* Payment */}
          <div className="prop-doc-section">
            <h4 className="prop-doc-section-title">CONDIÇÕES DE PAGAMENTO</h4>
            <p className="prop-doc-text">{proposal.payment}</p>
            <p className="prop-doc-text prop-doc-note">Chave PIX: {CNPJ} (CNPJ)</p>
            {proposal.paymentNotes && <p className="prop-doc-text prop-doc-note">{proposal.paymentNotes}</p>}
          </div>

          {/* Technical */}
          {(proposal.deadline || proposal.materialsIncluded || proposal.observations) && (
            <div className="prop-doc-section">
              <h4 className="prop-doc-section-title">INFORMAÇÕES TÉCNICAS</h4>
              {proposal.deadline && <p className="prop-doc-text"><strong>Prazo de execução:</strong> {proposal.deadline}</p>}
              <p className="prop-doc-text"><strong>Materiais:</strong> {proposal.materialsIncluded ? 'Inclusos conforme tabela acima.' : 'Não inclusos nesta proposta.'}</p>
              {proposal.observations && <p className="prop-doc-text"><strong>Observações:</strong> {proposal.observations}</p>}
            </div>
          )}

          {/* Validity */}
          <div className="prop-doc-validity">
            <i className="fas fa-info-circle" />
            Válida por <strong>{proposal.validity} dias</strong> — expira em <strong>{addDays(proposal.date, proposal.validity)}</strong>.
          </div>

          <div className="prop-doc-footer">
            <p>DCTE — Deividson Charles | Técnico em Eletrotécnica</p>
            <p>CNPJ 65.714.300/0001-88 · dcte.eletrotecnico@gmail.com</p>
          </div>
        </div>

        {/* ─── Action buttons ──────────────────────────────────── */}
        <div className="view-actions">
          <p className="view-actions-title">O que deseja fazer com esta proposta?</p>

          <div className="view-actions-row">
            <button className="view-btn-accept" onClick={handleAccept}>
              <i className="fas fa-check-circle" />
              Aceitar Proposta
            </button>

            <button
              className={`view-btn-reject ${rejectOpen ? 'open' : ''}`}
              onClick={() => setRejectOpen(!rejectOpen)}
            >
              <i className="fas fa-times-circle" />
              Recusar Proposta
            </button>
          </div>

          {rejectOpen && (
            <div className="view-reject-box">
              <label className="view-reject-label">Por que deseja recusar? (opcional, mas ajuda muito)</label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="view-reject-textarea"
                placeholder="Ex: Valor acima do esperado, já contratei outro profissional..."
                rows={4}
              />
              <button
                className="view-btn-reject-confirm"
                onClick={handleRejectConfirm}
                disabled={!rejectReason.trim()}
              >
                <i className="fab fa-whatsapp" /> Enviar recusa via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
