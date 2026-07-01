import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard, LayoutList, Users, TrendingDown, DollarSign,
  Database, Search, SlidersHorizontal, X, ChevronDown, Info,
  Building2, RotateCcw,
} from "lucide-react";

/* ============================== TOKENS ============================== */
const T = {
  navy: "#13284B", blue: "#1B4F8A", ink: "#0F1E38", paper: "#F6F8FC",
  card: "#FFFFFF", line: "#E4EAF3", sub: "#5C6B85", faint: "#92A0B8",
  green: "#1F8A5B", greenBg: "#E7F3EC", amber: "#B8791B", amberBg: "#FAF1DD",
  red: "#C0492F", redBg: "#FAE9E5", steel: "#3E6FA3", steelBg: "#E9F0F8",
  slate: "#6B7A93", slateBg: "#EEF2F8",
};
const FONT = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";

/* ============================== DATA ============================== */
const RAW = [
  ["GiftHealth (all lines)","","Large",551,572,508,11,37,0,21,0.04,"Under","Over","Within","Optimized","","",19.34,"Weighted blend",527,11,37,0,0.70,true,false],
  ["Almedia","Bluebird","Large",121,134,121,5,4,1,13,0.11,"Under","Under","Within","Optimized","","",10,"Rate card",121,8,4,1,0.70,false,false],
  ["Outschool — Frontline Support","Bluejay","Large",40,50,36,7,4,1,10,0.25,"Over","Over","Over","To Discuss","Heavily invested. Ratios reflect a deliberate quality build-up. Optimization needs PM and Funmi sign-off.","Hugo",12,"Rate card",36,9,4,1,0.70,false,false],
  ["Aurora","Oriole","Large",39,39,30,5,4,0,0,0.0,"Over","Over","Within","Special Circumstances","QA 1:6 held deliberately. Earlier quality issues required heavy investment (external hires incl. Uche Ebo, added QAs). Quality recovering but not fully resolved. Do not step toward 1:15 without Funmi sign-off.","Hugo",10,"Rate card",30,5,4,0,0.70,false,false],
  ["Curri","Parrot","Large",27,35,29,5,1,0,8,0.30,"Over","Under","Over","Special Circumstances","1:6 QA and 1:29 TL driven by four workflows, each needing cover. QA and TL interchangeable, blended ~1:10. Inefficiency is structural to a fragmented small project. No reduction without Funmi.","Hugo",15,"Rate card",29,5,1,0,0.70,false,false],
  ["Faire","Heron","Large",26,34,24,4,3,2,8,0.31,"Over","Over","Over","Special Circumstances","Among the leanest accounts. Agents cross-trained across part-time workflows, at or past the tipping point per Hugo. Do not cut, revisit only with Funmi.","Hugo",14,"Rate card",24,5,3,2,0.70,false,false],
  ["9am Health","","Large",32,27,25,0,2,0,-5,-0.16,"—","Over","Under","Optimized","","",34.18,"US account",25,0,2,0,0.70,false,true],
  ["Outschool — Back Office","Bluejay","Large",16,20,16,1,2,0,4,0.25,"Within","Over","Over","To Discuss","Carries QA/TL across the combined Outschool footprint, reads tight in isolation. Tied to the wider Outschool review, needs PM/Funmi.","Hugo",12,"Rate card",16,2,2,0,0.70,false,false],
  ["Finix","Merlin","Medium",15,17,15,1,1,0,2,0.13,"Under","Within","Within","Optimized","","",14,"Rate card",15,1,1,0,0.75,false,false],
  ["Bask & Lather","Avocet","Medium",12,16,14,1,0,0,4,0.33,"Under","—","Over","To Discuss","Ownership in transition. Moving into the small-projects portfolio as Funmi shifts to GiftHealth-only (PM to move too). Ratio review follows the move.","Lydia",11,"Rate card",14,2,0,0,0.75,false,false],
  ["Backroads","Bowerbird","Small",10,13,12,0,1,0,3,0.30,"—","Under","Over","Special Circumstances","30% shrinkage held on purpose. Client-signaled issues during handover from the previous SPM; active turnaround tracking back to plan in 4-6 weeks. QA and TL healthy. Do not pull shrinkage mid-correction.","Lydia",15,"Rate card",12,0,1,0,0.75,false,false],
  ["Stream Hatchet","Crane","Small",7,9,7,1,0,0,2,0.29,"Within","—","Over","Special Circumstances","Restructuring under the COLA review. New setup agreed, holding until all changes go out in Hugo's client email. Bills ~$10/hr on a non-standard setup being corrected.","Lydia",10,"Rate card",7,2,0,0,0.80,false,false],
  ["Xilo","","Small",8,8,0,8,0,0,0,0.0,"Over","—","Within","Optimized","QA-only engagement: 8 QA specialists, no frontline agents, so agent-ratios are not meaningful. Excluded from agent-based reads.","Note",15,"Rate card",0,8,0,0,0.80,false,false],
  ["Sonovate","Hawk","Small",6,7,6,0,1,0,1,0.17,"—","Over","Within","Special Circumstances","TL is billable (final confirm pending from Jonathan). Shrinkage is a single agent, within range. TL reads tight because one billable TL is the floor on a six-agent account.","Lydia",11,"Rate card",6,0,1,0,0.80,false,false],
  ["Gravyty","","Small",6,6,2,0,2,2,0,0.0,"—","Over","Within","Special Circumstances","Roles at 1:1 are the minimum viable cover on a small account, not excess. Confirmed fine.","Lydia",16,"Rate card",2,0,2,2,0.80,false,false],
  ["Bearefoot","Swift","Small",5,5,5,0,0,0,0,0.0,"—","—","Within","Optimized","","",14,"Rate card",5,0,0,0,0.80,false,false],
  ["Kiddom","Blabber","Small",4,5,4,0,1,0,1,0.25,"—","Over","Within","Special Circumstances","1 TL on 4 agents is the small-account floor. Confirmed fine.","Lydia",14,"Rate card",4,0,1,0,0.80,false,false],
  ["Earnest RCM","Kestrel","Small",4,4,3,0,1,0,0,0.0,"—","Over","Within","Optimized","Right-sized in June: billable cut 11 to 4, rate raised to ~$14. TL 1:3 is a small-account floor. Shrinkage 0%. Optimized post-resize.","Lydia",15,"Rate card",3,0,1,0,0.80,false,false],
  ["Fireclay Tiles","Raven","Small",3,4,3,1,0,0,1,0.33,"Over","—","Over","Special Circumstances","Shrinkage shown is a shared head, one buffer person split ~0.33 each across Fireclay, Main Factor and one other. Not a dedicated FTE.","Lydia",12,"Rate card",3,1,0,0,0.80,false,false],
  ["Main Factor","Falcon","Small",2,4,3,0,1,0,2,1.0,"—","Over","Over","Special Circumstances","2 billable / 4 actual reads as 100% shrinkage but is shared resourcing. TL and QA shared with SoHookd, the buffer agent also covers SoHookd. No standalone excess.","Lydia",12,"Rate card",3,0,1,0,0.80,false,false],
  ["Pinata","Starling","Small",3,4,3,1,0,0,1,0.33,"Over","—","Over","Special Circumstances","Offboarding. No optimization or COLA. High shrinkage is the QA shared across Pinata, TRC and Yardzen.","Lydia",12,"Rate card",3,1,0,0,0.80,false,false],
  ["Writer","Osprey","Small",4,4,3,1,0,0,0,0.0,"Over","—","Within","Special Circumstances","QA 1:3 is minimum viable cover on a small account. Confirmed fine.","Lydia",14,"Rate card",3,1,0,0,0.80,false,false],
  ["Outschool — Tier 3","Bluejay","Small",3,3,0,3,0,0,0,0.0,"Over","—","Within","Optimized","Escalation/QA-only line, no frontline agents. Ratios not meaningful in isolation.","Note",12,"Rate card",0,3,0,0,0.80,false,false],
  ["Goodie Hoops","","Small",2,2,2,0,0,0,0,0.0,"—","—","Within","Optimized","","",14,"Rate card",2,0,0,0,0.80,false,false],
  ["SoHookd","Myna","Small",2,2,2,0,0,0,0,0.0,"—","—","Within","Optimized","","",12,"Rate card",2,0,0,0,0.80,false,false],
  ["TRC (The Routing Company)","Nightingale","Small",1,2,2,0,0,0,1,1.0,"—","—","Over","Special Circumstances","Offboarding imminent. 100% shrinkage is the shared QA (Pinata/TRC/Yardzen), not a dedicated head.","Lydia",11,"Rate card",2,0,0,0,0.80,false,false],
  ["DuckDuckGo","Duck","Small",1,1,1,0,0,0,0,0.0,"—","—","Within","Optimized","","",14,"Rate card",1,0,0,0,0.80,false,false],
  ["Edhat","Magpie","Small",1,1,1,0,0,0,0,0.0,"—","—","Within","Optimized","","",10,"Rate card",1,0,0,0,0.80,false,false],
  ["Rest of World","Puffin","Small",1,1,0,0,0,0,0,0.0,"—","—","Within","Optimized","","",13,"Rate card",0,1,0,0,0.80,false,false],
  ["Schoolhouse","","Small",1,1,1,0,0,0,0,0.0,"—","—","Within","Optimized","Client-led growth, adding billables. Positive, monitor as it scales.","Lydia",14,"Rate card",1,0,0,0,0.80,false,false],
  ["Topicals","Toucan","Small",1,1,1,0,0,0,0,0.0,"—","—","Within","Optimized","","",12,"Rate card",1,0,0,0,0.80,false,false],
  ["Visual DX","Sunbird","Small",1,1,0,1,0,0,0,0.0,"Over","—","Within","Optimized","QA-only line, no frontline agents. Ratios not meaningful in isolation.","Note",15,"Rate card",0,1,0,0,0.80,false,false],
];
const ACCOUNTS = RAW.map((r, i) => ({
  id: i, name: r[0], bird: r[1], size: r[2], bill: r[3], act: r[4],
  ag: r[5], qa: r[6], tl: r[7], pc: r[8], shrinkHC: r[9], shrinkPct: r[10],
  qaV: r[11], tlV: r[12], shV: r[13], decision: r[14], comment: r[15],
  source: r[16], rate: r[17], rateSrc: r[18], mAg: r[19], mQ: r[20],
  mT: r[21], mP: r[22], bench: r[23], gh: r[24], nineam: r[25],
}));

