//左侧导航
(() => {
  let navItemList = document.querySelectorAll(
    ".main-left>.left-center>.nav-item"
  );
  //初始化选项的图标
  navItemList.forEach((item, index) => {
    if (index === 0) {
      return;
    }

    let itemIcon = item.querySelector(".item-icon");
    if (!itemIcon) {
      return;
    }
    let theIcon = navItemList[0].querySelector(".item-icon");
    itemIcon.innerHTML = theIcon.innerHTML;
  });

  //让图标变成不选中状态
  const activeIt = function activeIt(navItemDOM) {
    let iconList = navItemDOM.querySelectorAll(".item-icon>svg");
    if (iconList.length < 2) {
      return;
    }
    let thisIcon = iconList[0];
    let activeIcon = iconList[1];
    thisIcon.innerHTML = activeIcon.innerHTML;
  };
  //让图标变成选中状态
  const inactiveIt = function inactiveIt(navItemDOM) {
    let iconList = navItemDOM.querySelectorAll(".item-icon>svg");
    if (iconList?.length < 3) {
      return;
    }
    let thisIcon = iconList[0];
    let inactiveIcon = iconList[2];
    thisIcon.innerHTML = inactiveIcon.innerHTML;
  };
  //处理点击事件,点击后,当前图标变成选中状态,其它图标变成不选中;
  const handleNavClick = function handleNavClick(
    DOM = document.body,
    index = 0
  ) {
    let navItemList = document.querySelectorAll(
      ".main-left>.left-center>.nav-item"
    );
    let bodyWrapList = document.querySelectorAll(
      ".main-right .main-body>.body-wrap"
    );
    navItemList.forEach((item, i) => {
      // console.log(bodyWrapList[i]);
      if (index === i) {
        item.classList.add("active");
        bodyWrapList[i]?.classList?.remove("is-hidden");
        return;
      }
      item.classList.remove("active");
      inactiveIt(item);

      bodyWrapList[i]?.classList?.add("is-hidden");
    });
    activeIt(DOM);
  };
  //为一个选项绑定移入/移出/点击事件; 可改成事件委托;
  const handleNavItem = function handleNavItem(DOM = document.body, index = 0) {
    DOM.onmouseover = () => {
      activeIt(DOM);
    };

    DOM.onmouseout = () => {
      if ([...DOM.classList].includes("active")) {
        return;
      }
      inactiveIt(DOM);
    };

    DOM.onclick = function () {
      handleNavClick(DOM, DOM.theIndex);
    };
  };
  //初始化选项的各个事件;
  navItemList.forEach((item, index) => {
    item.theIndex = index;
    handleNavItem(item, index);
    if ([...item.classList].includes("active")) {
      handleNavClick(item, index);
    }
  });
})();

//搜索框
(() => {
  //输入框有内容，就添加have-value类名
  let searchInput = document.querySelector(".search-input");
  const handleInputChange = function handleInputChange() {
    console.log("输入框", this.value);
    if (this.value) {
      this.classList.add("have-value");
    } else {
      this.classList.remove("have-value");
    }
  };
  // console.dir(searchInput);
  searchInput.oninput = handleInputChange;
  searchInput.onchange = handleInputChange;
  let clearIcon = document.querySelector(".clear-icon");
  let handleClear = function handleClear(e) {
    console.log("点击删除");
    searchInput.value = "";
    handleInputChange.apply(searchInput);
  };
  clearIcon.onclick = handleClear;
})();

// 通过axaj得到Promise实例对象类型的数据
const getDataPromise = (url = "", theData = null) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.response);
          resolve(data);
          xhr = null;
        }
      } catch (err) {
        reject(err);
        xhr = null;
      }
    };
    xhr.onerror = (err) => {
      reject(err);
      xhr = null;
    };
    xhr.send(theData);
  });
};

