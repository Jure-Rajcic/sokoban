import GameObjectVisitor from "../../../models/AGameObjectVisitor";

export type SimpleVisitorConfig = {
    playerFunction? : () => void;
    boxFunction? : () => void;
    wallFunction? : () => void;
    nothingFunction? : () => void;
};

export default class SimpleVisitor extends GameObjectVisitor {

    private readonly _config : SimpleVisitorConfig;

    constructor(config: SimpleVisitorConfig) {
        super();
        this._config = config;
    }

    public visitPlayer(): void {this._config.playerFunction?.call(this)};
    public visitBox(): void {this._config.boxFunction?.call(this)};
    public visitWall(): void {this._config.wallFunction?.call(this)};
    public visitNothing(): void {this._config.nothingFunction?.call(this)};
}