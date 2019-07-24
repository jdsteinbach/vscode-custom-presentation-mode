// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Workspace Save Target
  let workspace = vscode.ConfigurationTarget.Workspace;

  // Config alias
  let cfg = vscode.workspace.getConfiguration('', null)

  // Get extension settings
  let cmpSettings = cfg.get('customPresentationMode') || {};
  let cmpOverrides = cmpSettings.overrides;
  let cmpOverridesKeys = Object.keys(cmpOverrides);

  // Verbose output setitng
  let showNotifications = cmpSettings.verbose || false;

  // Initialie backup settings
  let backupSettings = {};

  // Default state
  let isCustomPresentationMode = false;

  let disposable = vscode.commands.registerCommand('extension.customPresentationMode', function () {
    if(isCustomPresentationMode) {
      // Get backup settings from runtime stored backup,
      // otherwise use workspace config backup
      let backup = backupSettings || cfg.inspect('customPresentationMode.backup').workspaceValue;

      // Loop through user's previous settings
      cmpOverridesKeys.map(k => {
        // If previous value was workspace, restore it;
        // otherwise delete the workspace config value
        let previousValue = Object.keys(backup).indexOf(k) > -1
          ? backup[k]
          : undefined;

        // Restore previous value
        cfg.update(k, previousValue, workspace);
      });

      // Remove backup settings
      cfg.update('customPresentationMode.backup', undefined, workspace);
    } else {
      // Loop through extension settings
      cmpOverridesKeys.map(k => {
        // Backup previous workspace config value
        if (cfg.inspect(k).workspaceValue) {
          backupSettings[k] = cfg.get(k);
        }

        // Set CPM value
        cfg.update(k, cmpOverrides[k], workspace);
      });

      cfg.update('customPresentationMode.backup', backupSettings, workspace);
    }

    // Show Information Message if the user wants
    if (showNotifications) {
      let prefix = isCustomPresentationMode ? 'Dis' : 'En';

      vscode.window.showInformationMessage(`Custom Presentation Mode - ${prefix}abled!`);
    }

    isCustomPresentationMode = !isCustomPresentationMode;
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage('Custom Presentation Mode Deactivated');
}

module.exports = {
	activate,
	deactivate
}
