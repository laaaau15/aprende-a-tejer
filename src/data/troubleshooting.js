export const TROUBLESHOOTING = [
  { id: 'agujeros', emoji: '🕳️', title: 'Me han salido agujeros que no debían', cause: 'Seguramente hiciste una hebra (yarn over) sin querer, o se te escapó un punto.', fix: 'Revisa la vuelta anterior punto a punto. Si encuentras un agujero, deshaz hasta ahí con cuidado y vuelve a tejer.', tool: 'contador' },
  { id: 'perdido', emoji: '❓', title: 'No sé por dónde voy', cause: 'Es habitual al distraerte a mitad de vuelta.', fix: 'Cuenta tus puntos actuales en la aguja y compáralos con el patrón: eso te dice en qué vuelta estás.', tool: 'contador' },
  { id: 'mas', emoji: '➕', title: 'Me sobran puntos', cause: 'Probablemente hiciste un aumento sin querer, o dividiste un punto en dos al tejerlo.', fix: 'Cuenta puntos vuelta a vuelta desde el principio hasta encontrar dónde aparece el extra.', tool: null },
  { id: 'menos', emoji: '➖', title: 'Me faltan puntos', cause: 'Probablemente tejiste dos puntos juntos por error, o se te cayó uno de la aguja.', fix: 'Busca puntos sueltos colgando de la labor; si no hay, cuenta vuelta a vuelta para localizar dónde faltan.', tool: null },
  { id: 'ensancha', emoji: '↔️', title: 'Mi labor se ensancha poco a poco', cause: 'Aumentos involuntarios, normalmente al final de la vuelta.', fix: 'Comprueba que no estés tejiendo dos veces el último punto.', tool: null },
  { id: 'estrecha', emoji: '🔻', title: 'Mi labor se estrecha poco a poco', cause: 'Puntos que se pierden, a menudo al principio de la vuelta.', fix: 'Comprueba que no te estés saltando el primer punto al empezar cada vuelta.', tool: null },
  { id: 'cual-derecho', emoji: '🟩', title: 'No sé si este punto es derecho', cause: 'Cuesta distinguirlos al principio.', fix: 'El derecho forma una "V"; el revés forma un granito horizontal. Mira la vuelta anterior para identificarlo.', tool: null },
  { id: 'cual-reves', emoji: '🟦', title: 'No sé si este punto es revés', cause: 'Igual que con el derecho: cuesta al principio.', fix: 'Si ves un granito horizontal justo debajo de la aguja, es revés.', tool: null },
  { id: 'vuelta-mal', emoji: '🔁', title: 'Creo que tejí mal una vuelta entera', cause: 'A veces se cambia de punto sin darse cuenta.', fix: 'Compara la textura de esa vuelta con las de alrededor; si no encaja, deshazla con cuidado hasta el principio de esa vuelta.', tool: null },
  { id: 'escapado', emoji: '🪡', title: 'Se me ha escapado un punto y está bajando', cause: 'Un punto se soltó de la aguja y las vueltas se están deshaciendo.', fix: 'Usa una aguja auxiliar o un ganchillo para "atrapar" el punto y subirlo vuelta a vuelta hasta la aguja.', tool: null },
  { id: 'bordes-tensos', emoji: '📏', title: 'Los bordes me quedan muy tensos', cause: 'Es muy común: solemos tejer más prieto el primer y último punto.', fix: 'Prueba a tejer el primer punto de cada vuelta deslizándolo sin tejer (punto orilla), o usa una aguja un número más grande solo para el borde.', tool: null },
  { id: 'bordes-flojos', emoji: '🎈', title: 'Los bordes me quedan muy flojos', cause: 'Sueles dar demasiado hilo al principio o final de vuelta.', fix: 'Tira un poco del hilo antes de tejer el primer punto de cada vuelta.', tool: null }
]

export function findTroubleshooting(id) {
  return TROUBLESHOOTING.find((t) => t.id === id)
}
