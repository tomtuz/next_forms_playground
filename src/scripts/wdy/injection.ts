/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
// use this in during regular dev:
// import whyDidYouRender from '@welldone-software/why-did-you-render';
import whyDidYouRender from 'wdyr-dev/src/index';

// eslint-disable-next-line no-console -- Show information that `whyDidYouRender` has been applied to the website.
console.debug('Applying whyDidYouRender, to help you locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render');

// See https://github.com/welldone-software/why-did-you-render#options
whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  logOwnerReasons: true,
  collapseGroups: true,
  titleColor: "green",
  include: [new RegExp('.')],
  // exclude: [new RegExp('pressence'), new RegExp(/.*(tooltip).*/i)],
  // include: [/./],

  // This is for testing, remove it, if you don't want to log on different values
  logOnDifferentValues: true
});


