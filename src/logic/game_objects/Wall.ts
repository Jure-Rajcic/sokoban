import GameObjectVisitor from '../../models/AGameObjectVisitor';
import IGameObject from '../../models/IGameObject'

export default class Wall implements IGameObject {
    accept(visitor: GameObjectVisitor): void {
        visitor.visitWall(this);
    }
}
