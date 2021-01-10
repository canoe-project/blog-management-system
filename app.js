const { app, BrowserWindow, Menu } = require("electron");
const menuTemplate = require("./menuTemplate");
const $ = require("jquery");

const menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu);

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 500,
    minHeight: 500,
    nodeIntegration: false,
  });
  // win.setMenuBarVisibility(false);
  win.loadFile("./dist/main.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