const GH_LINES = [
  ["Lilly MO","Missouri",35,141,141,132,0,9,0,"US"],
  ["Lilly SA","South Africa",14,179,179,167,0,12,0,"NGN"],
  ["Lilly Lagos","Lagos",14,160,177,150,10,11,6,"NGN"],
  ["Gastro","Lagos",14,66,69,62,1,5,1,"NGN"],
  ["WFM","Lagos",14,8,9,0,0,0,9,"NGN"],
].map((l) => ({ line: l[0], geo: l[1], rate: l[2], bill: l[3], act: l[4], ag: l[5], qa: l[6], tl: l[7], other: l[8], basis: l[9] }));

const SCOPES = [
  { name: "Overall CX", sub: "main portfolio", ag: 346, qa: 45, tl: 26, pc: 6, aqa: "1 : 7.7", atl: "1 : 13.3", apc: "1 : 57.7" },
  { name: "GiftHealth", sub: "all lines", ag: 508, qa: 11, tl: 37, pc: 0, aqa: "1 : 46.2", atl: "1 : 13.7", apc: "—" },
  { name: "9am Health", sub: "single account", ag: 25, qa: 0, tl: 2, pc: 0, aqa: "—", atl: "1 : 12.5", apc: "—" },
  { name: "Overall Company", sub: "everything", ag: 879, qa: 56, tl: 65, pc: 6, aqa: "1 : 15.7", atl: "1 : 13.5", apc: "1 : 146.5" },
];
const SEG_IDEALS = [
  ["Agent : TL","1 : 20","1 : 14","1 : 10","1 : 12–15","Medium 0.7× · Small 0.5× of large"],
  ["Agent : QA","1 : 15","1 : 11","1 : 8","1 : 20–25","Medium 0.7× · Small 0.5× of large"],
  ["Agent : Trainer","1 : 20","1 : 14","1 : 10","1 : 15–20","Centralised; segment guide only"],
  ["Agent : PC","workflow","workflow","workflow","workflow","By workflow count, not a fixed ratio"],
];
const BENCH_CMP = [
  ["Agent : QA","1 : 20–25","1 : 15","1 : 7.7","Tighter QA than industry and the large-segment ideal"],
  ["Agent : TL","1 : 12–15","1 : 20","1 : 13.3","Within industry band, wider than the 1:20 ideal"],
  ["Agent : PC","workflow","by workflow","1 : 57.7","Assigned by workflow complexity"],
  ["Agent : Ops/PM","1 : 60–100","1 : 50","1 : 51.7","17 PMs company-wide; below 1:50 leaves onboarding headroom"],
];
const DEFAULTS = { hours: 168, fx: 1400, agent: 325000, qaosme: 429000, tl: 669000, pc: 925000, us: 20 };
const QA_IDEAL = { Large: 15, Medium: 11, Small: 8 };
const TL_IDEAL = { Large: 20, Medium: 14, Small: 10 };
const SH_TARGET = { Large: 0.15, Medium: 0.2, Small: 0.25 };
const LS_COMMENTS = "hugo_cx_comments";
const LS_DATA = "hugo_cx_data";

/* ============================== HELPERS ============================== */
const usd = (n) => "$" + Math.round(n).toLocaleString();
const ngn = (n) => "₦" + Math.round(n).toLocaleString();
const pct = (n) => Math.round(n * 100) + "%";
const ratioText = (a, r) => (r > 0 && a > 0 ? "1 : " + (a / r).toFixed(1) : "—");

function seedData() {
  const s = {};
  ACCOUNTS.forEach((a) => (s[a.id] = { bill: a.bill, act: a.act, rate: a.rate }));
  return s;
}

function recompute(acct, A) {
  const H = A.hours, FX = A.fx;
  if (acct.gh) {
    let rev = 0, cost = 0;
    GH_LINES.forEach((l) => {
      rev += l.rate * l.bill * H;
      cost += l.basis === "US" ? A.us * l.act * H : ((l.ag + l.other) * A.agent + l.qa * A.qaosme + l.tl * A.tl) / FX;
    });
    const bill = GH_LINES.reduce((s, l) => s + l.bill, 0);
    const act = GH_LINES.reduce((s, l) => s + l.act, 0);
    return { rev, cost, margin: (rev - cost) / rev, rateEff: rev / (bill * H), bill, act };
  }
  if (acct.nineam) {
    const rev = acct.rate * acct.bill * H, cost = A.us * acct.act * H;
    return { rev, cost, margin: (rev - cost) / rev, rateEff: acct.rate, bill: acct.bill, act: acct.act };
  }
  const rev = acct.rate * acct.bill * H;
  const cost = (acct.mAg * A.agent + acct.mQ * A.qaosme + acct.mT * A.tl + acct.mP * A.pc) / FX;
  return { rev, cost, margin: (rev - cost) / rev, rateEff: acct.rate, bill: acct.bill, act: acct.act };
}
function marginVerdict(m, b) {
  const d = m - b;
  if (d > 0.03) return "Great";
  if (d < -0.03) return "Bad";
  return "Good";
}
function ratioVerdict(actualN, role, size, lens) {
  if (!actualN) return "—";
  if (lens === "industry") {
    const lo = role === "qa" ? 20 : 12, hi = role === "qa" ? 25 : 15;
    if (actualN < lo) return "Over";
    if (actualN > hi) return "Under";
    return "Within";
  }
  const ideal = (role === "qa" ? QA_IDEAL : TL_IDEAL)[size];
  if (actualN < ideal * 0.85) return "Over";
  if (actualN > ideal * 1.15) return "Under";
  return "Within";
}
function targetText(role, size, lens) {
  if (lens === "industry") return role === "qa" ? "1:20–25" : "1:12–15";
  return "1:" + (role === "qa" ? QA_IDEAL : TL_IDEAL)[size];
}
function composite(a) {
  if (marginVerdict(a.m.margin, a.bench) === "Bad") return "Review";
  if (a.shrinkPct > SH_TARGET[a.size]) return "Monitor";
  return "Optimized";
}
function recommendation(a) {
  const mv = marginVerdict(a.m.margin, a.bench);
  const shOver = a.shrinkPct > SH_TARGET[a.size];
  const qaN = a.qa ? a.ag / a.qa : 0, tlN = a.tl ? a.ag / a.tl : 0;
  const over = (qaN && qaN < QA_IDEAL[a.size] * 0.85) || (tlN && tlN < TL_IDEAL[a.size] * 0.85);
  if (mv === "Bad") return "Margin sits below benchmark. Reprice or restructure before touching headcount.";
  if (shOver && mv === "Great") return "Margin is strong; shrinkage runs above target. Trim buffer only where it is not shared or in turnaround.";
  if (shOver) return "Shrinkage above target. Review the buffer against the rationale before cutting.";
  if (over && mv === "Great") return "Suboptimal ratios are acceptable here — margin is strong and pricing carries the extra cover.";
  if (over) return "Over-staffed on support. Confirm the client is paying for it, otherwise reduce.";
  return "Optimized at the current price. Hold.";
}
function unpaid(a) {
  const delta = Math.max(0, a.act - a.bill);
  return { paid: a.bill, delta, unpaidPct: a.act ? delta / a.act : 0 };
}
const mColor = (mv) => (mv === "Great" ? T.green : mv === "Bad" ? T.red : T.steel);

