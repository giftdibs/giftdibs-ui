// Convert URls to data URLS.
// https://stackoverflow.com/a/20285053/6178885
export function toDataUrl(url: string): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}
