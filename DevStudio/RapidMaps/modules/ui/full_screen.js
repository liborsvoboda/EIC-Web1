import { uiCmd } from './cmd.js';
import { utilDetect } from '../util/detect.js';

export function uiFullScreen(context) {
  const element = context.container().node();
  // var button = d3_select(null);


  function getFullScreenFn() {
    if (element.requestFullscreen) {
      return element.requestFullscreen;
    } else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen;
    } else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen;
    } else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen;
    }
  }


  function getExitFullScreenFn() {
    if (document.exitFullscreen) {
      return document.exitFullscreen;
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen;
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen;
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen;
    }
  }


  function isFullScreen() {
    return document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
  }


  function isSupported() {
    return !!getFullScreenFn();
  }


  function fullScreen(d3_event) {
    d3_event.preventDefault();
    if (!isFullScreen()) {
      // button.classed('active', true);
      getFullScreenFn().apply(element);
    } else {
      // button.classed('active', false);
      getExitFullScreenFn().apply(document);
    }
  }


  return function() {  // selection) {
    if (!isSupported()) return;

    // button = selection.append('button')
    //     .attr('title', t('full_screen'))
    //     .on('click', fullScreen)
    //     .call(tooltip);

    // button.append('span')
    //     .attr('class', 'icon full-screen');

    const detected = utilDetect();
    const keys = (detected.os === 'mac' ? [uiCmd('⌃⌘F'), 'f11'] : ['f11']);
    context.keybinding().off(keys);
    context.keybinding().on(keys, fullScreen);
  };
}
