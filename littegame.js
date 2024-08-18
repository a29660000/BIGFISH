/* ====== Questions ====== */
let questions = [
    {
      question: '仙鶴⼀品⽂官問： 現在這個地⽅是⼀間150歲三合院， 過去曾經住了宜蘭第⼀位舉⼈， 那你知道，考試前忌諱讀什麼書嗎？',
      options: [
        '參考書',
        '百科全書',
        '漫畫書',
        '沒差'
      ],
      answer: 2
    }
  ];
  /* ======== End ======== */
  
  /* ==== True code ==== */
  const progressBar = document.querySelector(".progress--bar");
  const questionArea = document.querySelector(".questionArea");
  const scoreArea = document.querySelector(".scoreArea");
  const scoreText1 = document.querySelector(".scoreText1");
  const scorePct = document.querySelector(".scorePct");
  
  //initial data
  let currentQuestion = 0;
  let correctAnswers = 0;
  
//   showQuestion();
  
  //reset event
  document.querySelector(".scoreArea button").addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
  });
  
  //Functions
  function showQuestion() {
    const CollecReturnimg = document.querySelector('.CollecReturnimg');
    CollecReturnimg.style.display = 'block';

    var modelData = Currentmodel.source[foundARIndex];
    console.log('當前的modelData',modelData)

    if (modelData.question) {
      let q = modelData;
  
      // let progress = Math.floor((currentQuestion / questions.length) * 100);
      // progressBar.style.width = `${progress}%`;
  
      scoreArea.style.display = "none";
      questionArea.style.display = "block";
  
      document.querySelector(".question").innerHTML = q.question;
  
      let optionsHtml = "";
  
      for (let i in q.options) {
        optionsHtml += `<div data-op="${i}" class="option"><span> ${
          parseInt(i) + 1
        }</span> ${q.options[i]}</div>`;
      }
  
      document.querySelector(".options").innerHTML = optionsHtml;
  
      document.querySelectorAll(".options .option").forEach((item) => {
        item.addEventListener("click", optionsClickEvent);
      });
    } else {
      finishQuiz();
    }
  }
  
  // 在這裡設置你的答對處理邏輯
  function optionsClickEvent(e) {
    var modelData = Currentmodel.source[foundARIndex];
    let clickedOption = parseInt(e.target.getAttribute("data-op"));   
  
    if (action) {
      action.stop();  // 停止目前的動畫
    }
  
    if (modelData.answer === clickedOption) {
      e.target.classList.add("correct");
      console.log('答對了');
      console.log(foundARIndex)
      // if(foundARIndex == 8){
      //   action = Currentmodel.mixer.clipAction(Currentdata[2].animations[2]);
      // }else{
      //   action = Currentmodel.mixer.clipAction(Currentdata[2].animations[0]);
      // }
      // action = Currentmodel.mixer.clipAction(Currentdata[2].animations[2]);
      action = Currentmodel.mixer.clipAction(Currentdata[2].animations[0]);
      showNotification("恭喜答對了！", "correct");
  
      // 展示圖片並移動
      // showMovingImage(foundARIndex + 1);
      // showBeastIcon(foundARIndex + 1, showMovingCard);
  
      setTimeout(() => {
        // $('#dialogue').css('z-index', 9);
        // $('#dialogue').css('opacity', 1);
        $('.QuizCanvas').css('z-index', 0);
        resetOptions();
        showQuestion();

        const notificationContainer = document.querySelector('.notification-container');
        notificationContainer.classList.remove('show');
        
        setTimeout(() => {
          model.close();
          scanner.start();

          const CollecReturnimg = document.querySelector('.CollecReturnimg');
          CollecReturnimg.style.display = 'none';
          MenuButton.style.display = 'block';
        }, 300);

      }, 5000);
    } else {
      e.target.classList.add("incorrect");
      console.log('答錯了');
      action = Currentmodel.mixer.clipAction(Currentdata[3].animations[0]);
      showNotification("答案在我們流程區喔～", "incorrect");
    }
  
    if (action) {
      action.reset(); // 重置動畫狀態
      action.play();  // 播放新動畫
    }

  }
  
  function resetOptions() {
    document.querySelectorAll(".options .option").forEach((item) => {
      item.classList.remove("correct", "incorrect");
    });
  }

  
  
  function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
  
    if (points <= 30) {
      scoreText1.innerHTML = "oops, needs to improve";
      scorePct.style.color = "#f00000";
    } else if (points > 30 && points < 70) {
      scoreText1.innerHTML = "Good job";
      scorePct.style.color = "#ffc900";
    } else if (points > 30 && points >= 70) {
      scoreText1.innerHTML = "Ohh very good, congratulations!";
      scorePct.style.color = "#0d630d";
    }
  
    scorePct.innerHTML = `${points}% Correct`;
    document.querySelector(
      ".scoreText2"
    ).innerHTML = `Out of ${questions.length} you got it ${correctAnswers}`;
  
    scoreArea.style.display = "block";
    questionArea.style.display = "none";
    progressBar.style.width = "100%";
  }
  
  //   ====================================================================
  
  let objectNowHereWithIcons = {
    scissors: 'UI/Scissors.png',
    rock: 'UI/Rock.png',
    paper: 'UI/Paper.png',
    fit: 'UI/fit.png' // 初始圖片
};
let objectNowHereWithIconsKeys = Object.keys(objectNowHereWithIcons);
const timeToRemove = 2950;

