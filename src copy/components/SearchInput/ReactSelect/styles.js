export const customStyles = {
  control: (base) => ({
    ...base,
    width: '340px',
    marginRight: '-40px',
    borderWidth: '1px',
    boxShadow: 'none',
    border: '1px solid #9ca0ff !important',
    height: '38px',
    borderRadius: '8px',
    paddingRight: '24px',
    overflow: 'hidden',
  }),
  valueContainer: (base) => ({
    ...base,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    width: '340px',
    zIndex: '101',
    padding: '0 16px 10px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12)',
    borderRadius: '6px',
    backgroundColor: '#fff',
  }),
  option: (base) => ({
    ...base,
    fontSize: '14px',
    color: '#737A82',
    fontWeight: '600',
    lineHeight: '20px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'transparent',
    },
    padding: 0,
  }),
  groupHeading: (base) => ({
    ...base,
    color: '#232629',
    fontSize: '14px',
    lineHeight: '20px',
    textTransform: 'capitalize',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    margin: 0,
    paddingRight: '1px',
  }),
  multiValueRemove: () => ({
    display: 'none',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    paddingBottom: 0,
  }),
  input: (base) => ({
    ...base,
    transform: 'none',
  }),
};
