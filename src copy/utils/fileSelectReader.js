const FILE_TYPE = {
  image: 'image',
  any: 'any',
};

const ACCEPTED_IMAGE_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

const ACCEPTED_FILE_TYPES = [
  'application/msword',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingm',
  'application/xml',
  'text/csv',
  'text/plain',
  'text/xml',
  ...ACCEPTED_IMAGE_FILE_TYPES,
];

const ACCEPTED_TYPES_MAP = {
  [FILE_TYPE.image]: ACCEPTED_IMAGE_FILE_TYPES,
  [FILE_TYPE.any]: ACCEPTED_FILE_TYPES,
};

const MAX_FILE_SIZE = 1.6e7; // 2mb

const verifyFile = (files, fileType = FILE_TYPE.any) => {
  if (!files && files.length < 0) return false;

  const [file] = files;
  const { type, size } = file;
  const acceptedFileTypes = ACCEPTED_TYPES_MAP[fileType] ?? ACCEPTED_TYPES_MAP[FILE_TYPE.any];

  return acceptedFileTypes.includes(type) && size < MAX_FILE_SIZE;
};

const onFileSelect = (event, fileSelected, fileType) => {
  const { files } = event.target;
  const verified = verifyFile(files, fileType);
  if (!verified) {
    fileSelected(null);
    return;
  }

  const [file] = files;

  const fileReader = new FileReader();

  fileReader.onload = (() => {
    return (e) => {
      const binaryData = e.target.result;
      fileSelected({ imageData: binaryData, fileName: file.name });
    };
  })(file);

  fileReader.readAsDataURL(file);
};

export { onFileSelect, verifyFile, MAX_FILE_SIZE, ACCEPTED_FILE_TYPES, ACCEPTED_IMAGE_FILE_TYPES, FILE_TYPE };