function playNow(objectNowHereHZ) {
  // 找到被點擊的按鈕
  let clickedButton = document.getElementsByClassName("stonePaperCut")[0].children[objectNowHereHZ];
  // 添加active類並移除inactive類
  clickedButton.classList.add("active");
  clickedButton.classList.remove("inactive-left", "inactive-right");

  // 其他按鈕添加inactive類
  let buttons = document.querySelectorAll(".stonePaperCut button");
  buttons.forEach((button, index) => {
      if (index !== objectNowHereHZ) {
          if (index < objectNowHereHZ) {
              button.classList.add("inactive-right");
          } else {
              button.classList.add("inactive-left");
          }
          button.classList.remove("active");
      }
  });

  let objectNowHere = objectNowHereWithIconsKeys[objectNowHereHZ];
  let objectNowHereZNumber = Math.floor(Math.random() * 3);
  let objectNowHereZ = objectNowHereWithIconsKeys[objectNowHereZNumber];

  document.getElementsByClassName("stonePaperCut")[0].style.pointerEvents = "none";

  document.getElementById("aHere").classList.add("playNowAnimationAZ");
  document.getElementById("bHere").classList.add("playNowAnimationBZ");

  setTimeout(function () {
      document.getElementById("bHere").classList.remove("playNowAnimationBZ");
      document.getElementById("bHere").style.backgroundImage = `url(${objectNowHereWithIcons[objectNowHere]})`;
      document.getElementById("bHere").style.backgroundSize = "cover";
      document.getElementById("bHere").style.backgroundRepeat = "no-repeat";
      document.getElementById("bHere").style.backgroundPosition = "center";

      document.getElementById("aHere").classList.remove("playNowAnimationAZ");
      document.getElementById("aHere").style.backgroundImage = `url(${objectNowHereWithIcons[objectNowHereZ]})`;
      document.getElementById("aHere").style.backgroundSize = "cover";
      document.getElementById("aHere").style.backgroundRepeat = "no-repeat";
      document.getElementById("aHere").style.backgroundPosition = "center";
      document.getElementById("aHere").style.filter = 'brightness(1) grayscale(0)';
  }, 1500);

  let classToAdd = "";
  if (objectNowHereZ == objectNowHere) {
      classToAdd = "egalHere";
  } else if (
      (objectNowHereHZ == objectNowHereZNumber - 1 && objectNowHereZNumber != 0) ||
      (objectNowHereHZ == 2 && objectNowHereZNumber == 0)
  ) {
      classToAdd = "noHere";
      setTimeout(() => {
        showNotification("哈哈哈，這次是我贏了，再來砌磋砌磋！", "incorrect");
      }, 1000);
  } else {
      classToAdd = "yesHere"; 
      setTimeout(() => {
          console.log('YES，我贏了！');
          showNotification("阿～我被你擊敗了，那我就成為你的夥伴吧!", "correct");
          $('#dialogue').css('z-index', 9);
          $('#dialogue').css('opacity', 1);
          $('.PaperRockScissorsCanvas').css('z-index', 0);
      }, 2950);
  }
  setTimeout(function () {
    document.querySelector('.PaperRockScissorsCanvas').classList.add(classToAdd);

    console.log(classToAdd);
    
    if (action) {
        action.stop();  // 停止目前的動畫
    }

    if (classToAdd == 'noHere') {
        action = Currentmodel.mixer.clipAction(Currentdata[3].animations[0]);
    } else if (classToAdd == 'yesHere') {
        action = Currentmodel.mixer.clipAction(Currentdata[2].animations[0]);
        showMovingImage(foundARIndex + 1);
        showBeastIcon(foundARIndex + 1, showMovingCard);

    } else if (classToAdd == 'egalHere') {
        action = Currentmodel.mixer.clipAction(Currentdata[0].animations[0]);
    }

    if (action) {
        action.reset(); // 重置動畫狀態
        action.play();  // 播放新動畫
    }
}, 1950);


  setTimeout(function () {
      document.querySelector('.PaperRockScissorsCanvas').classList.remove(classToAdd);
      document.getElementsByClassName("stonePaperCut")[0].style.pointerEvents = "auto";
      document.getElementById("aHere").style.backgroundImage = `url('UI/fit.png')`;
      document.getElementById("aHere").style.filter = 'brightness(0.5) grayscale(1)';
      document.getElementById("bHere").style.backgroundImage = `url('UI/fit.png')`;

      // 恢復按鈕原狀
      buttons.forEach((button) => {
          button.classList.remove("active");
          button.classList.remove("inactive-left");
          button.classList.remove("inactive-right");
      });
  }, timeToRemove);
}

  
//   onresizeNow();
  
//   =================================================================================================================

// MAIN PART FOR THE VIDEO AND PLAY BUTTON

const videoContainer = document.getElementById("video-container");
const playButton = document.getElementById("play-button");

videoContainer.addEventListener("mousemove", function (event) {
    const containerRect = videoContainer.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const buttonWidth = playButton.offsetWidth;
    const buttonHeight = playButton.offsetHeight;
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
});

videoContainer.addEventListener("mouseleave", function () {
    setTimeout(function () {
        playButton.style.left = "50%";
        playButton.style.top = "50%";
        playButton.style.transform = "translate(-50%, -50%) scale(1)";
        playButton.style.transition = "all 0.3s ease-out";
    }, 50);
});

videoContainer.addEventListener("mouseover", function () {
    playButton.style.transition = "transform ease-out 0.3s";
    playButton.style.transform = "scale(1.2)";
});

const video = document.getElementById("gamevideo");

videoContainer.addEventListener("mouseenter", function () {
    if (!video.paused) {
        playButton.style.opacity = "1";
    }
});

videoContainer.addEventListener("mouseleave", function () {
    if (!video.paused) {
        playButton.style.opacity = "0";
        playButton.style.transition = "opacity ease 1s";
    }
});

videoContainer.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        playButton.innerHTML =
            '<span class="pause-icon"><i class="fa fa-solid fa-pause"></i></span>';
    } else {
        video.pause();
        playButton.innerHTML =
            '<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>';
    }
});

video.addEventListener("ended", function () {
    playButton.innerHTML =
        '<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>';
    playButton.style.opacity = "1";

    // 顯示一個提示訊息
    console.log("影片播放結束");
    $('#dialogue').css('z-index', 9);
    $('#dialogue').css('opacity', 1);
    $('.VideoCanvas').css('z-index', 0);
});

// END OF MAIN PART FOR THE VIDEO AND PLAY BUTTON

// Optional - Code for inputting video
const videoSource = document.getElementById("video-source");
const videoUrl = document.getElementById("video-url");
const loadButton = document.getElementById("load-button");
console.log(loadButton)

