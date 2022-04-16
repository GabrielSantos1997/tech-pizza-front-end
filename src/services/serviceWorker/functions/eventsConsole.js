export function eventsConsole() {
  global.onactivate = (e) => {
    console.log('onactivate '.toUpperCase(), e);
    console.log('GLOBAL', global);
  };

  global.oninstall = (e) => {
    console.log('oninstall'.toUpperCase(), e);
  };

  // FETCH

  // global.onfetch = (e) => {
  //   console.log('onfetch'.toUpperCase(), e);
  // };

  // BACKGROUNDS

  global.onbackgroundfetchabort = (e) => {
    console.log('onbackgroundfetchabort'.toUpperCase(), e);
  };
  global.onbackgroundfetchclick = (e) => {
    console.log('onbackgroundfetchclick'.toUpperCase(), e);
  };
  global.onbackgroundfetchfail = (e) => {
    console.log('onbackgroundfetchfail'.toUpperCase(), e);
  };
  global.onbackgroundfetchsuccess = (e) => {
    console.log('onbackgroundfetchsuccess'.toUpperCase(), e);
  };

  // PAYMENT;
  global.oncanmakepayment = (e) => {
    console.log('oncanmakepayment'.toUpperCase(), e);
  };
  global.onabortpayment = (e) => {
    console.log('onabortpayment'.toUpperCase(), e);
  };

  // COOKIE
  global.oncookiechange = (e) => {
    console.log('oncookiechange'.toUpperCase(), e);
  };

  global.onlanguagechange = (e) => {
    console.log('onlanguagechange'.toUpperCase(), e);
  };
  global.onmessage = (e) => {
    console.log('onmessage'.toUpperCase(), e);
  };
  global.onmessageerror = (e) => {
    console.log('onmessageerror'.toUpperCase(), e);
  };
}

global.onnotificationclose = (e) => {
  console.log('onnotificationclose'.toUpperCase(), e);
};

global.onpaymentrequest = (e) => {
  console.log('onpaymentrequest'.toUpperCase(), e);
};
global.onperiodicsync = (e) => {
  console.log('onperiodicsync'.toUpperCase(), e);
};

global.onsync = (e) => {
  console.log('onsync'.toUpperCase(), e);
};
global.onrejectionhandled = (e) => {
  console.log('onrejectionhandled'.toUpperCase(), e);
};
global.onunhandledrejection = (e) => {
  console.log('onunhandledrejection'.toUpperCase(), e);
};

global.onerror = (e) => {
  console.error('onerror'.toUpperCase(), e);
};
