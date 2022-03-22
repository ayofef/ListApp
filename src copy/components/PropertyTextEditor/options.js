const toolbarOptions = [
  ['bold', 'italic', 'underline', { list: 'bullet' }, { list: 'ordered' }, 'emoji'],
  [{ align: '' }, { align: 'center' }, { align: 'right' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['clean'],
];

export const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'indent',
  'size',
  'header',
  'link',
  'image',
  'video',
  'color',
  'background',
  'clean',
  'mention',
  'emoji',
];

export const modules = ({
  propertyArr,
  showToolbar,
  onCloseMention,
  onOpenMention,
  singleProperty,
  onSelectMention,
  mentionClasses,
}) => {
  return {
    toolbar: showToolbar ? toolbarOptions : null,
    mention: {
      mentionDenotationChars: ['~'],
      offsetTop: 15,
      dataAttributes: ['key'],
      source: (searchTerm, renderList) => {
        if (searchTerm.length === 0) {
          renderList(propertyArr, searchTerm);
        } else {
          const matches = propertyArr.filter(({ label }) => label?.toLowerCase().includes(searchTerm?.toLowerCase()));
          renderList(matches, searchTerm);
        }
      },
      showDenotationChar: false,
      onOpen: onOpenMention,
      onClose: onCloseMention,
      onSelect: singleProperty ? onSelectMention : undefined,
      defaultMenuOrientation: 'bottom',
      mentionContainerClass: mentionClasses.root,
      spaceAfterInsert: false,
    },
    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: () => {
            const focussableElements = '.ql-editor[contenteditable=true]';

            if (document.activeElement) {
              const elements = document.querySelectorAll(focussableElements);
              let focusIndex = -1;

              for (let index = 0; index < elements.length; index++) {
                const element = elements[index];

                if (element === document.activeElement) {
                  focusIndex = index;
                  break;
                }
              }

              if (focusIndex !== -1) {
                const nextIndex = focusIndex + 1;
                elements[nextIndex < elements.length ? nextIndex : 0].focus();
              }
            }
          },
        },
        ...(singleProperty
          ? {
              enter: {
                key: 13,
                handler: () => null,
              },
            }
          : {}),
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };
};
