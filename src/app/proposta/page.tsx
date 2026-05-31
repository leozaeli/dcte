'use client';

import { useState, useMemo, useCallback } from 'react';
import Logo from '@/components/Logo';
import './proposta.css';

// ─── Catalogue ────────────────────────────────────────────────────────────────
const CATALOGUE: Record<string, string[]> = {
  'Instalações Elétricas': ['Instalação de tomada simples','Instalação de tomada dupla','Instalação de tomada 20A','Instalação de tomada 220V','Instalação de interruptor simples','Instalação de interruptor paralelo','Instalação de interruptor intermediário','Instalação de ponto elétrico novo','Instalação de circuito dedicado','Passagem de cabos elétricos','Instalação de eletrodutos','Instalação de canaletas','Instalação de perfilados','Instalação de eletrocalhas','Ampliação de instalação elétrica','Reforma de instalação elétrica'],
  'Quadros Elétricos': ['Instalação de quadro de distribuição','Substituição de quadro elétrico','Montagem de quadro elétrico','Organização de quadro elétrico','Instalação de barramento','Instalação de disjuntor monopolar','Instalação de disjuntor bipolar','Instalação de disjuntor tripolar','Substituição de disjuntores','Balanceamento de cargas','Identificação de circuitos'],
  'Proteção Elétrica': ['Instalação de DR','Instalação de DPS','Instalação de aterramento','Medição de aterramento','Correção de aterramento','Equipotencialização','Proteção contra surtos'],
  'Iluminação': ['Instalação de luminária de sobrepor','Instalação de luminária embutida','Instalação de painel LED','Instalação de spot LED','Instalação de pendente','Instalação de lustre','Instalação de refletor LED','Instalação de sensor de presença','Automação de iluminação','Troca de lâmpadas'],
  'Manutenção Elétrica': ['Visita técnica','Diagnóstico de falha elétrica','Correção de curto-circuito','Correção de fuga de corrente','Correção de aquecimento em conexões','Reparo em tomadas','Reparo em interruptores','Reparo em quadros elétricos','Manutenção preventiva','Manutenção corretiva'],
  'Padrão de Entrada': ['Instalação de padrão de entrada','Adequação de padrão Coelba','Troca de caixa de medição','Instalação de ramal de entrada','Aumento de carga','Regularização junto à concessionária'],
  'Ar-Condicionado': ['Instalação de ponto para ar-condicionado','Instalação de circuito dedicado para AC','Adequação elétrica para ar-condicionado','Troca de disjuntor para climatização'],
  'Fechaduras e Acesso': ['Instalação de fechadura eletrônica','Configuração de fechadura eletrônica','Instalação de controle de acesso','Instalação de videoporteiro','Instalação de porteiro eletrônico'],
  'Segurança Eletrônica': ['Instalação de cerca elétrica','Manutenção de cerca elétrica','Instalação de central de cerca elétrica','Instalação de concertina','Instalação de alarme residencial','Instalação de alarme comercial','Instalação de sensores de presença','Instalação de sensores magnéticos','Manutenção de sistema de alarme'],
  'CFTV': ['Instalação de câmera IP','Instalação de câmera analógica','Instalação de DVR','Instalação de NVR','Configuração de acesso remoto','Passagem de cabeamento para CFTV','Manutenção de sistema de câmeras'],
  'Rede e Dados': ['Instalação de ponto de rede','Cabeamento estruturado','Organização de rack','Instalação de switch','Instalação de roteador','Certificação de ponto de rede'],
  'Veículos Elétricos': ['Instalação de carregador Wallbox','Instalação de carregador veicular portátil','Instalação de circuito dedicado para carregador','Adequação de quadro elétrico para carregador','Instalação de DPS para carregador','Instalação de DR para carregador','Avaliação de capacidade elétrica para recarga','Infraestrutura para eletroposto','Manutenção de carregador veicular'],
  'Energia Solar': ['Infraestrutura elétrica para energia solar','Instalação de string box','Adequação de quadro para energia solar','Instalação de DPS CC/CA','Manutenção elétrica de sistema fotovoltaico'],
  'Inspeções e Laudos': ['Inspeção elétrica residencial','Inspeção elétrica comercial','Inspeção elétrica industrial','Termografia elétrica','Medição de tensão e corrente','Medição de consumo','Relatório técnico','Laudo técnico elétrico'],
  'Outros': ['Visita técnica','Consultoria elétrica','Acompanhamento técnico de obra','Levantamento de cargas','Projeto elétrico básico','Projeto de carregamento para veículos elétricos','Regularização de instalações elétricas','Atendimento emergencial 24 horas'],
};

