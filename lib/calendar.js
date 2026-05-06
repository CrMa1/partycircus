// Fechas que aplican TARIFA ALTA (horario "vidofes") en el cotizador.
// La lógica es: festivo o día sin clases → aplica tarifa alta sin importar
// el día de la semana. Los viernes y domingos normales ya se detectan
// por día de la semana en el cotizador, no necesitan estar aquí.
//
// Mantenimiento:
//   - Profedet (festivos oficiales LFT Art. 74):
//       https://www.profedet.gob.mx/micrositio/index.php/dias-de-descanso
//   - SEP (calendario escolar — días sin clases, CTE, vacaciones):
//       https://calendarioescolar.sep.gob.mx/
//   Conviene revisar al inicio de cada año y al publicarse el ciclo SEP.

// ── Fechas individuales (formato YYYY-MM-DD) ──────────────────────────────
export const HIGH_TARIFF_DATES = [
  // Profedet 2026 — días de descanso obligatorio (Art. 74 LFT)
  '2026-01-01', // Año Nuevo
  '2026-02-02', // Conmemoración de la Constitución (1er lunes feb)
  '2026-03-16', // Natalicio de Benito Juárez (3er lunes mar)
  '2026-05-01', // Día del Trabajo (también suspensión SEP)
  '2026-09-16', // Día de la Independencia
  '2026-11-16', // Revolución Mexicana (3er lunes nov)
  '2026-12-25', // Navidad

  // SEP 2025-2026 — días sin clases confirmados (suspensiones / CTE)
  '2026-05-05', // Batalla de Puebla / Cinco de Mayo (suspensión SEP)
  '2026-05-15', // Día del Maestro (suspensión SEP)
  '2026-05-29', // Consejo Técnico Escolar (último viernes mayo)
  '2026-06-26', // Consejo Técnico Escolar (último viernes junio)
  '2026-07-03', // Registro de calificaciones / jornada administrativa SEP

  // Posible suspensión escolar — pendiente de confirmar con calendario SEP 2026-2027
  '2026-11-02', // Día de Muertos (puente probable; SEP suele dar el día)

  // SEP 2026-2027 — pendiente de publicación oficial.
  // Cuando se publique el calendario, agregar aquí los CTEs y suspensiones
  // que apliquen del 2026-08 al 2026-12.
]

// ── Rangos continuos (vacaciones largas) ──────────────────────────────────
// Útil para no tener que listar 30+ días sueltos. Todo día dentro del
// rango (incluyendo extremos) cuenta como tarifa alta.
export const HIGH_TARIFF_RANGES = [
  // Período inter-ciclo: del fin de clases del ciclo 2025-2026 al inicio
  // del ciclo 2026-2027. Cubre vacaciones de verano (sin clases).
  // Fin de clases ciclo 2025-2026: 2026-07-15 (último día con clases).
  // Inicio ciclo 2026-2027: típicamente 2026-08-24 (lunes).
  { from: '2026-07-16', to: '2026-08-23', label: 'Vacaciones de verano (inter-ciclo SEP)' },

  // Vacaciones de invierno 2026-2027 — fechas estimadas según patrón SEP.
  // Validar al publicarse el calendario SEP 2026-2027 oficial.
  { from: '2026-12-21', to: '2026-12-31', label: 'Vacaciones de invierno SEP 2026-2027 (estimado)' },
]

export function isHighTariffDate(dateString) {
  if (!dateString) return false
  if (HIGH_TARIFF_DATES.includes(dateString)) return true
  return HIGH_TARIFF_RANGES.some((r) => dateString >= r.from && dateString <= r.to)
}
