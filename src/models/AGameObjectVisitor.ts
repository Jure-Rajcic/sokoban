import Box from '../logic/game_objects/Box';
import Nothing from '../logic/game_objects/Nothing';
import Player from '../logic/game_objects/Player';
import Wall from '../logic/game_objects/Wall';
export default abstract class GameObjectVisitor {

    public visitPlayer(player: Player): void { };
    public visitBox(box: Box): void { };
    public visitWall(wall: Wall): void { };
    public visitNothing(target: Nothing): void { };

}