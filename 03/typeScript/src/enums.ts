enum FileType {
  video='.mp4',
  image=".jpg",
  audio=".mp3",
}

/* const getFileType = (url: string): FileType => {
  if (url == ".mp3") {
    return FileType.audio;
  }
  if (url == ".mp4") {
    return FileType.video;
  }
  return FileType.image;
}; */

const parseDate = (url: string) => {
  const type:FileType = url.substring(0,10) as FileType;

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
