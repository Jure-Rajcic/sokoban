import GameObjectVisitor from '../../models/AGameObjectVisitor'
import IGameObject from '../../models/IGameObject'

export default class Box implements IGameObject {

    public accept(visitor: GameObjectVisitor): void {
        visitor.visitBox(this);
    }
}