const WHATSAPP = '5571999142157';
const CNPJ = '65.714.300/0001-88';

const PAYMENT_OPTIONS = [
  'À vista (PIX / Transferência)',
  '50% na contratação + 50% na conclusão',
  '50% na contratação + 50% em 30 dias',
  'Parcelado em 2x sem juros',
  'Parcelado em 3x sem juros',
  'A combinar',
];

type Mat  = { id: string; desc: string; qty: number; unit: string; price: number };
type Item = { id: string; desc: string; qty: number; unit: string; price: number; mats: Mat[] };

function genId() { return Math.random().toString(36).slice(2, 8); }
function genNumber() {
  const d = new Date();
  return `DCTE-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*900+100)}`;
}
function today() { return new Date().toISOString().split('T')[0]; }
function addDays(d: string, n: number) {
  const dt = new Date(d+'T12:00:00'); dt.setDate(dt.getDate()+n);
  return dt.toLocaleDateString('pt-BR');
}
function fmtDate(d: string) { return new Date(d+'T12:00:00').toLocaleDateString('pt-BR'); }
function fmtBRL(v: number) { return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function encodeProposal(data: unknown): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  const chars = Array.from(bytes, b => String.fromCharCode(b));
  return btoa(chars.join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PropostaPage() {
  const [number] = useState(genNumber);
  const [date, setDate] = useState(today);
  const [validity, setValidity] = useState(15);

  const [clientName, setClientName] = useState('');
  const [clientDoc, setClientDoc] = useState('');
  const [clientAddr, setClientAddr] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [totalOverride, setTotalOverride] = useState('');
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [paymentNotes, setPaymentNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  const [materialsIncluded, setMaterialsIncluded] = useState(false);

  const [observations, setObservations] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Services suggestions — filtered only when typing
  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return null; // null = show accordion mode
    const term = search.toLowerCase();
    return Object.entries(CATALOGUE).reduce<{ category: string; services: string[] }[]>((acc, [cat, services]) => {
      const matched = services.filter(s => s.toLowerCase().includes(term) || cat.toLowerCase().includes(term));
      if (matched.length > 0) acc.push({ category: cat, services: matched });
      return acc;
    }, []);
  }, [search]);

  // Services
  const addItem = useCallback((desc: string) => {
    setItems(prev => [...prev, { id: genId(), desc, qty: 1, unit: 'un', price: 0, mats: [] }]);
    setSearch(''); setShowSuggestions(false);
  }, []);
  const removeItem = useCallback((id: string) => setItems(prev => prev.filter(i => i.id !== id)), []);
  const updateItem = useCallback(<K extends keyof Omit<Item,'mats'>>(id: string, key: K, val: Item[K]) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: val } : i)), []);

  // Per-item materials
  const addMat = useCallback((itemId: string) =>
    setItems(prev => prev.map(i => i.id === itemId
      ? { ...i, mats: [...i.mats, { id: genId(), desc: '', qty: 1, unit: 'un', price: 0 }] }
      : i)), []);
  const removeMat = useCallback((itemId: string, matId: string) =>
    setItems(prev => prev.map(i => i.id === itemId
      ? { ...i, mats: i.mats.filter(m => m.id !== matId) }
      : i)), []);
  const updateMat = useCallback(<K extends keyof Omit<Mat,'id'>>(itemId: string, matId: string, key: K, val: Mat[K]) =>
    setItems(prev => prev.map(i => i.id === itemId
      ? { ...i, mats: i.mats.map(m => m.id === matId ? { ...m, [key]: val } : m) }
      : i)), []);

  const subtotal      = items.reduce((s, i) => s + i.qty * i.price, 0);
  const discountVal   = subtotal * (discount / 100);
  const calcLabor     = subtotal - discountVal;
  const laborTotal    = totalOverride ? parseFloat(totalOverride.replace(',', '.')) || 0 : calcLabor;
  const materialsTotal = items.reduce((s, i) => s + i.mats.reduce((ms, m) => ms + m.qty * m.price, 0), 0);
  const grandTotal    = laborTotal + (materialsIncluded ? materialsTotal : 0);

  function handleGenerate() {
    if (!clientName.trim()) { setError('Preencha o nome do cliente para gerar a proposta.'); return; }
    setError('');
    const data = {
      number, date, validity,
      clientName, clientDoc, clientAddr, clientPhone, clientEmail,
      items: items.map(({ id: _id, mats, ...rest }) => ({
        ...rest,
        mats: materialsIncluded ? mats.map(({ id: _mid, ...m }) => m) : [],
      })),
      laborOverride: totalOverride ? parseFloat(totalOverride.replace(',', '.')) || 0 : null,
      discount,
      payment, paymentNotes,
      deadline,
      materialsIncluded,
      observations,
    };
    const encoded = encodeProposal(data);
    const url = `${window.location.origin}/proposta/view?p=${encoded}`;
    setGeneratedUrl(url);
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendWhatsApp() {
    const msg = encodeURIComponent(`Olá ${clientName}, segue sua proposta técnica DCTE:\n${generatedUrl}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  }

  function handlePrint() { window.print(); }

  function handleClear() {
    if (!confirm('Limpar toda a proposta?')) return;
    setItems([]); setMaterialsIncluded(false);
    setClientName(''); setClientDoc(''); setClientAddr('');
    setClientPhone(''); setClientEmail(''); setObservations('');
    setDiscount(0); setDeadline(''); setPayment(PAYMENT_OPTIONS[0]);
    setPaymentNotes(''); setTotalOverride('');
    setGeneratedUrl(''); setError('');
  }

  return (
    <div className="proposta-root">
      <div className="proposta-topbar no-print">
        <div className="proposta-topbar-logo">
          <Logo height={36} />
          <span className="proposta-topbar-label">Gerador de Proposta</span>
        </div>
        <div className="proposta-topbar-actions">
          <button className="prop-btn-ghost" onClick={handleClear}>Limpar</button>
          <button className="prop-btn-ghost" onClick={handlePrint}>
            <i className="fas fa-print" /> PDF
          </button>
        </div>
      </div>

      <div className="proposta-layout">
        {/* ═══ FORM ═══════════════════════════════════════════════════ */}
        <aside className="proposta-form no-print">

          {/* Dados da proposta */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-file-alt" /> Dados da Proposta</h3>
            <div className="prop-row">
              <div className="prop-field">
                <label>Número</label>
                <input readOnly value={number} className="prop-input readonly" />
              </div>
              <div className="prop-field">
                <label>Data de emissão</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="prop-input" />
              </div>
            </div>
            <div className="prop-field">
              <label>Validade</label>
              <div className="prop-chips">
                {[7,15,30].map(v => (
                  <button key={v} className={`prop-chip ${validity===v?'active':''}`} onClick={() => setValidity(v)}>{v} dias</button>
                ))}
              </div>
            </div>
          </section>

          {/* Cliente */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-user" /> Dados do Cliente</h3>
            <div className="prop-field">
              <label>Nome completo / Razão social *</label>
              <input value={clientName} onChange={e => setClientName(e.target.value)} className="prop-input" placeholder="Nome ou empresa do cliente" />
            </div>
            <div className="prop-row">
              <div className="prop-field">
                <label>CPF / CNPJ</label>
                <input value={clientDoc} onChange={e => setClientDoc(e.target.value)} className="prop-input" placeholder="000.000.000-00" />
              </div>
              <div className="prop-field">
                <label>Telefone / WhatsApp</label>
                <input value={clientPhone} onChange={e => setClientPhone(e.target.value)} className="prop-input" placeholder="(71) 9xxxx-xxxx" />
              </div>
            </div>
            <div className="prop-field">
              <label>E-mail</label>
              <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} className="prop-input" placeholder="cliente@email.com" />
            </div>
            <div className="prop-field">
              <label>Endereço do local do serviço</label>
              <input value={clientAddr} onChange={e => setClientAddr(e.target.value)} className="prop-input" placeholder="Rua, nº, bairro, cidade – BA" />
            </div>
          </section>

          {/* Serviços */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-bolt" /> Serviços</h3>

            {/* Toggle de materiais — antes da seleção */}
            <div className="prop-toggle-row">
              <div className="prop-toggle-info">
                <span className="prop-toggle-label">Materiais inclusos</span>
                <span className="prop-toggle-sub">
                  {materialsIncluded
                    ? `${items.reduce((n,i) => n + i.mats.length, 0)} item(s) · ${fmtBRL(materialsTotal)}`
                    : 'Ativar para adicionar materiais por serviço'}
                </span>
              </div>
              <button
                className={`prop-toggle ${materialsIncluded ? 'active' : ''}`}
                onClick={() => setMaterialsIncluded(v => !v)}
                aria-label="Alternar materiais inclusos"
              />
            </div>

            <div className="prop-search-wrap">
              <div className="prop-search-box">
                <i className="fas fa-search prop-search-icon" />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className="prop-input prop-search-input"
                  placeholder="Clique para ver todos os serviços ou digite para filtrar..."
                />
              </div>
              {showSuggestions && (
                <ul className="prop-suggestions">
                  {filteredSuggestions ? (
                    /* ── Modo busca: mostra resultados filtrados expandidos ── */
                    filteredSuggestions.length === 0
                      ? <li className="prop-suggestion-empty">Nenhum resultado para &ldquo;{search}&rdquo;</li>
                      : filteredSuggestions.map(({ category, services }) => (
                          <li key={category} className="prop-suggestion-group">
                            <span className="prop-suggestion-category">{category}</span>
                            <ul>
                              {services.map(s => (
                                <li key={s} onMouseDown={() => addItem(s)}>{s}</li>
                              ))}
                            </ul>
                          </li>
                        ))
                  ) : (
                    /* ── Modo accordion: só categorias, expande ao clicar ── */
                    Object.entries(CATALOGUE).map(([cat, services]) => {
                      const isOpen = expandedCategory === cat;
                      return (
                        <li key={cat} className="prop-suggestion-group">
                          <button
                            className={`prop-suggestion-parent ${isOpen ? 'open' : ''}`}
                            onMouseDown={e => { e.preventDefault(); setExpandedCategory(isOpen ? null : cat); }}
                          >
                            <i className={`fas fa-${isOpen ? 'minus-square' : 'plus-square'} prop-suggestion-toggle-icon`} />
                            <span>{cat}</span>
                            <span className="prop-suggestion-count">{services.length}</span>
                          </button>
                          {isOpen && (
                            <ul className="prop-suggestion-children">
                              {services.map(s => (
                                <li key={s} onMouseDown={() => addItem(s)}>{s}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
            <button className="prop-btn-add" onClick={() => addItem(search.trim() || 'Serviço personalizado')}>
              <i className="fas fa-plus" /> Adicionar item personalizado
            </button>
            {items.length === 0 && <p className="prop-empty">Nenhum serviço adicionado ainda.</p>}
            {items.map((item, idx) => (
              <div className="prop-item" key={item.id}>
                <div className="prop-item-header">
                  <span className="prop-item-num">{idx+1}</span>
                  <button className="prop-item-remove" onClick={() => removeItem(item.id)}><i className="fas fa-times" /></button>
                </div>
                <div className="prop-field">
                  <label>Descrição</label>
                  <input value={item.desc} onChange={e => updateItem(item.id,'desc',e.target.value)} className="prop-input" />
                </div>
                <div className="prop-row prop-row-3">
                  <div className="prop-field">
                    <label>Qtd</label>
                    <input type="number" min="1" value={item.qty} onChange={e => updateItem(item.id,'qty',Number(e.target.value))} className="prop-input" />
                  </div>
                  <div className="prop-field">
                    <label>Unid.</label>
                    <select value={item.unit} onChange={e => updateItem(item.id,'unit',e.target.value)} className="prop-input prop-select">
                      {['un','pç','m','m²','h','sv','vb'].map(u => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                  <div className="prop-field">
                    <label>Valor unit. (R$)</label>
                    <input type="number" min="0" step="0.01" value={item.price} onChange={e => updateItem(item.id,'price',Number(e.target.value))} className="prop-input" placeholder="0,00" />
                  </div>
                </div>
                <div className="prop-item-total">Subtotal: <strong>{fmtBRL(item.qty * item.price)}</strong></div>

                {/* Materiais deste serviço */}
                {materialsIncluded && (
                  <div className="prop-item-mats">
                    <div className="prop-item-mats-header">
                      <i className="fas fa-boxes" /> Materiais deste serviço
                    </div>
                    {item.mats.map((mat, midx) => (
                      <div className="prop-mat-row" key={mat.id}>
                        <span className="prop-mat-num">{midx+1}</span>
                        <input value={mat.desc} onChange={e => updateMat(item.id, mat.id,'desc',e.target.value)} className="prop-input prop-mat-desc" placeholder="Material..." />
                        <input type="number" min="1" value={mat.qty} onChange={e => updateMat(item.id, mat.id,'qty',Number(e.target.value))} className="prop-input prop-mat-qty" />
                        <select value={mat.unit} onChange={e => updateMat(item.id, mat.id,'unit',e.target.value)} className="prop-input prop-select prop-mat-unit">
                          {['un','pç','m','m²','rolo','cx','kg','vb'].map(u => <option key={u}>{u}</option>)}
                        </select>
                        <input type="number" min="0" step="0.01" value={mat.price} onChange={e => updateMat(item.id, mat.id,'price',Number(e.target.value))} className="prop-input prop-mat-price" placeholder="R$" />
                        <button className="prop-item-remove prop-mat-remove" onClick={() => removeMat(item.id, mat.id)}><i className="fas fa-times" /></button>
                      </div>
                    ))}
                    <button className="prop-mat-add" onClick={() => addMat(item.id)}>
                      <i className="fas fa-plus" /> material
                    </button>
                    {item.mats.length > 0 && (
                      <div className="prop-mat-subtotal">
                        Materiais: <strong>{fmtBRL(item.mats.reduce((s,m) => s + m.qty * m.price, 0))}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {items.length > 0 && (
              <div className="prop-field prop-discount">
                <label>Desconto (%)</label>
                <input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="prop-input" style={{maxWidth:'100px'}} />
              </div>
            )}
          </section>

          {/* Valor */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-dollar-sign" /> Valor da Proposta</h3>

            <div className="prop-value-breakdown">
              {/* Mão de obra */}
              <div className="prop-value-row">
                <div className="prop-value-label">
                  <i className="fas fa-hard-hat" />
                  <span>Mão de obra</span>
                </div>
                <div className="prop-value-right">
                  {items.length > 0 && !totalOverride && (
                    <span className="prop-value-calc">{fmtBRL(calcLabor)}</span>
                  )}
                  <input
                    type="text"
                    value={totalOverride}
                    onChange={e => setTotalOverride(e.target.value)}
                    className="prop-input prop-value-input"
                    placeholder={items.length > 0 ? fmtBRL(calcLabor) : 'R$ 0,00'}
                  />
                </div>
              </div>

              {/* Materiais */}
              {materialsIncluded && (
                <div className="prop-value-row prop-value-row-mat">
                  <div className="prop-value-label">
                    <i className="fas fa-boxes" />
                    <span>Materiais</span>
                  </div>
                  <span className="prop-value-calc prop-value-calc-mat">{fmtBRL(materialsTotal)}</span>
                </div>
              )}

              {/* Total */}
              {grandTotal > 0 && (
                <div className="prop-value-total">
                  <span>TOTAL GERAL</span>
                  <span className="prop-total-value">{fmtBRL(grandTotal)}</span>
                </div>
              )}
            </div>
          </section>

          {/* Pagamento */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-money-bill-wave" /> Pagamento</h3>
            <div className="prop-pix-info">
              <i className="fas fa-qrcode" />
              <span>Chave PIX: <strong>{CNPJ}</strong> (CNPJ)</span>
            </div>
            <div className="prop-field">
              <label>Condição de pagamento</label>
              <div className="prop-chips prop-chips-wrap">
                {PAYMENT_OPTIONS.map(opt => (
                  <button key={opt} className={`prop-chip ${payment===opt?'active':''}`} onClick={() => setPayment(opt)}>{opt}</button>
                ))}
              </div>
            </div>
            <div className="prop-field">
              <label>Observações de pagamento</label>
              <input value={paymentNotes} onChange={e => setPaymentNotes(e.target.value)} className="prop-input" placeholder="Informações adicionais sobre pagamento..." />
            </div>
          </section>

          {/* Execução */}
          <section className="prop-section">
            <h3 className="prop-section-title"><i className="fas fa-calendar-check" /> Execução</h3>
            <div className="prop-field">
              <label>Prazo estimado de execução</label>
              <input value={deadline} onChange={e => setDeadline(e.target.value)} className="prop-input" placeholder="Ex: 2 dias úteis após aprovação" />
            </div>
            <div className="prop-field">
              <label>Observações técnicas</label>
              <textarea value={observations} onChange={e => setObservations(e.target.value)} className="prop-input prop-textarea" placeholder="Condições do serviço, exclusões, acessos necessários..." />
            </div>
          </section>

          {error && <p className="prop-error"><i className="fas fa-exclamation-circle" /> {error}</p>}

          <button className="prop-btn-generate" onClick={handleGenerate}>
            <i className="fas fa-paper-plane" /> Gerar Proposta
          </button>

          {generatedUrl && (
            <div className="prop-generated-box">
              <div className="prop-generated-header">
                <i className="fas fa-check-circle" />
                <span>Proposta gerada com sucesso!</span>
              </div>
              <p className="prop-generated-subtitle">Copie o link abaixo e envie ao cliente:</p>
              <div className="prop-generated-url">
                <span>{generatedUrl}</span>
                <button onClick={handleCopy} className={`prop-copy-btn ${copied?'copied':''}`}>
                  <i className={`fas fa-${copied?'check':'copy'}`} />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <button className="prop-btn-whatsapp" onClick={handleSendWhatsApp}>
                <i className="fab fa-whatsapp" /> Enviar link via WhatsApp
              </button>
            </div>
          )}
        </aside>

        {/* ═══ PREVIEW ════════════════════════════════════════════════ */}
        <main className="proposta-preview">
          <div className="prop-doc">
            <div className="prop-doc-header">
              <Logo height={52} />
              <div className="prop-doc-header-info">
                <p className="prop-doc-type">PROPOSTA TÉCNICA COMERCIAL</p>
                <p className="prop-doc-number">Nº {number}</p>
                <p className="prop-doc-meta">Emissão: {fmtDate(date)}</p>
                <p className="prop-doc-meta">Válida até: {addDays(date, validity)}</p>
              </div>
            </div>

            <div className="prop-doc-divider" />

            <div className="prop-doc-section">
              <h4 className="prop-doc-section-title">DADOS DO CLIENTE</h4>
              <div className="prop-doc-client-grid">
                <div><span>Nome</span><p>{clientName || '—'}</p></div>
                {clientDoc && <div><span>CPF/CNPJ</span><p>{clientDoc}</p></div>}
                {clientPhone && <div><span>Telefone</span><p>{clientPhone}</p></div>}
                {clientEmail && <div><span>E-mail</span><p>{clientEmail}</p></div>}
                {clientAddr && <div className="prop-doc-full-col"><span>Local do serviço</span><p>{clientAddr}</p></div>}
              </div>
            </div>

            {items.length > 0 && (
              <div className="prop-doc-section">
                <h4 className="prop-doc-section-title">ESCOPO DE SERVIÇOS</h4>
                <div className="prop-doc-table-wrap">
                  <table className="prop-doc-table">
                    <thead><tr><th>#</th><th>Descrição</th><th>Qtd</th><th>Un.</th><th>Unit.</th><th>Total</th></tr></thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <>
                          <tr key={item.id}>
                            <td className="center">{idx+1}</td>
                            <td>{item.desc}</td>
                            <td className="center">{item.qty}</td>
                            <td className="center">{item.unit}</td>
                            <td className="right">{fmtBRL(item.price)}</td>
                            <td className="right bold">{fmtBRL(item.qty * item.price)}</td>
                          </tr>
                          {materialsIncluded && item.mats.map(mat => (
                            <tr key={mat.id} className="prop-doc-mat-row">
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
                {!totalOverride && (
                  <div className="prop-doc-totals">
                    {discount > 0 && <>
                      <div className="prop-doc-total-row"><span>Subtotal serviços</span><span>{fmtBRL(subtotal)}</span></div>
                      <div className="prop-doc-total-row discount"><span>Desconto ({discount}%)</span><span>- {fmtBRL(discountVal)}</span></div>
                    </>}
                    {materialsIncluded && materialsTotal > 0 && (
                      <div className="prop-doc-total-row"><span>Total materiais</span><span>{fmtBRL(materialsTotal)}</span></div>
                    )}
                    <div className="prop-doc-total-row final"><span>TOTAL</span><span>{fmtBRL(grandTotal)}</span></div>
                  </div>
                )}
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
                  {materialsIncluded && materialsTotal > 0 && (
                    <div className="prop-doc-value-row">
                      <span>Materiais</span>
                      <span>{fmtBRL(materialsTotal)}</span>
                    </div>
                  )}
                  <div className="prop-doc-value-row prop-doc-value-total">
                    <span>TOTAL GERAL</span>
                    <span className="prop-doc-total-hero-value">{fmtBRL(grandTotal)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="prop-doc-section">
              <h4 className="prop-doc-section-title">CONDIÇÕES DE PAGAMENTO</h4>
              <p className="prop-doc-text">{payment}</p>
              <p className="prop-doc-text prop-doc-note">Chave PIX: {CNPJ} (CNPJ)</p>
              {paymentNotes && <p className="prop-doc-text prop-doc-note">{paymentNotes}</p>}
            </div>

            {(deadline || materialsIncluded || observations) && (
              <div className="prop-doc-section">
                <h4 className="prop-doc-section-title">INFORMAÇÕES TÉCNICAS</h4>
                {deadline && <p className="prop-doc-text"><strong>Prazo de execução:</strong> {deadline}</p>}
                <p className="prop-doc-text"><strong>Materiais:</strong> {materialsIncluded ? 'Inclusos conforme tabela acima.' : 'Não inclusos nesta proposta.'}</p>
                {observations && <p className="prop-doc-text"><strong>Observações:</strong> {observations}</p>}
              </div>
            )}

            <div className="prop-doc-validity">
              <i className="fas fa-info-circle" />
              Válida por <strong>{validity} dias</strong> — expira em <strong>{addDays(date, validity)}</strong>.
            </div>

            <div className="prop-doc-footer">
              <p>DCTE — Deividson Charles | Técnico em Eletrotécnica</p>
              <p>CNPJ {CNPJ} · dcte.eletrotecnico@gmail.com</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
