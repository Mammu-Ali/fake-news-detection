/* Signal Desk style: editorial research desk, parchment surfaces, ink typography, cobalt evidence marks, coral caution signal. */
import { useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  Link2,
  Loader2,
  RotateCcw,
  ScanSearch,
  ShieldAlert,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { AnalysisApiError, analyzeDocument, analyzeText, analyzeUrl } from "@/lib/analysisApi";

const SIGNAL_MARK = "/manus-storage/signal-desk-mark_915b6abe.png";
const PAPER_TEXTURE = "/manus-storage/paper-signal-texture_8a8f934c.png";
const EVIDENCE_COLLAGE = "/manus-storage/evidence-collage_779ca6ff.png";
const SIGNAL_ORBIT = "/manus-storage/signal-orbit_066a9e05.png";

const modes = [
  { id: "text", label: "Paste text", icon: FileText },
  { id: "url", label: "Article URL", icon: Link2 },
  { id: "document", label: "Upload file", icon: Upload },
];

const demoArticle = `A new study claims that schools using one simple morning ritual have reduced student absence by 47% in just two weeks. The researchers say the result is “too consistent to ignore,” but the article does not name the study, the schools, or the researchers.`;
const loadingStages = ["Preparing the item", "Reading language signals", "Assembling the readout"];

function formatConfidence(value) {
  return `${Math.round(value * 100)}%`;
}

function normalizeAnalysis(payload, mode) {
  if (payload?.status === "unavailable") {
    throw new AnalysisApiError(payload?.error?.message || "The service could not find enough usable content to analyse this item.", payload?.error?.code || "ANALYSIS_UNAVAILABLE");
  }

  const result = payload?.result || payload?.analysis || payload;
  const prediction = result?.prediction || result;
  const rawLabel = String(prediction?.label || prediction?.classification || "").trim().toLowerCase();
  const label = rawLabel === "fake" || rawLabel === "false" ? "Fake" : rawLabel === "not fake" || rawLabel === "real" || rawLabel === "true" ? "Not Fake" : "";
  const rawConfidence = Number(prediction?.confidence ?? prediction?.score ?? prediction?.probability);
  const confidence = rawConfidence > 1 ? rawConfidence / 100 : rawConfidence;
  if (!label || !Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
    throw new AnalysisApiError("The analysis service returned an incomplete result. Try again or contact the API owner.", "MALFORMED_RESPONSE");
  }

  const explanation = result?.explanation || {};
  const rawSignals = explanation?.signals || result?.signals || result?.evidence || result?.factors || [];
  const signals = Array.isArray(rawSignals)
    ? rawSignals.map((signal) => {
        if (typeof signal === "string") return { title: "Model signal", detail: signal };
        return { title: signal?.title || signal?.kind || signal?.name || "Model signal", detail: signal?.detail || signal?.description || signal?.text || "No additional detail was provided." };
      })
    : [];

  return {
    id: payload?.analysis_id || result?.analysis_id || "live-analysis",
    label,
    confidence,
    explanation: typeof explanation === "string" ? explanation : result?.summary || "The API returned a prediction without an additional explanation.",
    signals,
    limitations: Array.isArray(result?.limitations) ? result.limitations : [],
    language: result?.language || "Not provided",
    model: typeof result?.model === "string" ? result.model : [result?.model?.name, result?.model?.version].filter(Boolean).join(" / ") || "FastAPI analysis service",
    modality: Array.isArray(result?.modalities_analyzed) ? result.modalities_analyzed.join(", ") : mode === "document" ? "document" : mode,
  };
}

function LoadingReadout({ activeStep }) {
  return (
    <section className="loading-panel" aria-live="polite" aria-busy="true">
      <div className="loading-orbit"><span /><span /><span /></div>
      <div className="loading-copy"><p className="eyebrow"><span className="signal-dot" /> SIGNAL DESK / WORKING</p><h2>Reading the readout<span className="loading-ellipsis">…</span></h2><p>The service is comparing the item with its learned language signals. Keep this tab open.</p></div>
      <div className="loading-stages">{loadingStages.map((stage, index) => <div key={stage} className={index <= activeStep ? "loading-stage active" : "loading-stage"}><span>{index < activeStep ? <Check size={13} /> : index + 1}</span><div><strong>{stage}</strong><small>{index < activeStep ? "complete" : index === activeStep ? "in progress" : "queued"}</small></div></div>)}</div>
      <div className="loading-bar"><span /></div>
    </section>
  );
}

function ResultPanel({ analysis, onReset, onRetry }) {
  const isFake = analysis.label === "Fake";
  const confidenceWidth = `${Math.round(analysis.confidence * 100)}%`;
  const signals = analysis.signals.length ? analysis.signals : [{ title: "No signal detail returned", detail: "The API supplied a prediction, but no supporting signal list was included." }];
  const signalIcons = [ScanSearch, Sparkles, CircleAlert];
  return (
    <section className={`result-panel ${isFake ? "fake-result" : "not-fake-result"} animate-in fade-in slide-in-from-bottom-3 duration-500`} aria-live="polite">
      <div className="result-topline"><span className="eyebrow"><span className="signal-dot" /> MODEL READOUT / {analysis.id}</span><button className="text-button" onClick={onReset}><RotateCcw size={14} /> New analysis</button></div>
      <div className="result-heading"><div><p className="result-kicker">Automated prediction</p><h2>{analysis.label}</h2><p className="result-subtitle">{analysis.explanation}</p></div><div className="confidence-block"><span className="confidence-value">{formatConfidence(analysis.confidence)}</span><span className="confidence-label">model confidence</span></div></div>
      <div className="confidence-track" aria-label={`Model confidence ${formatConfidence(analysis.confidence)}`}><span style={{ width: confidenceWidth }} /></div>
      <div className="result-grid"><div className="result-card evidence-card"><div className="card-title-row"><span className="card-index">01</span><h3>Signals behind the call</h3></div><p className="card-caption">Model-derived signals, not independent proof.</p><div className="signal-list">{signals.map((signal, index) => { const Icon = signalIcons[index % signalIcons.length]; return <div className="signal-item" key={`${signal.title}-${index}`}><span className="signal-icon"><Icon size={15} /></span><div><strong>{signal.title}</strong><span>{signal.detail}</span></div></div>; })}</div></div><div className="result-card limitation-card"><div className="card-title-row"><span className="card-index sage-index">02</span><h3>Read this carefully</h3></div><p className="card-caption">The part a human still has to do.</p><div className="limitation-copy"><ShieldAlert size={18} /><p>{analysis.limitations[0] || "This is a model prediction, not a fact-check. A “Not Fake” result would not prove an article true. Verify the original source, context, and claim before sharing."}</p></div><div className="modality-row"><span className="mini-label">ANALYSED</span><span className="modality-pill"><Check size={13} /> {analysis.modality}</span><span className="modality-pill muted-pill">evidence requires review</span></div></div></div>
      <div className="result-footer"><span>Model: {analysis.model}</span><span>Language: {analysis.language}</span><span>Confidence is not truth probability.</span><button className="retry-link" onClick={onRetry}>Retry request <ArrowUpRight size={12} /></button></div>
    </section>
  );
}

export default function Home() {
  const [mode, setMode] = useState("text");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [retryableError, setRetryableError] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const requestRef = useRef(null);
  const loadingTimerRef = useRef(null);

  const placeholder = useMemo(() => {
    if (mode === "url") return "https://example.com/article-to-analyse";
    if (mode === "document") return "Choose a TXT, PDF, or DOCX file";
    return "Paste a headline, paragraph, or full article here…";
  }, [mode]);

  const clearRequestTimers = () => {
    if (loadingTimerRef.current) window.clearInterval(loadingTimerRef.current);
    loadingTimerRef.current = null;
  };

  const handleModeChange = (nextMode) => {
    requestRef.current?.abort();
    clearRequestTimers();
    setMode(nextMode); setValue(""); setFile(null); setFileName(""); setError(""); setRetryableError(false); setAnalysis(null); setStatus("idle");
  };

  const handleFile = (nextFile) => {
    if (!nextFile) return;
    const allowed = ["text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(nextFile.type) && !/\.(txt|pdf|docx)$/i.test(nextFile.name)) { setError("That file type is not supported. Choose a TXT, PDF, or DOCX file."); setFile(null); setFileName(""); return; }
    if (nextFile.size > 10 * 1024 * 1024) { setError("This file is larger than 10 MB. Choose a smaller classroom example."); setFile(null); setFileName(""); return; }
    setError(""); setFile(nextFile); setFileName(nextFile.name); setStatus("idle");
  };

  const validateInput = () => {
    if (mode === "document" && !file) return "Choose a document before analysing it.";
    if (mode !== "document" && !value.trim()) return mode === "url" ? "Paste an article URL to continue." : "Paste at least one paragraph to continue.";
    if (mode === "url") {
      try { const parsed = new URL(value.trim()); if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("invalid"); } catch { return "Use a complete public URL beginning with https://."; }
    }
    if (mode === "text" && value.trim().length < 80) return "Add a little more context—at least 80 characters helps the model read the claim.";
    return "";
  };

  const handleAnalyze = async () => {
    const validationError = validateInput();
    if (validationError) { setError(validationError); setRetryableError(false); setStatus("error"); return; }
    requestRef.current?.abort();
    clearRequestTimers();
    const controller = new AbortController();
    requestRef.current = controller;
    setError(""); setRetryableError(false); setAnalysis(null); setStatus("loading"); setLoadingStep(0);
    let currentStep = 0;
    loadingTimerRef.current = window.setInterval(() => { currentStep = Math.min(currentStep + 1, loadingStages.length - 1); setLoadingStep(currentStep); }, 900);
    try {
      const response = mode === "text" ? await analyzeText(value.trim(), { signal: controller.signal }) : mode === "url" ? await analyzeUrl(value.trim(), { signal: controller.signal }) : await analyzeDocument(file, { signal: controller.signal });
      setAnalysis(normalizeAnalysis(response, mode)); setLoadingStep(2); setStatus("result");
    } catch (requestError) {
      if (controller.signal.aborted) return;
      if (requestError?.code === "REQUEST_TIMEOUT" || requestError?.code === "NETWORK_ERROR" || requestError instanceof AnalysisApiError) { setError(requestError.message); setRetryableError(true); setStatus("error"); }
      else { setError("Something unexpected interrupted the analysis. Try again."); setRetryableError(true); setStatus("error"); }
    } finally {
      clearRequestTimers();
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  const loadExample = () => { setMode("text"); setValue(demoArticle); setFile(null); setFileName(""); setError(""); setRetryableError(false); setAnalysis(null); setStatus("idle"); };
  const reset = () => { requestRef.current?.abort(); clearRequestTimers(); setValue(""); setFile(null); setFileName(""); setError(""); setRetryableError(false); setAnalysis(null); setStatus("idle"); };

  return (
    <div className="signal-app" style={{ backgroundImage: `url(${PAPER_TEXTURE})` }}>
      <header className="site-header"><a className="brand" href="/" aria-label="Signal Desk home"><img src={SIGNAL_MARK} alt="" className="brand-mark" /><span className="brand-name">signal<span>desk</span></span></a><nav className="header-nav" aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#classroom">For the classroom</a></nav><div className="header-status"><span className="status-ring" /> educational prototype <ChevronDown size={14} /></div></header>
      <main>
        <section className="hero-shell"><aside className="hero-rail"><span className="rail-label">ANALYSIS / 01</span><div className="rail-line"><span className="rail-pip" /></div><span className="rail-label rail-bottom">MODEL, MEET HUMAN</span></aside><div className="hero-copy"><p className="eyebrow"><span className="signal-dot" /> A CLASSROOM TOOL FOR READING THE READOUT</p><h1>Don’t just ask if it’s fake.<br /><em>Ask what the model saw.</em></h1><p className="hero-lede">Signal Desk turns a news item into a teachable moment—prediction, confidence, signals, and the limits that belong beside them.</p><div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById("analyser")?.scrollIntoView({ behavior: "smooth" })}>Analyse an item <ArrowUpRight size={16} /></button><button className="quiet-button" onClick={loadExample}>Try a classroom example <span>↗</span></button></div></div><div className="hero-art"><img src={EVIDENCE_COLLAGE} alt="Printed news page and evidence cards arranged on a research desk" /><div className="art-caption"><span>FIELD NOTE 01</span><span>Evidence needs context.</span></div></div></section>
        <section className="analyser-wrap" id="analyser"><div className="section-marker"><span className="marker-number">02</span><span>RUN A READOUT</span></div><div className="analyser-card"><div className="analyser-intro"><div><p className="eyebrow">INPUT DESK <span className="slash">/</span> AVAILABLE NOW</p><h2>Bring a news item.<br /><span>Leave with questions.</span></h2></div><img src={SIGNAL_ORBIT} alt="Abstract signal orbit mark" /></div><div className="mode-tabs" role="tablist" aria-label="Choose input type">{modes.map(({ id, label, icon: Icon }) => <button key={id} role="tab" aria-selected={mode === id} className={mode === id ? "mode-tab active" : "mode-tab"} onClick={() => handleModeChange(id)}><Icon size={16} />{label}</button>)}</div><div className="input-zone">{mode === "document" ? <label className="upload-zone"><input type="file" accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => handleFile(event.target.files?.[0])} /><Upload size={24} /><strong>{fileName || "Drop a classroom document here"}</strong><span>{fileName ? "Ready to analyse" : "TXT, PDF, or DOCX · 10 MB max"}</span>{fileName && <button type="button" className="remove-file" onClick={(event) => { event.preventDefault(); setFile(null); setFileName(""); }}> <X size={14} /> remove</button>}</label> : <textarea value={value} onChange={(event) => { setValue(event.target.value); if (status !== "idle") setStatus("idle"); }} placeholder={placeholder} aria-label={mode === "url" ? "Article URL" : "Article text"} rows={7} />}<div className="input-meta"><span>{mode === "text" ? `${value.length} characters` : mode === "url" ? "Public pages only" : fileName ? "File selected" : "No file selected"}</span><span>Nothing is saved by default</span></div></div>{error && <div className="form-error" role="alert"><div className="form-error-copy"><CircleAlert size={16} /><span>{error}</span></div>{retryableError && <button type="button" className="error-retry-button" onClick={handleAnalyze} disabled={status === "loading"}><RotateCcw size={14} /> Retry analysis</button>}</div>}<div className="analyser-footer"><p><span className="tiny-ring" /> Prediction, not proof. Always verify consequential claims.</p><button className="analyze-button" onClick={handleAnalyze} disabled={status === "loading"}>{status === "loading" ? <><Loader2 className="spin" size={16} /> Reading signals…</> : <>Analyze this item <ArrowUpRight size={16} /></>}</button></div></div></section>
        {status === "loading" && <div className="result-wrap"><LoadingReadout activeStep={loadingStep} /></div>}
        {status === "result" && analysis && <div className="result-wrap"><ResultPanel analysis={analysis} onReset={reset} onRetry={handleAnalyze} /></div>}
        <section className="method-section" id="how-it-works"><div className="section-marker"><span className="marker-number">03</span><span>THE SHORT VERSION</span></div><div className="method-content"><div><p className="eyebrow">HOW IT WORKS</p><h2>A label is the beginning<br />of the conversation.</h2></div><div className="method-copy"><p>Signal Desk uses a research-informed text model to spot patterns in language and context. It does not know whether a claim is true. It can only show you what its training has taught it to notice.</p><a href="#classroom" className="learn-link">Read the teaching notes <ArrowUpRight size={15} /></a></div></div><div className="method-steps"><div><span>01</span><strong>Submit a claim</strong><p>Paste text, a public URL, or a supported document.</p></div><div><span>02</span><strong>Inspect the signals</strong><p>See the patterns associated with the prediction.</p></div><div><span>03</span><strong>Verify like a human</strong><p>Check sources, context, and the original claim.</p></div></div></section>
        <section className="classroom-section" id="classroom"><div className="classroom-note"><span className="eyebrow">A NOTE FOR THE ROOM</span><h2>Confidence is a model’s posture.<br /><em>Not a fact’s identity.</em></h2><p>Use the output to ask better questions: What data trained this system? What did it not see? Would the result change in another language, topic, or time?</p><button className="quiet-button">Open facilitator notes <ArrowUpRight size={15} /></button></div><div className="classroom-stamp"><span>TEACH</span><span>THE</span><span>READOUT</span><div className="stamp-line" /></div></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><img src={SIGNAL_MARK} alt="" className="footer-mark" /><span>Signal Desk</span></div><span>Built for careful classrooms.</span><span className="footer-meta">MODEL PREDICTION ≠ FACT CHECK</span></footer>
    </div>
  );
}
