import GameSquare from '../models/IGameSquare'
import EmptySquare from './game_squares/EmptySquare'
import Wall from './game_objects/Wall'
import Player from './game_objects/Player'
import Box from './game_objects/Box'
import Nothing from './game_objects/Nothing'
import TargetSquare from './game_squares/TargetSquare'
import CategoryService from '../services/CategoryService'

const WALL_ON_EMPTY_SQUERE: string = '#'
const PLAYER_ON_EMPTY_SQUERE: string = '@'
const BOX_ON_EMPTY_SQUERE: string = '$'
const NOTHING_ON_EMPTY_SQUERE: string = ' '

const WALL_ON_TARGET_SQUARE: string = '?' // TODO: make game more interesting
const PLAYER_ON_TARGET_SQUARE: string = '+'
const BOX_ON_TARGET_SQUARE: string = '*'
const NOTHING_ON_TARGET_SQUARE: string = '.'

export default class GameFactory {
  public static createLevel(categoryId: number, levelId: number): GameSquare[][] {
    console.log(`Creating level ${levelId} from category ${categoryId}`)
    const service = CategoryService.getInstance();
    const levelLayout = service.levelLayout(categoryId, levelId);
    console.log(levelLayout)
    return levelLayout.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        return this.createGameObject(col, [rowIndex, colIndex])
      }),
    )
  }


  private static createGameObject(id: string, [row, col]: [number, number]): GameSquare {
    switch (id) {
      case WALL_ON_EMPTY_SQUERE:
        return new EmptySquare([row, col], new Wall())
      case PLAYER_ON_EMPTY_SQUERE:
        return new EmptySquare([row, col], new Player())
      case BOX_ON_EMPTY_SQUERE:
        return new EmptySquare([row, col], new Box())
      case NOTHING_ON_EMPTY_SQUERE:
        return new EmptySquare([row, col], new Nothing())
      case WALL_ON_TARGET_SQUARE:
        return new TargetSquare([row, col], new Wall())
      case PLAYER_ON_TARGET_SQUARE:
        return new TargetSquare([row, col], new Player())
      case BOX_ON_TARGET_SQUARE:
        return new TargetSquare([row, col], new Box())
      case NOTHING_ON_TARGET_SQUARE:
        return new TargetSquare([row, col], new Nothing())
      default:
        throw new Error(`Unknown game component identifier ${id}`)
    }
  }
}
