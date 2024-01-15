import Command from "./ICommand";

export default class CommandDecorator implements Command {
    
    protected readonly command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    execute(): void {
        this.command.execute();
    }

    undo(): void {
        this.command.undo();
    }


}