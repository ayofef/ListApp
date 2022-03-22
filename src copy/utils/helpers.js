import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import Compressor from 'compressorjs';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import generateValidator, { updatedGenerateValidator } from './validators/generateValidator';
import { APP_ID } from '../constants/api';
import THEME from '../constants/theme';
import { typeHandler } from './fieldsConsts';
import { localStorageService } from './localStorageService';

export const toDate = (date, format) => {
  return date ? moment(date, 'YYYY-MM-DDThh:mm:ssZ').format(format) : '';
};
export const getAuthSlackCode = (search) => search.split('=')[1].split('&')[0] || null;

export const groupDate = (date) => {
  const Future = [];
  const Today = [];
  const yesterday = [];
  const past = {};
  const test = [
    {
      amount: {
        formattedAmount: '$980.0',
      },
      currency: 'USD',
      date: '2020-01-06T10:00:00Z',
      id: '816fa9b3-c8c0-48be-a1f5-150763153fe8',
      invoice: 'https://randomuser.me/api/portraits/men/32.jpg',
      merchant: 'Apple',
      status: 'APPROVED',
      type: 'ONE_TIME_PURCHASE',
      purchase: {
        approver: {
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          name: 'James Smith',
          __typename: 'Person',
        },
        amount: {
          formattedAmount: '$980.0',
        },
        currency: 'USD',
        id: '63a1f69a-a3b3-4dcb-ac3b-95c2647ee268',
        merchant: 'Apple',
        merchantUrl: null,
        purchase: 'MacBook Pro',
        reason: 'Hardware',
        requester: {
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          name: 'Dianne Webb',
          __typename: 'Person',
        },
        __typename: 'Purchase',
      },
      __typename: 'Transaction',
    },
  ];

  date.edges.forEach((item) => {
    const start = moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ').startOf('day');
    const end = moment()
      .startOf('day')
      .subtract(2, 'day');
    if (item.node.date && moment.duration(start.diff(end)).asDays() > 0) {
      switch (true) {
        case moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ')
          .startOf('day')
          .isSame(moment().startOf('day'), 'day'): {
          Today.push(item.node);
          break;
        }
        case moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ')
          .startOf('day')
          .isSame(
            moment()
              .startOf('day')
              .subtract(1, 'day')
          ): {
          yesterday.push(item.node);
          break;
        }
        default: {
          Future.push(item.node);
          break;
        }
      }
    } else {
      if (!past[moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ').format('YYYY-MM-DD')]) {
        past[moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ').format('YYYY-MM-DD')] = [];
      }
      past[moment(item.node.date, 'YYYY-MM-DDThh:mm:ssZ').format('YYYY-MM-DD')].push(item.node);
    }
  });

  return { test, Today, yesterday, Future, past };
};

export const groupApiRequest = (name, number) => {
  let data = localStorageService.getItem(name);
  const listObj = {
    input: '',
    area: '',
    checkbox: false,
  };
  const obj = {};
  const fields = [];
  let validator = {};
  let blocks = {};

  const getObj = (item) => {
    if (item.accessory) {
      if (item.accessory.type in listObj) {
        obj[item.accessory.block_id] = listObj[item.accessory.type];
      }

      if (item.accessory.type === 'static_select') {
        obj[item.accessory.block_id] = item.accessory.options[0].value;
      }
    }
    if (item.type in listObj) {
      obj[item.block_id] = listObj[item.type];
      fields.push(item);
    }

    if (item.type === 'static_select') {
      obj[item.block_id] = item.options[0].value;
    }
  };

  if (data) {
    data = JSON.parse(data);
    if (number && data.tabs) {
      blocks = data.tabs[number];
      data.tabs[number].forEach((item) => {
        getObj(item);
      });
      validator = generateValidator(fields);
    } else {
      blocks = data.fields;
      data.fields.forEach((item) => {
        getObj(item);
      });
      validator = generateValidator(fields);
    }
  }

  return {
    mapPropsToValues: () => obj,
    initialValues: obj,
    validationSchema: validator,
    displayName: name,
    fields,
    blocks,
    submitBtn: data.submit?.text,
    closeBtn: data.close ? data.close.text : false,
  };
};

export const generateFormFields = (name, thrownData, stateKey) => {
  const data = localStorageService.getItem(name) || thrownData;

  const {
    currentStep: { form },
  } = data;
  const listObj = {
    NUMBER: '',
    LONG_TEXT: '',
    URL: '',
    TEXT: '',
    SELECT: null,
    CHECKBOXES: null,
    EXTERNAL_SELECT: null,
    AMOUNT: '',
    DATE: '',
  };
  const obj = {};
  const fields = [];
  let validator = {};
  let blocks = {};

  const getObj = (item) => {
    if (item.accessory) {
      if (typeHandler(item) in listObj) {
        obj[item.block_id] = listObj[item.accessory.type];
      }

      if (item.accessory.type === 'static_select') {
        obj[item.accessory.block_id] = item.accessory.options[0].value;
      }
    }
    if (item.element && typeHandler(item) && typeHandler(item) in listObj) {
      if (data[stateKey]) {
        obj[item.block_id] = data[stateKey].find((field) => field.key === item.block_id)?.value;
      } else {
        obj[item.block_id] = listObj[item.type];
      }
      fields.push(item);
    }
    if (item.type === 'static_select') {
      obj[item.block_id] = null;
    }
  };

  if (data) {
    blocks = form;
    form.forEach((item) => {
      getObj(item);
    });
    validator = updatedGenerateValidator(fields);
  }

  return {
    mapPropsToValues: () => obj,
    initialValues: obj,
    validationSchema: validator,
    displayName: name,
    fields,
    blocks,
    submitBtn: 'data.submit?.text',
    closeBtn: 'data.close ? data.close.text : false',
    hideSubmit: data.hideSubmit,
    hideClose: data.hideClose,
    isComplete: data.isComplete,
    steps: data.steps,
    hasApmForm: data.hasApmForm,
  };
};

export const compareArrayOfObjects = (array) => {
  return array.filter((thing, index) => {
    const _thing = JSON.stringify(thing);
    return (
      index ===
      array.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });
};

export const getGlobalConfig = (config) => {
  return !isEmpty(config) ? config.getApps.find((i) => i.id === APP_ID) : {};
};

export const saveConfigurationHandler = (
  globalConfig,
  booleanConfigItem,
  saveConfiguration,
  selectedApprovers,
  selectedPayments,
  selectedFormFields
) => {
  const changeObjectValue = (object, value, config) => {
    object.children.splice(object.children.indexOf(object.children.find((i) => i.__typename === config)), 1, value);
    return object;
  };

  if (selectedApprovers) {
    let UserListConfigItem = globalConfig.children.find((i) => i.__typename === 'UserListConfigItem');
    UserListConfigItem = {
      ...UserListConfigItem,
      users: compareArrayOfObjects(selectedApprovers).map((item) => item.id),
    };
    changeObjectValue(globalConfig, UserListConfigItem, 'UserListConfigItem');
  }

  if (selectedFormFields) {
    const FormFieldsListConfigItem = globalConfig.children.find((i) => i.__typename === 'FormBuilderGroup');

    FormFieldsListConfigItem.fields = selectedFormFields;
    changeObjectValue(globalConfig, FormFieldsListConfigItem, 'FormBuilderGroup');
  }

  const ConfigGroup = globalConfig.children.find((i) => i.__typename === 'ConfigGroup');
  let BooleanConfigItem = ConfigGroup.children.find((i) => i.__typename === 'BooleanConfigItem');
  BooleanConfigItem = {
    ...ConfigGroup,
    children: [{ ...BooleanConfigItem, value: booleanConfigItem }],
  };
  changeObjectValue(globalConfig, BooleanConfigItem, 'BooleanConfigItem');

  if (selectedPayments) {
    const activeSource = selectedPayments.active;
    let FundingSourceConfigItem = globalConfig.children.find((i) => i.__typename === 'FundingSourceConfigItem');
    FundingSourceConfigItem = {
      ...FundingSourceConfigItem,
      source: selectedPayments[activeSource].id,
      fundingModel: activeSource,
    };
    changeObjectValue(globalConfig, FundingSourceConfigItem, 'FundingSourceConfigItem');
  }

  saveConfiguration({
    variables: {
      appId: APP_ID,
      config: globalConfig,
    },
  });
};

export const creditCardValueFormat = (value) => {
  if (!value) {
    return '';
  }
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

const convertPercentageToPixels = (pxSize, percent) => {
  if (!pxSize) return null;

  return (pxSize * percent) / 100;
};

export const image64toCanvas = (canvasRef, imageRef, image64, percentCrop) => {
  const canvas = canvasRef;
  const { width, height, x, y } = percentCrop;

  if (!width || !height) return;

  const pxWidth = convertPercentageToPixels(imageRef?.naturalWidth, width);
  const pxHeight = convertPercentageToPixels(imageRef?.naturalHeight, height);
  const pxX = convertPercentageToPixels(imageRef?.naturalWidth, x);
  const pxY = convertPercentageToPixels(imageRef?.naturalHeight, y);

  canvas.width = pxWidth ?? width;
  canvas.height = pxHeight ?? height;

  const ctx = canvas.getContext('2d');
  const image = new Image(pxWidth, pxHeight);
  image.src = image64;

  image.onload = () => {
    ctx.drawImage(
      image,
      pxX ?? x,
      pxY ?? x,
      pxWidth ?? width,
      pxHeight ?? height,
      0,
      0,
      pxWidth ?? width,
      pxHeight ?? height
    );
  };
};

export const getFileExtensionFromBase64 = (base64Data) => {
  return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
};

export const base64toFile = (base64Data, filename) => {
  const arr = base64Data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let size = bstr.length;
  const u8arr = new Uint8Array(size);

  while (size--) {
    u8arr[size] = bstr.charCodeAt(size);
  }

  return new File([u8arr], filename, { type: mime });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };

    reader.onerror = (_reader, ev) => reject(_reader, ev);
  });
};

export const compressBase64Image = (base64Data, maxWidth, maxHeight) => {
  const file = base64toFile(base64Data);

  return new Promise(
    (resolve) =>
      new Compressor(file, {
        maxWidth,
        maxHeight,
        async success(item) {
          const base64 = await fileToBase64(item);
          resolve(base64);
        },
      })
  );
};

export const hexToRGBA = (hex, a = 1) => {
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = `0x${hex[1]}${hex[1]}`;
    g = `0x${hex[2]}${hex[2]}`;
    b = `0x${hex[3]}${hex[3]}`;

    // 6 digits
  } else if (hex.length === 7) {
    r = `0x${hex[1]}${hex[2]}`;
    g = `0x${hex[3]}${hex[4]}`;
    b = `0x${hex[5]}${hex[6]}`;
  }

  return `rgba(${+r}, ${+g}, ${+b}, ${+a})`;
};

