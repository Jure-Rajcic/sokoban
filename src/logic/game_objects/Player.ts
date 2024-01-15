import GameObjectVisitor from '../../models/AGameObjectVisitor';
import IGameObject from '../../models/IGameObject'

export default class Player implements IGameObject {
    accept(visitor: GameObjectVisitor): void {
        visitor.visitPlayer(this);
    }
}