//首页
(() => {
  const getStyle = function getStyle(element, attribute) {
    return parseInt(getComputedStyle(element)[attribute]) || 0;
  };

  // 第一类视频的渲染
  const discoverConfig = {
    theUrl: "./json/discoverList.json?type=all",
    theBoxSelector: ".discover-box",
    itemClassName: "discover-item",
    isReset: false,
  };
  const renderAJAX01 = (config = discoverConfig) => {
    let { theUrl, theBoxSelector, itemClassName, isReset = false } = config;

    getDataPromise(theUrl).then((dataList) => {
      let theBox = document.querySelector(`${theBoxSelector}`);
      let theList = theBox.querySelectorAll(`.${itemClassName}`);

      let theListLength = theList.length;
      let theString = ``;
      // for (let i = 0; i < 10; i++) {
      //   dataList = [{ ...dataList[0] }, ...dataList];
      // }
      // console.log(` dataList-->`,  dataList);

      dataList.forEach((item, index) => {
        var theIndex = theListLength + index + 1;
        let {
          aLink,
          videoUrl,
          imageUrl,
          loveNumber,
          videoTimeLong,
          itemTitle,
          itemAuthor,
          itemCollect,
          itemComment,
        } = item;

        theString += `
        <a class="content-item-1 ${itemClassName}" src="${aLink}">
          <div class="item-video">
            <video
              class="the-video"
              src="${videoUrl}"
              controls
              controlslist="none"
              loop
              poster="${imageUrl}"
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
            ></video>
            <video
              class="the-background"
              src="${videoUrl}"
              controls
              controlslist="none"
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
              loop
              poster="${imageUrl}"
            ></video>
            <div class="video-no-hover">
              <div class="video-love">
                <i class="love-icon iconfont icon-kongxinaixin"></i>
                <span class="love-number">${loveNumber + theIndex}</span>
              </div>
              <div class="video-time-long">${videoTimeLong}</div>
            </div>
            <div class="video-hover">
              <div class="video-music">
                <i class="music-icon iconfont icon-24gf-volumeCross"></i>
                <!-- <i class="music-icon iconfont icon-24gf-volumeMiddle"></i> -->
              </div>
              <div class="video-time">
                <div class="now-time">00:00</div>
                <span class="now-splite">/</span>
                <div class="loog-time">${videoTimeLong}</div>
              </div>
              <div class="time-line">
                <div class="line-background" style="width: 0%">
                  <div class="line-block"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-description">
            <div class="item-title">
            ${theIndex}-${itemTitle}
            </div>
            <div class="item-info">
              <div class="item-author">${itemAuthor}</div>
              ${
                theIndex % 4 === 2
                  ? `<div class="item-collect">${theIndex}-${itemCollect}</div>`
                  : ``
              }
              ${
                theIndex % 4 === 3
                  ? `<div class="item-comment">${itemComment}</div>`
                  : ``
              }
            </div>
          </div>
        </a>
        `;
      });
      let oldString = isReset ? `` : theBox.innerHTML;
      theBox.innerHTML = oldString + theString;
      theBox.style.height = "auto";
      theBox.style.height;

      let boxHeight = theBox.getBoundingClientRect().height;
      let theItem = theBox.querySelector(`.${itemClassName}`);
      // console.log(`boxHeight-->`, boxHeight, theBox);
      theItem.style.height;
      let itemHeight = theItem.getBoundingClientRect().height;
      // console.log(`itemHeight-->`, itemHeight, theItem);

      theBox.style.height =
        boxHeight -
        itemHeight -
        getStyle(theItem, "marginBottom") -
        getStyle(theItem, "marginTop") +
        `px`;
    });
  };

  //编辑精选
  const discoverTypeConfig = {
    theUrl: "./json/discoverTypeList.json",
    theBoxSelector: ".discover-wrap .title-block .item-box",
    itemClassName: "box-item",
  };
  const renderAJAX00 = (config = discoverTypeConfig) => {
    let { theUrl, theBoxSelector, itemClassName } = config;

    getDataPromise(theUrl).then((dataList) => {
      let theBox = document.querySelector(`${theBoxSelector}`);
      let theList = theBox.querySelectorAll(`.${itemClassName}`);

      let theListLength = theList.length;
      let theString = ``;
      // for (let i = 0; i < 5; i++) {
      //   dataList = [...dataList, { ...dataList[1] }];
      // }
      // console.log(` dataList-->`, dataList);

      dataList.forEach((item, index) => {
        var theIndex = theListLength + index + 1;
        let { isActive, iconfont, imageUrl, itemText } = item;
        theString += `
        <div class="box-item ${isActive ? `active` : ``}" id="${theIndex}">
          ${iconfont ? `<i class="item-icon iconfont ${iconfont}"></i>` : ``}
          ${
            imageUrl
              ? `
                <img
                  class="item-icon"
                  src="${imageUrl}"
                />
              `
              : ``
          }
          <div class="item-text">${itemText}</div>
        </div>
        `;
      });
      theBox.innerHTML = theString;
    });
  };
  renderAJAX00();
  let theBox = document.querySelector(discoverTypeConfig.theBoxSelector);
  theBox.onclick = function (e) {
    let nowElement = e?.target;
    let theClassList = nowElement?.classList;
    // console.log(`nowElement`, nowElement);
    // console.log(`theClassList`, theClassList);
    while (nowElement !== null && nowElement !== this) {
      theClassList = nowElement?.classList;
      if (theClassList?.contains?.("box-item")) {
        break;
      }
      console.dir(nowElement);
      nowElement = nowElement.parentNode;
    }
    if (nowElement === null || nowElement === this) {
      return;
    }
    if (theClassList.contains("active")) {
      return;
    }
    [...this.querySelectorAll(".box-item")].forEach((item) => {
      item.classList.remove("active");
    });
    theClassList.add("active");

    //编辑精选-下方加载更多
    const theText = nowElement.querySelector(".item-text").innerHTML;
    const theConfig = {
      theUrl: `./json/discoverList.json?type=${theText}`,
      theBoxSelector: ".discover-box",
      itemClassName: "discover-item",
      isReset: true,
    };
    renderAJAX01(theConfig);
    let discoverMore = document.querySelector(".discover-wrap .discover-more");
    discoverMore.onclick = (() => {
      let number = 5;
      return function () {
        if (number > 0) {
          number--;
          theConfig.isReset = false;
          renderAJAX01(theConfig);
          return;
        }
        console.log(`加载完成；number-->`, number);
        discoverMore.style.display = "none";
      };
    })();
  };
  setTimeout(() => {
    let theBox = document.querySelector(
      ".discover-wrap .title-block .item-box"
    );
    let theItem0 = theBox.querySelector(".box-item");
    // console.log(`theItem0-->`, theItem0);

    theItem0.dispatchEvent(
      new MouseEvent("click", { view: window, bubbles: true })
    );
  }, 100);

  // 第二类视频的渲染
  const hotConfig = {
    theUrl: "./json/hotList.json",
    theBoxSelector: ".hot-list-box",
    itemClassName: "hot-item",
    maxNumber: 19,
    isReset: false,
  };
  const renderAJAX02 = (config = hotConfig) => {
    let {
      theUrl,
      theBoxSelector,
      itemClassName,
      maxNumber,
      isReset = false,
    } = config;
    getDataPromise(theUrl).then((dataList) => {
      let theBox = document.querySelector(`${theBoxSelector}`);
      // console.log(`theBox-->`, theBox);

      let theList = theBox.querySelectorAll(`.${itemClassName}`);

      let theListLength = theList.length;
      let theString = ``;
      // for (let i = 0; i < 10; i++) {
      //   dataList = [{ ...dataList[0] }, ...dataList];
      // }
      // console.log(` dataList-->`,  dataList);
      dataList.forEach((item, index) => {
        var theIndex = theListLength + index;
        if (theIndex > maxNumber) {
          return;
        }

        let {
          aLink,
          videoUrl,
          imageUrl,
          videoTimeLong,
          itemTitle,
          titleNumber,
          itemAuthor,
          itemCollect,
        } = item;

        theString += `
        <a class="content-item-2  ${itemClassName}" src="${aLink}">
          <div class="item-video">
            <video
              class="the-video"
              src="${videoUrl}"
              poster="${imageUrl}"
              controls
              controlslist="none"
              loop
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
            ></video>
            <video
              class="the-background"
              src="${videoUrl}"
              poster="${imageUrl}"
              controls
              controlslist="none"
              loop
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
            ></video>
            <div class="video-number-list">TOP${theIndex}</div>
            <div class="video-time-long">${videoTimeLong}</div>
          </div>
          <div class="item-description">
            <div class="item-title">
              <i class="title-icon iconfont ${
                theIndex === 0 ? `icon-xiangshang` : `icon-huo`
              }"></i>
              <div class="title-text">${theIndex}-${itemTitle}</div>
              <div class="title-number">${titleNumber}</div>
            </div>
            <div class="item-info">
              <div class="item-collect">${itemCollect}</div>
              <div class="item-author">${theIndex}-${itemAuthor}</div>
            </div>
          </div>
        </a>
        `;
      });
      let oldString = isReset ? `` : theBox.innerHTML;
      theBox.innerHTML = oldString + theString;
      theBox.style.height = "auto";
      theBox.style.height;

      let moreText = document.querySelector(".hot-more>.more-text");
      let moreIcon = document.querySelector(".hot-more>.more-icon");
      if (theList.length + dataList.length >= maxNumber) {
        moreText.innerHTML = `收起`;
        moreIcon.classList.remove("icon-xia");
        moreIcon.classList.add("icon-shang");
        return;
      }

      moreText.innerHTML = `查看更多热榜内容`;
      moreIcon.classList.add("icon-xia");
      moreIcon.classList.remove("icon-shang");

      let boxHeight = theBox.getBoundingClientRect().height;
      let theItem = theBox.querySelector(`.${itemClassName}`);
      // console.log(`boxHeight-->`, boxHeight, theBox);
      theItem.style.height;
      let itemHeight = theItem.getBoundingClientRect().height;
      // console.log(`itemHeight-->`, itemHeight, theItem);

      theBox.style.height =
        boxHeight -
        itemHeight -
        getStyle(theItem, "marginBottom") -
        getStyle(theItem, "marginTop") +
        `px`;
    });
  };

  //抖音热榜
  renderAJAX02(hotConfig);
  let hotMore = document.querySelector(".hot-more");
  hotMore.onclick = function () {
    let moreText = document.querySelector(".hot-more>.more-text");
    if (moreText.innerHTML === `查看更多热榜内容`) {
      renderAJAX02(hotConfig);
      return;
    }

    const hotBox = document.querySelector(".hot-list-box");
    const itemList = [...document.querySelectorAll(".hot-list-box>.hot-item")];
    for (let index = itemList.length - 1; index >= 6; index--) {
      hotBox.removeChild(itemList[index]);
    }
    moreText.innerHTML = `查看更多热榜内容`;
    let moreIcon = document.querySelector(".hot-more>.more-icon");
    moreIcon.classList.add("icon-xia");
    moreIcon.classList.remove("icon-shang");
  };

  //猜你喜欢
  const youLoveList = {
    theUrl: "./json/youLoveList.json",
    theBoxSelector: ".you-love-box",
    itemClassName: "you-love-item",
  };
  renderAJAX01(youLoveList);
  let loveMore = document.querySelector(".you-love-more");
  let theObserver = new IntersectionObserver((changes) => {
    // console.log(`changes-->`, changes);
    if (changes[0].isIntersecting) {
      renderAJAX01(youLoveList);
      return;
    }
  });
  theObserver.observe(loveMore);
})();

