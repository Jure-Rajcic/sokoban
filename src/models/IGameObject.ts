import GameObjectVisitor from './AGameObjectVisitor';
export default interface IGameObject {
    accept(visitor: GameObjectVisitor): void;
}
