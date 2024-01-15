import GameSquare from './IGameSquare'
import Box from '../logic/game_objects/Box'
import Nothing from '../logic/game_objects/Nothing'
import Player from '../logic/game_objects/Player'
import Wall from '../logic/game_objects/Wall'
import TargetSquare from '../logic/game_squares/TargetSquare'
import EmptySquare from '../logic/game_squares/EmptySquare'
import IGameObject from './IGameObject'

export default abstract class GameTheme {
  public render(square: GameSquare): HTMLDivElement {
    if (square instanceof EmptySquare) return this.renderEmptySquare(square.occupant)
    if (square instanceof TargetSquare) return this.renderTargetSquare(square.occupant)
    throw new Error('Unknown square type')
  }

  private renderEmptySquare(occupant: IGameObject): HTMLDivElement {
    if (occupant instanceof Player) return this.renderPlayerOnEmptySquare()
    if (occupant instanceof Box) return this.renderBoxOnEmptySquare()
    if (occupant instanceof Wall) return this.renderWallOnEmptySquare()
    if (occupant instanceof Nothing) return this.renderNothingOnEmptySquare()
    throw new Error('Unknown game object type')
  }

  private renderTargetSquare(occupant: IGameObject): HTMLDivElement {
    if (occupant instanceof Player) return this.renderPlayerOnTargetSquare()
    if (occupant instanceof Box) return this.renderBoxOnTargetSquare()
    if (occupant instanceof Wall) return this.renderWallOnTargetSquare()
    if (occupant instanceof Nothing) return this.renderNothingOnTargetSquare()
    throw new Error('Unknown game object type')
  }

  protected abstract renderPlayerOnEmptySquare(): HTMLDivElement
  protected abstract renderBoxOnEmptySquare(): HTMLDivElement
  protected abstract renderWallOnEmptySquare(): HTMLDivElement
  protected abstract renderNothingOnEmptySquare(): HTMLDivElement
  protected abstract renderPlayerOnTargetSquare(): HTMLDivElement
  protected abstract renderBoxOnTargetSquare(): HTMLDivElement
  protected abstract renderWallOnTargetSquare(): HTMLDivElement
  protected abstract renderNothingOnTargetSquare(): HTMLDivElement
}
