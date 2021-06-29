import { addons, types } from '@storybook/addons';

import { ADDON_ID } from './constants';
import { SdkToggler } from './SdkToggler';

import { withSdk } from './SdkDecorator';

// Register the addon
export const register = () => {
  addons.register(ADDON_ID, () => {
    // Register the tool
    addons.add(SdkToggler.ID, {
      type: types.TOOL,
      title: 'SDK Toggler',
      match: ({ viewMode }) => viewMode === 'story',
      render: SdkToggler,
    });
  });
};

export const decorators = [withSdk];
