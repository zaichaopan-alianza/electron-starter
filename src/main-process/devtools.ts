export async function setupDevTools(): Promise<void> {
  if (!__DEV__) return;

  const {
    installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');

  try {
    const react = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`installDevTools: Installed ${react}`);
  } catch (error) {
    console.warn(`installDevTools: Error occurred:`, error);
  }
}