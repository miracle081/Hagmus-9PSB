export function generateRequestId() {
  const now = new Date();
  const tzOffset = 60; // Timezone offset in minutes (for Africa/Lagos GMT+1)
  const offsetNow = new Date(now.getTime() + tzOffset * 60000);
  const year = offsetNow.getFullYear();
  const month = (offsetNow.getMonth() + 1).toString().padStart(2, '0');
  const day = offsetNow.getDate().toString().padStart(2, '0');
  const hour = offsetNow.getUTCHours().toString().padStart(2, '0'); // Use getUTCHours for GMT time
  const minute = offsetNow.getUTCMinutes().toString().padStart(2, '0'); // Use getUTCMinutes for GMT time
  const randomString = Math.random().toString(36).substr(2, 10);
  const requestId = `${year}${month}${day}${hour}${minute}${randomString}`;
  if (
    requestId.length >= 12 &&
    /^\d+$/.test(requestId.slice(0, 12)) &&
    offsetNow.getTimezoneOffset() === -60 // Check if in GMT+1 timezone
  ) {
    return requestId;
  } else {
    return generateRequestId();
  }
}