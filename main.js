
let member = [
  'chang',
  'baba_pet_yohin',
  'ctlxy_kito',
  'pips_nghr',
  'kaie',
  'nghryuki'
]

let whats = [
  '彫刻',
  'グラフィック（手書き）',
  'グラフィック（計算機）',
  '木彫',
  'ジュース',
  '焼き菓子',
  'プログラム',
  'マシーン',
  'ゲーム',
  '怪談',
]

$(window).on('load', function() {
  console.log('onload')

  // 背景に情報を載せる
  $('.bg-info_ua').text(window.navigator.userAgent)
  $('.bg-info_appName').text(window.navigator.appName)
  $('.bg-info_appVersion').text(window.navigator.appVersion)
  $('.bg-info_width').text(window.screen.width)
  $('.bg-info_height').text(window.screen.height)

  // クッキーから何回訪問したか、いつ以来かを算出
  let times = Cookies.get('times')
  if (times === undefined)
  {
    Cookies.set('times', 0)
  }
  else {
    times++
    Cookies.set('times', times)
    $('.bg-info_times').text(times + ' times')
  }
  let since = Cookies.get('since')
  if (since !== undefined) {
    $('.bg-info_since').text('since ' + since)
  }

  // XMLHttpRequestオブジェクトの作成
  var request = new XMLHttpRequest();

  // URLをセット
  var URL = 'https://us-central1-padron-web.cloudfunctions.net/nowOracle';

  // URLを開く
  request.open('GET', URL, true);

  // レスポンスが返ってきた時の処理を記述 
  request.onload = onGetOracle;

  // リクエストをURLに送信
  request.send();
})

///
function onGetOracle()
{
  // レスポンスが返ってきた時の処理
  const data = this.response;
  console.log(data);

  // 返ってきたJSONをオブジェクトに
  const obj = JSON.parse(data);

  // 期限の差分を取る
  const today = new Date();
  const limitDate = new Date(obj.limit);
  const diffTime = limitDate.getTime() - today.getTime();
  const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // HTMLに反映
  $('.revelation_times').text('Directive__' + obj.times);
  $('.revelation_who').text(obj.who);
  $('.revelation_what').text(obj.what);
  $('.revelation_limit').text('Released in ' + diffDay + 'd');
  
  //
  const base = 800
  setTimeout(() => {
    $('.revelation_times').addClass('show')
  }, base);
  setTimeout(() => {
    $('.revelation_who').addClass('show')
  }, base * 2);
  setTimeout(() => {
    $('.revelation_what').addClass('show')
  }, base * 3);
  setTimeout(() => {
    $('.revelation_limit').addClass('show')
  }, base * 4);

}

var request = new XMLHttpRequest();
request.open('HEAD', window.location.href, true);
request.send();
request.onreadystatechange = function() {
  if (this.readyState === 4) {
    var serverDate = new Date(request.getResponseHeader('Date'));
    $('.bg-info_now').text(serverDate)
    Cookies.set('since', serverDate)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}