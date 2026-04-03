import { build } from "esbuild";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outdir = join(
    __dirname,
    "..",
    "tui_editor",
    "static",
    "tui_editor"
);

// Bundle the ESM source into a self-contained IIFE that exports window.toastui.Editor
const entryContent = `
import Editor from "@toast-ui/editor";
window.toastui = window.toastui || {};
window.toastui.Editor = Editor;
`;

await build({
    stdin: {
        contents: entryContent,
        resolveDir: join(__dirname, "node_modules"),
        loader: "js",
    },
    bundle: true,
    minify: true,
    format: "iife",
    target: ["es2020"],
    outfile: join(outdir, "toastui-editor-all.min.js"),
});

console.log("Built toastui-editor-all.min.js");
