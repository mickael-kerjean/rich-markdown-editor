export default function FrontMatterPlugin(md) {
	md.block.ruler.before("fence", "front_matter", function(state, start, end){
    // Step1: extract the frontmatter info
    let line = start;
    let st = {
      format: null,
      count: 0
    }
    let current_st = null;

    for(;line < end; line++){
      if(state.isEmpty(line)){
        break
      }
      let pos = state.bMarks[line],
          max = state.eMarks[line];
      let str = state.src.substr(pos, max - pos);

      if(str === "---" && (st.format === null || st.format === 'yaml')){
        st.count += 1;
        st.format = 'yaml'
      } else if(str === "+++" && (st.format === null || st.format === 'toml')){
        st.count += 1;
      }

      if(st.count === 2) break
    }

    // Step 2: leave when content doesn't have front matter
    if(st.count < 2) return false

    // Step3: register the token. refs:
    //   - state.push: https://github.com/markdown-it/markdown-it/blob/28cec6d30a5b18ded43d595ed24ba7a095ed859f/lib/rules_block/state_block.js#L110
    //   - token attributes: https://github.com/markdown-it/markdown-it/blob/master/lib/token.js
    let token;
    token = state.push("front_matter_open", "pre", 1);
    token = state.push("text", "", 0);
    token.content = state.getLines(start, line + 1, state.blkIndent, false);
    token = state.push("front_matter_close", "pre", 1);
    state.line = line + 1;
    return true;
  }, {
		alt: ["paragraph", "reference", "blockquote", "list"]
	});

};
