import Command from '../../../models/ICommand'
import GameSquare from '../../../models/IGameSquare'
import IGameObject from '../../../models/IGameObject'
export default class MoveCommand implements Command {
  protected readonly map: GameSquare[][]
  protected readonly occupants: IGameObject[]
  protected readonly cordinates: [number, number][]


  constructor(map: GameSquare[][], path: GameSquare[]) {
    this.map = map
    this.occupants = path.map((square) => square.occupant)
    this.cordinates = path.map((square) => [square.row, square.col])
  }


  execute() {
    const lastIndex: number = this.occupants.length - 1
    const occupants = [this.occupants[lastIndex]].concat(this.occupants.slice(0, lastIndex))
    this.cordinates.forEach(([row, col], index) => {
      this.map[row][col].occupant = occupants[index]
    })
  }

  undo() {
    this.cordinates.forEach(([row, col], index) => {
      this.map[row][col].occupant = this.occupants[index]
    })
  }
}
