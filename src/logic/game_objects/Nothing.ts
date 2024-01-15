import GameObjectVisitor from '../../models/AGameObjectVisitor';
import IGameObject from '../../models/IGameObject'

export default class Nothing implements IGameObject {
    accept(visitor: GameObjectVisitor): void {
        visitor.visitNothing(this);
    }
    
}
