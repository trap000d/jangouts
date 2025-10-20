/**
 * Copyright (c) [2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import React from 'react';
import LogOut from './LogOut';
import { renderWithRedux } from '../../../setupTests';

it('renders without crashing', () => {
  renderWithRedux(<LogOut />);
});
