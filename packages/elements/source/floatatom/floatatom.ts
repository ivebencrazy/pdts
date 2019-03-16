import { Element } from "@pure-data/models"

/**
 * @class PDFloatatom
 * @description Defines a number box
 * When the value of [upper_limit] minus the value of [lower_limit] is less than one,
 * or the [width] attribute is set to one, PureData resets these values both to zero.
 * Floatatom and symbolatom are the only elements that uses "-" characters to indicate
 * that no value has been assigned to its attributes [label], [receive] and [send].
 *
 *
 * @example
 *  #X floatatom 32 26 5 0 0 0 - - -;
 */
export default class Floatatom extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "floatatom"
  public readonly color = "black"
  public readonly inlets = [ "control" ]
  public readonly outlets = [ "signal" ]

  public lowerLimit: number
  public label: string
  public labelPos: number
  public receive: string
  public send: string
  public upperLimit: number
  public width: number
  public xPos: number
  public yPos: number

  constructor([ xPos, yPos, width, lowerLimit, upperLimit, labelPos, label, receive, send ]: string[]) {
    super()
    this.lowerLimit = Number(lowerLimit)
    this.label = String(label)
    this.labelPos = Number(labelPos)
    this.receive = String(receive)
    this.send = String(send)
    this.upperLimit = Number(upperLimit)
    this.width = Number(width)
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
  }

  public toString() {
    let str = `#X floatatom ${this.xPos} ${this.yPos} ${this.width}` +
      ` ${this.lowerLimit} ${this.upperLimit} ${this.labelPos}`
    str += (this.label || "-")
    str += (this.receive || "-")
    str += (this.send || "-")
    return str
  }
}
