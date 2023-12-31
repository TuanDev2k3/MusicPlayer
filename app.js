let currenMusic = 0;
const songs = [
    {
        name: 'Hoa Tuong Tu',
        path: './music/Hoa_Tuong_Tu.mp3',
    },
    {
        name: 'Ngay Mai Em Di Mat',
        path: './music/Ngay_Mai_Em_Đi_Mat.mp3',
    },
    {
        name: 'Ai - Bray',
        path: './music/Ai_Bray.mp3',
    },
    {
        name: 'An Xa - Bray',
        path: './music/An_Xa.mp3',
    },
    {
        name: 'Du Tien - Bray',
        path: './music/Du_Tien.mp3',
    },
    {
        name: 'Ngay Mai Nguoi Ta Lay Chong',
        path: './music/Ngay_Mai_Ng_Ta_Lay_Chong.mp3',
    },
    {
        name: 'BSNL 2 - Bray',
        path: './music/BSNL_2.mp3',
    },
    {
        name: 'BSNL 3 - Bray',
        path: './music/BSNL_3.mp3',
    },
    {
        name: 'That Duc - Bray',
        path: './music/ThatDuc.mp3',
    }
   
]
let musicPlay = document.querySelector('.play-pause .play');
let musicPause = document.querySelector('.play-pause .pause');
let dist = document.querySelector(".music-img img");
let music = document.querySelector('#audio');
let seekBar = document.querySelector('.range-song');
let songName = document.querySelector('.player-music');
let btnBack = document.querySelector('.back');
let btnNext = document.querySelector('.next');
let currenTime = document.querySelector('.time-start');
let timeEnd = document.querySelector('.time-end');


musicPlay.onclick = () =>{
    musicPlay.classList.add('running');
    dist.classList.add('play');
    music.play();
}
musicPause.onclick = () =>{
    musicPlay.classList.remove('running');
    dist.classList.remove('play');
    music.pause();
}
// format time music
function formatTime(time){
    let min = Math.floor(time / 60);
    if (min < 10) 
        min = `0${min}`;
    let sec = Math.floor(time % 60);
    if (sec < 10) 
        sec = `0${sec}`;
    return `${min} : ${sec}`;
}

// Setup music
const setMusic = (i) =>{
    seekBar.value = 0; //range slide to 0
    let song = songs[i];
    music.src = song.path;
    songName.innerHTML = song.name;
    currenMusic = i;
    currenTime.innerHTML = '00:00';
}
setMusic(0);


// Next or Back Music
const PlayMusic = () =>{
    music.play();
    musicPlay.classList.add('running');
    dist.classList.add('play');
}
btnNext.onclick = () =>{
    if (currenMusic < songs.length-1)
        currenMusic += 1;
    else
        currenMusic = 0;
    setMusic(currenMusic);
    PlayMusic();
}
btnBack.onclick = () =>{
    if (currenMusic > 0)
        currenMusic -= 1;
    else
        currenMusic = songs.length-1;
    setMusic(currenMusic);
    PlayMusic();
}
// seek Bar
setInterval(() =>{
    seekBar.value = music.currentTime;
    currenTime.innerHTML = formatTime(music.currentTime);
    seekBar.max = music.duration;
    timeEnd.innerHTML = formatTime(music.duration);
    if (Math.floor(music.currentTime) === Math.floor(music.duration))
        btnNext.click();
}, 100)
seekBar.oninput = () =>{
    music.currentTime = seekBar.value;
}

//DANH SACH NHAC
let listMusic = document.querySelector('.list-music');
const AddMusic = () =>{
    for (var i = 0; i <= songs.length-1;i++){
        let list = document.createElement('div');
        list.classList.add('list');
        var lisContent = `<i class="fas fa-bars"></i>
                        <h4 onclick="playList(${i})">${songs[i].name}</h4>`;
        list.innerHTML = lisContent;
        listMusic.appendChild(list);          
    }
}
AddMusic(); 
const playList = (i) =>{
    setMusic(i);
    listSong.classList.remove('open');
    PlayMusic();
}
let listSong = document.getElementById('list-song');
document.querySelector('.menu-song').onclick = () =>{
    listSong.classList.add('open');
}
document.querySelector('.close').onclick = () =>{
    listSong.classList.remove('open');
}

/* ============ Open file on computer ========= */
document.getElementById('fileInput').onchange = (event) =>{
    var file = event.target.files[0];
    var fileURL = URL.createObjectURL(file);

    music.src = fileURL;
    PlayMusic();
    songName.innerHTML = file.name;
}