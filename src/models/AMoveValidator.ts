import IGameSquare from './IGameObject'
import GameSquare from './IGameSquare'
import Player from '../logic/game_objects/Player'
import Wall from '../logic/game_objects/Wall'
import Box from '../logic/game_objects/Box'
import Nothing from '../logic/game_objects/Nothing'
import { Move } from '../logic/constants/Move'
import GameUtil from '../logic/GameUtil'
export default abstract class MoveValidator {
  protected readonly map: GameSquare[][]
  protected readonly move: Move
  protected readonly row_index: number
  protected readonly col_index: number
  public readonly validPath: GameSquare[]

  constructor(map: GameSquare[][], direction: Move, [rowIndex, colIndex]: [number, number]) {
    this.map = map
    this.move = direction
    this.row_index = rowIndex
    this.col_index = colIndex
    this.validPath = [map[rowIndex][colIndex]]
  }

  public canMove(): boolean {
    let [row, col] = [this.row_index, this.col_index]
    ;[row, col] = GameUtil.nextSquareCordinates([row, col], this.move)

    const objectInWay: IGameSquare = this.map[row][col].occupant
    if (objectInWay instanceof Wall) return this.canMoveWall(objectInWay, [row, col])
    if (objectInWay instanceof Box) return this.canMoveBox(objectInWay, [row, col])
    if (objectInWay instanceof Nothing) return this.canMoveNothing(objectInWay, [row, col])
    if (objectInWay instanceof Player) return this.canMovePlayer(objectInWay, [row, col])
    throw new Error(`Unknown game object to push ${objectInWay}`)
  }

  protected abstract canMoveWall(wall: Wall, [row, col]: [number, number]): boolean
  protected abstract canMoveBox(box: Box, [row, col]: [number, number]): boolean
  protected abstract canMoveNothing(nothing: Nothing, [row, col]: [number, number]): boolean
  protected abstract canMovePlayer(player: Player, [row, col]: [number, number]): boolean
}
