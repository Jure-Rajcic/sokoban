import IGameObject from '../../models/IGameObject';
import GameSquare from '../../models/IGameSquare'

export default class TargetSquare extends GameSquare {

    protected toStringPlayer(player: IGameObject): string {
        return '+';
    }
    protected toStringBox(box: IGameObject): string {
        return '*';
    }
    protected toStringWall(wall: IGameObject): string {
        return '#'
    }
    protected toStringNothing(nothing: IGameObject): string {
        return '.';
    }
}
