/* 헤더 스타일 변경 */
// - scroll 클래스를 넣다 뺐다
const header = document.querySelector("header");
const gnbDep1 =  document.querySelectorAll("#gnb .dep1 > li");
// const gnbDep2 = document.querySelectorAll("#gnb .dep2");

window.addEventListener('scroll', () => {
  if (window.scrollY >= header.offsetHeight) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});

  gnbDep1.forEach((dep2, i) => {
    const gnbDep2 = dep2.querySelector(".dep2");
  
    dep2.addEventListener("mouseenter", () => {
      header.classList.add("scroll");
  
      // 모든 dep2를 숨김
      document.querySelectorAll("#gnb .dep2").forEach(d => d.style.display = "none");
  
      // 현재 li에 속한 dep2만 보이게
      if (gnbDep2) gnbDep2.style.display = "flex";
    });
  
    dep2.addEventListener("mouseleave", () => {
      header.classList.remove("scroll");

      if (window.scrollY > header.offsetHeight) {
        header.classList.add("scroll");
      }
  
      if (gnbDep2) gnbDep2.style.display = "none";
    });
  });
  


/* 헤더 랭귀지 */
const langWrap = document.querySelector('.lang_wrap')
const langBtn = document.querySelector(".lang_wrap button");
const langList = document.querySelector(".lang_wrap ul");
const langIco = document.querySelector(".lang_wrap button>i");

const searchBtn = document.querySelector(".search_wrap button");
const searchBox = document.querySelector(".search_box");

langBtn.addEventListener("click", function () {
  langWrap.classList.toggle("active");
  // langIco.classList.toggle("active");
  searchBox.style.display = "none";
  if (window.scrollY > header.offsetHeight) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

/* 헤더 검색 */
searchBox.style.display = "none";
searchBtn.addEventListener("click", function () {
  
  if (searchBox.style.display === "none") {
    searchBox.style.display = "block";
    // langList.style.display = 'none'
    langList.classList.remove("active");
    header.classList.add("scroll");
  } else {
    searchBox.style.display = "none";
    
    if (window.scrollY > header.offsetHeight) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  }
});

/* 전체메뉴 */
const allmenuOpenBtn = document.querySelector(".btn_allmenu_open");
const allmenuCloseBtn = document.querySelector(".btn_allmenu_close");
const allmenu = document.querySelector(".allmenu_popup");

allmenuOpenBtn.addEventListener("click", function () {
  // allmenu.style.display = "flex";
  allmenu.classList.add("on");
  document.documentElement.style.overflow = 'hidden'
  header.classList.remove("scroll");
  searchBox.style.display = "none";
  langList.classList.remove("active");
});
allmenuCloseBtn.addEventListener("click", function () {
  // allmenu.style.display = "none";
  allmenu.classList.remove("on");
  document.documentElement.style.overflow = 'auto'

  
  if (window.scrollY > header.offsetHeight) {
    header.classList.add("scroll");
  }
});

/*  섹션 애니메이션 */
const sections = gsap.utils.toArray("section, .banner_wrap");
sections.forEach((item) => {
      gsap.from(item, {
        duration: 1.6,
        y: 140,
        opacity: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
          once: true,
        },  
      });
    });


/* 메인비주얼 스와이퍼 */
let animationDuration = 3000;

document.documentElement.style.setProperty('--animation-duration', `${animationDuration}ms`);


const progressBar = document.querySelector('.swiper_content .bar');
const playBtn = document.querySelector('.auto_play');
const pauseBtn = document.querySelector('.auto_stop');
let startTime = performance.now();
let pausedAt = 0;
let progressTimeout;
let isPaused = false;

const mainSwiper = new Swiper(".main_swiper", {
  autoplay: {
    delay: animationDuration,
    disableOnInteraction: true,
  },
  loop: true,
  effect: "fade",

  navigation: {
    nextEl: ".btn_next",
    prevEl: ".btn_prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
      slideChangeTransitionStart: () => {
          if (!isPaused) {
              resetProgressBar();
              startTime = performance.now();
          }
    },
    slideChange: () => {
      if (!isPaused) {
        resetProgressBar();
      startTime = performance.now();
      }
    }
  }
});

function resetProgressBar(duration = animationDuration) {
  clearTimeout(progressTimeout);
  progressBar.style.animation = 'none';
  progressBar.offsetHeight; 
  //style 프로퍼티가 반복되면서 animation 속성이 무시되는 것을 방지
  progressBar.style.animation = `progress ${duration}ms linear forwards`;
  progressBar.style.animationPlayState = 'running';

  progressTimeout = setTimeout(() => {
    mainSwiper.slideNext();
  }, duration);
}

playBtn.addEventListener('click', () => {

  if (!isPaused) return; // 이미 재생 중이면 함수를 빠져나감

  isPaused = false;

  const remaining = animationDuration - pausedAt;
  startTime = performance.now() - pausedAt;

  progressBar.style.animationPlayState = 'running';

  progressTimeout = setTimeout(() => {
    mainSwiper.slideNext();
  }, remaining);

  mainSwiper.autoplay.start(); 

  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
});

pauseBtn.addEventListener('click', () => {
  if (isPaused) return; // 이미 멈춘 상태면 함수를 빠져나감

  isPaused = true;

  pausedAt = performance.now() - startTime;
  clearTimeout(progressTimeout);
  progressBar.style.animationPlayState = 'paused';

  mainSwiper.autoplay.stop(); // 자동 진행 완전 멈춤

  pauseBtn.style.display = 'none';
  playBtn.style.display = 'block';

});
const paginationEl = document.querySelector('.main_swiper .swiper-pagination');

paginationEl.addEventListener('click', () => {
  if (isPaused) {
    isPaused = false;
    pausedAt = 0;
    resetProgressBar();
    mainSwiper.autoplay.start();

    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  }
});


/* 교수진 안내 - 스와이퍼 */
const facultySwiper = new Swiper(".faculty_swiper", {
  // autoplay: true, //자동 실행
  autoplay: {
    delay: 0, //다음 애니메이션 시작시간과의 간격
  },
  speed: 4000, //애니메이션 지속시간
  loop: true, //무한반복
  slidesPerView: "auto", //화면에 보여질 슬라이드 갯수
  spaceBetween: 60, //슬라이드 사이 간격
});

/*  News 탭메뉴 */
const newsTabs = document.querySelectorAll('.news_tab li')
const newsContents = document.querySelectorAll('.news_contents .contbox')

newsTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    // tab active class
    newsTabs.forEach(t => t.classList.remove('active'))
    tab.classList.add('active')

    //contbox show
    newsContents.forEach(cont => cont.style.display = 'none')
    newsContents[i].style.display = 'block'

    console.log(i);
  })
})

/*  배너 */
const bannerBar = document.querySelector('.banner_wrap .progress_wrap .progress .bar')
const bannerBtn = document.querySelector('.banner_wrap .main_link')
bannerBtn.addEventListener('mouseover', (e) => {
  e.preventDefault()

   // 애니메이션 리셋
  bannerBar.style.animation = 'none';
  bannerBar.offsetHeight; 
  
  bannerBar.style.animation = 'progress 2s forwards';
})

/* 푸터 패밀리사이트 */
const famBtn = document.querySelector(".family_site button");
const famList = document.querySelector(".family_site ul");

// famBtn.addEventListener('click', function() {})
famBtn.addEventListener("click", function () {
  if (famList.style.display === "none") {
    famList.style.display = "block";
  } else {
    famList.style.display = "none";
  }
});
