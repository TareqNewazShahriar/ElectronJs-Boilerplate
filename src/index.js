window.app_api.sendToMain('Take it Main');

window.app_api.receiveFromMain(data => {
   console.log(data);
});
