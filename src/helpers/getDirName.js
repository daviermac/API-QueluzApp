// utils/dirname.js
import { fileURLToPath } from "url"
import path from "path"

export default function getDirname(metaUrl) {
  const __filename = fileURLToPath(metaUrl)
  return path.dirname(__filename)
}
