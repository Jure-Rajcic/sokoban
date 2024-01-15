import Player from '../../game_objects/Player'
import Wall from '../../game_objects/Wall'
import Box from '../../game_objects/Box'
import Nothing from '../../game_objects/Nothing'
import MoveValidator from '../../../models/AMoveValidator'
import BoxMoveValidator from './BoxMoveValidator'

export default class PlayerMoveValidator extends MoveValidator {
  protected canMoveWall(wall: Wall, [row, col]: [number, number]): boolean {
    return false
  }
  protected canMoveBox(box: Box, [row, col]: [number, number]): boolean {
    const validator: MoveValidator = new BoxMoveValidator(this.map, this.move, [row, col])
    const valid: boolean = validator.canMove()
    if (!valid) return false
    validator.validPath.forEach((square) => this.validPath.push(square))
    return true
  }
  protected canMoveNothing(nothing: Nothing, [row, col]: [number, number]): boolean {
    this.validPath.push(this.map[row][col])
    return true
  }
  protected canMovePlayer(player: Player, [row, col]: [number, number]): boolean {
    return false
  }
}
