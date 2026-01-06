export type ThemeType = "space" | "nature";

export const themes: Record<
  ThemeType,
  {
    bg: string;
    card: string;
    text: string;
    accent: string;
    button: string;
    input: string;
    tableDivider?: string;
    rowHover?: string;
    headerText?: string;
    headerBg?: string;
  }
> = {
 space: {
    headerText: "text-white",
  headerBg: "bg-black/30 backdrop-blur-md",
  bg: `
    bg-black
    bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%)]
  `,
 card: `
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  shadow-[0_0_40px_rgba(255,255,255,0.08)]
`,

  text: "text-slate-100",
  accent: "text-indigo-400",
  button: `
    bg-indigo-600/90
    hover:bg-indigo-500
    shadow-[0_0_15px_rgba(99,102,241,0.4)]
  `,
  input: `
    bg-black/40
    backdrop-blur
    text-white
    placeholder-slate-400
    border border-white/10
    focus:border-indigo-400
  `,
  tableDivider: "border-white/10",
  rowHover: "hover:bg-white/5",
},


  nature: {
     headerText: "text-slate-900",
  headerBg: "bg-white/60 backdrop-blur-md",
  bg: `
    bg-gradient-to-br
    from-green-100
    via-emerald-50
    to-sky-100
  `,
  card: `
    bg-white/80
    backdrop-blur-lg
    border border-green-200
    shadow-[0_10px_30px_rgba(16,185,129,0.15)]
  `,
  text: "text-slate-900",
  accent: "text-emerald-600",
  button: `
    bg-emerald-600
    hover:bg-emerald-500
    shadow-[0_6px_20px_rgba(16,185,129,0.3)]
  `,
  input: `
    bg-white/70
    backdrop-blur
    text-slate-900
    placeholder-slate-500
    border border-green-200
    focus:border-emerald-400
  `,
  tableDivider: "border-green-200/60",
  rowHover: "hover:bg-emerald-50",
},
};
