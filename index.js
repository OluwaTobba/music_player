// carousel
const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
};

setInterval(() => {
    changeCarousel();
}, 3000);

// Currently Playing Full Screen

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if (clickCount >= 2) {
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 3000);
});

// Back Button Navigation
const musicPlayerBackButton = document.querySelector('.music-player-section .back-btn');
musicPlayerBackButton.addEventListener("click", () => {
    musicPlayerSection.classList.remove('active');
});

// Playlist Button
const songsListSection = document.querySelector('.songs-section');
const navBtn = document.querySelector('.music-player-section .nav-btn');
navBtn.addEventListener('click', () => {
    songsListSection.classList.toggle('active');
});

const backToMusicPlayer = document.querySelector('.songs-section .back-btn');
backToMusicPlayer.addEventListener('click', () => {
    songsListSection.classList.remove('active');
});

// Music Player Section

let currentMusic = 0;

const music = document.querySelector('#audio-source');

const progressBar = document.querySelector('.music-progress-bar');
const songName = document.querySelector('.current-song-title');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.music-cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const songsQueue = [...document.querySelectorAll('.songs-queue')];

const repeatBtn = document.querySelector('span.fa-rotate-right');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const forwardBtn = document.querySelector('i.fa-forward');
const volumeBtn = document.querySelector('span.fa-volume-high');
const volumeSlider = document.querySelector('.volume-slider');

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
});
pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});

// Music setup
const setMusic = (i) => {
    progressBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        progressBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 400);
    currentMusicTime.innerHTML = '00 : 00';
    songsQueue.forEach(item => item.classList.remove('active'));
    songsQueue[currentMusic].classList.add('active');
};

setMusic(0);

// Format Duration
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
};

// Progress Bar
setInterval(() => {
    progressBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(progressBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else{
            forwardBtn.click();
        }
    }
}, 700);

progressBar.addEventListener('change', () => {
    music.currentTime = progressBar.value;
});

// Forward, Backward, Repeat and Volume buttons
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0 ){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
});

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
});
volumeSlider.addEventListener('change', () => {
    music.volume = volumeSlider.value;
});

// Songs Queue
songsQueue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    });
});