function loadVideo() {
    // console.log('play')
    // const url = 'Video/testvideo.mp4';
    // if (!url) return;
    // videoSource.setAttribute("src", url);
    // video.load();
    // video.play();
    // playButton.innerHTML =
    //     '<span class="pause-icon"><i class="fa fa-solid fa-pause"></i></span>';
    // playButton.style.opacity = "0";
    // playButton.style.transition = "opacity ease 1s";

    console.log('投擲')
    $('.VideoCanvas').css('z-index', 0);
    console.log(FBX_Throw_me)
    if(foundARIndex + 1 == 1){
      if(FBX_Throw_me)FBX_Throw_me.switchAnimation(2,0);
    }else{
      if(FBX_Throw_me)FBX_Throw_me.switchAnimation(0,1);
    }


    setTimeout(() => {
      console.log("動畫播放結束");
      switch (foundARIndex + 1) {
        case 1:
          showNotification("匯聚神秘能量～讓你我一起窺探冒險之旅！", "correct");
            break;
        case 4:
          showNotification("這就是我最喜歡的！謝謝你～我願意成為你的夥伴！", "correct");
            break;
        case 8:
          showNotification("Money!Money!Money!～好吧！本大爺就跟你一起守護這些財富吧！", "correct");
            break;
      }
      $('#dialogue').css('z-index', 9);
      $('#dialogue').css('opacity', 1);
      

      //展示圖片並移動
      showMovingImage(foundARIndex + 1);
      showBeastIcon(foundARIndex + 1, showMovingCard);
    }, 3000);

    // if (action) {
    //   action.stop();  // 停止目前的動畫
    // }
  
    // if (true) {
    //   // e.target.classList.add("correct");
    //   console.log('答對了');
    //   action = Currentmodel.mixer.clipAction(Currentdata[2].animations[0]);
    //   // showNotification("答對了，我願意成為你的夥伴!", "correct");

    //   // 展示圖片並移動
    //   // showMovingImage(foundARIndex + 1);
    //   // showBeastIcon(foundARIndex + 1);
    // } 
  
    // if (action) {
    //   action.reset(); // 重置動畫狀態
    //   action.play();  // 播放新動畫
    // }
}

// loadButton.addEventListener("click", loadVideo);
// 在頁面載入後或在第一次互動時定義音效物件
const audiomusic = new Audio();
audiomusic.autoplay = true;

// 播放一個靜音的短音效，觸發瀏覽器允許音樂播放的權限
audiomusic.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

loadButton.addEventListener("click", PlayMusic);

function PlayMusic() {
    $('.VideoCanvas').css('z-index', 0);

    console.log(foundARIndex + 1);
    // 構建音樂檔案的路徑
    const CollecReturnimg = document.querySelector('.CollecReturnimg');
    const musicFilePath = `model/${foundARIndex + 1}/music.mp3`;

    // 在需要播放音樂時設定音樂的 src
    audiomusic.src = musicFilePath;

    // 檢查音樂檔案是否存在
    audiomusic.addEventListener('canplaythrough', function() {
        console.log('音樂已準備好播放');                                               
        CollecReturnimg.style.display = 'block';       
        MenuButton.style.display = 'none';

        // 播放音樂
        audiomusic.play().catch(error => console.error('音樂播放失敗:', error));
    }, false);

    // 錯誤處理，檢查檔案是否存在或其他錯誤
    audiomusic.addEventListener('error', function() {
        console.error('無法加載音樂:', musicFilePath);
    }, false);

    // 播放完成後處理
    audiomusic.addEventListener('ended', function() {
        console.log('播放完成');
        CollecReturnimg.style.display = 'none';       
        MenuButton.style.display = 'block';
        $('.VideoCanvas').css('z-index', 0);
        model.close();
        scanner.start();
        // 在這裡添加你想要在音樂播放完後執行的後續處理邏輯
    });
}


// ==================================================================================================================

document.addEventListener('DOMContentLoaded', (event) => {
  const collectButton = document.querySelector('.CollectButton');
  const CardButton = document.querySelector('.CardButton');
  const collectBG = document.querySelector('.CollectBG');
  const Collecimg = document.querySelector('.Collecimg');
  const CollectLoadMesh = document.querySelector('.CollectLoadMesh');
  const CollecReturnimg = document.querySelector('.CollecReturnimg');
  const TakePhoto = document.querySelector('.TakePhoto');
  const photocontainer = document.querySelector('.photocontainer');
  const Sharecontainer = document.querySelector('.Share-container');
  const FBShareButton = document.querySelector('.FBShareButton');
  const IGShareButton = document.querySelector('.IGShareButton');
  const TKagainButton = document.querySelector('.TKagainButton');
  const BeastName = document.querySelector('.BeastName');  
  const MapButton = document.querySelector('.MapButton');  
  const title = document.querySelector('.title');  
  const OfficialWebButton = document.querySelector('.OfficialWebButton');  
  const headBG_container = document.querySelector('.headBG_container');
  const CardBG = document.querySelector('.CardBG');
  const range = document.querySelector('.range');
  const gridcontainer = document.querySelector('.grid-container');
  // const Finalbutton = document.querySelector('.Final-button');


  // let FirstTimeClick_MapButton = false;
  // let FirstTimeClick_CollectButton = false;
  // let FirstTimeClick_gridcontainer = false;
  // let FirstTimeClick_CardButton = false;
  // let FirstTimeClick_range = false;

  
  
  
  

  let Currentmythicalbeast;

//   CardButton.addEventListener('click', () => {
//     console.log('打開卡牌組')
//     if (CardBG.style.display === 'block') {
//         CardBG.style.display = 'none';
//         collectButton.style.visibility = 'visible'; // 使用 visibility 來隱藏
//         BeastName.textContent = '神獸收藏夾'
//         TakePhoto.style.visibility = 'visible';
//     } else {
//         CardBG.style.display = 'block';
//         collectButton.style.visibility = 'hidden'; // 使用 visibility 來隱藏
//         BeastName.textContent = '神獸祈福卡'
//         TakePhoto.style.visibility = 'hidden';
//     }
// });


CollecReturnimg.addEventListener('click', () => {

  console.log('點擊返回鍵')
  if(true){

    $('.VideoCanvas').css('z-index', 0);
    $('.QuizCanvas').css('z-index', 0);
    resetOptions();
    showQuestion();

    const notificationContainer = document.querySelector('.notification-container');
    notificationContainer.classList.remove('show');
    
    if(!IsTakePhoto){
      model.close();
      scanner.start();
      TakePhoto.style.display = 'none';
      CollecReturnimg.style.display = 'none';
      MenuButton.style.display = 'block';
      
    }

    if(IsTakePhoto){
      IsTakePhoto = false
      TakePhoto.style.display = 'block';
      CollecReturnimg.style.display = 'block';
      MenuButton.style.display = 'none';
    }

    // BeastName.style.display = 'none';
    // BeastName.textContent = '';
    // model.close();
    CollectARMode = false;
    // TakePhoto.style.display = 'block';
    //返回掃描模式
    // scanner.start();
    // $('#dialogue').css('z-index', 9);
    // $('#dialogue').css('opacity', 1);
    $('.panel').addClass('find')
    $('.character').removeClass('show')
    dialogue.RemoveCollectARMode();
    dialogue.mainPanel.addClass('show');
    // $('#scanner')[0].addClass('show');
    // CollecReturnimg.style.display = 'block';

    // collectButton.style.display = 'block';
    // CardButton.style.display = 'none';
    // MapButton.style.display = 'block';
    document.querySelector('.photocontainer').style.opacity = 0;
    Sharecontainer.style.display = 'none';


    if(IndexDBArray_Beastnumber.length >= 9){
      $('.headBG_container').css('opacity', 1);
      $('.Final-button').css('visibility', 'visible');
      setTimeout(() => {
        dialogue.character.addClass('show');
      }, 10);
      // dialogueindex = 2
  }

  }
});

OfficialWebButton.addEventListener('click', () => {

  if(OfficialWebButton.style.backgroundColor == 'transparent'){
    return
  }

  switch (Currentmythicalbeast) {
    case 1:
      window.open(' https://www.px-sunmake.org.tw/navigate/neighborhood.html?id=1', '_blank');
        // Do something specific for Item 1
        break;
    case 2:
      window.open('https://www.px-sunmake.org.tw/navigate/neighborhood.html?id=2', '_blank');
        // Do something specific for Item 2
        break;
    case 3:
      window.open('https://www.px-sunmake.org.tw/index/', '_blank');
        CollectLoadMesh.style.display = 'flex';
        // Do something specific for Item 3
        break;
    case 4:
      window.open('https://www.px-sunmake.org.tw/navigate/navigate.html?id=1', '_blank');
        // Do something specific for Item 4
        break;
    case 5:
      window.open('https://www.px-sunmake.org.tw/navigate/venueart.html?id=2', '_blank');
        // Do something specific for Item 5
        break;
    case 6:
      window.open('https://www.px-sunmake.org.tw/navigate/neighborhood.html?id=3', '_blank');
        // Do something specific for Item 6
        break;
    case 7:
      window.open('https://www.px-sunmake.org.tw/navigate/navigate.html?id=3', '_blank');
        // Do something specific for Item 7
        break;
    case 8:
      window.open('https://www.px-sunmake.org.tw/index/', '_blank');
        // Do something specific for Item 8
        break;
    case 9:
      window.open('https://www.px-sunmake.org.tw/navigate/navigate.html?id=2', '_blank');
        // Do something specific for Item 9
        break;
    default:
        console.log('Unknown item');
        // Handle default case
        break;
}

});


// const MapButton = document.getElementById('MapButton');
const mapDiv = document.getElementById('map');
const mapImage = document.getElementById('mapImage');
let isDragging = false;
let startX, startY, initialLeft, initialTop;
let initialScale = 1;
let currentScale = 1;
let startDistance = 0;
const minScale = 1; // 最小縮放比例

// MapButton.addEventListener('click', () => {
//     console.log('呼叫地圖');
//     if (mapDiv.style.display === 'block') {
//       MapButton.style.filter = 'brightness(100)';
//         mapDiv.style.display = 'none';
//         collectButton.style.display = 'block';

//     } else {
//         mapDiv.style.display = 'block';
//         MapButton.style.filter = 'brightness(0)';
//         collectButton.style.display = 'none';
//     }
// });

mapImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = mapImage.offsetLeft;
    initialTop = mapImage.offsetTop;
    mapImage.style.cursor = 'grabbing';
});

