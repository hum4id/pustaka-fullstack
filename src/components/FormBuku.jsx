import { useEffect, useState } from 'react'

const formKosong = { judul: '', penulis: '', penerbit: '', tahun: '', kategori: '', stok: '1' }

function FormBuku({ daftarKategori, onTambah, bukuDiedit, onUbah, onBatalEdit }) {
  const [form, setForm] = useState(formKosong)
  const [galat, setGalat] = useState('')
  const modeEdit = Boolean(bukuDiedit)

  // Saat memilih buku untuk diedit, isi formulir dengan datanya.
  useEffect(() => {
    if (bukuDiedit) {
      setForm({
        judul: bukuDiedit.judul,
        penulis: bukuDiedit.penulis,
        penerbit: bukuDiedit.penerbit ?? '',
        tahun: String(bukuDiedit.tahun),
        kategori: bukuDiedit.kategori,
        stok: String(bukuDiedit.stok),
      })
      setGalat('')
    }
  }, [bukuDiedit])

  // Controlled component: setiap input membaca dan menulis ke state `form`
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }))
  }

  const batal = () => {
    setForm(formKosong)
    setGalat('')
    onBatalEdit?.()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.judul.trim() || !form.penulis.trim() || !form.kategori) {
      setGalat('Judul, penulis, dan kategori wajib diisi.')
      return
    }
    const tahunSekarang = new Date().getFullYear()
    const tahun = Number(form.tahun)
    if (!tahun || tahun < 1000 || tahun > tahunSekarang) {
      setGalat(`Tahun terbit harus antara 1000 dan ${tahunSekarang}.`)
      return
    }

    const data = {
      judul: form.judul.trim(),
      penulis: form.penulis.trim(),
      penerbit: form.penerbit.trim(),
      tahun,
      kategori: form.kategori,
      stok: Math.max(0, Number(form.stok) || 0),
    }

    if (modeEdit) {
      onUbah(bukuDiedit.id, data)
    } else {
      onTambah(data)
    }
    setForm(formKosong)
    setGalat('')
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2 className="form__judul">{modeEdit ? 'Ubah buku' : 'Tambah buku'}</h2>
      <p className="form__lead">
        {modeEdit
          ? `Perbarui data untuk "${bukuDiedit.judul}".`
          : 'Lengkapi data buku baru untuk dimasukkan ke katalog.'}
      </p>

      <label className="field">
        <span>Judul</span>
        <input name="judul" value={form.judul} onChange={handleChange} placeholder="cth. Negeri 5 Menara" />
      </label>

      <label className="field">
        <span>Penulis</span>
        <input name="penulis" value={form.penulis} onChange={handleChange} placeholder="cth. Ahmad Fuadi" />
      </label>

      <label className="field">
        <span>Penerbit</span>
        <input name="penerbit" value={form.penerbit} onChange={handleChange} placeholder="cth. Gramedia Pustaka Utama" />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Tahun terbit</span>
          <input name="tahun" type="number" inputMode="numeric" value={form.tahun} onChange={handleChange} placeholder="2009" />
        </label>
        <label className="field">
          <span>Stok</span>
          <input name="stok" type="number" min="0" value={form.stok} onChange={handleChange} />
        </label>
      </div>

      <label className="field">
        <span>Kategori</span>
        <select name="kategori" value={form.kategori} onChange={handleChange}>
          <option value="" disabled>Pilih kategori</option>
          {daftarKategori.map((kategori) => (
            <option key={kategori} value={kategori}>{kategori}</option>
          ))}
        </select>
      </label>

      {galat && <p className="form__galat" role="alert">{galat}</p>}

      <div className="form__aksi">
        <button type="submit" className="tombol">{modeEdit ? 'Simpan perubahan' : 'Tambah'}</button>
        {modeEdit && (
          <button type="button" className="tombol tombol--sekunder" onClick={batal}>Batal</button>
        )}
      </div>
    </form>
  )
}

export default FormBuku
