export default function parseDateBR(brDate) {
  const [day, month, year] = brDate.split("/")
  return new Date(`${year}-${month}-${day}`)
}
