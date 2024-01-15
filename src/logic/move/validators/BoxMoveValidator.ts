import Player from '../../game_objects/Player'
import Wall from '../../game_objects/Wall'
import Box from '../../game_objects/Box'
import Nothing from '../../game_objects/Nothing'
import MoveValidator from '../../../models/AMoveValidator'

export default class BoxMoveValidator extends MoveValidator {
  protected canMoveWall(wall: Wall, [row, col]: [number, number]): boolean {
    return false
  }
  protected canMoveBox(box: Box, [row, col]: [number, number]): boolean {
    return false
  }
  protected canMoveNothing(nothing: Nothing, [row, col]: [number, number]): boolean {
    this.validPath.push(this.map[row][col])
    return true
  }
  protected canMovePlayer(player: Player, [row, col]: [number, number]): boolean {
    return false
  }
}
