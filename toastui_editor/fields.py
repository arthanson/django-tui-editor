from django.db import models

from .widgets import TuiEditorWidget


class TuiEditorField(models.TextField):
    """TextField that uses TuiEditorWidget by default in forms."""

    def __init__(self, *args, config=None, **kwargs):
        self.tui_config = config or {}
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs.setdefault("widget", TuiEditorWidget(config=self.tui_config))
        return super().formfield(**kwargs)
