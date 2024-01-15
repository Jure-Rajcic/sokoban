import { ids } from "webpack";
import GameObjectVisitor from "../../../models/AGameObjectVisitor";
import Command from "../../../models/ICommand";
import CommandDecorator from "../../../models/ICommandDecorator";
import GameSquare from "../../../models/IGameSquare";

export type VisitorCommandConfig = {
    beforeExecute?: GameObjectVisitor[];
    afterExecute?: GameObjectVisitor[];
    beforeUndo?: GameObjectVisitor[];
    afterUndo?: GameObjectVisitor[];
};

export default class VisitorCommand extends CommandDecorator {

    private readonly _path : GameSquare[];
    private readonly _visitorsConfig: VisitorCommandConfig;

    constructor(command: Command, path: GameSquare[], visitorsConfig: VisitorCommandConfig) {
        super(command);
        this._path = path;
        this._visitorsConfig = visitorsConfig;
    }

    execute(): void {
        this.applayVisitor(this._visitorsConfig.beforeExecute);
        super.execute();
        this.applayVisitor(this._visitorsConfig.afterExecute);
    }

    undo(): void {
        this.applayVisitor(this._visitorsConfig.beforeUndo);
        super.undo();
        this.applayVisitor(this._visitorsConfig.afterUndo);
    }

    private applayVisitor(vistors?: GameObjectVisitor[]): void {
        if (!vistors) return;
        for (let visitor of vistors) {
            for (let square of this._path) {
                square.occupant.accept(visitor);
            }
        }
    }


}