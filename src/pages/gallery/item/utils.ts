export async function toDataURL(url: string) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));
}

export async function download(url: string) {
  const a = document.createElement("a");
  a.href = await toDataURL(url);
  a.download = "myImage.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
