import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bool, number, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import { Resizable } from 're-resizable';
import VerticalHandler from './VerticalHandler';

const enable = { left: true };

const handleComponent = {
  left: <VerticalHandler />,
};

const Drawer = ({
  children,
  open,
  top,
  right,
  bottom,
  position,
  height,
  borderRadius,
  boxShadow,
  pr,
  initialWidth,
  fixed,
  blockWidth,
}) => {
  const [width, setWidth] = useState(initialWidth);
  const style = useMemo(
    () => ({
      position,
      height,
      zIndex: 5,
      top,
      right,
      bottom,
      transition: 'all 0.3s ease-out',
    }),
    [bottom, height, position, right, top]
  );

  useEffect(() => {
    setWidth(blockWidth);
  }, [blockWidth]);

  const onResizeStop = useCallback((event, direction, ref, delta) => {
    setWidth((prevState) => prevState + delta.width);
  }, []);

  return (
    open && (
      <Resizable
        size={{ width }}
        style={style}
        enable={fixed || enable}
        handleComponent={handleComponent}
        minWidth="316px"
        maxWidth="1120px"
        onResizeStop={onResizeStop}
      >
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          overflow="hidden"
          bgcolor="#fff"
          borderRadius={borderRadius}
          boxShadow={boxShadow}
          pr={pr}
        >
          {children}
        </Box>
      </Resizable>
    )
  );
};

Drawer.propTypes = {
  open: bool.isRequired,
  top: string,
  right: string,
  bottom: string,
  position: string,
  height: string,
  borderRadius: string,
  boxShadow: string,
  pr: string,
  initialWidth: number,
  blockWidth: number,
  fixed: bool,
};

Drawer.defaultProps = {
  top: '64px',
  right: '12px',
  bottom: '17px',
  position: 'fixed',
  height: 'unset',
  borderRadius: '24px',
  boxShadow: '0 0 7px rgba(195, 195, 195, 0.25)',
  initialWidth: 440,
  blockWidth: 440,
  pr: '12px',
  fixed: false,
};

export default Drawer;