mapImage.addEventListener('mouseleave', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

mapImage.addEventListener('mouseup', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

mapImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;

    // 限制左右移動範圍
    const maxLeft = 0;
    const minLeft = mapDiv.clientWidth - mapImage.clientWidth * currentScale;
    if (newLeft > maxLeft) newLeft = maxLeft;
    if (newLeft < minLeft) newLeft = minLeft;

    // 限制上下移動範圍
    const maxTop = 0;
    const minTop = mapDiv.clientHeight - mapImage.clientHeight * currentScale;
    if (newTop > maxTop) newTop = maxTop;
    if (newTop < minTop) newTop = minTop;

    mapImage.style.left = `${newLeft}px`;
    mapImage.style.top = `${newTop}px`;
});

function getDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

mapImage.addEventListener('touchstart', (e) => {
    e.preventDefault(); // 阻止默认行为，防止网页缩放
    if (e.touches.length === 2) {

    } else if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        initialLeft = mapImage.offsetLeft;
        initialTop = mapImage.offsetTop;
    }
});

mapImage.addEventListener('touchmove', (e) => {
    e.preventDefault(); // 阻止默认行为，防止网页缩放
    if (e.touches.length === 2) {

    } else if (isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // 限制左右移動範圍
        const maxLeft = 0;
        const minLeft = mapDiv.clientWidth - mapImage.clientWidth * currentScale;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newLeft < minLeft) newLeft = minLeft;

        // 限制上下移動範圍
        const maxTop = 0;
        const minTop = mapDiv.clientHeight - mapImage.clientHeight * currentScale;
        if (newTop > maxTop) newTop = maxTop;
        if (newTop < minTop) newTop = minTop;

        mapImage.style.left = `${newLeft}px`;
        mapImage.style.top = `${newTop}px`;
    }
});

mapImage.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
        isDragging = false;
    }
});


TKagainButton.addEventListener('click', () => {

    console.log('重新拍照一次');

    IsTakePhoto = false;

    document.querySelector('.photocontainer').style.opacity = 0;
    Sharecontainer.style.display = 'none'
    
    TakePhoto.style.display = 'block';
    
  });

//   collectButton.addEventListener('click', () => {
//     if (collectBG.style.display === 'none' || collectBG.style.display === '') {
//         collectBG.style.display = 'flex';
//         TakePhoto.style.display = 'none';
//         BeastName.style.display = 'block';
//         MapButton.style.display = 'none';
//         CardButton.style.display = 'block';
//     } else {
//         collectBG.style.display = 'none';
//         TakePhoto.style.display = 'none';
//         BeastName.style.display = 'none';
//         MapButton.style.display = 'block';
//         CardButton.style.display = 'none';
//     }
//     // showBeastIcon("")
// });  

