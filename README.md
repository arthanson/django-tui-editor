# django-tui-editor

A Django widget that integrates [Toast UI Editor](https://ui.toast.com/tui-editor) into Django forms and admin as a drop-in replacement for standard textarea fields with rich markdown editing.

## Features

- **TuiEditorWidget** - Form widget that replaces textareas with Toast UI Editor
- **AdminTuiEditorWidget** - Specialized widget with admin-specific styling (full width, larger height)
- **TuiEditorField** - Model field (`TextField`) that automatically uses the Toast UI Editor in forms
- **Configurable** - Editor settings (edit type, preview style, height, toolbar) via `config` parameter
- **Formset support** - Works with Django admin inlines and dynamically added forms
- **content-editor plugin** - Integrates with django-content-editor activation/deactivation events

## Requirements

- Python 3.10+
- Django 4.2+

## Installation

```bash
pip install django-tui-editor
```

Add to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...
    'tui_editor',
]
```

## Quick Start

### In a Model

```python
from django.db import models
from tui_editor.fields import TuiEditorField

class Article(models.Model):
    body = TuiEditorField()
```

### In a Form

```python
from django import forms
from tui_editor.widgets import TuiEditorWidget

class ArticleForm(forms.Form):
    body = forms.CharField(widget=TuiEditorWidget())
```

### In Django Admin

```python
from django.contrib import admin
from tui_editor.widgets import AdminTuiEditorWidget

class ArticleAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminTuiEditorWidget()},
    }
```

## Configuration

Pass a `config` dict to the widget to customize the editor:

```python
TuiEditorWidget(config={
    'initialEditType': 'wysiwyg',  # or 'markdown' (default)
    'previewStyle': 'vertical',     # or 'tab' (default)
    'height': '500px',              # default: '300px'
})
```

## Disclaimer

This project is not affiliated with, endorsed by, or associated with [NHN](https://www.nhn.com/) or the [Toast UI](https://ui.toast.com/) project. It is an independent, third-party Django integration that bundles the Toast UI Editor library.

## License

MIT License - see [LICENSE](LICENSE) for details.
