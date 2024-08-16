//* main.js를 head 태그에서 연결한 경우 body 요소가 생성 전이라 js가 실행되지 않음
//* 아래의 3가지 방법 중 하나를 이용함

// window.onload = function() {//js 실행문} => js
// $(document).ready(function() {//js 실행문}) => jQuery
// script 태그에 defer 속성을 추가


/* Popup */
// $('#popup').hide(); //문서 완성후 삭제
$('#popup').draggable();
$('.btn_popup_close').click(function() {
  $('#popup').hide();
})

/* header language */
$('.lang_wrap button').click(function() {
  /*
    $('.lang_wrap ul').css({
      'display' : 'flex',
      'opacity' : 1
    })
    $('.lang_wrap button i').css({
      'transform':'rotate(180deg)'
    })
  */
  $('.lang_wrap button, .lang_wrap ul').toggleClass('open')
})

/* 전체 메뉴 */
$('.btn_allmenu_open').click(function() {
  $('.allmenu_popup').css({'display' : 'flex'})
  $('html, body').css({'overflow':'hidden'})
  $('header .search_popup').hide();
})
$('.btn_allmenu_close').click(function() {
  $('.allmenu_popup').hide()
  $('html, body').css({'overflow':'auto'})
  $('header').removeClass('on')
})

/* header 스타일 추가 */
$('header .btn_search_open').click(function() {
  //헤더에 on 클래스 추가 / 제거
  $('header').toggleClass('on');
  //.search_popup을 보였다 안보였다
  $('header .search_popup').toggle()
})

// 문서 전체의 스크롤 위치값(초기값은 0)이 10이상이 되면
// 헤더에 on클래스를 추가, 다시 0이 되면 on 클래스 제거
//** 여러 상황에서 서로 다른 행동하려면 조건문 if

// 스크롤 위치값 $(window).scrollTop()

$(window).scroll(function() { //스크롤링이 될 때마다
  if($(window).scrollTop() >= 10) {
    $('header').addClass('on')
  }
  else {
    $('header').removeClass('on')
  }
  // console.log($(window).scrollTop());
})


//#gnb .dep1의 직접자손 li에게 마우스가 오버 되었을 때
/*
$('#gnb .dep1>li').mouseover(function() {
  //gnb의 dep2를 보임
  $('#gnb .dep2').show()
})
$('#gnb .dep1>li').mouseout(function() {
  //gnb의 dep2를 보임
  $('#gnb .dep2').hide(2000, callback)
})
*/

// method(parameter, parameter, parameter, ...)
// hover() <= jQuery 이벤트메소드 : mouseover + mouseout
// mouseover(function() {}), mouseout(function() {})
// hover(function() {}, function() {})

$('#gnb .dep1>li').hover(function() { //over
  // $(this).children('.dep2_wrap').stop().slideDown();
  $(this).children('.dep2_wrap').stop().show();
  $('header').addClass('on')
}, function() { //out
  $('#gnb .dep2_wrap').stop().slideUp();
  $('header').removeClass('on')
});

// 패밀리사이트 버튼(.family_wrap>button)을
// 클릭하면 => 이벤트
// 패밀리 리스트(.family_wrap>ul)가
// 보였다안보였다 toggle()
// 위쪽으로 늘었다가 줄어들었다 애니메이션 animate({})
// 보였다(true) 안보였다(false)
let s = false;

$('.family_wrap>button').click(function() {
  // $('.family_wrap>ul').toggle(500)
  //css({prop : val, prop : val})

  // if(s == false) { //s가 false와 같은지
  //   $('.family_wrap>ul').animate({'height' : '11.5em'});
  //   s = true;
  // }
  // else { //s가 true와 같은지
  //   $('.family_wrap>ul').animate({'height' : '0'});
  //   s = false;
  // }
  $('.family_wrap>ul').slideToggle()
  console.log(s)
})

const mainSwiper = new Swiper('.main_swiper', {
  effect: 'fade',
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

$('.main_swiper .auto-play').click(function() {
  $(this).hide();
  $('.main_swiper .auto-stop').show();
  mainSwiper.autoplay.start();
})
$('.main_swiper .auto-stop').click(function() {
  $(this).hide();
  $('.main_swiper .auto-play').show();
  mainSwiper.autoplay.stop();
})

// faculty
const facultySwiper = new Swiper('.faculty_swiper', {
  spaceBetween: 40,
  slidesPerView: 'auto',
  autoplay: {
    delay: 0,
  },
  speed: 4000,
  loop: true,
})


//** News
//1. tabs의 li를 클릭했을 때, active 클래스값을 가진 요소
//2. 해당 li의 속성(attribute) 중 'data-news' 속성의 값을 get
//3. content_box 중 가져온 'data-news' 속성의 값과 동일한 값을 가진 요소를 찾아서
//4. 찾은 그 박스를 보여주고, 나머지 박스는 안 보임

$('.news_wrap .tabs li').click(function() {

  $('.news_wrap .tabs li').not(this).removeClass('active')
  $(this).addClass('active');

  //* index를 활용 (우선 활용)
  //const i = $(this).index(); //0~4 (인덱스는 0부터 시작)
  // $('.news_wrap .content_box').hide();
  // $('.news_wrap .content_box').eq(i).show()

  //$(this).attr('data-news')//이벤트발생한 요소의 'data-news' 속성을 get
  const tabName = $(this).attr('data-news');
  console.log(tabName)

  // 변수 tabName의 값을 content_box의 클래스로 찾기
  // index가 동일하지 않은 경우
  // $('.news_wrap .content_box').not('.' + tabName).hide()
  // $('.news_wrap .' + tabName).show()

  //* content_box의 data-news 속성을 이용
  //3. content_box 중 'data-news' 속성의 값과 변수 tabName의 값이 동일한 요소를 찾아서
  $('.news_wrap .content_box').hide()
  $('.news_wrap .content_box')
    .filter('[data-news = ' + tabName + ']').show()
})

//sample
// const samp = 'test';
// $('.news_wrap .' + samp).css({'background' : 'olive'})

// 원래는 DB에서 게시글이 있는지 없는지 확인 => 개발자영역
// ul에게 li자손의 존재여부 확인


// $('.content_box ul').each(function() {
//   let a = $(this).children().is('li')
//   console.log(a);
//   if(a) {
//     $('.content_box p').hide()
//   }else {
//     $('.content_box ul').hide()
//   }
// })

/* sub - location - button */
// let isShow = false;
// $('.sub .lnb_wrap button').click(function() {
//   // 랭귀지, 패밀리사이트의 경우에 사용
//   // $(this).next().toggle()
//   // $('.sub .lnb_wrap ul').not($(this).next()).hide()
//   // $(this).next().css({'display' : 'flex'})
//   // (isShow == false) ? true : false;

//   /*클릭한 버튼의 동생 ul의 display 속성이 none과 같다면*/
//   let a = $(this).next().css('display')
//   console.log(a);

//   //if(/*ul의 display : none */) {
//   if(a == 'none') {
//     $(this).next().css({'display' : 'flex'})
//     $('.sub .lnb_wrap ul').not($(this).next()).hide()
//   } else {
//     $('.sub .lnb_wrap ul').hide()
//   }
// })


$('.sub .lnb_wrap button').click(function() {
  let nextEl = $(this).next()

  if(nextEl.css('display') == 'none') {
    nextEl.css('display', 'flex')
    $('.sub .lnb_wrap ul').not(nextEl).css('display', 'none')
  } else {
    $('.sub .lnb_wrap ul').css('display', 'none')
  }
})