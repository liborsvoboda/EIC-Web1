'use strict';

var dataSources = ['screen', 'window'];
var desktopMediaRequestId = '';

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.type === 'SS_UI_REQUEST') {
      requestScreenSharing(port, msg);
    }

    if (msg.type === 'SS_UI_CANCEL') {
      cancelScreenSharing(msg);
    }
  });
});

function requestScreenSharing(port, msg) {
  desktopMediaRequestId =
      chrome.desktopCapture.chooseDesktopMedia(dataSources, port.sender.tab,
          function(streamId) {
            if (streamId) {
              msg.type = 'SS_DIALOG_SUCCESS';
              msg.streamId = streamId;
            } else {
              msg.type = 'SS_DIALOG_CANCEL';
            }
            port.postMessage(msg);
          });
}

function cancelScreenSharing() {
  if (desktopMediaRequestId) {
    chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId);
  }
}