const V_STYLE = {
  Within: [T.green, T.greenBg], Great: [T.green, T.greenBg], Good: [T.steel, T.steelBg],
  Over: [T.amber, T.amberBg], Under: [T.steel, T.steelBg], Bad: [T.red, T.redBg], "—": [T.slate, T.slateBg],
};
const COMP_STYLE = { Optimized: [T.green, T.greenBg], Monitor: [T.amber, T.amberBg], Review: [T.red, T.redBg] };
const SIZE_BG = { Large: T.navy, Medium: T.blue, Small: T.slate };

/* ============================== ATOMS ============================== */
const Pill = ({ v }) => {
  const [fg, bg] = V_STYLE[v] || V_STYLE["—"];
  return <span className="inline-flex items-center px-2 py-0.5" style={{ background: bg, color: fg, fontSize: 11, fontWeight: 600, letterSpacing: 0.2 }}>{v}</span>;
};
const CompBadge = ({ c }) => {
  const [fg, bg] = COMP_STYLE[c] || [T.slate, T.slateBg];
  return <span className="inline-flex items-center px-2 py-1" style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700 }}>{c}</span>;
};
const SizeTag = ({ s }) => (
  <span className="inline-flex items-center px-1.5 py-0.5" style={{ background: SIZE_BG[s] || T.slate, color: "#fff", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4 }}>{s}</span>
);
function CommentCell({ value, onChange, source, w = 250 }) {
  return (
    <div style={{ width: w }} onClick={(e) => e.stopPropagation()}>
      {source && source !== "Note" && <div style={{ fontSize: 9.5, color: T.faint, fontWeight: 600, marginBottom: 3, textAlign: "left" }}>from {source}</div>}
      {source === "Note" && <div style={{ fontSize: 9.5, color: T.faint, fontWeight: 600, marginBottom: 3, textAlign: "left" }}>structural note</div>}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Add a note…" rows={2}
        style={{ width: "100%", minHeight: 40, resize: "vertical", border: `1px solid ${T.line}`, padding: "6px 8px", fontFamily: FONT, fontSize: 11.5, color: T.ink, lineHeight: 1.45, outline: "none", background: "#fff", display: "block" }}
        onFocus={(e) => (e.target.style.borderColor = T.blue)} onBlur={(e) => (e.target.style.borderColor = T.line)} />
    </div>
  );
}
function NumInput({ value, onChange, step = 1, prefix = "" }) {
  return (
    <div className="flex items-center" style={{ border: `1px solid ${T.line}`, background: "#fff" }}>
      {prefix && <span style={{ padding: "4px 8px", fontSize: 12, color: T.faint, borderRight: `1px solid ${T.line}` }}>{prefix}</span>}
      <input type="number" step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        style={{ border: 0, outline: "none", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: T.blue, width: 72, padding: "4px 8px", background: "transparent" }}
        onFocus={(e) => (e.target.parentElement.style.borderColor = T.blue)}
        onBlur={(e) => (e.target.parentElement.style.borderColor = T.line)} />
    </div>
  );
}

