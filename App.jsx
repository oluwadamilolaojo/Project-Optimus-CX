@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --hx-paper: #F6F8FC; }
html, body, #root { height: 100%; }
body {
  margin: 0;
  font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  background: var(--hx-paper);
  -webkit-font-smoothing: antialiased;
}
*::-webkit-scrollbar { height: 8px; width: 8px; }
*::-webkit-scrollbar-thumb { background: #cdd7e6; border-radius: 8px; }
.hx-row:hover { background: #FAFCFF; }
textarea { font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
