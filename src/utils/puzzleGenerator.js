/**
 * Utility to generate puzzle tiles from an image.
 * Divides an image into a configurable grid and extracts canvas data for each tile.
 */

export const PUZZLE_ROWS = 4
export const PUZZLE_COLS = 4
export const TOTAL_TILES = PUZZLE_ROWS * PUZZLE_COLS
const TILE_DISPLAY_SIZE = 132

export async function generatePuzzleTiles(imageSrc, rows = PUZZLE_ROWS, cols = PUZZLE_COLS) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Set canvas to full image dimensions (we'll work with real dimensions)
      canvas.width = img.width
      canvas.height = img.height

      // Draw the full image
      ctx.drawImage(img, 0, 0)

      // Calculate tile dimensions
      const tileWidth = img.width / cols
      const tileHeight = img.height / rows

      const tiles = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const tileIndex = row * cols + col

          // Create a canvas for this tile
          const tileCanvas = document.createElement('canvas')
          const tileCtx = tileCanvas.getContext('2d')

          // Draw tile with scaling
          tileCanvas.width = TILE_DISPLAY_SIZE
          tileCanvas.height = TILE_DISPLAY_SIZE
          tileCtx.drawImage(
            img,
            col * tileWidth,
            row * tileHeight,
            tileWidth,
            tileHeight,
            0,
            0,
            TILE_DISPLAY_SIZE,
            TILE_DISPLAY_SIZE
          )

          tiles.push({
            id: tileIndex,
            correctRow: row,
            correctCol: col,
            imageDataUrl: tileCanvas.toDataURL(),
            currentRow: null,
            currentCol: null,
            isDraggedOver: false,
          })
        }
      }

      resolve({
        tiles: tiles.sort(() => Math.random() - 0.5), // Shuffle
        originalImage: imageSrc,
        gridRows: rows,
        gridCols: cols,
      })
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image from ${imageSrc}`))
    }

    img.src = imageSrc
  })
}

export function isPuzzleComplete(tiles) {
  return tiles.every((tile) => tile.currentRow === tile.correctRow && tile.currentCol === tile.correctCol)
}

export function getTileAtPosition(tiles, row, col) {
  return tiles.find((tile) => tile.currentRow === row && tile.currentCol === col) || null
}

export function getClosestGridPosition(x, y, gridElement, gridRows, gridCols) {
  const rect = gridElement.getBoundingClientRect()
  const gridX = x - rect.left
  const gridY = y - rect.top

  const cellWidth = rect.width / gridCols
  const cellHeight = rect.height / gridRows

  const closestCol = Math.min(gridCols - 1, Math.max(0, Math.floor(gridX / cellWidth)))
  const closestRow = Math.min(gridRows - 1, Math.max(0, Math.floor(gridY / cellHeight)))

  return { row: closestRow, col: closestCol }
}
