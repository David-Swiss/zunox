// Klare, flache SVG-Figuren mit fest eingebetteten Farben.
const SHAPES={
 p:'<circle cx="50" cy="25" r="14"/><path d="M42 39 C41 47 38 54 34 61 C30 68 28 74 28 80 H72 C72 74 70 68 66 61 C62 54 59 47 58 39 Z"/><path d="M23 84 H77 V90 H23 Z"/>',
 r:'<path d="M20 15 H35 V29 H43 V15 H57 V29 H65 V15 H80 V42 H72 L76 78 H24 L28 42 H20 Z"/>',
 n:'<path d="M22 80 Q27 63 39 54 Q29 45 33 32 Q37 17 57 15 Q54 25 66 33 Q80 43 72 60 L68 73 L81 84 H19 Z"/><circle cx="56" cy="32" r="3" fill="currentColor" stroke="none"/>',
 b:'<path d="M50 13 C39 13 33 22 35 32 C36 39 42 44 46 47 L42 57 C35 62 31 69 30 76 L21 84 H79 L70 76 C69 69 65 62 58 57 L54 47 C60 43 65 38 65 31 C65 21 59 13 50 13 Z"/><path d="M44 20 L56 38" fill="none" stroke="currentColor" stroke-width="3"/>',
 q:'<path d="M20 24 Q13 17 20 12 Q28 9 31 20 L44 35 L50 12 L56 35 L69 20 Q72 9 80 12 Q87 17 80 24 L72 72 L80 84 H20 L28 72 Z"/><path d="M28 48 H72" fill="none" stroke="currentColor" stroke-width="3"/>',
 k:'<path d="M45 8 H55 V20 H68 V29 H55 V40 C64 47 68 60 69 74 L80 84 H20 L31 74 C32 60 36 47 45 40 V29 H32 V20 H45 Z"/>'
};
export function pieceSVG(piece){
 const white=piece.color==="w",fill=white?"#ffffff":"#111827",stroke=white?"#173326":"#f8fbff",type=piece.type;
 const label={k:"König",q:"Dame",r:"Turm",b:"Läufer",n:"Springer",p:"Bauer"}[type]||"Schachfigur";
 return '<svg class="piece basic-piece '+(white?"white":"black")+'" data-piece-color="'+(white?"white":"black")+'" viewBox="0 0 100 100" role="img" aria-label="'+label+'" xmlns="http://www.w3.org/2000/svg"><g fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(white?3.5:3)+'" stroke-linejoin="round" stroke-linecap="round">'+(SHAPES[type]||"")+'</g></svg>';
}
