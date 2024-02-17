
import GameTheme from '../../models/AGameTheme'

export default class ConfigurableGameTheme extends GameTheme {

  private readonly box_id: number;
  private readonly player_id: number;
  private readonly target_id: number;

  constructor (box_id: number, player_id: number, target_id: number) {
    super()
    this.box_id = box_id
    this.player_id = player_id
    this.target_id = target_id
  }
  protected renderBoxOnEmptySquare(): HTMLDivElement {
    const box = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': `url(/assets/themes/boxes/${this.box_id}.png)`, 'background-size': 'cover'}
    Object.assign(box.style, style)
    return box
  }
  protected renderWallOnEmptySquare(): HTMLDivElement {
    const wall = document.createElement("div")
    Object.assign(wall.style, {width: '100%', height: '100%', backgroundColor: 'white'})
    return wall
  }
  protected renderNothingOnEmptySquare(): HTMLDivElement {
    const nothing = document.createElement("div")
    Object.assign(nothing.style, {'visibility': 'hidden'})
    return nothing
  }

  protected renderPlayerOnEmptySquare(): HTMLDivElement {
    
    const player = document.createElement("div")
    const style = {width: '100%', height: '100%', 'background-image': `url(/assets/themes/players/${this.player_id}.png)`, 'background-size': 'cover'}
    Object.assign(player.style, style)
    return player
  }

  
  // TARGET SQUARES

  protected renderBoxOnTargetSquare(): HTMLDivElement {
    const box = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': `url(/assets/themes/boxes_on_targets/${this.box_id}.png)`, 'background-size': 'cover'}
    Object.assign(box.style, style)
    return box
  }
  protected renderWallOnTargetSquare(): HTMLDivElement {
    const wall = document.createElement("div")
    Object.assign(wall.style, {width: '100%', height: '100%', backgroundColor: 'white'})
    return wall
  }
  protected renderNothingOnTargetSquare(): HTMLDivElement {
    const nothing = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': `url(/assets/themes/targets/${this.target_id}.png)`, 'background-size': 'cover'}
    Object.assign(nothing.style, style)
    return nothing
  }

  protected renderPlayerOnTargetSquare(): HTMLDivElement {
    const player = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': `url(/assets/themes/players_on_targets/${this.player_id}.png)`, 'background-size': 'cover'}
    Object.assign(player.style, style)
    return player
  }
  
}