CollectLoadMesh.addEventListener('click', () => {
    CollectARMode = true;
    if (typeof me !== 'undefined' && me) {
        me.stop();
        console.log('test123456')
    }
    if (Currentmythicalbeast >= '1' && Currentmythicalbeast <= '9') {
    
        BeastName.style.display = 'none';
        collectBG.style.display = 'none';
        CardButton.style.display = 'none';
        $('.Final-button').css('visibility', 'hidden');
  
        $('.QuizCanvas').css('z-index', 0);
        $('.PaperRockScissorsCanvas').css('z-index', 0);
        $('.VideoCanvas').css('z-index', 0);
        // loadButton.style.display = 'none';
        if(headBG_container.style.opacity = '1'){
          headBG_container.style.opacity = '0'
        }

        setTimeout(() => {
          console.log(`開啟神獸 ${Currentmythicalbeast}`);
          dialogue.mainPanel.removeClass('show');
          model.open(Currentmythicalbeast);
          TakePhoto.style.display = 'block';
          CollecReturnimg.style.display = 'block';
          collectButton.style.display = 'none';
        }, 100);

        
    } else {
        console.log('Unknown item');
        // Handle default case
    }
});

let capturedImageUrl = '';
let IsTakePhoto = false;

TakePhoto.addEventListener('click', () => {
  console.log('拍照！');

  IsTakePhoto = true;

  CollecReturnimg.style.display = 'none';
  TakePhoto.style.display = 'none';
  MenuButton.style.display = 'none';
  // MapButton.style.display = 'none';
  // BeastName.style.display = 'none';
  // title.style.display = 'none';
  // CardButton.style.display = 'none'
  // console.log('BeastName:', BeastName.style.display); // 日誌輸出
  

  html2canvas(document.body).then(canvas => {
    // 将 Canvas 转换为图片 URL
    capturedImageUrl = canvas.toDataURL('image/png');

    // 清理之前的图片 URL
    const photo = document.querySelector('.photo');
    if (photo.style.backgroundImage) {
      // 将之前的图片 URL 设置为空，这样浏览器可以释放内存
      photo.style.backgroundImage = '';
    }

    // 更新 .photo 的 background-image
    photo.style.backgroundImage = `url(${capturedImageUrl})`;

    // 使 photocontainer 可见
    document.querySelector('.photocontainer').style.opacity = 1;

    function resetAnimation(element, animationName) {
      element.style.webkitAnimation = 'none';
      element.style.animation = 'none';
      element.offsetHeight; // 触发回流 (reflow)
      element.style.webkitAnimation = animationName;
      element.style.animation = animationName;
    }

    document.querySelectorAll('.flap').forEach(function (flap) {
      resetAnimation(flap, 'click 0.9s cubic-bezier(0.5, 0, 0.5, 1) 0.1s');
    });

    resetAnimation(photo, 'photo 5s cubic-bezier(0.5, 0, 0.5, 1) 0.9s both');
    photo.style.animationPlayState = 'running';

    // 设置一个定时器在动画达到61%时暂停动画
    setTimeout(function () {
      photo.style.animationPlayState = 'paused';

      setTimeout(() => {

      // 生成唯一的檔案名稱
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.getFullYear().toString() +
      (currentDateTime.getMonth() + 1).toString().padStart(2, '0') +
      currentDateTime.getDate().toString().padStart(2, '0') + '_' +
      currentDateTime.getHours().toString().padStart(2, '0') +
      currentDateTime.getMinutes().toString().padStart(2, '0') +
      currentDateTime.getSeconds().toString().padStart(2, '0') +
      currentDateTime.getMilliseconds().toString().padStart(3, '0');
      
    // 保存图片到本地文件系统
    saveImageToLocal(capturedImageUrl, `${formattedDateTime}.png`);
      }, 50);
      
    }, 3050); // 5秒的61%是3050毫秒

    CollecReturnimg.style.display = 'block';
    TakePhoto.style.display = 'block';
    // MenuButton.style.display = 'block';
    // MapButton.style.display = 'block';
    // BeastName.style.display = 'block';
    // title.style.display = 'block';
    TakePhoto.style.display = 'none';
    Sharecontainer.style.display = 'flex';
    // CardButton.style.display = 'block';

  }).catch(err => {
    console.error('拍照失败！', err);
  });
});

const saveImageToLocal = (imageUrl, fileName) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);

  // 等待用户点击
  link.click();

  // 确保下载链接只创建一次
  link.remove();
};

const shareImageAsset = async (title, blobImageAsset) => {
  const filesArray = [
    new File([blobImageAsset], `${title}.png`, {
      type: 'image/png',
      lastModified: new Date().getTime(),
    }),
  ];  
  const shareData = {
    title: `${title}`,
    files: filesArray,
  };

  if (navigator.canShare && navigator.canShare(shareData)) {
    await navigator.share(shareData);
    return true;
  } else {
    console.log('Sharing not supported', shareData);
    return false;
  }
};

const captureAndShare = async (title) => {
  if (capturedImageUrl) {
    const response = await fetch(capturedImageUrl);
    const blob = await response.blob();
    const result = await shareImageAsset(title, blob);
    if (result) {
      console.log(`Shared successfully to ${title}`);
    } else {
      console.log(`Failed to share to ${title}`);
    }
  } else {
    console.log('No captured image to share.');
  }
};