(() => {
  const mySwiper = new Swiper(".recommend-wrap>.swiper", {
    direction: "vertical", // 垂直切换选项
    mousewheel: true, //开启鼠标滚轮控制Swiper切换
    effect: "slide", //设置Slide的切换效果

    on: {
      slideChange: function () {
        handleSlide();
        if (mySwiper.activeIndex + 4 > mySwiper.slides.length) {
          renderVideo();
        }
      },
    },
  });

  // 视频的渲染
  const videoConfig = {
    theUrl: "./json/videoList.json?type=all",
    theBoxSelector: ".swiper-wrapper.recommend-wrapper",
    itemClassName: "swiper-slide",
    isReset: false,
  };
  const renderVideo = (config = videoConfig) => {
    let { theUrl, theBoxSelector, itemClassName, isReset = false } = config;
    // console.log(`1111-->`, 1111);

    getDataPromise(theUrl).then((dataList) => {
      let theBox = document.querySelector(`${theBoxSelector}`);
      let theList = theBox.querySelectorAll(`.${itemClassName}`);

      let theListLength = theList.length;
      let theString = ``;

      dataList.forEach((item, index) => {
        var theIndex = theListLength + index + 1;
        let {
          aLink,
          videoUrl,
          imageUrl,
          loveNumber,
          comment,
          collect,
          share,
          itemAuthor,
          itemTitle,
          labelList,
          timeLong,
        } = item;

        theString += `
        <div class="swiper-slide">
          <div class="item-video">
            <video
              class="the-video"
              src="${videoUrl}"
              autoplay
              controls
              controlslist="none"
              muted
              loop
              poster="${imageUrl}"
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
            ></video>
            <video
              class="the-background"
              src="${videoUrl}"
              autoplay
              controls
              controlslist="none"
              muted
              nodownload
              nofullscreen
              noremoteplayback
              disablePictureInPicture
              noplaybackrate
              preload="metadata"
              loop
              poster="${imageUrl}"
            ></video>
            <div class="play-controls">
              <div class="progress-bar">
                <div class="progress-background">
                  <div class="sliding-block"></div>
                </div>
              </div>
              <div class="options-block">
                <div class="options-left">
                  <div class="time-play">
                    <i class="play-icon iconfont icon-bofang1"></i>
                    <div class="time-block">
                      <span class="time-item time-now">00:00</span>
                      <span class="time-item"> / </span>
                      <span class="time-item time-long">${timeLong}</span>
                    </div>
                  </div>
                  <div class="barrage-box">弹幕盒子</div>
                </div>
                <div class="options-right">
                  <div class="one-option chain-broadcast">
                    <div class="switch-box active"></div>
                    <div class="option-text">连播</div>
                  </div>
                  <div class="one-option cls-clear">
                    <div class="switch-box"></div>
                    <div class="option-text">清屏</div>
                  </div>
                  <div class="one-option web-speed">
                    <div class="option-text">智能</div>
                  </div>
                  <div class="one-option video-speed">
                    <div class="option-text">倍速</div>
                  </div>
                  <div class="one-option video-volume">
                    <i
                      class="option-icon active iconfont icon-24gf-volumeCross"
                    ></i>
                    <i
                      class="option-icon iconfont icon-24gf-volumeMiddle"
                    ></i>
                  </div>
                  <div class="one-option full-page">
                    <i
                      class="option-icon iconfont icon-quanping active"
                    ></i>
                    <i
                      class="option-icon iconfont icon-quxiaoquanping"
                    ></i>
                  </div>
                  <div class="one-option full-screenn">
                    <i
                      class="option-icon active iconfont icon-quanping1"
                    ></i>
                    <i
                      class="option-icon iconfont icon-tuichuquanping"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="describe-block">
              <div class="describe-title">
                <a class="title-name" href="http://1996f.top:5550/">
                  @${itemAuthor}
                </a>
                <span class="title-separator"> · </span>
                <span class="title-time">2月17日</span>
              </div>

              <div class="describe-text">
                <span class="text-contains">
                  ${itemTitle}
                </span>
                ${labelList
                  .map(
                    (item) => `
                      <a class="describe-tag" href="${item.url}">
                        #${item.text}
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>

            <div class="category-block">
              <div class="category-image">
                <img
                  class="item-image"
                  src="./public/resource/image/image04.jpg"
                />
                <i class="item-icon attention iconfont icon-zengjia"></i>
              </div>
              <div class="category-item love-item">
                <i class="item-icon iconfont icon-shixin-copy"></i>
                <div class="item-text">${loveNumber}</div>
              </div>
              <div class="category-item comment">
                <i class="item-icon iconfont icon-xinxi"></i>
                <div class="item-text">${comment}</div>
              </div>
              <div class="category-item collect">
                <i class="item-icon iconfont icon-shixinxingxing"></i>
                <div class="item-text">${collect}</div>
              </div>
              <div class="category-item share">
                <i class="item-icon iconfont icon-fenxiang"></i>
                <div class="item-text">${share}</div>
              </div>
              <div class="category-item even-more">
                <i class="item-icon iconfont icon-sangediandian"></i>
              </div>
            </div>

            <div class="gotoleft-block">
              <i class="gotoleft-icon iconfont icon-xiangzuo1"></i>
            </div>

              <i class="icon-block iconfont icon-bofang1"></i>
          </div>
        </div>
        `;
      });
      let oldString = isReset ? `` : theBox.innerHTML;
      theBox.innerHTML = oldString + theString;

      mySwiper.updateSlides();
    });
  };
  renderVideo();

  const handleSlide = function handleSlide(type) {
    let switchPrev = document.querySelector(".recommend-wrap .switch-prev");
    getVideo().timeout = 2000;
    getVideo().onloadedmetadata = () => {
      handleVideoPlay();
      handleVideoChange();
    };
    handleVideoChange();
    if (mySwiper.activeIndex === 0) {
      switchPrev.classList.add("stop");
      return;
    }
    switchPrev.classList.remove("stop");

    console.log(mySwiper.previousIndex, mySwiper.activeIndex);
    if (mySwiper.previousIndex !== mySwiper.activeIndex) {
      const previousVideo = getVideo(mySwiper.previousIndex);
      previousVideo.pause();
      return;
    }
  };

  const getVideo = (index = mySwiper.activeIndex) => {
    return mySwiper.slides[index].querySelector(".item-video>.the-video");
  };
  const getBackgroundVideo = (index = mySwiper.activeIndex) => {
    return mySwiper.slides[index].querySelector(".item-video>.the-background");
  };
  const handleVideoSwitch = () => {
    const theVideo = getVideo();
    if (theVideo.paused) {
      handleVideoPlay();
      return;
    }
    handleVideoPause();
  };
  const formatTime = (num) => {
    let minute = Math.floor(num / 60);
    let second = Math.floor(num % 60);
    let res = `${minute < 10 ? `0` + minute : minute}:${
      second < 10 ? `0` + second : second
    }`;
    return res;
  };
  //查询video标签的暂停状态,因为设置自动播放后,开始第一次状态一直是true,即便已经自动播放了视频;
  const getPausedStatus = async (videoElement, timeout = 2000) => {
    // 原理是用videoElement.paused保证尽量快速,用videoElement.currentTime确保确认视频已经播放了;
    let status = videoElement.paused;
    //正在播放直接返回
    if (status === false) {
      return status;
    }
    //无自动播放直接返回,因为不设置自动播放时,这个默认是正确的;
    if (!videoElement.autoplay) {
      return status;
    }
    const thePromoise = new Promise((resolve, reject) => {
      // const callback = () => {
      //   videoElement.removeEventListener("loadedmetadata", callback);
      // };
      // videoElement.addEventListener("loadedmetadata", callback);

      let theTime = videoElement.currentTime;
      setTimeout(() => {
        let currentTime = videoElement.currentTime;
        // console.log(theTime, currentTime, videoElement);
        console.log(theTime, currentTime, timeout);
        if (theTime === currentTime) {
          status = true;
        } else {
          status = false;
        }
        resolve(status);
      }, timeout);
    });
    return thePromoise;
  };
  const handleVideoChange = async (index = mySwiper.activeIndex) => {
    const theVideo = getVideo();
    // console.log(`theVideo.paused-->`, theVideo.paused);
    // console.log(`theVideo.autoplay-->`, theVideo.autoplay);
    const theStatus = await getPausedStatus(theVideo, theVideo.timeout || 2000); //设置了autoplay后,即便自动播放了,也依旧是true暂停状态;
    console.log(`theStatus-->`, theStatus);

    if (theStatus) {
      const theSlide = mySwiper.slides[index];
      const iconBlock = theSlide.querySelector(".icon-block");
      iconBlock.classList.add("active");

      const playIcon = theSlide.querySelector(".play-icon");
      playIcon.classList.add("icon-bofang1");
      playIcon.classList.remove("icon-zanting");

      if (theVideo.timer) {
        clearInterval(theVideo.timer);
        theVideo.timer = null;
      }
      return;
    }
    theVideo.timeout = 1;

    const theSlide = mySwiper.slides[index];
    const iconBlock = theSlide.querySelector(".icon-block");
    iconBlock.classList.remove("active");

    const playIcon = theSlide.querySelector(".play-icon");
    playIcon.classList.remove("icon-bofang1");
    playIcon.classList.add("icon-zanting");

    const progressBackground = theSlide.querySelector(".progress-background");
    const timeNow = theSlide.querySelector(".time-now");
    const timeLong = theSlide.querySelector(".time-long");
    if (theVideo.timer) {
      clearInterval(theVideo.timer);
      theVideo.timer = null;
    }
    console.log(theVideo.currentTime, theVideo.duration);
    const theBackgroundVideo = getBackgroundVideo();
    theBackgroundVideo.currentTime = theVideo.currentTime;
    theVideo.timer = setInterval(() => {
      const currentTime = theVideo.currentTime;
      const duration = theVideo.duration;
      const scale = (currentTime / duration) * 100;
      progressBackground.style.width = `${scale}%`;
      timeNow.innerHTML = formatTime(currentTime);
      if (duration) {
        timeLong.innerHTML = formatTime(duration);
      }
    }, 100);
  };
  getVideo().onloadedmetadata = () => {
    handleVideoChange();
  };
  handleVideoChange();

  const handleVideoPlay = () => {
    const theVideo = getVideo();
    theVideo.play();
    const theBackgroundVideo = getBackgroundVideo();
    theBackgroundVideo.play();

    handleVideoChange();
  };
  const handleVideoPause = () => {
    const theVideo = getVideo();
    theVideo.pause();
    const theBackgroundVideo = getBackgroundVideo();
    theBackgroundVideo.pause();

    handleVideoChange();
  };

  const recommendWrap = document.querySelector(".recommend-wrap");
  recommendWrap.onclick = function (e) {
    const theList = [];
    let nowElement = e.target;
    let classList = nowElement.classList;
    while (nowElement && !classList.contains("recommend-wrap")) {
      theList.push(...classList);
      // console.dir(nowElement)
      nowElement = nowElement.parentNode;
      classList = nowElement.classList;
    }
    if (theList.includes("switch-prev")) {
      mySwiper.slidePrev();
      console.log(`点击上一轮播图`);

      return;
    }
    if (theList.includes("switch-next")) {
      mySwiper.slideNext();
      console.log(`点击下一轮播图`);
      return;
    }

    if (theList.includes("icon-block")) {
      console.log(`点击播放`);
      handleVideoPlay();
      return;
    }
    if (theList.includes("play-icon")) {
      console.log(`点击播放切换`);
      handleVideoSwitch();
      return;
    }
    if (theList.includes("chain-broadcast")) {
      console.log(`点击连播`);
      const switchBox = mySwiper.slides[mySwiper.activeIndex].querySelector(
        ".chain-broadcast>.switch-box"
      );
      if (switchBox.classList.contains("active")) {
        switchBox.classList.remove("active");
      } else {
        switchBox.classList.add("active");
      }
      return;
    }
    if (theList.includes("cls-clear")) {
      console.log(`点击清屏`);
      const switchBox = mySwiper.slides[mySwiper.activeIndex].querySelector(
        ".cls-clear>.switch-box"
      );
      if (switchBox.classList.contains("active")) {
        switchBox.classList.remove("active");
      } else {
        switchBox.classList.add("active");
      }
      return;
    }
    if (theList.includes("cls-clear")) {
      console.log(`点击智能`);
      return;
    }
    if (theList.includes("web-speed")) {
      console.log(`点击清屏`);
      return;
    }
    if (theList.includes("video-speed")) {
      console.log(`点击倍速`);
      return;
    }
    if (theList.includes("video-volume")) {
      console.log(`点击音量`);
      const iconList = mySwiper.slides[mySwiper.activeIndex].querySelectorAll(
        ".options-right>.video-volume>.option-icon"
      );
      console.log(iconList);
      iconList.forEach((item) => {
        item.classList.toggle("active");
      });
      return;
    }
    if (theList.includes("full-page")) {
      console.log(`网页全屏`);
      const iconList = mySwiper.slides[mySwiper.activeIndex].querySelectorAll(
        ".options-right>.full-page>.option-icon"
      );
      iconList.forEach((item) => {
        item.classList.toggle("active");
      });
      return;
    }
    if (theList.includes("full-screenn")) {
      console.log(`点击全屏`);
      const iconList = mySwiper.slides[mySwiper.activeIndex].querySelectorAll(
        ".options-right>.full-screenn>.option-icon"
      );
      iconList.forEach((item) => {
        item.classList.toggle("active");
      });
      return;
    }
    if (theList.includes("attention")) {
      console.log(`点击关注`);
      return;
    }
    if (theList.includes("category-image")) {
      console.log(`点击作者头像`);
      return;
    }
    if (theList.includes("love-item")) {
      console.log(`点击爱心`);
      const theIcon = mySwiper.slides[mySwiper.activeIndex].querySelector(
        ".category-block .love-item>.item-icon"
      );
      console.log(theIcon);
      if (theIcon.classList.contains("active")) {
        theIcon.classList.remove("active");
      } else {
        theIcon.classList.add("active");
      }
      return;
    }
    if (theList.includes("comment")) {
      console.log(`点击评论`);
      return;
    }
    if (theList.includes("collect")) {
      console.log(`点击收藏`);
      const theIcon = mySwiper.slides[mySwiper.activeIndex].querySelector(
        ".category-block .collect>.item-icon"
      );
      if (theIcon.classList.contains("active")) {
        theIcon.classList.remove("active");
      } else {
        theIcon.classList.add("active");
      }
      return;
    }
    if (theList.includes("share")) {
      console.log(`点击分享`);
      return;
    }
    if (theList.includes("even-more")) {
      console.log(`点击更多`);
      return;
    }

    console.log(`视频-播放切换`);
    handleVideoSwitch();
    e.stopPropagation();
    e.preventDefault();
  };

  // setTimeout(()=>{
  //   console.log('1000');
  //   mySwiper.slideNext();
  // },1000)
})();
