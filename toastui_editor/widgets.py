import json

from django import forms


class TuiEditorWidget(forms.Textarea):
    """Drop-in Textarea replacement backed by Toast UI Editor (markdown mode)."""

    template_name = "toastui_editor/widget.html"

    def __init__(self, attrs=None, config=None):
        self.config = config or {}
        defaults = {"class": "tui-editor-textarea"}
        if attrs:
            defaults.update(attrs)
        super().__init__(attrs=defaults)

    class Media:
        css = {
            "all": (
                "toastui_editor/toastui-editor.min.css",
                "toastui_editor/tui-widget.css",
            )
        }
        js = (
            "toastui_editor/toastui-editor-all.min.js",
            "toastui_editor/tui-widget.js",
        )

    def build_attrs(self, base_attrs, extra_attrs=None):
        attrs = super().build_attrs(base_attrs, extra_attrs)
        attrs["data-tui-config"] = json.dumps(self.config)
        return attrs


class AdminTuiEditorWidget(TuiEditorWidget):
    """Toast UI Editor widget with admin-specific styling."""

    def __init__(self, attrs=None, config=None):
        admin_attrs = {"class": "tui-editor-textarea tui-editor-admin"}
        if attrs:
            admin_attrs.update(attrs)
        super().__init__(attrs=admin_attrs, config=config)
