export function getFileExtension(filename: string) {
    return filename.slice(filename.lastIndexOf(".") + 1);
}

export function stripBase64ImageHeader(b64: string) {
    return b64.replace(/^data:image\/[a-z]+;base64,/, '');
}