import React, { useCallback } from 'react';

import { useGlobals } from '@storybook/api';
import { IconButton } from '@storybook/components';

import { Connected, Disconnected } from './Icons';

import { ADDON_ID } from './constants';

export const SdkToggler = () => {
  const [{ sdkEnabled = false }, updateGlobals] = useGlobals();

  const toggle = useCallback(
    () =>
      updateGlobals({
        sdkEnabled: !sdkEnabled,
      }),
    [sdkEnabled]
  );

  return (
    <IconButton
      key={SdkToggler.ID}
      active={sdkEnabled}
      title={sdkEnabled ? 'Push to disconnect' : 'Push to connect'}
      onClick={toggle}
    >
      {sdkEnabled ? <Connected /> : <Disconnected />}
    </IconButton>
  );
};

SdkToggler.ID = `${ADDON_ID}/sdkToggler`;
