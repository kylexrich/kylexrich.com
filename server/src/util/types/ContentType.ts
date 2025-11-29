export enum ContentType {
    // Text formats
    HTML = 'text/html',
    PlainText = 'text/plain',
    CSS = 'text/css',
    CSV = 'text/csv',
    JavaScript = 'text/javascript',
    XML = 'text/xml',

    // Application formats
    JSON = 'application/json',
    PDF = 'application/pdf',
    XMLApp = 'application/xml',
    Zip = 'application/zip',
    Gzip = 'application/gzip',
    Stream = 'application/octet-stream',
    FormURLEncoded = 'application/x-www-form-urlencoded',

    // Multipart formats
    FormData = 'multipart/form-data',
    Mixed = 'multipart/mixed',
    Alternative = 'multipart/alternative',
    Related = 'multipart/related',

    // Image formats
    PNG = 'image/png',
    JPEG = 'image/jpeg',
    GIF = 'image/gif',
    SVG = 'image/svg+xml',
    TIFF = 'image/tiff',
    WebP = 'image/webp',

    // Audio formats
    MP3 = 'audio/mpeg',
    OggAudio = 'audio/ogg',
    WAV = 'audio/wav',

    // Video formats
    MP4Video = 'video/mp4',
    OggVideo = 'video/ogg',
    WebM = 'video/webm',

    // Font formats
    FontWoff = 'font/woff',
    FontWoff2 = 'font/woff2',

    // Office document formats
    MSWord = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    MSExcel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    MSPowerPoint = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}
