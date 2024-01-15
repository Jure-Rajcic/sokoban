
import GameTheme from '../../models/AGameTheme'

export default class ChristmasGameTheme extends GameTheme {

  protected renderBoxOnEmptySquare(): HTMLDivElement {
    const box = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': 'url(/assets/themes/apple.png)', 'background-size': 'cover'}
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
  protected renderPlayerOnTargetSquare(): HTMLDivElement {
    const player = document.createElement("div")
    const style = {width: '100%', height: '100%', 'background-image': 'url(/assets/themes/santa.png)', 'background-size': 'cover'}
    Object.assign(player.style, style)
    return player
  }

  // TARGET SQUARES

  protected renderBoxOnTargetSquare(): HTMLDivElement {
    const box = document.createElement("div")
    const style = {width: '80%', height: '80%', 'background-image': 'url(/assets/themes/box-on-target.png)', 'background-size': 'cover'}
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
    const style = {width: '80%', height: '80%', 'background-image': 'url(/assets/themes/target.png)', 'background-size': 'cover', 'border-radius': '50%'}
    Object.assign(nothing.style, style)
    return nothing
  }
  protected renderPlayerOnEmptySquare(): HTMLDivElement {
    
    const player = document.createElement("div")
    const style = {width: '100%', height: '100%', 'background-image': 'url(/assets/themes/santa.png)', 'background-size': 'cover'}
    Object.assign(player.style, style)
    return player
  }
  
}