export const progressBarValues = [
  { color: THEME.secondaryColors.danger, text: 'Weak' },
  { color: THEME.secondaryColors.danger, text: 'Weak' },
  { color: THEME.secondaryColors.yellow, text: 'Medium' },
  { color: THEME.secondaryColors.blue, text: 'Good' },
  { color: THEME.secondaryColors.green, text: 'Strong' },
];

export const cardNumberFormatter = (string) => {
  const regex = /\d+/g;
  return string.match(regex);
};

export const handleItemSort = (globalConfig, item, deep) => {
  if (isEmpty(globalConfig.children)) {
    return {};
  }
  let result = globalConfig?.children?.find((i) => i.__typename === item);
  if (deep) {
    result = result.children.find((i) => i.__typename === deep);
  }
  return result;
};

export const scrollToRef = (ref) => ref?.current && window.scrollTo(0, `${ref.current.offsetTop - 200}`);

export const filterArrayByValues = (array, value, propertyName) =>
  array.filter((arrayItem) => value === arrayItem[propertyName]).flat(1);

export const createBlobFromImage64 = (src) => {
  const contentType = src.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

  const byteCharacters = atob(src.substr(`data:${contentType};base64,`.length));
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });

  return URL.createObjectURL(blob);
};

export const isEqualArrays = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
    return true;
  }
  return true;
};

