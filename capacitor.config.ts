import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.zybernau.photopoll',
  appName: 'photo-poll',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    webContentsDebuggingEnabled: true
  }
};

export default config;
