/**
 * Copyright (c) [2015-2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import React from 'react';
import Header from './Header';
import { renderWithRedux } from '../../setupTests';

jest.mock('../../janus-api');

it('renders without crashing', () => {
  renderWithRedux(<Header />);
});