FBShareButton.addEventListener('click', () => captureAndShare('Facebook'));
IGShareButton.addEventListener('click', () => captureAndShare('Instagram'));



  const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {        
              
              // 檢查是否有 dimmed 類別
              if (item.classList.contains('dimmed')) {
                  console.log('This item is dimmed and cannot be clicked.');
                  CollectLoadMesh.style.display = 'none';
                  OfficialWebButton.style.display = 'flex'
                  Collecimg.style.backgroundImage = 'url("character1.png")';
                  BeastName.textContent = '神獸收藏夾';
                  OfficialWebButton.textContent = '你還沒有收集到此神獸'
                  OfficialWebButton.style.backgroundColor = 'transparent';
                  // OfficialWebButton.style.display = 'none'
                      // 添加 shake 類以觸發動畫
    
                  OfficialWebButton.classList.add('shake');
                  // 在動畫結束後移除 shake 類
                  OfficialWebButton.addEventListener('animationend', function() {
                    OfficialWebButton.classList.remove('shake');
                  }, { once: true });

                  switch (index + 1) {
                    case 1:
                        Collecimg.style.backgroundImage = 'url("UI/Dragon_Black.png")';
                        BeastName.textContent = '龍太子';
                        // Do something specific for Item 1
                        break;
                    case 2:
                        Collecimg.style.backgroundImage = 'url("UI/Triger_Black.png")';
                        BeastName.textContent = '虎爺將軍';
                        break;
                    case 3:
                        Collecimg.style.backgroundImage = 'url("UI/Phoenix_Black.png")';
                        BeastName.textContent = '鳳凰姐姐';
                        // Do something specific for Item 3
                        break;
                    case 4:
                        Collecimg.style.backgroundImage = 'url("UI/Turtle_Black.png")';
                        BeastName.textContent = '柑仔龜';
                        // Do something specific for Item 4
                        break;
                    case 5:

                        Collecimg.style.backgroundImage = 'url("UI/Kirin_Black.png")';
                        BeastName.textContent = '吉利 (麒麟)';
                        // Do something specific for Item 5
                        break;
                    case 6:
                        Collecimg.style.backgroundImage = 'url("UI/whale_Black.png")';
                        BeastName.textContent = '鰲魚奶奶';
                        // Do something specific for Item 6
                        break;
                    case 7:
                        Collecimg.style.backgroundImage = 'url("UI/Bat_Black.png")';
                        BeastName.textContent = '金有蝠爺爺';
                        // Do something specific for Item 7
                        break;
                    case 8:
                        Collecimg.style.backgroundImage = 'url("UI/Crab_Black.png")';
                        BeastName.textContent = '甲子大爺(螃蟹)';
                        // Do something specific for Item 8
                        break;
                    case 9:
                        Collecimg.style.backgroundImage = 'url("UI/Bird_Black.png")';
                        BeastName.textContent = '仙鶴一品文官';
                        // Do something specific for Item 9
                        break;
                    default:
                        console.log('Unknown item');
                        // Handle default case
                        break;
                }

                  return; // 阻止後續操作
              }

              OfficialWebButton.style.backgroundColor = 'rgb(255, 123, 35)';
              console.log(item)
                const itemText = item.textContent.trim();
                Currentmythicalbeast = index + 1;
                OfficialWebButton.style.display = 'flex'
                switch (index + 1) {
                    case 1:
                        console.log('You clicked on Item 1');
                        Collecimg.style.backgroundImage = 'url("UI/Dragon.png")';
                        BeastName.textContent = '龍太子';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = ''
                        OfficialWebButton.textContent = '了解更多龍太子'
                        // Do something specific for Item 1
                        break;
                    case 2:
                        console.log('You clicked on Item 2');
                        Collecimg.style.backgroundImage = 'url("UI/Triger.png")';
                        BeastName.textContent = '虎爺將軍';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '了解更多虎爺將軍'
                        // Do something specific for Item 2
                        break;
                    case 3:
                        console.log('You clicked on Item 3');
                        Collecimg.style.backgroundImage = 'url("UI/Phoenix.png")';
                        BeastName.textContent = '鳳凰姐姐';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '到宜蘭傳藝園區逛逛'
                        // Do something specific for Item 3
                        break;
                    case 4:
                        console.log('You clicked on Item 4');
                        Collecimg.style.backgroundImage = 'url("UI/Turtle.png")';
                        BeastName.textContent = '柑仔龜';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '了解更多柑仔龜'
                        // Do something specific for Item 4
                        break;
                    case 5:
                        console.log('You clicked on Item 5');
                        Collecimg.style.backgroundImage = 'url("UI/Kirin.png")';
                        BeastName.textContent = '吉利 (麒麟)';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '了解更多吉利 (麒麟)'
                        // Do something specific for Item 5
                        break;
                    case 6:
                        console.log('You clicked on Item 6');
                        Collecimg.style.backgroundImage = 'url("UI/whale.png")';
                        BeastName.textContent = '鰲魚奶奶';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '了解更多鰲魚奶奶'
                        // Do something specific for Item 6
                        break;
                    case 7:
                        console.log('You clicked on Item 7');
                        Collecimg.style.backgroundImage = 'url("UI/Bat.png")';
                        BeastName.textContent = '金有蝠爺爺';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.style.backgroundColor = 'rgb(255, 123, 35)';
                        OfficialWebButton.textContent = '了解更多金有蝠爺爺'
                        // Do something specific for Item 7
                        break;
                    case 8:
                        console.log('You clicked on Item 8');
                        Collecimg.style.backgroundImage = 'url("UI/Crab.png")';
                        BeastName.textContent = '甲子大爺(螃蟹)';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '到宜蘭傳藝園區逛逛';
                        // Do something specific for Item 8
                        break;
                    case 9:
                        console.log('You clicked on Item 9');
                        Collecimg.style.backgroundImage = 'url("UI/Bird.png")';
                        BeastName.textContent = '仙鶴一品文官';
                        CollectLoadMesh.style.display = 'flex';
                        OfficialWebButton.textContent = '了解更多仙鶴一品文官'
                        // Do something specific for Item 9
                        break;
                    default:
                        console.log('Unknown item');
                        // Handle default case
                        break;
                }
            });
        });
});
let IndexDBArray_Beastnumber = [];
showBeastIcon("", showMovingCard);

async function showBeastIcon(index, callback) {
  if (index === "") {
    const db = await openDatabase();
    const transaction = db.transaction(['beastStore'], 'readonly');
    const store = transaction.objectStore('beastStore');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const indexes = event.target.result.map(item => item.index);
      IndexDBArray_Beastnumber = indexes;
      CllAPI();
      indexes.forEach(showIconByIndex);
      indexes.forEach(updateGridItems);
      // 不執行回呼函數
    };

    request.onerror = (event) => {
      console.error('Error fetching indexes from database:', event.target.error);
    };
  } else {
    const exists = await checkIndexInDatabase(index);
    if (exists) {
      showIconByIndex(index);
      updateGridItems(index);
      if (callback) callback(); // 執行回呼函數
    } else {
      const icon = document.getElementById(`beastIcon${index}`);
      if (icon) {
        icon.style.display = 'block';
        await saveIndexToDatabase(index);
        showIconByIndex(index);
        updateGridItems(index);
        IndexDBArray_Beastnumber.push(index);
        CllAPI();
        if (callback) callback(); // 執行回呼函數
      }
    }
  }
}

function showIconByIndex(index) {
  const icon = document.getElementById(`beastIcon${index}`);
  if (icon) {
    icon.style.display = 'block';
    console.log('showIconByIndex')
  }
}

async function updateGridItems(index) {
  console.log('test123')
  const indexlocal = index-1;
  console.log('updateGridItems')
  const gridItems = document.querySelectorAll('.grid-item');
  if (indexlocal <= -1 || indexlocal >= gridItems.length) {
    console.error('Invalid index');
    return;
  }

  const item = gridItems[indexlocal];
  const beastIcon = item.querySelector('.beast-icon');
  if (beastIcon && beastIcon.style.display === 'block') {
    console.log('移除數字')
    item.classList.remove('dimmed');
    item.textContent = ''; // 移除數字
    item.appendChild(beastIcon); // 確保 beast-icon 仍然在 item 中
  } else {
    item.classList.add('dimmed');
    if (!item.textContent.trim()) {
      console.log('保留數字')
      item.textContent = beastIcon.id.replace('beastIcon', '');
      item.appendChild(beastIcon); // 確保 beast-icon 仍然在 item 中
    }
  }
}

