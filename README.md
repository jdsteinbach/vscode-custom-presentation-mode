# Custom Presentation Mode

A simple toggle for using VS Code during presentations. Changes `window.zoomLevel`, `editor.fontWeight`, and `workbench.colorTheme` to values that are better for displaying on a projector.

## Features

Custom Presentation Mode makes it easy to toggle between your normal daily work settings and projector-friendly presentation settings.

Default settings are listed below (with explanations of why they're sensible defaults). They can be overridden in your own settings by storing other values in `customPresentationMode`

## Extension Settings

Custom Presentation Mode contributes the following settings:

## Command

`Custom Presentation Mode: Toggle Off/On` runs `extension.customPresentationMode`

## Keybinding

`Ctrl + Shift + p` toggles Custom Presentation Mode on & off.

## Configuration

### Default Settings

`"workbench.colorTheme": "Visual Studio Light"` - Light themes are more legible for audiences viewing a projector.

`"editor.fontWeight": "normal"` - Lighter font weights are great for work, but less legible in a presentation.

`"window.zoomLevel": 2` - This zooms in _the whole VS Code UI_, not just the editor font size!

### Custom Settings

`customPresentationMode.overrides`

Nest any valid settings key/value pair in `customPresentationMode.overrides` in your user or workspace settings. For example:

```json
{
  "customPresentationMode.overrides": {
    "editor.fontSize": 20,
    "editor.fontWeight": "700",
    "editor.fontLigatures": false,
    "editor.tabSize": 1,
    "workbench.colorTheme": "Legacy Light (rainglow)",
    "workbench.activityBar.visible": false
  }
}
```

### Other Options

`customPresentationMode.verbose`

* default: false,
* description: Setting for showing notifications for Custom Presentation Mode

`customPresentationMode.backup`
* Values for any workspace settings that are overridden are stored here. Useful if VS Code crashes while Custom Presentation Mode is enabled and restarts with Custom Presentation options overriding user/workspace settings.

## Known Issues

If [VS Code crashes while Custom Presentation Mode is on, it'll probably restore with Custom Presentation Mode options still enabled](https://github.com/jdsteinbach/vscode-custom-presentation-mode/issues/1) in workspace settings (but with Custom Presentation Mode disabled). Check `customPresentationMode.backup` for the old values if you need them for a manual backup.

_Note: If you know a good way to restore correctly from a crash, [please comment](https://github.com/jdsteinbach/vscode-custom-presentation-mode/issues/1) with links to tutorials, examples, or relevant docs, or open a PR if you have the time & ability. Thanks!_

## Release Notes

### 1.0.0

Initial release
