import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
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
  X
} from "lucide-react";
const SIGNAL_MARK = "/manus-storage/signal-desk-mark_915b6abe.png";
const PAPER_TEXTURE = "/manus-storage/paper-signal-texture_8a8f934c.png";
const EVIDENCE_COLLAGE = "/manus-storage/evidence-collage_779ca6ff.png";
const SIGNAL_ORBIT = "/manus-storage/signal-orbit_066a9e05.png";
const modes = [
  { id: "text", label: "Paste text", icon: FileText },
  { id: "url", label: "Article URL", icon: Link2 },
  { id: "document", label: "Upload file", icon: Upload }
];
const demoArticle = `A new study claims that schools using one simple morning ritual have reduced student absence by 47% in just two weeks. The researchers say the result is \u201Ctoo consistent to ignore,\u201D but the article does not name the study, the schools, or the researchers.`;
function formatConfidence(value) {
  return `${Math.round(value * 100)}%`;
}
function ResultPanel({ onReset }) {
  return /* @__PURE__ */ jsxs("section", { className: "result-panel animate-in fade-in slide-in-from-bottom-3 duration-500", "aria-live": "polite", children: [
    /* @__PURE__ */ jsxs("div", { className: "result-topline", children: [
      /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
        /* @__PURE__ */ jsx("span", { className: "signal-dot" }),
        " MODEL READOUT / CASE 00418"
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "text-button", onClick: onReset, children: [
        /* @__PURE__ */ jsx(RotateCcw, { size: 14 }),
        " New analysis"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "result-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "result-kicker", children: "Automated prediction" }),
        /* @__PURE__ */ jsx("h2", { children: "Fake" }),
        /* @__PURE__ */ jsx("p", { className: "result-subtitle", children: "The model found patterns often associated with unreliable claims." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "confidence-block", children: [
        /* @__PURE__ */ jsx("span", { className: "confidence-value", children: "78%" }),
        /* @__PURE__ */ jsx("span", { className: "confidence-label", children: "model confidence" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "confidence-track", "aria-label": "Model confidence 78 percent", children: /* @__PURE__ */ jsx("span", { style: { width: "78%" } }) }),
    /* @__PURE__ */ jsxs("div", { className: "result-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "result-card evidence-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "card-title-row", children: [
          /* @__PURE__ */ jsx("span", { className: "card-index", children: "01" }),
          /* @__PURE__ */ jsx("h3", { children: "Signals behind the call" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "card-caption", children: "Model-derived signals, not independent proof." }),
        /* @__PURE__ */ jsxs("div", { className: "signal-list", children: [
          /* @__PURE__ */ jsxs("div", { className: "signal-item", children: [
            /* @__PURE__ */ jsx("span", { className: "signal-icon", children: /* @__PURE__ */ jsx(ScanSearch, { size: 15 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Unsupported specificity" }),
              /* @__PURE__ */ jsx("span", { children: "No study, source, or named researchers are provided for a precise numerical claim." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "signal-item", children: [
            /* @__PURE__ */ jsx("span", { className: "signal-icon", children: /* @__PURE__ */ jsx(Sparkles, { size: 15 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Certainty language" }),
              /* @__PURE__ */ jsx("span", { children: "\u201CToo consistent to ignore\u201D creates confidence without adding verifiable detail." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "signal-item", children: [
            /* @__PURE__ */ jsx("span", { className: "signal-icon", children: /* @__PURE__ */ jsx(CircleAlert, { size: 15 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Missing context" }),
              /* @__PURE__ */ jsx("span", { children: "The sample, timeframe, and comparison group are not described." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "result-card limitation-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "card-title-row", children: [
          /* @__PURE__ */ jsx("span", { className: "card-index sage-index", children: "02" }),
          /* @__PURE__ */ jsx("h3", { children: "Read this carefully" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "card-caption", children: "The part a human still has to do." }),
        /* @__PURE__ */ jsxs("div", { className: "limitation-copy", children: [
          /* @__PURE__ */ jsx(ShieldAlert, { size: 18 }),
          /* @__PURE__ */ jsx("p", { children: "This is a model prediction, not a fact-check. A \u201CNot Fake\u201D result would not prove an article true. Verify the original study, source, and claim before sharing." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "modality-row", children: [
          /* @__PURE__ */ jsx("span", { className: "mini-label", children: "ANALYSED" }),
          /* @__PURE__ */ jsxs("span", { className: "modality-pill", children: [
            /* @__PURE__ */ jsx(Check, { size: 13 }),
            " text only"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "modality-pill muted-pill", children: "image not analysed" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "result-footer", children: [
      /* @__PURE__ */ jsx("span", { children: "Model: SignalDesk-text-01" }),
      /* @__PURE__ */ jsx("span", { children: "Language: English" }),
      /* @__PURE__ */ jsx("span", { children: "Confidence is not truth probability." })
    ] })
  ] });
}
function Home() {
  const [mode, setMode] = useState("text");
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const placeholder = useMemo(() => {
    if (mode === "url") return "https://example.com/article-to-analyse";
    if (mode === "document") return "Choose a TXT, PDF, or DOCX file";
    return "Paste a headline, paragraph, or full article here\u2026";
  }, [mode]);
  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setValue("");
    setFileName("");
    setError("");
    setStatus("idle");
  };
  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) && !/\.(txt|pdf|docx)$/i.test(file.name)) {
      setError("That file type is not supported. Choose a TXT, PDF, or DOCX file.");
      setFileName("");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("This file is larger than 10 MB. Choose a smaller classroom example.");
      setFileName("");
      return;
    }
    setError("");
    setFileName(file.name);
  };
  const handleAnalyze = () => {
    setError("");
    if (mode === "document" && !fileName) {
      setError("Choose a document before analysing it.");
      return;
    }
    if (mode !== "document" && !value.trim()) {
      setError(mode === "url" ? "Paste an article URL to continue." : "Paste at least one paragraph to continue.");
      return;
    }
    if (mode === "url") {
      try {
        const parsed = new URL(value.trim());
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("invalid");
      } catch {
        setError("Use a complete public URL beginning with https://.");
        return;
      }
    }
    if (mode === "text" && value.trim().length < 80) {
      setError("Add a little more context\u2014at least 80 characters helps the model read the claim.");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("result"), 1250);
  };
  const loadExample = () => {
    setMode("text");
    setValue(demoArticle);
    setFileName("");
    setError("");
    setStatus("idle");
  };
  return /* @__PURE__ */ jsxs("div", { className: "signal-app", style: { backgroundImage: `url(${PAPER_TEXTURE})` }, children: [
    /* @__PURE__ */ jsxs("header", { className: "site-header", children: [
      /* @__PURE__ */ jsxs("a", { className: "brand", href: "/", "aria-label": "Signal Desk home", children: [
        /* @__PURE__ */ jsx("img", { src: SIGNAL_MARK, alt: "", className: "brand-mark" }),
        /* @__PURE__ */ jsxs("span", { className: "brand-name", children: [
          "signal",
          /* @__PURE__ */ jsx("span", { children: "desk" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "header-nav", "aria-label": "Main navigation", children: [
        /* @__PURE__ */ jsx("a", { href: "#how-it-works", children: "How it works" }),
        /* @__PURE__ */ jsx("a", { href: "#classroom", children: "For the classroom" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "header-status", children: [
        /* @__PURE__ */ jsx("span", { className: "status-ring" }),
        " educational prototype ",
        /* @__PURE__ */ jsx(ChevronDown, { size: 14 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "hero-shell", children: [
        /* @__PURE__ */ jsxs("aside", { className: "hero-rail", children: [
          /* @__PURE__ */ jsx("span", { className: "rail-label", children: "ANALYSIS / 01" }),
          /* @__PURE__ */ jsx("div", { className: "rail-line", children: /* @__PURE__ */ jsx("span", { className: "rail-pip" }) }),
          /* @__PURE__ */ jsx("span", { className: "rail-label rail-bottom", children: "MODEL, MEET HUMAN" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
          /* @__PURE__ */ jsxs("p", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", { className: "signal-dot" }),
            " A CLASSROOM TOOL FOR READING THE READOUT"
          ] }),
          /* @__PURE__ */ jsxs("h1", { children: [
            "Don\u2019t just ask if it\u2019s fake.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "Ask what the model saw." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "hero-lede", children: "Signal Desk turns a news item into a teachable moment\u2014prediction, confidence, signals, and the limits that belong beside them." }),
          /* @__PURE__ */ jsxs("div", { className: "hero-actions", children: [
            /* @__PURE__ */ jsxs("button", { className: "primary-button", onClick: () => document.getElementById("analyser")?.scrollIntoView({ behavior: "smooth" }), children: [
              "Analyse an item ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "quiet-button", onClick: loadExample, children: [
              "Try a classroom example ",
              /* @__PURE__ */ jsx("span", { children: "\u2197" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hero-art", children: [
          /* @__PURE__ */ jsx("img", { src: EVIDENCE_COLLAGE, alt: "Printed news page and evidence cards arranged on a research desk" }),
          /* @__PURE__ */ jsxs("div", { className: "art-caption", children: [
            /* @__PURE__ */ jsx("span", { children: "FIELD NOTE 01" }),
            /* @__PURE__ */ jsx("span", { children: "Evidence needs context." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "analyser-wrap", id: "analyser", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-marker", children: [
          /* @__PURE__ */ jsx("span", { className: "marker-number", children: "02" }),
          /* @__PURE__ */ jsx("span", { children: "RUN A READOUT" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "analyser-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "analyser-intro", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "eyebrow", children: [
                "INPUT DESK ",
                /* @__PURE__ */ jsx("span", { className: "slash", children: "/" }),
                " AVAILABLE NOW"
              ] }),
              /* @__PURE__ */ jsxs("h2", { children: [
                "Bring a news item.",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { children: "Leave with questions." })
              ] })
            ] }),
            /* @__PURE__ */ jsx("img", { src: SIGNAL_ORBIT, alt: "Abstract signal orbit mark" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mode-tabs", role: "tablist", "aria-label": "Choose input type", children: modes.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs("button", { role: "tab", "aria-selected": mode === id, className: mode === id ? "mode-tab active" : "mode-tab", onClick: () => handleModeChange(id), children: [
            /* @__PURE__ */ jsx(Icon, { size: 16 }),
            label
          ] }, id)) }),
          /* @__PURE__ */ jsxs("div", { className: `input-zone ${status === "result" ? "has-result" : ""}`, children: [
            mode === "document" ? /* @__PURE__ */ jsxs("label", { className: "upload-zone", children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: ".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document", onChange: (event) => handleFile(event.target.files?.[0]) }),
              /* @__PURE__ */ jsx(Upload, { size: 24 }),
              /* @__PURE__ */ jsx("strong", { children: fileName || "Drop a classroom document here" }),
              /* @__PURE__ */ jsx("span", { children: fileName ? "Ready to analyse" : "TXT, PDF, or DOCX \xB7 10 MB max" }),
              fileName && /* @__PURE__ */ jsxs("button", { type: "button", className: "remove-file", onClick: (event) => {
                event.preventDefault();
                setFileName("");
              }, children: [
                /* @__PURE__ */ jsx(X, { size: 14 }),
                " remove"
              ] })
            ] }) : /* @__PURE__ */ jsx("textarea", { value, onChange: (event) => setValue(event.target.value), placeholder, "aria-label": mode === "url" ? "Article URL" : "Article text", rows: 7 }),
            /* @__PURE__ */ jsxs("div", { className: "input-meta", children: [
              /* @__PURE__ */ jsx("span", { children: mode === "text" ? `${value.length} characters` : mode === "url" ? "Public pages only" : fileName ? "File selected" : "No file selected" }),
              /* @__PURE__ */ jsx("span", { children: "Nothing is saved by default" })
            ] })
          ] }),
          error && /* @__PURE__ */ jsxs("div", { className: "form-error", role: "alert", children: [
            /* @__PURE__ */ jsx(CircleAlert, { size: 16 }),
            " ",
            error
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "analyser-footer", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "tiny-ring" }),
              " Prediction, not proof. Always verify consequential claims."
            ] }),
            /* @__PURE__ */ jsx("button", { className: "analyze-button", onClick: handleAnalyze, disabled: status === "loading", children: status === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "spin", size: 16 }),
              " Reading signals\u2026"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Analyze this item ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })
            ] }) })
          ] })
        ] })
      ] }),
      status === "result" && /* @__PURE__ */ jsx("div", { className: "result-wrap", children: /* @__PURE__ */ jsx(ResultPanel, { onReset: () => {
        setStatus("idle");
        setValue("");
        setFileName("");
      } }) }),
      /* @__PURE__ */ jsxs("section", { className: "method-section", id: "how-it-works", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-marker", children: [
          /* @__PURE__ */ jsx("span", { className: "marker-number", children: "03" }),
          /* @__PURE__ */ jsx("span", { children: "THE SHORT VERSION" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "method-content", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "HOW IT WORKS" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "A label is the beginning",
              /* @__PURE__ */ jsx("br", {}),
              "of the conversation."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "method-copy", children: [
            /* @__PURE__ */ jsx("p", { children: "Signal Desk uses a research-informed text model to spot patterns in language and context. It does not know whether a claim is true. It can only show you what its training has taught it to notice." }),
            /* @__PURE__ */ jsxs("a", { href: "#classroom", className: "learn-link", children: [
              "Read the teaching notes ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 15 })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "method-steps", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "01" }),
            /* @__PURE__ */ jsx("strong", { children: "Submit a claim" }),
            /* @__PURE__ */ jsx("p", { children: "Paste text, a public URL, or a supported document." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "02" }),
            /* @__PURE__ */ jsx("strong", { children: "Inspect the signals" }),
            /* @__PURE__ */ jsx("p", { children: "See the patterns associated with the prediction." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "03" }),
            /* @__PURE__ */ jsx("strong", { children: "Verify like a human" }),
            /* @__PURE__ */ jsx("p", { children: "Check sources, context, and the original claim." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "classroom-section", id: "classroom", children: [
        /* @__PURE__ */ jsxs("div", { className: "classroom-note", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "A NOTE FOR THE ROOM" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Confidence is a model\u2019s posture.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "Not a fact\u2019s identity." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Use the output to ask better questions: What data trained this system? What did it not see? Would the result change in another language, topic, or time?" }),
          /* @__PURE__ */ jsxs("button", { className: "quiet-button", children: [
            "Open facilitator notes ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 15 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "classroom-stamp", children: [
          /* @__PURE__ */ jsx("span", { children: "TEACH" }),
          /* @__PURE__ */ jsx("span", { children: "THE" }),
          /* @__PURE__ */ jsx("span", { children: "READOUT" }),
          /* @__PURE__ */ jsx("div", { className: "stamp-line" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "site-footer", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-brand", children: [
        /* @__PURE__ */ jsx("img", { src: SIGNAL_MARK, alt: "", className: "footer-mark" }),
        /* @__PURE__ */ jsx("span", { children: "Signal Desk" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Built for careful classrooms." }),
      /* @__PURE__ */ jsx("span", { className: "footer-meta", children: "MODEL PREDICTION \u2260 FACT CHECK" })
    ] })
  ] });
}
export {
  Home as default
};
