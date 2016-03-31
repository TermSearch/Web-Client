//
// Copyright (c) 2016 by Koen van Gilst (@vnglst) | MIT license
//

import { describe, it } from 'mocha';
import { expect } from 'chai';
import search from '../api/index.js';
import 'babel-polyfill';

describe('Testing Search function', () => {

  it('Should be a function', () => {
    expect(search).to.be.a('function');
  });

  const apiCall = search({ term: 'Anlage', selectedSubjectFields: '' });

  it('Should return a Promise', () => {
    expect(apiCall).to.be.a('Promise');
  });

});
