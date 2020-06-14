import Node from "./Node";
import Mark from "../marks/Mark";
import { textblockTypeInputRule } from "prosemirror-inputrules";

export default class FrontMatter extends Node {
  get name() {
    return "front_matter"
  }

  get schema() {
    return {
      content: "text*",
      marks: "",
      group: "block",
      code: true,
      defining: true,
      draggable: false,
      parseDOM: [{ tag: "pre", attrs: {class: "front-matter"}}],
      toDOM() {
        return ["pre", {class: "front-matter"}, 0];
      }
    }
  }

  commands({ type }) {
    return () => setBlockType(type);
  }



  inputRules({ type }) {
    return [
      textblockTypeInputRule(/^---$/, type)
    ];
  }

  toMarkdown(state, node) {
    state.write("---");
    state.ensureNewLine();
    state.text(node.textContent, false);
    state.ensureNewLine();
    state.write("---");
    state.closeBlock(node);
  }

  parseMarkdown() {
    return {
      block: "front_matter"
    }
  }
}
