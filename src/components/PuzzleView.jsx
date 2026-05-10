import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

    // Check if position is already occupied
    const occupant = getTileAtPosition(tiles, row, col)
    const occupantIndex = tiles.findIndex(t => t.id === occupant?.id)
    const draggedTileIndex = tiles.findIndex(t => t.id === draggedTile.id)

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles]

      // If position is occupied, swap
      if (occupant) {
        newTiles[occupantIndex] = {
          ...newTiles[occupantIndex],
          currentRow: draggedTile.currentRow,
          currentCol: draggedTile.currentCol,
        }
      }

      // Move dragged tile to new position
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
    // Find an empty position
    for (let row = 0; row < PUZZLE_ROWS; row++) {
      for (let col = 0; col < PUZZLE_COLS; col++) {
        if (!getTileAtPosition(tiles, row, col)) {
          setTiles((prevTiles) =>
            prevTiles.map((t) =>
              t.id === tile.id
                ? { ...t, currentRow: row, currentCol: col }
                : t
            )
          )
          return
        }
      }
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[500px]"
      >
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ff8a5c] border-t-transparent" />
          </div>
          <p className="text-lg font-bold text-[#6c4b3d]">Preparando tu rompecabezas...</p>
        </div>
      </motion.div>
    )
  }

  const placedTiles = tiles.filter(t => t.currentRow !== null)
  const availableTiles = tiles.filter(t => t.currentRow === null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#fff3d7] px-4 py-2 text-sm font-bold text-[#9b6a1b]">
          <Zap size={16} />
          Reto final: Arma el rompecabezas
        </p>
        <h2 className="font-display text-4xl text-[#4f2e20] sm:text-5xl">
          {isComplete ? '¡Lo hiciste! 🎉' : 'Completa la imagen'}
        </h2>
        {!isComplete && (
          <p className="mt-3 text-lg text-[#7a5847]">
            Arrastra los cuadros para armar la imagen completa ({placedTiles.length}/{TOTAL_TILES})
          </p>
        )}
      </div>

      {!isComplete ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Puzzle Grid */}
          <motion.div
            ref={gridRef}
            onDragOver={handleGridDragOver}
            onDrop={handleGridDrop}
            className="relative mx-auto grid w-full max-w-[640px] grid-cols-4 gap-1 rounded-2xl border-3 border-dashed border-[#f2b89f] bg-gradient-to-br from-[#fef8f3] to-[#fff0ea] p-3 shadow-inner"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Grid background cells */}
            {Array.from({ length: TOTAL_TILES }).map((_, idx) => {
              const row = Math.floor(idx / PUZZLE_COLS)
              const col = idx % PUZZLE_COLS
              const tileAtPos = getTileAtPosition(tiles, row, col)

              return (
                <motion.div
                  key={`cell-${idx}`}
                  className="relative aspect-square rounded-lg border-2 border-[#f5d0bf] bg-white/60 shadow-sm transition"
                  animate={{
                    borderColor: tileAtPos ? '#5fb47a' : '#f5d0bf',
                    backgroundColor: tileAtPos ? '#ebf9f0' : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {tileAtPos && (
                    <motion.img
                      key={`placed-${tileAtPos.id}`}
                      src={tileAtPos.imageDataUrl}
                      alt={`Puzzle tile ${tileAtPos.id}`}
                      draggable
                      onDragStart={(e) => handleTileDragStart(e, tileAtPos)}
                      className="h-full w-full cursor-grab rounded-lg object-cover shadow-md active:cursor-grabbing"
                      layoutId={`tile-${tileAtPos.id}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Available Tiles */}
          <motion.div className="space-y-2 lg:pt-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#b87456]">
              Piezas disponibles
            </p>
            <div className="max-h-[640px] space-y-2 overflow-y-auto rounded-lg bg-gradient-to-b from-[#fff7f3] to-[#ffebe3] p-3 shadow-inner">
              {availableTiles.length === 0 ? (
                <p className="text-center py-8 text-[#a65a48] font-semibold">
                  ¡Todas las piezas están colocadas!
                </p>
              ) : (
                <div className="space-y-2">
                  {availableTiles.map((tile) => (
                    <motion.div
                      key={`available-${tile.id}`}
                      draggable
                      onDragStart={(e) => handleTileDragStart(e, tile)}
                      onClick={() => handleTileClick(tile)}
                      className="group cursor-grab active:cursor-grabbing"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-[#f2b89f] bg-white shadow-md transition group-hover:border-[#ff9c74] group-hover:shadow-lg">
                        <img
                          src={tile.imageDataUrl}
                          alt={`Tile ${tile.id}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-center text-[#a65a48] italic">
              Arrastra o haz clic para colocar
            </p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 text-center"
        >
          <div className="mx-auto inline-flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="text-6xl"
            >
              ✨
            </motion.div>
          </div>

          <div className="rounded-2xl border-2 border-[#5fb47a] bg-[#effcf3] p-6 sm:p-8">
            <p className="mb-2 inline-flex items-center justify-center gap-2 text-2xl font-black text-[#215532]">
              <Check size={28} />
              ¡Rompecabezas completado!
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#2d5d3f]">
              Excelente trabajo. Armaste la imagen perfectamente. Ahora sigue hacia tu
              premio final y descubre la sorpresa que te espera.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onPuzzleComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto rounded-full bg-gradient-to-r from-[#ff8a5c] via-[#ff9c73] to-[#f06f43] px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_32px_-18px_rgba(240,111,67,0.95)] transition hover:shadow-[0_18px_38px_-18px_rgba(240,111,67,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a5c]"
          >
            Ver mi premio 🎁
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PuzzleView
