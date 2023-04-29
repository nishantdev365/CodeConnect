import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/ssms.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/zenburn.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js"; // add Python mode
import "codemirror/mode/xml/xml.js"; // add XML mode
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/closebrackets.js";
import "./EditorPage.css"; // import CSS file with container styling
import ACTIONS from "../Actions.js";

const EditorPage = ({ socketRef, userId, onCodeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState("dracula");
  const [fontSize, setFontSize] = useState(18); // add state for font size selection
  const [mode, setMode] = useState("javascript");  // multi language 
  const editorRef = useRef(null);

  useEffect(() => {
    // Get selected theme and font size from local storage
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme !== null) {
      setSelectedTheme(savedTheme);
    }
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize !== null) {
      setFontSize(parseInt(savedFontSize));
    }

    const savedMode = localStorage.getItem("mode");
    if (savedMode !== null) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    // Save selected theme and font size to local storage
    localStorage.setItem("selectedTheme", selectedTheme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("mode", mode);
  }, [selectedTheme, fontSize, mode]);

  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("editorArea"),
        {
          mode: mode,
          theme: selectedTheme,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          fontSize: fontSize + "px", // set initial font size
        }
      );

      // Set the value of the textarea to the text stored in localStorage, if any
      const savedCode = localStorage.getItem("code");
      if (savedCode !== null) {
        editorRef.current.setValue(savedCode);
      }


      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            userId,
            code,
          });
          // Save the text entered by the user in localStorage
          localStorage.setItem("code", code);
        }
      });
    }

   

    init();
  }, []); // run once on mount



  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption("theme", selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption("mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
          // Save the text received from the server in localStorage
          localStorage.setItem("code", code);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getWrapperElement().style.fontSize = fontSize + "px";
    }
  }, [fontSize]);
  
  //themes 

  const themes = [
    "3024-day",
    "3024-night",
    "abcdef",
    "ambiance-mobile",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "cobalt",
    "colorforth",
    "darcula",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "erlang-dark",
    "gruvbox-dark",
    "hopscotch",
    "icecoder",
    "idea",
    "isotope",
    "lesser-dark",
    "liquibyte",
    "lucario",
    "material-darker",
    "material-ocean",
    "material-palenight",
    "material",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "neat",
    "neo",
    "night",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-dark",
    "paraiso-light",
    "pastel-on-dark",
    "railscasts",
    "rubyblue",
    "seti",
    "shadowfox",
    "solarized",
    "ssms",
    "the-matrix",
    "tomorrow-night-bright",
    "tomorrow-night-eighties",
    "tomorrow",
    "twilight",
    "vibrant-ink",
    "xq-dark",
    "xq-light",
    "yeti",
    "yonce",
    "zenburn",
  ];

  const themeOptions = themes.map((theme) => {
    return {
      label: theme.charAt(0).toUpperCase() + theme.slice(1),
      value: theme,
    };
  });

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
    editorRef.current.setOption("mode", selectedMode);
  };


  return (
    <div className="dark:bg-gray-800 dark:border-gray-700">
      <textarea id="editorArea" className="sm:text-xl"></textarea>
      <div className="flex justify-center py-2">
        <select value={mode} onChange={handleModeChange} className="cursor-pointer rounded-lg hover:bg-gray-200 hover:text-black lg:mt-0 mt-2.5 dark:bg-gray-800 dark:border-gray-700 text-white appearance-none bg-transparent bg-no-repeat bg-right px-4 py-1 pr-8 border border-gray-400 leading-tight focus:outline-none focus:dark:bg-gray-800 focus:text-white focus:border-gray-500">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="xml">XML</option>
          <option value="clike">C/C++</option>
          <option value="swift">Swift</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
        </select>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="mx-2 cursor-pointer rounded-lg hover:bg-gray-200 hover:text-black lg:mt-0 mt-2.5 dark:bg-gray-800 dark:border-gray-700 text-white appearance-none bg-transparent bg-no-repeat bg-right px-4 py-1 pr-8 border border-gray-400 leading-tight focus:outline-none focus:dark:bg-gray-800 focus:text-white focus:border-gray-500"
        >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="cursor-pointer rounded-lg hover:bg-gray-200 hover:text-black lg:mt-0 mt-2.5 dark:bg-gray-800 dark:border-gray-700 text-white appearance-none bg-transparent bg-no-repeat bg-right px-4 py-1 pr-8 border border-gray-400 leading-tight focus:outline-none focus:dark:bg-gray-800 focus:text-white focus:border-gray-500"
        >
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="22">22</option>
          <option value="24">24</option>
          <option value="26">26</option>
          <option value="28">28</option>
        </select>
      </div>
    </div>
  );
};

export default EditorPage;