async function checkIndexInDatabase(index) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['beastStore'], 'readonly');
    const store = transaction.objectStore('beastStore');
    const request = store.get(index);

    request.onsuccess = (event) => {
      resolve(event.target.result !== undefined);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function saveIndexToDatabase(index) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['beastStore'], 'readwrite');
    const store = transaction.objectStore('beastStore');
    const request = store.add({ index });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('beastDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('beastStore')) {
        db.createObjectStore('beastStore', { keyPath: 'index' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

  // 顯示圖片並移動的函數
  function showMovingImage(index) {
    const image = document.createElement('div');
    image.classList.add('movingImage');
    
    // 根據 index 設置相對應的背景圖片
    switch(index) {
      case 1:
        image.style.backgroundImage = 'url("UI/Dragon.png")';
        break;
      case 2:
        image.style.backgroundImage = 'url("UI/Triger.png")';
        break;
      case 3:
        image.style.backgroundImage = 'url("UI/Phoenix.png")';
        break;
      case 4:
        image.style.backgroundImage = 'url("UI/Turtle.png")';
        break;
      case 5:
        image.style.backgroundImage = 'url("UI/Kirin.png")';
        break;
      case 6:
        image.style.backgroundImage = 'url("UI/whale.png")';
        break;
      case 7:
        image.style.backgroundImage = 'url("UI/Bat.png")';
        break;
      case 8:
        image.style.backgroundImage = 'url("UI/Crab.png")';
        break;
      case 9:
        image.style.backgroundImage = 'url("UI/Bird.png")';
        break;
      default:
        image.style.backgroundImage = 'url("UI/Dragon.png")';
    }
  
    document.body.appendChild(image);
  
    setTimeout(() => {
      document.body.removeChild(image);
      document.querySelector('.CollectButton').classList.add('enlarge');
  
      setTimeout(() => {
        document.querySelector('.CollectButton').classList.remove('enlarge');
      }, 500);
    }, 2000);
  }

  async function showMovingCard() {
    const db = await openDatabaseMysteryCardStore();
    const transaction = db.transaction(['mysteryCardStore'], 'readwrite');
    const store = transaction.objectStore('mysteryCardStore');
  
    const request = store.getAll();
    request.onsuccess = (event) => {
      const existingCards = event.target.result.map(item => item.index);
      console.log('現有的卡牌:', existingCards);
  
      if (existingCards.length >= 2) {
        console.log('已經有兩張卡牌，不能再觸發新卡牌');
        return;
      }
  
      let availableNumbers = Array.from({ length: 9 }, (_, i) => i + 1).filter(num => !existingCards.includes(num));
      if (availableNumbers.length === 0) {
        console.log('沒有可用的卡牌編號');
        return;
      }

      console.log('目前IndexDBArray_Beastnumber.length數量', IndexDBArray_Beastnumber.length);
      let beastCount = IndexDBArray_Beastnumber.length;

      let randomindex;
      if (IndexDBArray_Beastnumber.length == 6 || IndexDBArray_Beastnumber.length == 9) {
        randomindex = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        store.add({ index: randomindex });

      }

  
      setTimeout(() => {
        if (IndexDBArray_Beastnumber.length == 6 || IndexDBArray_Beastnumber.length == 9) {
          const Cardindex = beastCount == 6 ? 1 : 2;
          console.log('成功觸發卡牌');
          
          setTimeout(() => {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
        
            const message = document.createElement('div');
            message.classList.add('message');
            message.innerHTML = `恭喜！<br>你已經收集到${beastCount}個集章了<br>獲得第 ${Cardindex} 張卡牌！`;
        
            const image = document.createElement('div');
            image.classList.add('movingCard');
        
            switch(randomindex) {
              case 1:
                image.style.backgroundImage = 'url("UI/Dragon_Card.png")';
                break;
              case 2:
                image.style.backgroundImage = 'url("UI/Triger_Card.png")';
                break;
              case 3:
                image.style.backgroundImage = 'url("UI/Phoenix_Card.png")';
                break;
              case 4:
                image.style.backgroundImage = 'url("UI/Turtle_Card.png")';
                break;
              case 5:
                image.style.backgroundImage = 'url("UI/Kirin_Card.png")';
                break;
              case 6:
                image.style.backgroundImage = 'url("UI/whale_Card.png")';
                break;
              case 7:
                image.style.backgroundImage = 'url("UI/Bat_Card.png")';
                break;
              case 8:
                image.style.backgroundImage = 'url("UI/Crab_Card.png")';
                break;
              case 9:
                image.style.backgroundImage = 'url("UI/Bird_Card.png")';
                break;
              default:
                image.style.backgroundImage = 'url("UI/Dragon_Card.png")';
            }
        
            overlay.appendChild(message);
            overlay.appendChild(image);
            document.body.appendChild(overlay);
        
            image.addEventListener('click', () => {
              image.classList.add('moveToTopRight');
        
              setTimeout(() => {
                document.querySelector('.CollectButton').classList.add('enlarge');
        
                setTimeout(() => {
                  document.querySelector('.CollectButton').classList.remove('enlarge');
                }, 500);
              }, 1500);
        
              image.addEventListener('animationend', () => {
                document.body.removeChild(overlay);
              }, { once: true });
            });
          }, 3000);
        }
      }, 100);      
    };
  
    request.onerror = (event) => {
      console.error('Error fetching indexes from database:', event.target.error);
    };
    
    try {
      mysteryCardNumbers = await getMysteryCardNumbers();
      console.log('Mystery card numbers:', mysteryCardNumbers);
      DisplayMysteryCar();
    }catch (error) {
      console.error('Failed to initialize mysteryCardStore:', error);
    }
  }


  document.addEventListener('DOMContentLoaded', () => {
    // showMovingCard();
  });
  
  


// document.querySelector('.container').addEventListener('click', () => {
//   document.querySelector('.container').classList.add('focus');
//   setTimeout(() => {
//     document.querySelector('.container').classList.remove('focus');
//   }, 6000); // Adjust timing based on the animation duration
// });

function openDatabaseMysteryCardStore() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mysteryCardDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('mysteryCardStore')) {
        db.createObjectStore('mysteryCardStore', { keyPath: 'index' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function getMysteryCardNumbers() {
  const db = await openDatabaseMysteryCardStore();
  const transaction = db.transaction(['mysteryCardStore'], 'readonly');
  const store = transaction.objectStore('mysteryCardStore');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = (event) => {
      const existingCards = event.target.result.map(item => item.index);
      resolve(existingCards);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

let mysteryCardNumbers;

// 在遊戲初始化時調用
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await openDatabaseMysteryCardStore();
    mysteryCardNumbers = await getMysteryCardNumbers();
    console.log('Mystery card numbers:', mysteryCardNumbers);
    DisplayMysteryCar();
  } catch (error) {
    console.error('Failed to initialize mysteryCardStore:', error);
  }
});

function DisplayMysteryCar() {
  const leftCard = document.querySelector('.left-card');
  const rightCard = document.querySelector('.right-card');
  
  if (mysteryCardNumbers.length > 0) {
    switch (mysteryCardNumbers[0]) {
      case 1:
        leftCard.style.backgroundImage = 'url("UI/Dragon_Card.png")';
        break;
      case 2:
        leftCard.style.backgroundImage = 'url("UI/Triger_Card.png")';
        break;
      case 3:
        leftCard.style.backgroundImage = 'url("UI/Phoenix_Card.png")';
        break;
      case 4:
        leftCard.style.backgroundImage = 'url("UI/Turtle_Card.png")';
        break;
      case 5:
        leftCard.style.backgroundImage = 'url("UI/Kirin_Card.png")';
        break;
      case 6:
        leftCard.style.backgroundImage = 'url("UI/whale_Card.png")';
        break;
      case 7:
        leftCard.style.backgroundImage = 'url("UI/Bat_Card.png")';
        break;
      case 8:
        leftCard.style.backgroundImage = 'url("UI/Crab_Card.png")';
        break;
      case 9:
        leftCard.style.backgroundImage = 'url("UI/Bird_Card.png")';
        break;
      default:
        leftCard.style.backgroundImage = 'url("UI/Crad_Black.png")';
    }
    leftCard.innerHTML = ''; // 清空文字
  }
  
  if (mysteryCardNumbers.length > 1) {
    switch (mysteryCardNumbers[1]) {
      case 1:
        rightCard.style.backgroundImage = 'url("UI/Dragon_Card.png")';
        break;
      case 2:
        rightCard.style.backgroundImage = 'url("UI/Triger_Card.png")';
        break;
      case 3:
        rightCard.style.backgroundImage = 'url("UI/Phoenix_Card.png")';
        break;
      case 4:
        rightCard.style.backgroundImage = 'url("UI/Turtle_Card.png")';
        break;
      case 5:
        rightCard.style.backgroundImage = 'url("UI/Kirin_Card.png")';
        break;
      case 6:
        rightCard.style.backgroundImage = 'url("UI/whale_Card.png")';
        break;
      case 7:
        rightCard.style.backgroundImage = 'url("UI/Bat_Card.png")';
        break;
      case 8:
        rightCard.style.backgroundImage = 'url("UI/Crab_Card.png")';
        break;
      case 9:
        rightCard.style.backgroundImage = 'url("UI/Bird_Card.png")';
        break;
      default:
        rightCard.style.backgroundImage = 'url("UI/Crad_Black.png")';
    }
    rightCard.innerHTML = ''; // 清空文字
  }
}


document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    const style = window.getComputedStyle(card);
    const backgroundImage = style.backgroundImage;
    const url = backgroundImage.slice(5, -2); // Remove "url(" and ")"

    // 检查是否是指定的图片URL
    if (url.includes('UI/Crad_Black.png')) {
      return;
    }

    // 每次点击创建一个新的链接元素
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.target = '_blank';

    // 检测设备类型
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // 安卓设备
      document.body.appendChild(link);
      const event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
      // alert("图片已下载。请查看你的相册。");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS 设备
      document.body.appendChild(link);
      const event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
      // alert("图片已下载到文件。请手动保存到相册。");
    } else {
      // 其他设备
      document.body.appendChild(link);
      const event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    }
  });
});




