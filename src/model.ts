import GameFactory from './logic/GameFactory'
import GameSquare from './models/IGameSquare'
import { Move } from './logic/constants/Move'
import { Stats } from './logic/constants/Stats'
import PlayerMoveValidator from './logic/move/validators/PlayerMoveValidator'
import GameUtil from './logic/GameUtil'
import CommandManeger from './logic/move/MoveManeger'
import MoveCommand from './logic/move/command/MoveCommand'
import IStats from './models/IStats'
import VisitorCommand from './logic/move/decorators/VisitorCommand';
import { VisitorCommandConfig } from './logic/move/decorators/VisitorCommand';
import SimpleVisitor from './logic/move/visitors/SimpleVisitor'
import CategoryService from './services/CategoryService'

export default class GameModel {
  public triggerUpdateView: () => void
  public map: GameSquare[][]
  public stats: Map<Stats, IStats>;

  private readonly moveManager: CommandManeger

  constructor() {
    this.triggerUpdateView = () => { }
    this.map = [];
    this.stats = new Map<Stats, IStats>()
    this.moveManager = new CommandManeger()

  }

  public setUpdateCallback(callback: () => void): void {
    this.triggerUpdateView = callback
  }

  public changeCategory(categoryId: number): void {
    this.stats.get(Stats.CATEGORY)?.set(categoryId)
    this.stats.get(Stats.LEVEL)?.set(1)
    this.reset()
  }

  public changeLevel(levelId: number): void {
    this.stats.get(Stats.LEVEL)?.set(levelId)
    this.reset()
  }

  public constructInitialMap(): void {
    this.map = GameFactory.createLevel(this.stats.get(Stats.CATEGORY)!.value, this.stats.get(Stats.LEVEL)!.value);
  }

  public move(move: Move): void {

    const [row, col] = GameUtil.findPlayerCordinates(this.map)
    const validator = new PlayerMoveValidator(this.map, move, [row, col])
    if (!validator.canMove()) return

    const moveCommand: MoveCommand = new MoveCommand(this.map, validator.validPath)
    const visitorCommandConfig: VisitorCommandConfig = {
      afterExecute: [new SimpleVisitor({ boxFunction: () => this.stats.get(Stats.PUSHES)?.increment() })],
      afterUndo: [new SimpleVisitor({ boxFunction: () => this.stats.get(Stats.PUSHES)?.decrement() })]
    }
    const visitorCommand = new VisitorCommand(moveCommand, validator.validPath, visitorCommandConfig);

    this.moveManager.executeCommand(visitorCommand)

    this.stats.get(Stats.MOVES)?.increment()
    this.triggerUpdateView()

    if (GameUtil.checkIfLevelIsCompleted(this.map)) setTimeout(() => this.openNextLevel(), 2000)
  }

  public undoMove(): void {
    if (!this.moveManager.canUndo()) return
    this.moveManager.undo()
    this.stats.get(Stats.MOVES)?.decrement()
    this.triggerUpdateView()
  }

  public redoMove(): void {
    if (!this.moveManager.canRedo()) return
    this.moveManager.redo()
    this.stats.get(Stats.MOVES)?.increment()
    this.triggerUpdateView()
  }

  public reset(): void {
    this.constructInitialMap()
    this.stats.get(Stats.MOVES)?.reset()
    this.stats.get(Stats.PUSHES)?.reset()
    this.moveManager.reset()
    this.triggerUpdateView()
  }

  private async openNextLevel(): Promise<void> {
    const categoryId = this.stats.get(Stats.CATEGORY)!.value
    const levelId = this.stats.get(Stats.LEVEL)!.value
    const service = CategoryService.getInstance()
    if (levelId + 1 > service.totalLevelsCount(categoryId)) {
      await service.fetchCategory(categoryId + 1)
      return this.changeCategory(categoryId + 1)
    } else {
      return this.changeLevel(levelId + 1)

    }
  }

  public solve(): void {
    const result = [
      Move.UP,
      Move.RIGHT,
      Move.RIGHT,
      Move.RIGHT,
      Move.RIGHT,
      Move.RIGHT,
      Move.UP,
      Move.UP,
      Move.UP,
      Move.LEFT,
      Move.DOWN,
      Move.DOWN,
      Move.RIGHT,
      Move.DOWN,
      Move.DOWN,
      Move.LEFT,
      Move.LEFT,
      Move.UP,
      Move.RIGHT,
      Move.DOWN,
      Move.RIGHT,
      Move.UP,
      Move.UP,
      Move.DOWN,
      Move.LEFT,
      Move.LEFT,
      Move.LEFT,
      Move.LEFT,
      Move.DOWN,
      Move.RIGHT
    ]

    let delay = 0
    result.forEach((move) => {
      setTimeout(() => this.move(move), delay)
      delay += 100
    })

  }
}
