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
  // Limit keys to loop through, remove `verbose` key
  let cmpOptionKeys = Object.keys(cmpSettings);

  // Verbose output setitng
  let showNotifications = cfg.get('customPresentationMode.verbose') || false;

  // Initialie backup settings
  let backupSettings = {};

  // Default state
  let isCustomPresentationMode = false;

  let disposable = vscode.commands.registerCommand('extension.customPresentationMode', function () {
    if(isCustomPresentationMode) {
      // Get backup settings from workspace config,
      // otherwise use runtime stored backup
      let backup = cfg.inspect('customPresentationMode.backup').workspaceValue || backupSettings;

      // Loop through user's previous settings
      cmpOptionKeys.map(k => {
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
      cmpOptionKeys.map(k => {
        // Backup previous workspace config value
        if (cfg.inspect(k).workspaceValue) {
          backupSettings[k] = cfg.get(k);
        }

        // Set CPM value
        cfg.update(k, cmpSettings[k], workspace);
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
