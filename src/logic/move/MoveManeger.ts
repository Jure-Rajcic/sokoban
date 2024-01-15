import Stack from 'ts-data.stack'
import Command from '../../models/ICommand'

export default class CommandManeger {
  private undoStack: Stack<Command>
  private redoStack: Stack<Command>

  constructor() {
    this.undoStack = new Stack<Command>()
    this.redoStack = new Stack<Command>()
  }

  public executeCommand(command: Command): void {
    while (!this.redoStack.isEmpty()) this.redoStack.pop()
    this.undoStack.push(command)
    command.execute()
  }

  public canUndo(): boolean {
    return !this.undoStack.isEmpty()
  }

  public undo(): void {
    if (!this.canUndo()) return
    const command: Command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
  }

  public canRedo(): boolean {
    return !this.redoStack.isEmpty()
  }

  public redo(): void {
    if(!this.canRedo()) return
    const command: Command = this.redoStack.pop()
    this.undoStack.push(command)
    command.execute()
  }

  public reset(): void {
    while (this.canUndo()) this.undoStack.pop()
    while (this.canRedo()) this.redoStack.pop()
  }
}
