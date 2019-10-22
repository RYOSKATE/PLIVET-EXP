import Stopwatch from './stopwatch.js';
const stopwatch = new Stopwatch();
let LOGS = [];
export const startLogging = () => {
  if (!stopwatch.isRunning()){
    stopwatch.restart();
    LOGS = [];
  }
};

export const stopLogging = () => {
  stopwatch.stop();
};

export const isLogging = () => {
  return stopwatch.isRunning();
};

export const addLog = (text, step) => {
  const logs = LOGS;
  const time = Number(stopwatch.seconds().toFixed(2));
  console.log('logs:',logs,'time:', time);
  let previousTime = 0;
  if (1 < logs.length) {
    const log = logs[logs.length - 1];
    previousTime = Number(log.time);
  }
  if (typeof step === 'undefined') {
    step = -1;
  }
  const spent = Number((Number(time) - previousTime).toFixed(2));
  LOGS.push({ time, text, step, spent });
};

export const flushLogToSave = () => {
  const text = JSON.stringify(LOGS);
  if (typeof localStorage.logtext === 'undefined') {
    localStorage.logtext = '[';
  } else if (localStorage.logtext !== '[') {
    localStorage.logtext += ',\n';
  }
  localStorage.logtext += text;
  console.log(localStorage);
  LOGS = [];
};

export const saveLog = () => {
  const result = confirm(`お疲れさまでした。
[OK]を押してログをダウンロード/保存してください。
間違えて[終了]を押した場合は[キャンセル]を押して実験を続けてください。`);
  if(!result) {
      return;
  }
  flushLogToSave();
  if(typeof localStorage.logtext === 'undefined') {
      localStorage.logtext = '[';
  }
  var text = localStorage.logtext.replace(/},{/g,'},\n{');
  text += ']';
  var now = new Date();
  var filename = "plivet_"+now.toLocaleString().replace(/\//g,'').replace(/:/g,'') + ".json";
  // バイナリデータを作ります。
  var blob = new Blob([text], {type: "text/plain"});

  // IEか他ブラウザかの判定
  if(window.navigator.msSaveBlob) {
      // IEなら独自関数を使います。
      window.navigator.msSaveBlob(blob, filename);
  } else {
      // それ以外はaタグを利用してイベントを発火させます
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.target = '_blank';
      a.download = filename;
      a.click();
  }
}

export const deleteLog = () => {
  const result = confirm(`ログを削除しますか？
実験担当者以外は、この操作をしないでください。`);
  if(result) {
      localStorage.logtext = '[';
  }
}