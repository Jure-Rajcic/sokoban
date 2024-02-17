import IGameObject from './IGameObject'
import Box from '../logic/game_objects/Box'
import Nothing from '../logic/game_objects/Nothing'
import Player from '../logic/game_objects/Player'
import Wall from '../logic/game_objects/Wall'

export default abstract class GameSquare {
  // Object that is currently on the square
  public row: number
  public col: number
  private _occupant: IGameObject

  constructor([row, col]: [number, number], occupant: IGameObject) {
    this.row = row
    this.col = col
    this._occupant = occupant
  }

  public get occupant(): IGameObject {
    return this._occupant
  }

  public set occupant(occupant: IGameObject) {
    this._occupant = occupant
    this.applySquareEffect()
  }



  private applySquareEffect(): void {
    if (this._occupant instanceof Player) return this.applyEffectToPlayer(this._occupant)
    if (this._occupant instanceof Box) return this.applyEffectToBox(this._occupant)
    if (this._occupant instanceof Wall) return this.applyEffectToWall(this._occupant)
    if (this._occupant instanceof Nothing) return this.applyEffectToNothing(this._occupant)
  }

  // ADAPTER, npr mozemo dodat nekakv trap tile ili teleportation tile da prominimo same objekte
  protected applyEffectToPlayer(player: Player): void {}
  protected applyEffectToBox(box: Box): void {}
  protected applyEffectToWall(wall: Wall): void {}
  protected applyEffectToNothing(nothing: Nothing): void {}

  public toString(): string {
    if (this._occupant instanceof Player) return this.toStringPlayer(this._occupant);
    if (this._occupant instanceof Box) return this.toStringBox(this._occupant);
    if (this._occupant instanceof Wall) return this.toStringWall(this._occupant);
    if (this._occupant instanceof Nothing) return this.toStringNothing(this._occupant);
    throw new Error('Unrecognised IGameObject on Square')
  }

  protected abstract toStringPlayer(player: IGameObject): string;
  protected abstract toStringBox(box: IGameObject): string;
  protected abstract toStringWall(wall: IGameObject): string;
  protected abstract toStringNothing(nothing: IGameObject): string;

}