//獲取lineID
// 獲取當前URL

function CllAPI(){

  // if(IndexDBArray_Beastnumber.length >= 1){
  //   console.log('測是')
  //   const urlParams = new URLSearchParams(window.location.search);
  
  //   // 獲取特定的參數
  //   const lineId = urlParams.get('line_id');
  //   console.log('lineId: ',lineId)
  
  //   // const lineId = '123456';
  //   fetch("https://yilan-5g-journey.tw/public/api/stage/6/success", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: `line_id=${lineId}` // 使用URL编码格式传递数据
  //   })
  //   .then(response => response.text())
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));
    
  // }
  
}




let notificationTimeout;

function showNotification(message, type) {
  const notification = document.getElementById('notification');
  const notificationContainer = document.querySelector('.notification-container');
  const notificationImg = document.querySelector('.notification-img');
  notification.innerText = message;

  if (type === 'correct') {
    notificationImg.style.backgroundImage = 'url("UI/Correct.png")';
  } else {
    notificationImg.style.backgroundImage = 'url("UI/InCorrect.png")';
  }

  notification.className = `notification ${type}`;
  notificationContainer.classList.add('show');

  // Clear the previous timeout if it exists
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  // Set a new timeout
  notificationTimeout = setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 3000);
}


// showNotification("恭喜答對了！", "correct");

// =====================================================================
//新的鯖魚

document.querySelector('.hideButton').addEventListener('click', function() {
  const alertImg = document.querySelector('.headBG_Alertimg');
  alertImg.style.transition = 'opacity 1s'; // 设置过渡效果
  alertImg.style.opacity = '0'; // 逐渐变为透明
  document.querySelector('.header-container').style.display = 'flex';
  
  console.log('OK')

  // 在 1 秒后隐藏元素
  setTimeout(function() {
      alertImg.style.visibility = 'hidden';
      
  }, 1000);
});

const MenuButton = document.querySelector('.MenuButton');
const MenuBG = document.querySelector('.MenuBG');

MenuButton.addEventListener('click', () => {
  console.log('點擊MenuButton');
  // Toggle visibility
  if (MenuBG.style.visibility === 'visible') {
    MenuBG.style.visibility = 'hidden';
  } else {
    MenuBG.style.visibility = 'visible';
  }
});


// showNotification("恭喜答對了！", "correct");