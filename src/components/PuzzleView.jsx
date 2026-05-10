import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Check } from 'lucide-react'
import {
  PUZZLE_COLS,
  PUZZLE_ROWS,
  TOTAL_TILES,
  generatePuzzleTiles,
  getClosestGridPosition,
  getTileAtPosition,
  isPuzzleComplete,
} from '../utils/puzzleGenerator'

function PuzzleView({ imageSrc, onPuzzleComplete }) {
  const [tiles, setTiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggedTile, setDraggedTile] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  const gridRef = useRef(null)

  // Initialize puzzle
  useEffect(() => {
    ;(async () => {
      try {
        const puzzle = await generatePuzzleTiles(imageSrc, PUZZLE_ROWS, PUZZLE_COLS)
        setTiles(puzzle.tiles)
        setLoading(false)
      } catch (err) {
        console.error('Failed to generate puzzle:', err)
        setLoading(false)
      }
    })()
  }, [imageSrc])

  // Check if puzzle is complete
  useEffect(() => {
    if (tiles.length > 0 && isPuzzleComplete(tiles)) {
      setIsComplete(true)
    }
  }, [tiles])

  const handleTileDragStart = (e, tile) => {
    setDraggedTile(tile)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleGridDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleGridDrop = (e) => {
    e.preventDefault()
    if (!draggedTile || !gridRef.current) return

    const { row, col } = getClosestGridPosition(
      e.clientX,
      e.clientY,
      gridRef.current,
      PUZZLE_ROWS,
      PUZZLE_COLS
    )

    const occupant = getTileAtPosition(tiles, row, col)
    const occupantIndex = tiles.findIndex((t) => t.id === occupant?.id)
    const draggedTileIndex = tiles.findIndex((t) => t.id === draggedTile.id)

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles]

      // swap if occupied
      if (occupant) {
        newTiles[occupantIndex] = {
          ...newTiles[occupantIndex],
          currentRow: draggedTile.currentRow,
          currentCol: draggedTile.currentCol,
        }
      }

      // place dragged tile
      newTiles[draggedTileIndex] = {
        ...newTiles[draggedTileIndex],
        currentRow: row,
        currentCol: col,
      }

      return newTiles
    })

    setDraggedTile(null)
  }

  const handleTileClick = (tile) => {
    // place into first empty cell
    for (let r = 0; r < PUZZLE_ROWS; r++) {
      for (let c = 0; c < PUZZLE_COLS; c++) {
        if (!getTileAtPosition(tiles, r, c)) {
          setTiles((prev) => prev.map((t) => (t.id === tile.id ? { ...t, currentRow: r, currentCol: c } : t)))
          return
        }
      }
    }
  }

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ff8a5c] border-t-transparent" />
          </div>
          <p className="text-lg font-bold text-[#6c4b3d]">Preparando tu rompecabezas...</p>
        </div>
      </motion.div>
    )
  }

  const placedTiles = tiles.filter((t) => t.currentRow !== null)
  const availableTiles = tiles.filter((t) => t.currentRow === null)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div className="text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#fff3d7] px-4 py-2 text-sm font-bold text-[#9b6a1b]">
          <Zap size={16} />
          Reto final: Arma el rompecabezas
        </p>
        <h2 className="font-display text-4xl text-[#4f2e20] sm:text-5xl">{isComplete ? '¡Lo hiciste! 🎉' : 'Completa la imagen'}</h2>
        {!isComplete && <p className="mt-3 text-lg text-[#7a5847]">Arrastra los cuadros para armar la imagen completa ({placedTiles.length}/{TOTAL_TILES})</p>}
      </div>

      {!isComplete ? (
        <div className="space-y-6">
          {/* Horizontal scroller of available tiles */}
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#b87456] mb-2 text-center">Piezas disponibles</p>
            <div className="overflow-x-auto py-2">
              <div className="flex gap-3 px-2">
                {availableTiles.length === 0 ? (
                  <div className="flex items-center justify-center w-full py-8 text-[#a65a48] font-semibold">¡Todas las piezas están colocadas!</div>
                ) : (
                  availableTiles.map((tile) => (
                    <motion.div key={`available-${tile.id}`} draggable onDragStart={(e) => handleTileDragStart(e, tile)} onClick={() => handleTileClick(tile)} className="w-28 flex-shrink-0" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <div className="aspect-square overflow-hidden rounded-lg border-2 border-[#f2b89f] bg-white shadow-md">
                        <img src={tile.imageDataUrl} alt={`Tile ${tile.id}`} className="h-full w-full object-cover" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
            <p className="text-xs text-center text-[#a65a48] italic mt-2">Arrastra o haz clic para colocar</p>
          </div>

          {/* Centered puzzle grid below */}
          <div className="flex justify-center">
            <motion.div ref={gridRef} onDragOver={handleGridDragOver} onDrop={handleGridDrop} className="relative grid w-full max-w-[640px] grid-cols-4 gap-0 rounded-2xl border-3 border-dashed border-[#f2b89f] bg-gradient-to-br from-[#fef8f3] to-[#fff0ea] p-2 shadow-inner" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
              {Array.from({ length: TOTAL_TILES }).map((_, idx) => {
                const row = Math.floor(idx / PUZZLE_COLS)
                const col = idx % PUZZLE_COLS
                const tileAtPos = getTileAtPosition(tiles, row, col)

                return (
                  <motion.div key={`cell-${idx}`} className="relative aspect-square rounded-lg border border-[#f5d0bf] bg-white/60 shadow-sm transition" animate={{ borderColor: tileAtPos ? '#5fb47a' : '#f5d0bf', backgroundColor: tileAtPos ? '#ebf9f0' : 'rgba(255, 255, 255, 0.6)' }}>
                    {tileAtPos && (
                      <motion.img key={`placed-${tileAtPos.id}`} src={tileAtPos.imageDataUrl} alt={`Puzzle tile ${tileAtPos.id}`} draggable onDragStart={(e) => handleTileDragStart(e, tileAtPos)} className="h-full w-full cursor-grab rounded-lg object-cover shadow-md active:cursor-grabbing" layoutId={`tile-${tileAtPos.id}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Skip option at the bottom */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="text-center space-y-3 pt-4">
            <p className="text-m leading-relaxed text-[#7a5847]">
              Si el rompecabezas se vuelve muy difícil, no te preocupes. Lo importante es celebrar tu día. Siéntete libre de avanzar a tu premio cuando lo desees 😘😘
            </p>
            <motion.button
              type="button"
              onClick={onPuzzleComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border-2 border-[#f2b89f] bg-white/80 px-6 py-2 text-m font-semibold text-[#8e4e37] transition hover:bg-white hover:border-[#ff9c74]"
            >
              Continuar al premio →
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 text-center">
          <div className="mx-auto inline-flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6 }} className="text-6xl">✨</motion.div>
          </div>

          <div className="rounded-2xl border-2 border-[#5fb47a] bg-[#effcf3] p-6 sm:p-8">
            <p className="mb-2 inline-flex items-center justify-center gap-2 text-2xl font-black text-[#215532]">
              <Check size={28} />
              ¡Rompecabezas completado!
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#2d5d3f]">Excelente trabajo. Armaste la imagen perfectamente. Ahora sigue hacia tu premio final y descubre la sorpresa que te espera.</p>
          </div>

          <motion.button type="button" onClick={onPuzzleComplete} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mx-auto rounded-full bg-gradient-to-r from-[#ff8a5c] via-[#ff9c73] to-[#f06f43] px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_32px_-18px_rgba(240,111,67,0.95)] transition hover:shadow-[0_18px_38px_-18px_rgba(240,111,67,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a5c]">Ver mi premio 🎁</motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PuzzleView