/* ============================== APP ============================== */
export default function App() {
  const [view, setView] = useState("overview");
  const [search, setSearch] = useState("");
  const [sizeF, setSizeF] = useState(new Set());
  const [statusF, setStatusF] = useState(new Set());
  const [lens, setLens] = useState("segment");
  const [cur, setCur] = useState("USD");
  const [A, setA] = useState({ ...DEFAULTS });
  const [drawer, setDrawer] = useState(false);
  const [sel, setSel] = useState(null);
  const [openRow, setOpenRow] = useState(null);

  const [comments, setComments] = useState(() => {
    const seed = {};
    ACCOUNTS.forEach((a) => (seed[a.id] = a.comment || ""));
    try { return { ...seed, ...JSON.parse(localStorage.getItem(LS_COMMENTS) || "{}") }; } catch { return seed; }
  });
  useEffect(() => { try { localStorage.setItem(LS_COMMENTS, JSON.stringify(comments)); } catch {} }, [comments]);
  const setComment = (id, text) => setComments((p) => ({ ...p, [id]: text }));

  // Editable per-account data (billable HC, actual HC, rate)
  const [acctData, setAcctData] = useState(() => {
    const seed = seedData();
    try { return { ...seed, ...JSON.parse(localStorage.getItem(LS_DATA) || "{}") }; } catch { return seed; }
  });
  useEffect(() => { try { localStorage.setItem(LS_DATA, JSON.stringify(acctData)); } catch {} }, [acctData]);
  const updateAcct = (id, field, val) => setAcctData((p) => ({ ...p, [id]: { ...p[id], [field]: val } }));
  const resetData = () => setAcctData(seedData());

  const money = (n) => (cur === "USD" ? usd(n) : ngn(n * A.fx));

  const computed = useMemo(() =>
    ACCOUNTS.map((a) => {
      const ov = acctData[a.id] || {};
      const merged = {
        ...a,
        bill: ov.bill ?? a.bill,
        act: ov.act ?? a.act,
        rate: ov.rate ?? a.rate,
        shrinkPct: (ov.bill != null || ov.act != null)
          ? ((ov.act ?? a.act) - (ov.bill ?? a.bill)) / Math.max(1, ov.bill ?? a.bill)
          : a.shrinkPct,
      };
      const m = recompute(merged, A);
      const withM = { ...merged, m };
      return { ...withM, comp: composite(withM) };
    }), [A, acctData]);

  const filtered = useMemo(() => computed.filter((a) => {
    if (search && !(a.name + " " + a.bird).toLowerCase().includes(search.toLowerCase())) return false;
    if (sizeF.size && !sizeF.has(a.size)) return false;
    if (statusF.size && !statusF.has(a.comp)) return false;
    return true;
  }), [computed, search, sizeF, statusF]);

  const portfolio = useMemo(() => {
    const rev = computed.reduce((s, a) => s + a.m.rev, 0);
    const cost = computed.reduce((s, a) => s + a.m.cost, 0);
    const review = computed.filter((a) => a.comp === "Review").length;
    return { rev, cost, margin: (rev - cost) / rev, review };
  }, [computed]);

  const toggle = (set, fn, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); fn(n); };

  const NAV = [
    ["overview", "Overview", LayoutDashboard],
    ["summary", "Summary", LayoutList],
    ["loading", "Loading Ratios", Users],
    ["shrinkage", "Shrinkage", TrendingDown],
    ["margin", "Margin", DollarSign],
    ["data", "Account Data", Database],
  ];

  return (
    <div style={{ fontFamily: FONT, background: T.paper, color: T.ink, minHeight: "100vh" }} className="w-full">
      <div className="flex" style={{ minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <aside className="flex flex-col justify-between" style={{ width: 232, background: T.navy, color: "#fff", position: "sticky", top: 0, height: "100vh" }}>
          <div>
            <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center" style={{ width: 30, height: 30, background: T.blue }}><Building2 size={17} color="#fff" /></div>
                <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: -0.2 }}>Hugo CX</div>
              </div>
              <div style={{ fontSize: 11, color: "#9DB0CE", marginTop: 8, lineHeight: 1.4 }}>Project Phoenix · Loading, Shrinkage & Margin</div>
            </div>
            <nav className="px-3 pt-4">
              {NAV.map(([k, label, Icon]) => (
                <button key={k} onClick={() => setView(k)} className="flex items-center gap-3 w-full px-3 py-2.5 mb-1"
                  style={{ background: view === k ? T.blue : "transparent", color: view === k ? "#fff" : "#B9C6DD", fontSize: 13.5, fontWeight: 600, transition: "background .15s" }}>
                  <Icon size={17} /> {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="px-3 pb-4">
            <button onClick={() => setDrawer(true)} className="flex items-center gap-3 w-full px-3 py-2.5 mb-2" style={{ background: "rgba(255,255,255,0.06)", color: "#DCE5F2", fontSize: 13, fontWeight: 600 }}>
              <SlidersHorizontal size={16} /> Assumptions
            </button>
            <div className="px-2" style={{ fontSize: 10.5, color: "#7E92B4", lineHeight: 1.5 }}>Data as of June 2026<br />FX ₦{A.fx.toLocaleString()}/$ · {A.hours}h/mo</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1" style={{ minWidth: 0 }}>
          <div className="flex items-center gap-3 px-6 py-3 flex-wrap" style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(246,248,252,0.92)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.line}` }}>
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#fff", border: `1px solid ${T.line}`, flex: "1 1 240px", maxWidth: 340 }}>
              <Search size={15} color={T.faint} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search accounts" style={{ border: 0, outline: 0, fontFamily: FONT, fontSize: 13, width: "100%", background: "transparent", color: T.ink }} />
              {search && <X size={14} color={T.faint} style={{ cursor: "pointer" }} onClick={() => setSearch("")} />}
            </div>
            <FilterGroup label="Size" opts={["Large","Medium","Small"]} set={sizeF} onToggle={(v) => toggle(sizeF, setSizeF, v)} />
            <FilterGroup label="Status" opts={["Optimized","Monitor","Review"]} set={statusF} onToggle={(v) => toggle(statusF, setStatusF, v)} />
            <div className="flex items-center overflow-hidden" style={{ border: `1px solid ${T.line}`, background: "#fff" }}>
              {["USD","NGN"].map((c) => (<button key={c} onClick={() => setCur(c)} className="px-3 py-1.5" style={{ background: cur === c ? T.navy : "transparent", color: cur === c ? "#fff" : T.sub, fontSize: 12, fontWeight: 600 }}>{c}</button>))}
            </div>
            {(sizeF.size || statusF.size || search) > 0 && (
              <button onClick={() => { setSizeF(new Set()); setStatusF(new Set()); setSearch(""); }} className="flex items-center gap-1.5 px-2 py-1.5" style={{ color: T.sub, fontSize: 12, fontWeight: 600 }}>
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          <div className="px-6 py-6">
            {view === "overview"  && <Overview portfolio={portfolio} money={money} computed={computed} onSelect={setSel} />}
            {view === "summary"   && <Summary rows={filtered} money={money} comments={comments} setComment={setComment} lens={lens} />}
            {view === "loading"   && <Loading rows={filtered} lens={lens} setLens={setLens} openRow={openRow} setOpenRow={setOpenRow} comments={comments} setComment={setComment} money={money} />}
            {view === "shrinkage" && <Shrinkage rows={filtered} onSelect={setSel} comments={comments} setComment={setComment} />}
            {view === "margin"    && <Margin rows={filtered} money={money} A={A} onOpenDrawer={() => setDrawer(true)} openRow={openRow} setOpenRow={setOpenRow} comments={comments} setComment={setComment} />}
            {view === "data"      && <AccountData computed={computed} acctData={acctData} updateAcct={updateAcct} resetData={resetData} money={money} />}
          </div>
        </main>
      </div>

      {sel && <RationalePanel a={sel} money={money} comments={comments} setComment={setComment} onClose={() => setSel(null)} />}
      {drawer && <AssumptionsDrawer A={A} setA={setA} onClose={() => setDrawer(false)} />}
    </div>
  );
}

/* ============================== FILTER GROUP ============================== */
function FilterGroup({ label, opts, set, onToggle }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{ fontSize: 11, color: T.faint, fontWeight: 600 }}>{label}</span>
      {opts.map((o) => {
        const on = set.has(o);
        return <button key={o} onClick={() => onToggle(o)} className="px-2.5 py-1" style={{ fontSize: 11.5, fontWeight: 600, border: `1px solid ${on ? T.navy : T.line}`, background: on ? T.navy : "#fff", color: on ? "#fff" : T.sub }}>{o}</button>;
      })}
    </div>
  );
}

/* ============================== ACCOUNT DATA TAB ============================== */
function AccountData({ computed, acctData, updateAcct, resetData, money }) {
  const order = { Large: 0, Medium: 1, Small: 2 };
  const rows = [...computed].sort((a, b) => order[a.size] - order[b.size] || b.m.rev - a.m.rev);
  const changed = computed.filter((a) => {
    const orig = ACCOUNTS.find((x) => x.id === a.id);
    return a.bill !== orig.bill || a.act !== orig.act || a.rate !== orig.rate;
  }).length;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Account data</h1>
          <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>
            Edit billable HC, actual HC and rate per account. Every change recalculates margin and all verdicts live across the app. Edits persist in your browser.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {changed > 0 && (
            <span style={{ fontSize: 12, color: T.amber, fontWeight: 600 }}>{changed} account{changed > 1 ? "s" : ""} modified</span>
          )}
          <button onClick={resetData} className="flex items-center gap-2 px-3 py-2" style={{ border: `1px solid ${T.line}`, color: T.sub, fontSize: 12.5, fontWeight: 600 }}>
            <RotateCcw size={14} /> Reset all to defaults
          </button>
        </div>
      </div>

      {/* legend */}
      <div className="flex items-center flex-wrap gap-4 mt-4 px-3 py-2" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: T.faint, letterSpacing: 0.4 }}>HOW IT WORKS</span>
        <span style={{ fontSize: 11.5, color: T.sub }}>Billable HC = what the client pays for · Actual HC = everyone deployed (billable + Hugo-absorbed) · Rate = avg $/hr charged</span>
        <span style={{ fontSize: 11.5, color: T.faint }}>GiftHealth margin is driven by the line-level blend and cannot be overridden here.</span>
      </div>

      <div className="mt-4 overflow-x-auto" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              {["Account","Size","Billable HC","Actual HC","Rate $/hr","Unpaid HC","Shrink %","Revenue / mo","Margin %","Status"].map((h, i) => (
                <th key={i} style={{ ...th, textAlign: i === 0 ? "left" : "center" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const orig = ACCOUNTS.find((x) => x.id === a.id);
              const isDirty = a.bill !== orig.bill || a.act !== orig.act || a.rate !== orig.rate;
              const mv = marginVerdict(a.m.margin, a.bench);
              const shColor = a.shrinkPct < 0 ? T.steel : a.shrinkPct > SH_TARGET[a.size] ? T.amber : T.green;
              const rowBg = isDirty ? "#FFFBF2" : "#fff";
              return (
                <tr key={a.id} style={{ borderTop: `1px solid ${T.line}`, background: rowBg }}>
                  <td style={{ ...td, textAlign: "left" }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</span>
                      {isDirty && <span style={{ fontSize: 9.5, color: T.amber, fontWeight: 700, letterSpacing: 0.3 }}>EDITED</span>}
                    </div>
                    {a.bird && <div style={{ fontSize: 11, color: T.faint }}>{a.bird}</div>}
                  </td>
                  <td style={tdC}><SizeTag s={a.size} /></td>
                  <td style={tdC}>
                    {a.gh
                      ? <span style={{ fontSize: 12, color: T.faint }}>line-level only</span>
                      : <NumInput value={acctData[a.id]?.bill ?? a.bill} onChange={(v) => updateAcct(a.id, "bill", v)} />}
                  </td>
                  <td style={tdC}>
                    {a.gh
                      ? <span style={{ fontSize: 12, color: T.faint }}>line-level only</span>
                      : <NumInput value={acctData[a.id]?.act ?? a.act} onChange={(v) => updateAcct(a.id, "act", v)} />}
                  </td>
                  <td style={tdC}>
                    {a.gh
                      ? <span style={{ fontSize: 12, color: T.faint }}>line-level only</span>
                      : <NumInput value={acctData[a.id]?.rate ?? a.rate} onChange={(v) => updateAcct(a.id, "rate", v)} step={0.01} prefix="$" />}
                  </td>
                  <td style={tdC}>
                    <span style={{ fontWeight: 600, color: unpaid(a).delta > 0 ? T.amber : T.sub }}>{unpaid(a).delta}</span>
                    <span style={{ fontSize: 11, color: T.faint }}> · {pct(unpaid(a).unpaidPct)}</span>
                  </td>
                  <td style={tdC}><span style={{ fontWeight: 700, color: shColor }}>{pct(a.shrinkPct)}</span></td>
                  <td style={tdC}><span style={{ fontWeight: 600 }}>{money(a.m.rev)}</span></td>
                  <td style={tdC}><span style={{ fontWeight: 700, color: mColor(mv) }}>{pct(a.m.margin)}</span></td>
                  <td style={tdC}><CompBadge c={a.comp} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================== OVERVIEW ============================== */
function Overview({ portfolio, money, computed, onSelect }) {
  const flagged = computed.filter((a) => a.comp === "Review");
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Portfolio overview</h1>
      <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>31 CX accounts plus GiftHealth and 9am Health. Meta sits outside CX and is excluded.</p>
      <div className="grid gap-4 mt-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))" }}>
        <Kpi label="Monthly revenue" value={money(portfolio.rev)} accent={T.navy} />
        <Kpi label="Monthly cost" value={money(portfolio.cost)} accent={T.steel} />
        <Kpi label="Blended margin" value={pct(portfolio.margin)} accent={T.green} />
        <Kpi label="Accounts to review" value={portfolio.review} accent={T.red} sub="composite · Review" />
      </div>
      <h2 style={sec}>Loading ratios by scope</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
        {SCOPES.map((s) => (
          <div key={s.name} className="p-5" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
            <div className="flex items-baseline justify-between"><div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div><div style={{ fontSize: 11, color: T.faint }}>{s.sub}</div></div>
            <div className="flex gap-4 mt-3">
              <div><div style={lblS}>Agents</div><div style={numS}>{s.ag}</div></div>
              <div><div style={lblS}>QA</div><div style={numS}>{s.qa}</div></div>
              <div><div style={lblS}>TL</div><div style={numS}>{s.tl}</div></div>
              <div><div style={lblS}>PC</div><div style={numS}>{s.pc}</div></div>
            </div>
            <div className="mt-3 pt-3 flex gap-4" style={{ borderTop: `1px solid ${T.line}` }}>
              <Ratio k="Agent : QA" v={s.aqa} /><Ratio k="Agent : TL" v={s.atl} /><Ratio k="Agent : PC" v={s.apc} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 24 }}>
        <div style={{ background: "#fff", border: `1px solid ${T.line}` }}>
          <div style={cardHd}>Hugo ideal loading ratios by segment</div>
          <Tbl head={["Role","Large","Medium","Small","Industry","Basis"]} rows={SEG_IDEALS.map((r) => [r[0], <B>{r[1]}</B>, <B>{r[2]}</B>, <B>{r[3]}</B>, <span style={{ color: T.faint }}>{r[4]}</span>, <span style={{ fontSize: 11, color: T.sub }}>{r[5]}</span>])} />
        </div>
        <div style={{ background: "#fff", border: `1px solid ${T.line}` }}>
          <div style={cardHd}>Benchmark comparison · Overall CX</div>
          <Tbl head={["Ratio","Industry","Ideal (L)","Actual","Read"]} rows={BENCH_CMP.map((r) => [r[0], <span style={{ color: T.faint }}>{r[1]}</span>, <span style={{ color: T.blue }}>{r[2]}</span>, <B>{r[3]}</B>, <span style={{ fontSize: 11, color: T.sub }}>{r[4]}</span>])} />
        </div>
      </div>
      <h2 style={sec}>Needs review</h2>
      <div style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        {flagged.length === 0
          ? <div className="p-5" style={{ color: T.sub, fontSize: 13 }}>No account is flagged for review. Adjust the assumptions or data to stress-test.</div>
          : flagged.map((a) => (
            <button key={a.id} onClick={() => onSelect(a)} className="hx-row flex items-center justify-between w-full px-5 py-3" style={{ borderTop: `1px solid ${T.line}`, textAlign: "left" }}>
              <div className="flex items-center gap-3"><SizeTag s={a.size} /><span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</span><CompBadge c={a.comp} /></div>
              <div className="flex items-center gap-4"><span style={{ fontSize: 12, color: T.sub }}>margin {pct(a.m.margin)} · target {pct(a.bench)}</span><Info size={15} color={T.faint} /></div>
            </button>
          ))}
      </div>
    </div>
  );
}
const Kpi = ({ label, value, accent, sub }) => (
  <div className="p-5" style={{ background: "#fff", border: `1px solid ${T.line}`, borderTop: `3px solid ${accent}` }}>
    <div style={{ fontSize: 12, color: T.sub, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: -0.5 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>{sub}</div>}
  </div>
);
const Ratio = ({ k, v }) => <div><div style={lblS}>{k}</div><div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div></div>;
const B = ({ children }) => <span style={{ fontWeight: 700 }}>{children}</span>;
function Tbl({ head, rows }) {
  return (
    <table className="w-full" style={{ borderCollapse: "collapse" }}>
      <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, textAlign: i === 0 ? "left" : i === head.length - 1 ? "left" : "center" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => (<tr key={i} style={{ borderTop: `1px solid ${T.line}` }}>{r.map((c, j) => <td key={j} style={{ ...td, textAlign: j === 0 ? "left" : j === r.length - 1 ? "left" : "center" }}>{c}</td>)}</tr>))}</tbody>
    </table>
  );
}

/* ============================== SUMMARY ============================== */
function Summary({ rows, money, comments, setComment, lens }) {
  const [open, setOpen] = useState(null);
  const order = { Large: 0, Medium: 1, Small: 2 };
  const sorted = [...rows].sort((a, b) => order[a.size] - order[b.size] || b.m.rev - a.m.rev);
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Account summary</h1>
      <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>One card per account: the financial and operational read plus a recommendation. Click any card to expand.</p>
      <div className="mt-5" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((a) => {
          const mv = marginVerdict(a.m.margin, a.bench);
          const u = unpaid(a);
          const isOpen = open === a.id;
          return (
            <div key={a.id} style={{ background: "#fff", border: `1px solid ${T.line}` }}>
              <button onClick={() => setOpen(isOpen ? null : a.id)} className="w-full px-5 py-4" style={{ textAlign: "left" }}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <ChevronDown size={15} color={T.faint} style={{ transform: isOpen ? "none" : "rotate(-90deg)", transition: ".15s" }} />
                    <SizeTag s={a.size} />
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</span>
                    {a.bird && <span style={{ fontSize: 11, color: T.faint }}>{a.bird}</span>}
                    <CompBadge c={a.comp} />
                  </div>
                  <div className="flex items-center" style={{ gap: 26 }}>
                    <SMetric k="Margin" v={pct(a.m.margin)} c={mColor(mv)} />
                    <SMetric k="Shrinkage" v={pct(a.shrinkPct)} c={a.shrinkPct > SH_TARGET[a.size] ? T.amber : T.green} />
                    <SMetric k="Agent:QA" v={ratioText(a.ag, a.qa)} />
                    <SMetric k="Agent:TL" v={ratioText(a.ag, a.tl)} />
                    <SMetric k="Unpaid HC" v={`${u.delta} · ${pct(u.unpaidPct)}`} c={u.unpaidPct > 0.2 ? T.amber : T.sub} />
                    <SMetric k="Rate" v={`$${a.m.rateEff.toFixed(a.gh || a.nineam ? 2 : 0)}`} />
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2" style={{ borderTop: `1px solid ${T.line}`, paddingTop: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.blue, letterSpacing: 0.3, marginTop: 1 }}>REC</span>
                  <span style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.5 }}>{recommendation(a)}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5" style={{ borderTop: `1px solid ${T.line}` }}>
                  <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))" }}>
                    <Detail k="Billable HC" v={a.bill} /><Detail k="Actual HC" v={a.act} />
                    <Detail k="Client-paid" v={u.paid} sub="billable" /><Detail k="Hugo-cost" v={u.delta} sub={`${pct(u.unpaidPct)} of actual`} />
                    <Detail k="Agents" v={a.ag} /><Detail k="QA" v={a.qa} /><Detail k="TL" v={a.tl} /><Detail k="PC" v={a.pc} />
                    <Detail k="Agent : QA" v={ratioText(a.ag, a.qa)} sub={`ideal ${lens === "segment" ? "1:" + QA_IDEAL[a.size] : "1:20–25"}`} />
                    <Detail k="Agent : TL" v={ratioText(a.ag, a.tl)} sub={`ideal ${lens === "segment" ? "1:" + TL_IDEAL[a.size] : "1:12–15"}`} />
                    <Detail k="Revenue / mo" v={money(a.m.rev)} /><Detail k="Cost / mo" v={money(a.m.cost)} />
                    <Detail k="Margin" v={pct(a.m.margin)} sub={`target ${pct(a.bench)}`} />
                  </div>
                  <div className="mt-4"><CommentCell value={comments[a.id] || ""} onChange={(t) => setComment(a.id, t)} source={a.source} w="100%" /></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
const SMetric = ({ k, v, c }) => (
  <div style={{ textAlign: "right" }}><div style={{ ...lblS, textAlign: "right" }}>{k}</div><div style={{ fontWeight: 700, fontSize: 14, color: c || T.ink }}>{v}</div></div>
);

/* ============================== LOADING ============================== */
function LegendDot({ c, label }) {
  return <span className="inline-flex items-center gap-1.5"><span style={{ width: 10, height: 10, background: c, display: "inline-block" }} /><span style={{ fontSize: 11, color: T.sub }}>{label}</span></span>;
}
function Loading({ rows, lens, setLens, openRow, setOpenRow, comments, setComment, money }) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Loading ratios</h1>
          <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>Read the ratios next to margin and the paid/unpaid split. A loose ratio is fine when the client pays for it.</p>
        </div>
        <div className="flex items-center overflow-hidden" style={{ border: `1px solid ${T.line}`, background: "#fff" }}>
          <span style={{ fontSize: 11, color: T.faint, fontWeight: 600, padding: "0 10px" }}>Lens</span>
          {[["segment","Hugo segment"],["industry","Industry"]].map(([k, l]) => (<button key={k} onClick={() => setLens(k)} className="px-3 py-1.5" style={{ background: lens === k ? T.navy : "transparent", color: lens === k ? "#fff" : T.sub, fontSize: 12, fontWeight: 600 }}>{l}</button>))}
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-4 mt-4 px-3 py-2" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: T.faint, letterSpacing: 0.4 }}>LEGEND</span>
        <LegendDot c={T.green} label="Within ideal" /><LegendDot c={T.amber} label="Over-staffed" />
        <LegendDot c={T.steel} label="Under-staffed" /><LegendDot c={T.red} label="Bad margin" />
        <span style={{ fontSize: 11, color: T.faint }}>| notch = target · size: <b style={{ color: T.navy }}>Large</b> <b style={{ color: T.blue }}>Medium</b> <b style={{ color: T.slate }}>Small</b></span>
      </div>
      <div className="mt-4 overflow-x-auto" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 1360 }}>
          <thead><tr>{["Account","Size","Bill","Act","Client-paid : Hugo-cost","QA load","TL load","Shrink %","Margin %","Status","Comment / Rationale"].map((h, i) => (<th key={i} style={{ ...th, textAlign: i === 0 || i === 10 ? "left" : "center", position: "sticky", top: 0 }}>{h}</th>))}</tr></thead>
          <tbody>
            {rows.map((a) => {
              const qaN = a.qa ? a.ag / a.qa : 0, tlN = a.tl ? a.ag / a.tl : 0;
              const qv = ratioVerdict(qaN, "qa", a.size, lens), tv = ratioVerdict(tlN, "tl", a.size, lens);
              const mv = marginVerdict(a.m.margin, a.bench);
              const shColor = a.shrinkPct < 0 ? T.steel : a.shrinkPct > SH_TARGET[a.size] ? T.amber : T.green;
              const open = openRow === a.id;
              return (
                <React.Fragment key={a.id}>
                  <tr className="hx-row" style={{ borderTop: `1px solid ${T.line}`, cursor: "pointer" }} onClick={() => setOpenRow(open ? null : a.id)}>
                    <td style={{ ...td, textAlign: "left" }}>
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} color={T.faint} style={{ transform: open ? "none" : "rotate(-90deg)", transition: ".15s" }} />
                        <span className="flex items-baseline gap-2">
                          <span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</span>
                          {a.bird && <span style={{ fontSize: 11, color: T.faint }}>{a.bird}</span>}
                        </span>
                      </div>
                    </td>
                    <td style={tdC}><SizeTag s={a.size} /></td>
                    <td style={tdC}>{a.bill}</td>
                    <td style={tdC}>{a.act}</td>
                    <td style={tdC}><UnpaidCell a={a} /></td>
                    <td style={tdC}><LoadCell actualN={qaN} ideal={lens === "segment" ? QA_IDEAL[a.size] : 22.5} verdict={qv} target={targetText("qa", a.size, lens)} /></td>
                    <td style={tdC}><LoadCell actualN={tlN} ideal={lens === "segment" ? TL_IDEAL[a.size] : 13.5} verdict={tv} target={targetText("tl", a.size, lens)} /></td>
                    <td style={tdC}><span style={{ fontSize: 12.5, fontWeight: 700, color: shColor }}>{pct(a.shrinkPct)}</span></td>
                    <td style={tdC}><span style={{ fontSize: 12.5, fontWeight: 700, color: mColor(mv) }}>{pct(a.m.margin)}</span></td>
                    <td style={tdC}><CompBadge c={a.comp} /></td>
                    <td style={{ ...td, textAlign: "left", verticalAlign: "top" }}><CommentCell value={comments[a.id] || ""} onChange={(t) => setComment(a.id, t)} source={a.source} /></td>
                  </tr>
                  {open && (
                    <tr style={{ background: "#FAFCFF" }}>
                      <td colSpan={11} style={{ padding: "16px 20px", borderTop: `1px solid ${T.line}` }}>
                        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}>
                          <Detail k="Agents" v={a.ag} /><Detail k="QA" v={a.qa} /><Detail k="TL" v={a.tl} /><Detail k="PC" v={a.pc} />
                          <Detail k="Client-paid HC" v={a.bill} /><Detail k="Hugo-cost HC" v={Math.max(0, a.act - a.bill)} sub={`${pct(unpaid(a).unpaidPct)} of actual`} />
                          <Detail k="Agent : QA" v={ratioText(a.ag, a.qa)} sub={`ideal ${lens === "segment" ? "1:" + QA_IDEAL[a.size] : "1:20–25"}`} />
                          <Detail k="Agent : TL" v={ratioText(a.ag, a.tl)} sub={`ideal ${lens === "segment" ? "1:" + TL_IDEAL[a.size] : "1:12–15"}`} />
                          <Detail k="Margin" v={pct(a.m.margin)} sub={`target ${pct(a.bench)}`} />
                          <Detail k="Revenue / mo" v={money(a.m.rev)} /><Detail k="Cost / mo" v={money(a.m.cost)} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function UnpaidCell({ a }) {
  const u = unpaid(a);
  const paidPct = a.act ? (a.bill / a.act) * 100 : 100;
  const heavy = u.unpaidPct > 0.2;
  return (
    <div className="flex flex-col items-center" style={{ gap: 3 }}>
      <div style={{ width: 88, height: 8, background: "#EAEFF6", display: "flex", overflow: "hidden" }}>
        <div style={{ width: Math.min(100, paidPct) + "%", height: "100%", background: T.navy }} />
        <div style={{ width: Math.max(0, 100 - paidPct) + "%", height: "100%", background: heavy ? T.amber : T.steel }} />
      </div>
      <span style={{ fontSize: 10, color: T.faint }}>{u.paid} paid · {u.delta} unpaid</span>
    </div>
  );
}
function LoadCell({ actualN, ideal, verdict, target }) {
  if (!actualN) return <div className="flex flex-col items-center" style={{ gap: 3 }}><Pill v="—" /><span style={{ fontSize: 9.5, color: T.faint }}>target {target}</span></div>;
  const fill = Math.min(100, (actualN / (ideal * 1.6)) * 100);
  const markerPos = Math.min(100, (ideal / (ideal * 1.6)) * 100);
  const [fg] = V_STYLE[verdict] || V_STYLE["—"];
  return (
    <div className="flex flex-col items-center" style={{ gap: 3 }}>
      <div className="flex items-center justify-center gap-2">
        <div style={{ width: 64, height: 6, background: "#EAEFF6", position: "relative" }}>
          <div style={{ width: fill + "%", height: "100%", background: fg }} />
          <div style={{ position: "absolute", left: markerPos + "%", top: -2, width: 2, height: 10, background: T.navy, opacity: 0.55 }} />
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: fg, minWidth: 34, textAlign: "left" }}>1:{actualN.toFixed(1)}</span>
      </div>
      <span style={{ fontSize: 9.5, color: T.faint }}>target {target}</span>
    </div>
  );
}
const Detail = ({ k, v, sub }) => <div><div style={lblS}>{k}</div><div style={{ fontWeight: 700, fontSize: 15 }}>{v}</div>{sub && <div style={{ fontSize: 11, color: T.faint }}>{sub}</div>}</div>;

/* ============================== SHRINKAGE ============================== */
function Shrinkage({ rows, onSelect, comments, setComment }) {
  const sorted = [...rows].sort((a, b) => (b.shrinkPct - SH_TARGET[b.size]) - (a.shrinkPct - SH_TARGET[a.size]));
  const max = 1.0;
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Shrinkage capacity</h1>
      <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>Sorted by distance from the segment target (Large 15% · Medium 20% · Small 25%). Notch marks the target.</p>
      <div className="mt-5 p-4 overflow-x-auto" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <div style={{ minWidth: 760 }}>
          {sorted.map((a) => {
            const target = SH_TARGET[a.size];
            const status = a.shrinkPct < 0 ? "Under" : a.shrinkPct <= target ? "Within" : "Over";
            const [fg, bg] = V_STYLE[status] || V_STYLE["—"];
            const w = Math.max(0, Math.min(100, (a.shrinkPct / max) * 100));
            const tPos = (target / max) * 100;
            return (
              <div key={a.id} className="flex items-center gap-3 py-2" style={{ borderTop: `1px solid ${T.line}` }}>
                <button onClick={() => onSelect(a)} className="flex items-center gap-2" style={{ width: 200, flexShrink: 0, textAlign: "left" }}>
                  <SizeTag s={a.size} /><span style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                </button>
                <div style={{ flex: 1, minWidth: 120, height: 18, background: "#F1F5FA", position: "relative", overflow: "hidden" }}>
                  {a.shrinkPct >= 0
                    ? <div style={{ width: w + "%", height: "100%", background: bg, borderLeft: `3px solid ${fg}` }} />
                    : <div className="flex items-center pl-2" style={{ height: "100%", color: T.steel, fontSize: 11, fontWeight: 600 }}>staffed below billable</div>}
                  <div style={{ position: "absolute", left: tPos + "%", top: 0, width: 2, height: "100%", background: T.navy, opacity: 0.5 }} />
                </div>
                <div style={{ width: 92, flexShrink: 0, textAlign: "right" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: fg }}>{pct(a.shrinkPct)}</span>
                  <span style={{ fontSize: 11, color: T.faint }}> /{pct(target)}</span>
                </div>
                <div style={{ width: 58, flexShrink: 0 }}><Pill v={status} /></div>
                <CommentCell value={comments[a.id] || ""} onChange={(t) => setComment(a.id, t)} source={a.source} w={230} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================== MARGIN ============================== */
function Margin({ rows, money, A, onOpenDrawer, openRow, setOpenRow, comments, setComment }) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Margin</h1>
          <p style={{ color: T.sub, fontSize: 13.5, marginTop: 4 }}>Revenue, cost and margin per account against its benchmark. Verdict band ±3%: Great / Good / Bad.</p>
        </div>
        <button onClick={onOpenDrawer} className="flex items-center gap-2 px-3 py-2" style={{ background: T.navy, color: "#fff", fontSize: 12.5, fontWeight: 600 }}><SlidersHorizontal size={15} /> Assumptions</button>
      </div>
      <div className="mt-5 overflow-x-auto" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 1140 }}>
          <thead><tr>{["Account","Rate $/hr","Bill","Act","Revenue","Cost","Margin","Target","Verdict","Comment / Rationale"].map((h, i) => (<th key={i} style={{ ...th, textAlign: i === 0 || i === 9 ? "left" : "center" }}>{h}</th>))}</tr></thead>
          <tbody>
            {rows.map((a) => {
              const mv = marginVerdict(a.m.margin, a.bench);
              const open = openRow === "m" + a.id;
              return (
                <React.Fragment key={a.id}>
                  <tr className="hx-row" style={{ borderTop: `1px solid ${T.line}`, cursor: a.gh ? "pointer" : "default" }} onClick={() => a.gh && setOpenRow(open ? null : "m" + a.id)}>
                    <td style={{ ...td, textAlign: "left" }}>
                      <div className="flex items-center gap-2">
                        {a.gh && <ChevronDown size={14} color={T.faint} style={{ transform: open ? "none" : "rotate(-90deg)", transition: ".15s" }} />}
                        <span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</span>
                      </div>
                    </td>
                    <td style={tdC}><span style={{ fontWeight: 600 }}>${a.m.rateEff.toFixed(a.gh || a.nineam ? 2 : 0)}</span></td>
                    <td style={tdC}>{a.m.bill}</td>
                    <td style={tdC}>{a.m.act}</td>
                    <td style={tdC}>{money(a.m.rev)}</td>
                    <td style={tdC}>{money(a.m.cost)}</td>
                    <td style={tdC}><span style={{ fontWeight: 700, color: mColor(mv) }}>{pct(a.m.margin)}</span></td>
                    <td style={tdC}><span style={{ color: T.faint, fontSize: 12 }}>{pct(a.bench)}</span></td>
                    <td style={tdC}><Pill v={mv} /></td>
                    <td style={{ ...td, textAlign: "left", verticalAlign: "top" }}><CommentCell value={comments[a.id] || ""} onChange={(t) => setComment(a.id, t)} source={a.source} /></td>
                  </tr>
                  {open && a.gh && <GhBlend A={A} money={money} />}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function GhBlend({ A, money }) {
  const H = A.hours, FX = A.fx;
  const lines = GH_LINES.map((l) => {
    const rev = l.rate * l.bill * H;
    const cost = l.basis === "US" ? A.us * l.act * H : ((l.ag + l.other) * A.agent + l.qa * A.qaosme + l.tl * A.tl) / FX;
    return { ...l, rev, cost, margin: (rev - cost) / rev };
  });
  const tRev = lines.reduce((s, l) => s + l.rev, 0), tCost = lines.reduce((s, l) => s + l.cost, 0);
  const tBill = lines.reduce((s, l) => s + l.bill, 0), tAct = lines.reduce((s, l) => s + l.act, 0);
  return (
    <tr style={{ background: "#FAFCFF" }}>
      <td colSpan={10} style={{ padding: "12px 20px", borderTop: `1px solid ${T.line}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 8 }}>GIFTHEALTH LINE-LEVEL BLEND</div>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead><tr>{["Line","Geography","Rate","Bill","Act","Basis","Revenue","Cost","Margin"].map((h, i) => (<th key={i} style={{ ...thSm, textAlign: i === 0 || i === 1 ? "left" : "center" }}>{h}</th>))}</tr></thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.line} style={{ borderTop: `1px solid ${T.line}` }}>
                <td style={{ ...tdSm, textAlign: "left", fontWeight: 600 }}>{l.line}</td>
                <td style={{ ...tdSm, textAlign: "left", color: T.sub }}>{l.geo}</td>
                <td style={tdSmC}>${l.rate}</td><td style={tdSmC}>{l.bill}</td><td style={tdSmC}>{l.act}</td>
                <td style={tdSmC}><span style={{ fontSize: 10.5, color: l.basis === "US" ? T.steel : T.sub }}>{l.basis === "US" ? "US $20/hr" : "NGN ÷ FX"}</span></td>
                <td style={tdSmC}>{money(l.rev)}</td><td style={tdSmC}>{money(l.cost)}</td>
                <td style={{ ...tdSmC, fontWeight: 700, color: l.margin >= 0.5 ? T.green : l.margin >= 0.3 ? T.steel : T.amber }}>{pct(l.margin)}</td>
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid ${T.line}`, background: "#fff" }}>
              <td style={{ ...tdSm, textAlign: "left", fontWeight: 700 }}>Weighted</td><td style={tdSm}></td>
              <td style={{ ...tdSmC, fontWeight: 700, color: T.blue }}>${(tRev / (tBill * H)).toFixed(2)}</td>
              <td style={{ ...tdSmC, fontWeight: 700 }}>{tBill}</td><td style={{ ...tdSmC, fontWeight: 700 }}>{tAct}</td>
              <td style={{ ...tdSmC, fontSize: 10.5, color: T.faint }}>cost/hr ${(tCost / (tAct * H)).toFixed(2)}</td>
              <td style={{ ...tdSmC, fontWeight: 700 }}>{money(tRev)}</td><td style={{ ...tdSmC, fontWeight: 700 }}>{money(tCost)}</td>
              <td style={{ ...tdSmC, fontWeight: 700, color: T.green }}>{pct((tRev - tCost) / tRev)}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

/* ============================== RATIONALE PANEL ============================== */
function RationalePanel({ a, money, comments, setComment, onClose }) {
  const mv = marginVerdict(a.m.margin, a.bench);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,30,56,0.28)", zIndex: 40 }} />
      <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: 380, maxWidth: "92vw", background: "#fff", zIndex: 50, boxShadow: "-12px 0 32px rgba(15,30,56,0.16)", overflowY: "auto" }}>
        <div className="px-5 py-4 flex items-start justify-between" style={{ borderBottom: `1px solid ${T.line}`, position: "sticky", top: 0, background: "#fff" }}>
          <div>
            <div className="flex items-center gap-2"><SizeTag s={a.size} /><CompBadge c={a.comp} /></div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8, letterSpacing: -0.3 }}>{a.name}</div>
            {a.bird && <div style={{ fontSize: 12, color: T.faint }}>{a.bird}</div>}
          </div>
          <button onClick={onClose}><X size={18} color={T.sub} /></button>
        </div>
        <div className="px-5 py-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Stat k="Agent : QA" v={ratioText(a.ag, a.qa)} pill={a.qaV} />
            <Stat k="Agent : TL" v={ratioText(a.ag, a.tl)} pill={a.tlV} />
            <Stat k="Shrinkage" v={pct(a.shrinkPct)} pill={a.shV} />
            <Stat k="Margin" v={pct(a.m.margin)} pill={mv} />
          </div>
          <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Mini k="Revenue / mo" v={money(a.m.rev)} /><Mini k="Cost / mo" v={money(a.m.cost)} />
            <Mini k="Client-paid HC" v={a.bill} /><Mini k="Hugo-cost HC" v={Math.max(0, a.act - a.bill)} />
          </div>
          <div className="mt-4 p-3" style={{ background: T.paper, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.blue, letterSpacing: 0.3, marginBottom: 4 }}>RECOMMENDATION</div>
            <div style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.5 }}>{recommendation(a)}</div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: 0.3 }}>RATIONALE</span>
              {a.source && a.source !== "Note" && <span style={{ fontSize: 10.5, color: T.faint }}>from {a.source}</span>}
            </div>
            <textarea value={comments[a.id] || ""} onChange={(e) => setComment(a.id, e.target.value)} placeholder="Add a note…" rows={6}
              style={{ width: "100%", resize: "vertical", border: `1px solid ${T.line}`, padding: "10px 12px", fontFamily: FONT, fontSize: 13, lineHeight: 1.55, color: T.ink, outline: "none", background: T.paper }}
              onFocus={(e) => (e.target.style.borderColor = T.blue)} onBlur={(e) => (e.target.style.borderColor = T.line)} />
          </div>
        </div>
      </div>
    </>
  );
}
const Stat = ({ k, v, pill }) => (
  <div className="p-3" style={{ border: `1px solid ${T.line}` }}>
    <div style={lblS}>{k}</div>
    <div className="flex items-center justify-between mt-1"><span style={{ fontWeight: 700, fontSize: 16 }}>{v}</span><Pill v={pill} /></div>
  </div>
);
const Mini = ({ k, v }) => <div className="p-3" style={{ background: T.paper }}><div style={lblS}>{k}</div><div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{v}</div></div>;

/* ============================== ASSUMPTIONS DRAWER ============================== */
function AssumptionsDrawer({ A, setA, onClose }) {
  const fields = [
    ["hours","Hours / month",1],["fx","FX — naira per $",1],
    ["agent","Agent salary · NGN/mo",1000],["qaosme","QA / OSME salary · NGN/mo",1000],
    ["tl","TL salary · NGN/mo",1000],["pc","PC salary · NGN/mo",1000],
    ["us","US / Missouri cost · $/hr",1],
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,30,56,0.28)", zIndex: 40 }} />
      <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: 360, maxWidth: "92vw", background: "#fff", zIndex: 50, boxShadow: "-12px 0 32px rgba(15,30,56,0.16)", overflowY: "auto" }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Assumptions</div>
          <button onClick={onClose}><X size={18} color={T.sub} /></button>
        </div>
        <div className="px-5 py-4">
          <p style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.5, marginBottom: 16 }}>Every figure recalculates across all accounts the moment you change a value.</p>
          {fields.map(([k, label, step]) => (
            <div key={k} className="mb-4">
              <label style={{ fontSize: 11.5, color: T.sub, fontWeight: 600 }}>{label}</label>
              <input type="number" step={step} value={A[k]} onChange={(e) => setA({ ...A, [k]: Number(e.target.value) || 0 })} className="w-full px-3 py-2 mt-1.5"
                style={{ border: `1px solid ${T.line}`, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: T.blue, outline: "none" }} />
            </div>
          ))}
          <button onClick={() => setA({ ...DEFAULTS })} className="flex items-center gap-2 px-3 py-2 mt-2" style={{ border: `1px solid ${T.line}`, color: T.sub, fontSize: 12.5, fontWeight: 600, width: "100%", justifyContent: "center" }}>
            <RotateCcw size={14} /> Reset to defaults
          </button>
        </div>
      </div>
    </>
  );
}

/* ============================== STYLE OBJECTS ============================== */
const sec = { fontSize: 13, fontWeight: 700, color: T.navy, margin: "28px 0 12px", letterSpacing: 0.3, textTransform: "uppercase" };
const lblS = { fontSize: 10.5, color: T.faint, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.3 };
const numS = { fontWeight: 700, fontSize: 15, color: T.ink };
const cardHd = { padding: "14px 18px", fontWeight: 700, fontSize: 13.5, borderBottom: `1px solid ${T.line}` };
const th = { padding: "11px 14px", fontSize: 11, color: T.faint, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, background: "#FBFCFE" };
const td = { padding: "11px 14px", fontSize: 13, color: T.ink };
const tdC = { ...td, textAlign: "center" };
const thSm = { padding: "7px 10px", fontSize: 10, color: T.faint, fontWeight: 700, textTransform: "uppercase" };
const tdSm = { padding: "7px 10px", fontSize: 12, color: T.ink };
const tdSmC = { ...tdSm, textAlign: "center" };
