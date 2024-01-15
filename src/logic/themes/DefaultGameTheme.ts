
import GameTheme from '../../models/AGameTheme'

export default class DefaultGameTheme extends GameTheme {

  protected renderBoxOnEmptySquare(): HTMLDivElement {
    const box = document.createElement("div")
    Object.assign(box.style, {width: '80%', height: '80%', backgroundColor: '#CA8A04'})
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
    Object.assign(player.style, {width: '100%', height: '100%', backgroundColor: '#2563EB'})
    return player
  }

  // TARGET SQUARES

  protected renderBoxOnTargetSquare(): HTMLDivElement {
    const box = document.createElement("div")
    Object.assign(box.style, {width: '80%', height: '80%', backgroundColor: '#16A34A'})
    return box
  }
  protected renderWallOnTargetSquare(): HTMLDivElement {
    const wall = document.createElement("div")
    Object.assign(wall.style, {width: '100%', height: '100%', backgroundColor: 'white'})
    return wall
  }
  protected renderNothingOnTargetSquare(): HTMLDivElement {
    const nothing = document.createElement("div")
    Object.assign(nothing.style, {width: '50%', height: '50%', backgroundColor: '#CA8A04', 'border-radius': '50%'})
    return nothing
  }
  protected renderPlayerOnEmptySquare(): HTMLDivElement {
    const player = document.createElement("div")
    Object.assign(player.style, {width: '100%', height: '100%', backgroundColor: '#2563EB'})
    return player
  }
  
}