import * as Clipboard from 'expo-clipboard';
import { ToastApp } from './Toast';

export const copyToClipboard = async (textToCopy) => {
    await Clipboard.setStringAsync(textToCopy);
    ToastApp('Text copied to clipboard!');
}