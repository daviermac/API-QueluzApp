export default function parseHoraBR(horaString) {
  const [hours, minutes] = horaString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}
