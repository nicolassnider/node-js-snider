var FileType;
(function (FileType) {
    FileType["video"] = ".mp4";
    FileType["image"] = ".jpg";
    FileType["audio"] = ".mp3";
})(FileType || (FileType = {}));
/* const getFileType = (url: string): FileType => {
  if (url == ".mp3") {
    return FileType.audio;
  }
  if (url == ".mp4") {
    return FileType.video;
  }
  return FileType.image;
}; */
const parseDate = (url) => {
    const type = url.substring(0, 10);
    switch (type) {
        case FileType.video:
            //
            break;
        case FileType.image:
            //
            break;
        case FileType.audio:
            //
            break;
    }
};