export const totalCompleteSteps = (obj) => {
  const keysArray = ['flow', 'bank', 'collegues', 'slack', 'newRequest', 'approveRequest', 'export', 'billingDetails'];

  if (Object.keys(obj).length < 1) return 0;

  const res = Object.keys(obj)
    .map((i) => {
      const resItem = keysArray.includes(i);
      if (!resItem) return null;
      return resItem;
    })
    .filter((i) => i !== null).length;

  return res;
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  const k = order === 'desc' ? 1 : -1;
  return (a, b) => k * descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  if (!array) {
    return [];
  }
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

export const getDomain = (url) => {
  if (url && url.length > 1) {
    const urlParts = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split(/[/?#]/);
    return urlParts[0].trim();
  }
  return url;
};

export const flattenEditorPropertiesGroup = (dataSet = []) => {
  const dataArr = [];
  if (!Array.isArray(dataSet[0]?.properties)) {
    return dataSet;
  }
  dataSet?.forEach(({ group, properties = [] }) => {
    const beforePush = [];
    properties?.forEach((el, ind) => beforePush?.push({ id: ind + 1, value: el?.label, ...el, group }));
    return dataArr?.push(...beforePush);
  });
  if (dataArr?.length === 0) {
    return [{ id: 0, key: '#', value: 'No available properties', disabled: true, group: 'No available properties' }];
  }
  return dataArr;
};

export const parseJwt = (token) => {
  if (typeof token !== 'string') return token;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const isDefined = (value) => !isNull(value) && !isUndefined(value);

export const lowerCaseAllWordsExceptFirstLetters = (str) => {
  return str.replace(/(\B)[^ ]*/g, (match) => match.toLowerCase()).replace(/^[^ ]/g, (match) => match.toUpperCase());
};
