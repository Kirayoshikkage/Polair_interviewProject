/* eslint-disable max-classes-per-file */
import debounce from '../helpers/debounce.js';

export default class Breakpoints {
  constructor(breakpoints) {
    this._breakpoints = breakpoints;
  }

  _listFunctionsForUpdateActualBreakpoint = {
    minWidth: this._updatesActualBreakpointMinWidth.bind(this),
    maxWidth: this._updatesActualBreakpointMaxWidth.bind(this),
  };

  _actualBreakpoints = {};

  init() {
    this._updatesActualBreakpoints();

    window.addEventListener('resize', debounce(this._updatesActualBreakpoints.bind(this), 400));
  }

  _updatesActualBreakpoints() {
    Object.keys(this._breakpoints).forEach((key) => {
      const functionForUpdate = this._listFunctionsForUpdateActualBreakpoint[key];

      if (!functionForUpdate) return;

      functionForUpdate();
    });

    this._callsFunctionsActualBreakpoints();
  }

  _callsFunctionsActualBreakpoints() {
    Object.keys(this._actualBreakpoints).forEach((key) => {
      const breakpoint = this._actualBreakpoints[key];
      const listFunctions = this._breakpoints[key][breakpoint];

      if (!listFunctions) return;

      if (typeof listFunctions === 'function') {
        listFunctions();

        return;
      }

      listFunctions?.forEach((func) => func());
    });
  }

  // minWidth
  _updatesActualBreakpointMinWidth() {
    const breakpoint = this._getActualBreakpointMinWidth();

    if (this._actualBreakpoints.minWidth == breakpoint) return;

    this._actualBreakpoints.minWidth = breakpoint;
  }

  // minWidth
  _getActualBreakpointMinWidth() {
    return Object.keys(this._breakpoints.minWidth).reduce((acc, breakpoint) => {
      if (window.innerWidth >= breakpoint) {
        // eslint-disable-next-line no-param-reassign
        acc = breakpoint;
      }

      return acc;
    }, undefined);
  }

  // maxWidth
  _updatesActualBreakpointMaxWidth() {
    const breakpoint = this._getActualBreakpointMaxWidth();

    if (this._actualBreakpoints.maxWidth == breakpoint) return;

    this._actualBreakpoints.maxWidth = breakpoint;
  }

  // maxWidth
  _getActualBreakpointMaxWidth() {
    return Object.keys(this._breakpoints.maxWidth).reduce((acc, breakpoint) => {
      if (window.innerWidth <= breakpoint) {
        // eslint-disable-next-line no-param-reassign
        acc = breakpoint;
      }

      return acc;
    }, undefined);
  }
}
