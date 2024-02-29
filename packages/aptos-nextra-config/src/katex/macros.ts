/**
 * Sort alphabetically plz
 * General Rules:
 * 
 * 1. macros should only include alphabetical letters
 */
export const macros = Object.freeze({
  '\\dsk': '\\mathsf{dsk}',
  '\\F': '\\mathbb{F}',
  '\\Gr': '\\mathbb{G}',
  '\\idt': '\\mathbb{G}',
  '\\mpk': '\\mathsf{mpk}',
  '\\msk': '\\mathsf{msk}',
  '\\pk': '\\textsf{pk}',
  '\\randget': '\\stackrel{R}{\\leftarrow}',
  '\\xor': '\\oplus',
  '\\Zp': '\\mathbb{Z}_p'
} as const);

export default macros;
