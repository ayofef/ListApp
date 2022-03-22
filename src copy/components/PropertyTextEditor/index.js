import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useQuill } from 'react-quilljs';
import quillEmoji from 'quill-emoji';
import 'quill-mention';
import { modules, formats } from './options';
import { StyledContainer, useMentionContainerStyles, StyledBox } from './styled';
import AddPropertySVG from '../../assets/icons/AddPropertySVG';
import 'quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';
import { flattenEditorPropertiesGroup } from '../../utils/helpers';
import { getQuillEditorHtml, getQuillInnerHtmlText } from './utils';
import { useBoolState } from '../../hooks/useBoolState';

const theme = 'bubble';
const PropertyTextEditor = ({
  showToolbar,
  initialEditorText,
  handleSave,
  properties,
  isFooter,
  minHeight,
  readOnly,
  handleSavePlainText,
  border,
  bgcolor,
  propertyButtonYaxis,
  maxHeight,
  singleProperty,
  padding,
  type,
}) => {
  const editorProperties = flattenEditorPropertiesGroup(properties);
  const cutLabelsArr = editorProperties.map((item) => {
    if (!item.disabled) {
      const label = item.label.split('·');
      label.shift();
      const trimmedLabel = label.map((value) => value.trim());
      return { ...item, label: trimmedLabel.join(' · '), value: trimmedLabel.join(' · ') };
    }
    return { ...item };
  });
  const quillInstanceRef = useRef();

  const { on: menuOpen, off: menuClose, bool: isMenuOpen } = useBoolState(false);

  const isHighlighted = isMenuOpen;

  const onBlur = () => {
    if (!quillInstanceRef.current) return;
    const { html, text } = getQuillInnerHtmlText(quillInstanceRef.current.root.innerHTML);
    if (text === '~') {
      handleSavePlainText('');
      return;
    }
    handleSave(html);
    handleSavePlainText(text);
  };

  const onCloseMention = () => {
    menuClose();
    if (!quillInstanceRef.current) return;
    // Removes first "~" character after closing Mention menu

    const mentionCharIndex = quillInstanceRef.current
      .getContents()
      .map((c) => {
        if (typeof c.insert === 'string') return c.insert;
        return ' ';
      })
      .join('')
      .indexOf('~');

    if (type === 'LONG') {
      const items = quillInstanceRef.current.getContents().ops;

      quillInstanceRef.current.updateContents({ ops: [{ ...items[items.length - 1], insert: '' }] });
    }

    if (mentionCharIndex > -1) {
      quillInstanceRef.current.deleteText(mentionCharIndex, 1);
    }
  };

  const onSelectMention = ({ key }) => {
    if (singleProperty) {
      handleSave(key);
      handleSavePlainText(key);
      const content = getQuillEditorHtml(key, cutLabelsArr);
      quillInstanceRef.current.setContents(quillInstanceRef.current.clipboard.convert(content));
    }
  };

  const mentionClasses = useMentionContainerStyles();

  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules: modules({
      propertyArr: cutLabelsArr,
      showToolbar,
      onCloseMention,
      onOpenMention: menuOpen,
      singleProperty,
      onSelectMention,
      mentionClasses,
    }),
    formats: singleProperty ? ['mention'] : formats,
    readOnly,
  });

  useEffect(() => {
    if (quillInstanceRef.current || !quill || !Quill) {
      return;
    }
    const initialHTMLText = getQuillEditorHtml(initialEditorText, cutLabelsArr);
    quill.setContents(quill.clipboard.convert(initialHTMLText));
    Quill.register(
      {
        'formats/emoji': quillEmoji.EmojiBlot,
        'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
        'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
        'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
      },
      true
    );
    quillInstanceRef.current = quill;
    quill.on('text-change', ({ ops }) => {
      const { containsProperties } = getQuillInnerHtmlText(quill.root.innerHTML);
      const insertOp = ops.find((op) => op.insert);

      const delta = quill.getContents();
      const text = quill.getText().trim();

      if (type === 'LONG') {
        if (!text.includes('~') && (new RegExp(/[^.0-9]/gm).test(text) || Number.isNaN(Number(text)))) {
          let filtered = text.replace(/[^.0-9]/gm, '');

          if (Number.isNaN(Number(text))) {
            const firstOccuranceIndex = filtered.search(/\./) + 1; // Index of first occurance of (.)

            filtered = filtered.substr(0, firstOccuranceIndex) + filtered.slice(firstOccuranceIndex).replace(/\./g, '');
          }

          quill.setText(filtered);
        } else if (text && delta.ops.length > 1) {
          quill.updateContents({
            ops: [{ delete: 1 }],
          });
        }
      }

      if (singleProperty && typeof insertOp?.insert === 'string' && insertOp?.insert !== '~' && containsProperties) {
        quill.updateContents({
          ops: [{ delete: insertOp?.insert?.length }, insertOp, { delete: insertOp?.insert?.length }],
        });
      }
    });
  }, [Quill, initialEditorText, cutLabelsArr, quill, singleProperty, type]);

  const openPropertyMenu = () => {
    if (properties.length > 0) {
      quill.getModule('mention').openMenu('~');
    }
  };

  return (
    <Box position="relative" border={border} borderRadius="8px" bgcolor={bgcolor} width="100%">
      <StyledContainer
        ref={quillRef}
        onBlur={onBlur}
        minHeight={minHeight}
        maxHeight={maxHeight}
        isFooter={isFooter}
        readOnly={readOnly}
        onClick={() => quill.focus()}
        padding={padding}
      />
      {properties?.length > 0 && !readOnly && (
        <StyledBox
          component="button"
          position="absolute"
          top={propertyButtonYaxis}
          right="-10px"
          display="flex"
          m="0"
          p="0"
          border="none"
          bgcolor="transparent"
          onClick={openPropertyMenu}
        >
          <AddPropertySVG active={isHighlighted} />
        </StyledBox>
      )}
    </Box>
  );
};

PropertyTextEditor.propTypes = {
  showToolbar: PropTypes.bool,
  initialEditorText: PropTypes.string,
  handleSave: PropTypes.func,
  handleSavePlainText: PropTypes.func,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      properties: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  minHeight: PropTypes.string,
  isFooter: PropTypes.bool,
  readOnly: PropTypes.bool,
  border: PropTypes.string,
  bgcolor: PropTypes.string,
  propertyButtonYaxis: PropTypes.string,
  maxHeight: PropTypes.string,
  singleProperty: PropTypes.bool,
  padding: PropTypes.string,
  type: PropTypes.string,
};
PropertyTextEditor.defaultProps = {
  minHeight: '100px',
  isFooter: false,
  initialEditorText: '',
  showToolbar: true,
  readOnly: false,
  handleSave: () => null,
  handleSavePlainText: () => null,
  border: '1px dashed #C1C3C6',
  bgcolor: '#F5F6F7',
  propertyButtonYaxis: '50%',
  maxHeight: undefined,
  singleProperty: false,
  padding: undefined,
  type: null,
};

export default PropertyTextEditor;
