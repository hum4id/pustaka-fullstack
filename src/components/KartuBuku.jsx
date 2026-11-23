function KartuBuku({ id, judul, penulis, penerbit, tahun, kategori, stok, onHapus, onEdit }) {
  const tersedia = stok > 0

  return (
    <article className="kartu">
      <div className={`kartu__sampul sampul--${kategori.toLowerCase()}`} aria-hidden="true">
        <span>{judul.charAt(0)}</span>
      </div>

      <div className="kartu__isi">
        <div className="kartu__atas">
          <h3 className="kartu__judul">{judul}</h3>
          <span className={`stok ${tersedia ? 'stok--ada' : 'stok--habis'}`}>
            {tersedia ? `${stok} eksemplar` : 'Sedang dipinjam'}
          </span>
        </div>
        <p className="kartu__penulis">{penulis}</p>
        <p className="kartu__meta">
          {penerbit ? `${penerbit} · ` : ''}{tahun}
        </p>

        <div className="kartu__kaki">
          <span className="tag">{kategori}</span>
        </div>
      </div>

      <div className="kartu__aksi">
        <button
          type="button"
          className="kartu__ubah"
          onClick={() => onEdit({ id, judul, penulis, penerbit, tahun, kategori, stok })}
          aria-label={`Ubah ${judul}`}
          title="Ubah data buku"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4" /></svg>
        </button>
        <button
          type="button"
          className="kartu__hapus"
          onClick={() => onHapus(id)}
          aria-label={`Hapus ${judul}`}
          title="Hapus dari katalog"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </article>
  )
}

export default KartuBuku
