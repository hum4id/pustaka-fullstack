// Konfigurasi dasar untuk komunikasi dengan backend (dipakai mulai Pekan 11).
// Isi VITE_API_URL di file .env, contoh: VITE_API_URL=http://localhost:3000/api
export const API_URL = import.meta.env.VITE_API_URL || ''
export const pakaiBackend = Boolean(API_URL)

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    // Ambil pesan error dari body backend (mis. NotFound/Conflict/Validation) bila ada.
    let pesan = `Permintaan ${options.method || 'GET'} ${path} gagal (${response.status})`
    try {
      const body = await response.json()
      if (body?.message) pesan = Array.isArray(body.message) ? body.message.join(', ') : body.message
    } catch {
      // body kosong / bukan JSON — pakai pesan default
    }
    throw new Error(pesan)
  }
  return response.status === 204 ? null : response.json()
}
