// Zwei eigenständige, inline gezeichnete SVG-Figurensets.
const GLYPHS={k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
export function pieceSVG(piece,theme="neo"){
 const white=piece.color==="w",symbol=GLYPHS[piece.type]||"?",fill=white?(theme==="classic"?"#fff8e8":"#f5fbff"):"#18283b",stroke=white?"#263b4c":"#b9e9e8";
 const glyph=theme==="classic"?symbol:(piece.type==="k"?"♔":piece.type==="q"?"♕":piece.type==="r"?"♖":piece.type==="b"?"♗":piece.type==="n"?"♘":"♙");
 return '<svg class="piece" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 5 36 13 44 9 42 19 51 24 45 31 48 45 54 53H10l6-8 3-14-6-7 9-5-2-10 8 4Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.8" stroke-linejoin="round"/><path d="M18 48h28M22 54h20" stroke="'+stroke+'" stroke-width="2.5" stroke-linecap="round"/><text x="32" y="39" text-anchor="middle" font-size="27" fill="'+(white?"#1b3040":"#d9f5ef")+'" stroke="none">'+glyph+'</text></svg>';
}