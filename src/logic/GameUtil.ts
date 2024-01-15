import GameSquare from '../models/IGameSquare'
import Player from './game_objects/Player'
import Box from './game_objects/Box'
import TargetSquare from './game_squares/TargetSquare'
import { Move } from './constants/Move'

export default class GameUtil {
  public static findPlayerCordinates(map: GameSquare[][]): [number, number] {
    for (const row of map) {
      for (const col of row) {
        if (col.occupant instanceof Player) return [map.indexOf(row), row.indexOf(col)]
      }
    }
    throw new Error('Player not found on level')
  }

  public static checkIfLevelIsCompleted(map: GameSquare[][]): boolean {
    const targetSquares: GameSquare[] = this.findTargetSquares(map)
    return targetSquares.every((square) => square.occupant instanceof Box)
  }

  private static findTargetSquares(map: GameSquare[][]): GameSquare[] {
    const targetSquares: GameSquare[] = []
    for (const row of map) {
      for (const col of row) {
        if (col instanceof TargetSquare) targetSquares.push(col)
      }
    }
    if (targetSquares.length === 0) throw new Error('No target squares found on level')
    return targetSquares
  }

  public static nextSquareCordinates([row, col]: [number, number], move: Move): [number, number] {
    switch (move) {
      case Move.UP:
        return [row - 1, col]
      case Move.DOWN:
        return [row + 1, col]
      case Move.LEFT:
        return [row, col - 1]
      case Move.RIGHT:
        return [row, col + 1]
      default:
        throw new Error('Invalid move')
    }
  }

  public static previousSquareCordinates(
    [row, col]: [number, number],
    move: Move,
  ): [number, number] {
    switch (move) {
      case Move.UP:
        return [row + 1, col]
      case Move.DOWN:
        return [row - 1, col]
      case Move.LEFT:
        return [row, col + 1]
      case Move.RIGHT:
        return [row, col - 1]
      default:
        throw new Error('Invalid move')
    }
  }
}
