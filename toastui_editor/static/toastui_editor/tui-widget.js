(function () {
    "use strict";

    function initTuiEditor(textarea) {
        if (textarea._tuiInitialized) return;
        if (typeof toastui === "undefined" || !toastui.Editor) {
            console.error("Toast UI Editor not loaded");
            return;
        }
        textarea._tuiInitialized = true;

        var config = {};
        try {
            config = JSON.parse(textarea.getAttribute("data-tui-config") || "{}");
        } catch (e) {
            // ignore parse errors
        }

        // Create wrapper div
        var wrap = document.createElement("div");
        wrap.className = "tui-editor-wrap";
        textarea.parentNode.insertBefore(wrap, textarea.nextSibling);

        // Hide textarea now that we're replacing it
        textarea.style.display = "none";

        // Create editor container
        var editorEl = document.createElement("div");
        wrap.appendChild(editorEl);

        // Initialize Toast UI Editor
        var editor = new toastui.Editor({
            el: editorEl,
            initialEditType: config.initialEditType || "markdown",
            previewStyle: config.previewStyle || "tab",
            height: config.height || "300px",
            initialValue: textarea.value || "",
            usageStatistics: false,
            toolbarItems: config.toolbarItems || [
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["table", "link"],
                ["code", "codeblock"],
            ],
        });

        // Sync changes back to textarea
        editor.on("change", function () {
            textarea.value = editor.getMarkdown();
        });

        textarea._tuiEditor = editor;
    }

    function initAll() {
        var textareas = document.querySelectorAll(".tui-editor-textarea");
        for (var i = 0; i < textareas.length; i++) {
            initTuiEditor(textareas[i]);
        }
    }

    // Initialize on DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }

    // Support Django admin inline formset additions
    document.addEventListener("formset:added", function (event) {
        var row = event.target;
        var textareas = row.querySelectorAll(".tui-editor-textarea");
        for (var i = 0; i < textareas.length; i++) {
            // Reset for cloned elements
            textareas[i]._tuiInitialized = false;
            var nextSib = textareas[i].nextElementSibling;
            if (nextSib && nextSib.classList.contains("tui-editor-wrap")) {
                nextSib.remove();
            }
            textareas[i].style.display = "";
            initTuiEditor(textareas[i]);
        }
    });

    // content-editor activate/deactivate support
    document.addEventListener("content-editor:activate", function (event) {
        var textareas = event.target.querySelectorAll(".tui-editor-textarea");
        for (var i = 0; i < textareas.length; i++) {
            if (!textareas[i]._tuiInitialized) {
                initTuiEditor(textareas[i]);
            }
        }
    });
})();
