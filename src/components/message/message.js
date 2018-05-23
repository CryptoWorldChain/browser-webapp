let Message = (function () {
  let num;
  let Message = {
     
  };
  Message.create = function (text,type,duration){
      duration = (duration && typeof duration == 'number')?duration:3000;
      if (duration && typeof duration == 'number' && duration < 10 ){
          duration = 1000*duration;
      }
      let message = document.createElement('div');
      let wrapperStyle = '';
      let icon_class;
      if (type == 'error'){
          wrapperStyle = 'message-wrapper message-wrapper-error';
          icon_class = "ivu-icon ivu-icon-close-round"
      }else if (type == 'success') {
          wrapperStyle = 'message-wrapper message-wrapper-success';
          icon_class = "ivu-icon ivu-icon-checkmark"
      }else if (type == 'warn') {
          wrapperStyle = 'message-wrapper message-wrapper-warn';
          icon_class = 'ivu-icon ivu-icon-information-circled';
      }
      let span = document.createElement('span');
      span.innerHTML = text;
      let icon = document.createElement('i');
      icon.className=icon_class;
      message.className= wrapperStyle + ' animated fadeInDown';
      message.appendChild(icon);
      message.appendChild(span);
      document.body.appendChild(message);
      setTimeout(() => {
          message.className = wrapperStyle + ' animated fadeOutUp';
          setTimeout(() => {
              document.body.removeChild(message);
          }, 1000);
      }, duration);
  };
  Message.error = function (text,duration) {
      Message.create(text,'error',duration);
  };
  Message.success = function (text,duration) {
      Message.create(text,'success',duration);
  };
  Message.warn = function (text,duration) {
      Message.create(text,'warn',duration);
  }
  Message.warning = Message.warn;
  return Message;
})();

export { Message };
