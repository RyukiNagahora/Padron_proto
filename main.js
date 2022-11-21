
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

  //
  $('.bg-info_ua').text(window.navigator.userAgent)
  $('.bg-info_appName').text(window.navigator.appName)
  $('.bg-info_appVersion').text(window.navigator.appVersion)
  $('.bg-info_width').text(window.screen.width)
  $('.bg-info_height').text(window.screen.height)

  //
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
  
  //
  let since = Cookies.get('since')
  if (since !== undefined) {
    $('.bg-info_since').text('since ' + since)
  }

  //
  let number = 1
  let rnd = Math.random()
  if (rnd < 0.05) number = 3
  else if (rnd < 0.2) number = 2
  console.log(number + ' : ' + rnd);
  //
  let mens = ''
  for (let i = 0; i < number; i++) {
    if (i > 0) mens += ' + '
    rnd = getRandomInt(member.length)
    mens += member[rnd]
    member.splice(rnd, 1)
    console.log('leng : ' + member.length);
  }
  console.log('mens : ' + mens)
  $('.revelation_who').text(mens)
  //
  rnd = getRandomInt(whats.length)
  $('.revelation_what').text(whats[rnd])
  //
  let limit = ''
  rnd = Math.random()
  if (rnd < 0.05) {
    limit = '3日後'
  }
  else if (rnd < 0.2)
  {
    limit = '10日後'
  }
  else {
    limit = '30日後'
  }
  $('.revelation_limit').text(limit)

  //
  let base = 800
  setTimeout(() => {
    $('.revelation_who').addClass('show')
  }, base);
  setTimeout(() => {
    $('.revelation_what').addClass('show')
  }, base * 2);
  setTimeout(() => {
    $('.revelation_limit').addClass('show')
  }, base * 3);
})

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