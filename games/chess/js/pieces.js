// Klassische, schlichte Unicode-Schachfiguren ohne dekorative SVG-Hüllen.
const GLYPHS={
  w:{k:"♔",q:"♕",r:"♖",b:"♗",n:"♘",p:"♙"},
  b:{k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"}
};
export function pieceSVG(piece){
  const symbol=GLYPHS[piece.color]?.[piece.type]||"";
  const color=piece.color==="w"?"white":"black";
  return '<span class="piece basic-piece '+color+'" aria-hidden="true">'+symbol+'</span>';
}
