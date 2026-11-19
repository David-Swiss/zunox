// Klare, grosse Schachfiguren als eigene SVG-Silhouetten – unabhängig von Emoji-/Systemfonts.
const SHAPES={
 p:'<circle cx="50" cy="22" r="11"/><path d="M39 38 Q50 32 61 38 L58 52 Q65 60 68 72 L76 80 L24 80 L32 72 Q35 60 42 52Z"/>',
 r:'<path d="M24 20 H38 V32 H45 V20 H55 V32 H62 V20 H76 V45 H69 L73 72 L80 81 H20 L27 72 L31 45 H24Z"/>',
 n:'<path d="M24 78 Q28 63 37 53 Q29 44 34 31 Q39 20 55 19 Q52 28 64 34 Q77 42 72 58 L68 72 L80 81 H20Z"/><circle cx="55" cy="34" r="2.5" class="eye"/>',
 b:'<circle cx="50" cy="23" r="12"/><path d="M43 38 Q50 43 57 38 L54 51 Q65 61 68 73 L78 81 H22 L32 73 Q35 61 46 51Z"/><path d="M44 16 L56 30" class="cut"/>',
 q:'<circle cx="22" cy="27" r="6"/><circle cx="50" cy="17" r="6"/><circle cx="78" cy="27" r="6"/><path d="M22 35 L34 47 L50 29 L66 47 L78 35 L70 73 L78 81 H22 L30 73Z"/>',
 k:'<path d="M45 8 H55 V20 H67 V29 H55 V39 Q66 49 68 72 L78 81 H22 L32 72 Q34 49 45 39 V29 H33 V20 H45Z"/>'
};
export function pieceSVG(piece){
 const type=piece.type,color=piece.color==="w"?"white":"black",shape=SHAPES[type]||"";
 const fill=color==="white"?"#fff":"#172536",stroke=color==="white"?"#34483f":"#f1f5f9";
 return '<svg class="piece basic-piece '+color+'" viewBox="0 0 100 100" role="img" aria-label="'+({k:"König",q:"Dame",r:"Turm",b:"Läufer",n:"Springer",p:"Bauer"}[type]||"Schachfigur")+'" xmlns="http://www.w3.org/2000/svg"><g fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">'+shape+'</g></svg>';
}
