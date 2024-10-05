/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OriginalToggle from '@theme-original/ColorModeToggle';
import {
  lightStorage,
  darkStorage,
  type ColorState,
  updateDOMColors,
  LIGHT_PRIMARY_COLOR,
  DARK_PRIMARY_COLOR,
  LIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
  COLOR_SHADES,
} from '@site/src/utils/colorUtils';
import type {Props} from '@theme/ColorModeToggle';

// This component wraps the ColorModeToggle and applies custom styles
// when toggling between dark and light modes. It ensures that color
// preferences are persisted between sessions.
export default function ColorModeToggle(props: Props): JSX.Element {
  const handleColorModeChange = (colorMode: string) => {
    // Call the original onChange handler passed via props
    props.onChange(colorMode);

    // Determine whether dark mode is active
    const isDarkModeEnabled = colorMode === 'dark';

    // Select the appropriate storage for the mode
    const storage = isDarkModeEnabled ? darkStorage : lightStorage;

    // Attempt to retrieve the stored color state from session storage
    const colorState = JSON.parse(storage.get() ?? 'null') as ColorState | null;

    // Use default color state if none is found in storage
    const finalColorState = colorState ?? {
      baseColor: isDarkModeEnabled ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR,
      background: isDarkModeEnabled
        ? DARK_BACKGROUND_COLOR
        : LIGHT_BACKGROUND_COLOR,
      shades: COLOR_SHADES,
    };

    // Update the DOM colors using the resolved color state
    updateDOMColors(finalColorState, isDarkModeEnabled);
  };

  return <OriginalToggle {...props} onChange={handleColorModeChange} />;
}
