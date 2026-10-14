import * as FileSystem from 'expo-file-system';
import { ESP32_URL, CAM_URL, API_URL } from '../config';

const postJson = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });

export async function captureImage() {
  const { uri } = await FileSystem.downloadAsync(`${CAM_URL}/capture`, FileSystem.cacheDirectory + 'med.jpg');
  return uri;
}

export async function runOcr(uri) {
  const form = new FormData();
  form.append('file', { uri, name: 'med.jpg', type: 'image/jpeg' });
  const r = await fetch(`${API_URL}/ocr`, { method: 'POST', body: form });
  return r.json(); // { text, name, dose }
}

export const askAssistant = (question, medicine) => postJson(`${API_URL}/rag/ask`, { question, medicine }); // { answer, sources }
export const sendEmergency = contact => postJson(`${API_URL}/emergency`, { contact, ts: Date.now() });
export const pushReminder = r => postJson(`${ESP32_URL}/reminder`, r);
export const saveThresholds = t => postJson(`${ESP32_URL}/config`, t);