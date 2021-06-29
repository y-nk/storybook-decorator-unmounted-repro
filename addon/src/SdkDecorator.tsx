import React, { useRef } from 'react';

import { useEffect, useChannel, useCallback } from '@storybook/addons';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { DecoratorFn } from '@storybook/react'

import { useMount, useUnmount } from 'react-use';

import { ADDON_ID } from './constants';

export const withSdk: DecoratorFn = (Story, context) => {
  const ref = useRef<any>();

  const {
    sdkEnabled = false,
  } = context.globals;

  const emit = useChannel({});

  const updateGlobals = useCallback(
    (newGlobals: any) => emit(UPDATE_GLOBALS, { globals: newGlobals }),
    [emit]
  );

  const onConnect = useCallback(() => {
    updateGlobals({ sdkEnabled: true });
  }, []);

  const onDisconnect = useCallback(() => {
    updateGlobals({ sdkEnabled: false });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // re-synchronize button state with sdk state
    if (ref.current.connected !== sdkEnabled) {
      if (sdkEnabled) ref.current.connect();
      else ref.current.disconnect();
    }
  }, [sdkEnabled]);

  useMount(() => {
    console.log('decorator mounted');
  });

  useUnmount(() => {
    console.log('decorator unmounted');
  });

  // demo cut related code
  const background = sdkEnabled ? 'green' : 'red'
  const onClick = sdkEnabled ? onConnect : onDisconnect

  return (
    <div key={`${ADDON_ID}/decorator`} onClick={onClick} style={{ background }}>
      <Story />
    </div>
  );
};
