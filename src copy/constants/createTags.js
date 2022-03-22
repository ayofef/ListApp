import { v4 } from 'uuid';
import { STATUSES } from './flows';
import { PlayFill, StopFill } from '../assets/icons';

const INACTIVE = { title: 'Inactive', bgColor: '#E6E9EC', color: '#545A61' };

const STATUS_MAP = {
  [STATUSES.ACTIVE]: { title: 'Active', bgColor: '#1CCE6A', color: '#fff' },
  [STATUSES.NEEDS_CONFIG]: { title: 'Broken', bgColor: '#DF5B5B', color: '#fff' },
  [STATUSES.NEVER_PUBLISHED]: { title: 'Draft', bgColor: '#E6E9EC', color: '#545A61' },
  [STATUSES.ARCHIVED]: INACTIVE,
  [STATUSES.DISABLED]: INACTIVE,
};

const ARCHIVED = { title: 'Archived', bgColor: '#fff', color: '#787F88', borderColor: '#E6E9EC' };
const AUTOMATION_STATUS_MAP = {
  [STATUSES.ACTIVE]: { title: 'Active', bgColor: '#1CCE6A' },
  [STATUSES.NEEDS_CONFIG]: { title: 'Broken', bgColor: '#DF5B5B;' },
  [STATUSES.NEVER_PUBLISHED]: { title: 'Draft', bgColor: '#fff', color: '#787F88', borderColor: '#E6E9EC' },
  [STATUSES.ARCHIVED]: ARCHIVED,
  [STATUSES.DISABLED]: ARCHIVED,
};

const FLOW_INACTIVE = { title: 'Unpublished', color: '#787F88' };
const FLOWS_STATUS_MAP = {
  [STATUSES.ACTIVE]: { title: 'Running', color: '#14B95C', Icon: PlayFill },
  [STATUSES.NEEDS_CONFIG]: { title: 'Running', color: '#14B95C', Icon: PlayFill },
  [STATUSES.NEVER_PUBLISHED]: { title: 'Draft' },
  [STATUSES.ARCHIVED]: FLOW_INACTIVE,
  [STATUSES.DISABLED]: { title: 'Stopped', color: '#B74242', Icon: StopFill },
};

const ALL_STATUS_MAP = {
  default: STATUS_MAP,
  automation: AUTOMATION_STATUS_MAP,
  flows: FLOWS_STATUS_MAP,
};

/**
 * @param {Object} flow
 * @param {string} type {default | automation | flows }
 * @param {string} flow.status
 * @param {Object|null} flow.draftConfig
 *
 * @return {Array<{ title: string, bgColor: string }>}
 * */
const createTags = (flow, type) => {
  let res;
  const statusTag = ALL_STATUS_MAP?.[type]?.[flow?.status] ?? ALL_STATUS_MAP.default?.[flow?.status];
  if (statusTag) {
    res = [{ ...statusTag, id: v4() }];
  }
  if (flow?.draftConfig && flow?.status !== STATUSES.NEVER_PUBLISHED && type !== 'flows') {
    const draftTag = { title: 'Pending', bgColor: '#C0C5CB', id: v4() };
    res = Array.isArray(res) ? [...res, draftTag] : [draftTag];
  }
  return res;
};

export { createTags };
