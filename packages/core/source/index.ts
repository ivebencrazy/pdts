import canvasRenderer from "@pure-data/canvas"
import { Chunk, Renderer } from "@pure-data/models"
import { parsePatch } from "./parsePatch/parsePatch"


export class Patch {

  /**
   * @example const patch = Patch.from("#N canvas 624 103 899 784 10;")
   * @param patchFileString The actual pd file content
   */
  public static from(patchFileString: string) {
    this.chunks = parsePatch(patchFileString)
  }
  private readonly chunks: Chunk[] = []
  private readonly inlets: any[] = []
  private readonly outlets: any[] = []
  private renderer = canvasRenderer

  // State variables that are expected to change during patch use
  private state = {
    dspEnabled: false,
    editMode: false,
  }

  constructor(options= {}) {
    this.state = {...this.state, ...options}
  }

  // Render patch to
  public render(selector: string) {
    this.renderer(selector, this.chunks)
  }

  /**
   * Set a static value for an inlet. Good for basic uses.
   * @example patch.setInlet(1, 100)
   * @param index index of the inlet
   * @param value a value to pass to the patch
   */
  public setInlet(index: number, value: any) {
    this.inlets[index] = value
  }

  public setRenderer(renderer: Renderer) {
    this.renderer = renderer
  }

  // Change patch environment settings.
  // Will expose helpers in the future. Turn on DSP, edit mode.
  public setState(options= {}) {
    this.state = {...this.state, ...options}
  }

  /**
   * Stream data to an inlet. Audio stream or observable.
   * @example patch.streamInlet(0, audioInput)
   * @param index index of the inlet
   * @param source Source of the stream
   */
  public streamInlet(index: number, source: any) {
    this.inlets[index] = source
  }

  public streamOutlet(index: number, target: any) {
    this.outlets[index] = target
  }

  /**
   * Write a patch to a string. This doesn't actually do too much, since it
   * depends on chunks having toString methods of their own.
   */
  public toString() {
    return this.chunks
      .map(chunk => chunk.toString())
      .join(";\r\n") + ";\r\n"
  }
}
