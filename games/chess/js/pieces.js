// Klassische, kontrastreiche Schachfiguren als SVG-Silhouetten.
const SHAPES={
 p:'<path d="M50 12 C40 12 34 20 34 29 C34 37 39 43 45 46 L41 57 C35 61 31 68 30 75 L22 82 Q20 85 25 87 H75 Q80 85 78 82 L70 75 C69 68 65 61 59 57 L55 46 C61 43 66 37 66 29 C66 20 60 12 50 12 Z"/>',
 r:'<path d="M22 16 H37 V29 H44 V16 H56 V29 H63 V16 H78 V43 H70 L74 72 L81 84 H19 L26 72 L30 43 H22 Z"/>',
 n:'<path d="M22 80 Q27 63 39 54 Q29 45 33 32 Q37 17 57 15 Q54 25 66 33 Q80 43 72 60 L68 73 L81 84 H19 Z"/><circle cx="56" cy="32" r="3" fill="currentColor" stroke="none"/>',
 b:'<path d="M50 13 C39 13 33 22 35 32 C36 39 42 44 46 47 L42 57 C35 62 31 69 30 76 L21 84 H79 L70 76 C69 69 65 62 58 57 L54 47 C60 43 65 38 65 31 C65 21 59 13 50 13 Z"/><path d="M44 20 L56 38" fill="none" stroke="currentColor" stroke-width="3"/>',
 q:'<path d="M20 24 Q13 17 20 12 Q28 9 31 20 L44 35 L50 12 L56 35 L69 20 Q72 9 80 12 Q87 17 80 24 L72 72 L80 84 H20 L28 72 Z"/><path d="M28 48 H72" fill="none" stroke="currentColor" stroke-width="3"/>',
 k:'<path d="M45 8 H55 V20 H68 V29 H55 V40 C64 47 68 60 69 74 L80 84 H20 L31 74 C32 60 36 47 45 40 V29 H32 V20 H45 Z"/>'
};
export function pieceSVG(piece){
 const type=piece.type,white=piece.color==="w",color=white?"white":"black";
 const fill=white?"#fffdf5":"#172536",stroke=white?"#243b32":"#f8fbff";
 const label={k:"König",q:"Dame",r:"Turm",b:"Läufer",n:"Springer",p:"Bauer"}[type]||"Schachfigur";
 return '<svg class="piece basic-piece '+color+'" viewBox="0 0 100 100" role="img" aria-label="'+label+'" xmlns="http://www.w3.org/2000/svg"><g fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(white?5:3.5)+'" stroke-linejoin="round" stroke-linecap="round">'+(SHAPES[type]||"")+'</g></svg>';
}
