import Node from "./Node";
import { chainCommands, exitCode } from "prosemirror-commands";


export default class LineBreak extends Node {
  get name() {
    return "hard_break";
  }

  get schema() {
    return {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{tag: "br"}],
      toDOM() { return ["br"] }
    }
  }

  keys({ type }) {
    return {
      "Shift-Enter": (state, dispatch) => {
        console.log(state)
        dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      }
    }
  }

  toMarkdown(state, node){
    state.write("\n");
  }

  get markdownToken() {
    return "hard_break";
  }
}
