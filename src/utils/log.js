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
  const result = confirm(`
※間違えて[回答終了]ボタンを押した場合は[キャンセル]を押してください。  
お疲れさまでした。最後に、ログの保存をしていただきます。
[OK]を押してログをダウンロード/保存してください。
保存先フォルダ、ファイル名は変更する必要はありません。
("PLIVET実験記録"フォルダが設定されているはずですが、もし違っていた場合は左記フォルダか、デスクトップなどに保存をお願いします。)
保存後は、画面右上の"記録終了"ボタンを押てください。
`);
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
  const result = confirm(`記録を終了しますか？
実験終了時以外はこの操作を押さないでください。`);
  if(result) {
      localStorage.logtext = '[';
      alert(`以上で、プログラミング問題の解答は終了です。
画面の録画を終了し、ウィンドウを閉じてください。
実験記録ファイルのツールに関する設問に回答をお願いします。
回答後は、実験記録ファイルを忘れずに上書き保存してくだい。
その後、スタートメニューを右クリックし、サインアウトし、
リモートデスクトップ接続を終了してください。
近日中に、担当者が実験結果を確認でき次第、
謝礼のお支払いなどについてご連絡させていただきます。
この度は実験にご協力いただき、ありがとうございました。`);
  }
}
