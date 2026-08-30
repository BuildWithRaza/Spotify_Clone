console.log('My JavaScript File');


var songs;
let tracks;
let currentSong = new Audio();
let play = document.getElementById("play");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let addPlaylist = document.getElementById("addPlaylist")
let repeat = document.getElementById("repeat")
let hamburger = document.querySelector("#hamburger");
let leftSection = document.querySelector(".leftSection")
let playbar = document.querySelector(".playbar");
let navRight = document.querySelector(".navRight");
let navRightButtons = document.querySelector(".navRightButtons");
let playlist = null;
let repeatOne=false;

function formatTime(seconds) {
    seconds = Number(seconds) || 0;

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}

//Function for reading the info.json from the playlists
async function readInfo(folder) {
    let title = folder.replaceAll("%20", " ");
    let description = folder.replaceAll("%20", " ");
    try {
        let a = await fetch(`./Songs/${folder.replaceAll("%20"," ")}/info.json`);

        if (a.ok) {
            let response = await a.json();
            title = response.title || folder;
            description = response.description || "";
        }
    } catch (error) {
        console.log(error);

    }
    return { title, description };
}

async function getSongs(folder) {

    let songUL = document.querySelector(".playlistSongs").getElementsByTagName("ul")[0];
    let playlistName = document.querySelector(".playlistSongs").getElementsByTagName("h4")[0];

    let myfol = folder.replaceAll("%20", " ")

    playlist = localStorage.getItem(myfol)

    if (playlist) {

        if (playlist.length === 0) {
            songUL.innerHTML = "<h4> No Songs Found </h4>"
            return
        }
        songs = JSON.parse(playlist)

        playlistName.innerHTML = (await readInfo(folder)).title;

        displaySongs(songs);
        addListenertoSongs();

        playMusic(songs[0], true);

        return

    }



    let a = await fetch(`./Songs/${folder.replaceAll("%20"," ")}`);
    if (!a.ok) {
        songUL.innerHTML = `<h4>Please Create a folder named "${folder}" in Songs Folder</h4> `
        return
    }
    let response = await a.text();
    console.log(response);
    
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = Array.from(div.getElementsByTagName("a"));
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const e = as[i];
        if (e.href.endsWith(".mp3")) {
            songs.push(e.href.split("/").slice(-2).join("/"));
        }
    }
    if (songs.length > 0) {
        playMusic(songs[0], true);
    }


    //Add Playlist Name

    playlistName.innerHTML = (await readInfo(folder)).title;



    displaySongs(songs)
    addListenertoSongs();




}

//Function to add the songs in the library
function displaySongs(songs) {

    let songUL = document.querySelector(".playlistSongs").getElementsByTagName("ul")[0];

    if (songs.length === 0) {
        songUL.innerHTML = "<h4> No Songs Found </h4>"
        return
    }

    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
     <li>
                        <img class="music" width="25px" src="Images/music.svg" alt="">
                        <div class="info">
                            <div>${song.split("/")[1].replaceAll("%20", " ")}</div>
                            <div style="font-size:12px;">Unknown</div>
                        </div>
                        <div class="playnow">
                            <span>PlayNow</span>
                            <img class="play" width="30px" src="Images/play.svg" alt="">
                        </div>
                    </li>`  ;
    }

}

//Function to add event listener to each song of library 
function addListenertoSongs() {
    tracks = document.querySelector(".playlistSongs").getElementsByTagName("li");
    if (tracks.length > 0) {
        tracks[0].querySelector(".music").src = "Images/playMusic.svg";
        tracks[0].querySelector(".play").src = "Images/pause.svg";
    }
    Array.from(tracks).forEach((e) => {
        e.addEventListener("click", (element) => {

            if (currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ") == e.querySelector(".info").firstElementChild.innerHTML.trim()) {
                if (currentSong.paused) {
                    currentSong.play();
                    play.src = "Images/pause.svg"
                }
            }
            else {

                let song=e.querySelector(".info").firstElementChild.innerHTML;
                let index = songs.findIndex((el) => {
                    let name = el.split("/")[1].replaceAll("%20", " ");
                    return name === song;
                });
                playMusic(songs[index]);
                resetMusicIcons();
                e.querySelector(".music").src = "Images/playMusic.svg";
                e.querySelector(".play").src = "Images/pause.svg";
            }

        }
        );
    }
    );

}

//Function for Play Music
const playMusic = (track, pause = false) => {

    currentSong.src = `./Songs/` + track;
    if (!pause) {

        currentSong.play();
        play.src = "Images/pause.svg"
    }

    document.querySelector(".songName").innerHTML = `<p>${decodeURI(track.split("/")[1].replaceAll("%20", " ").replace(".mp3",""))}</p>`;
    document.querySelector(".songDuration").innerHTML = "<p>00:00/00:00</p>";

    let mysongs = JSON.parse(localStorage.getItem("My Playlist")) || [];
    if (mysongs.includes(track)){
        addPlaylist.src="Images/fav.svg"
    }
    else{
        addPlaylist.src="Images/unfav.svg"
    }

    repeatOne=false;
    repeat.src="Images/repeatAll.svg"

}

//Reset Music Icons 
function resetMusicIcons() {
    Array.from(tracks).forEach((item) => {
        item.querySelector(".music").src = "Images/music.svg";
    });
    Array.from(tracks).forEach((item) => {
        item.querySelector(".play").src = "Images/play.svg";
    });

}

async function displayPlaylist() {

    let a = await fetch(`./Songs`);
    let response = await a.text();
    console.log(response);
    
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let rightTop = document.querySelector(".rightTop");
    let array = Array.from(anchors);



    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("Songs/")) {

            let thefolder = e.href.split("/").slice(-1)[0].split("%5C").slice(-1)[0]
            const info = await readInfo(thefolder)

            rightTop.innerHTML = rightTop.innerHTML + `<div data-folder="${thefolder}" class="card">
                    <img src="./Songs/${thefolder}/cover.jpg" alt="${info.title}"  onerror="this.onerror=null; this.src='./Images/default-cover.jpg';">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                     <div class="cardplay">
                        <img src="Images/playbutton.svg" alt="">
                    </div>
                </div>`
        }

    }

    //Loding the Playlist dynamically
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async mycard => {
            await getSongs(mycard.currentTarget.dataset.folder);
            currentSong.pause();
            play.src = "Images/play.svg"
            document.querySelector(".circle").style.left = 0;

        }
        )
    }
    )



}

// Adding Songs into the playlist

addPlaylist.addEventListener("click", () => {
    addSongstoMyPlaylist(currentSong.src.split("/").splice(-2).join("/"))
}
)


//Function for adding the songs into the playlist
function addSongstoMyPlaylist(song) {


    let mysongs = JSON.parse(localStorage.getItem("My Playlist")) || [];
    if (mysongs.includes(song)) {
        addPlaylist.src="Images/unfav.svg"
        let index = mysongs.indexOf(song)
        mysongs.splice(index, 1)
    }

    else {
        addPlaylist.src="Images/fav.svg"
        mysongs.push(song)
    }
    localStorage.setItem("My Playlist", JSON.stringify(mysongs))
}

//Function for repeat the song

repeat.addEventListener("click",() => {
    repeatition();
}
)

function repeatition(){

    if(repeatOne==true){
        repeatOne=false;
        repeat.src="Images/repeatAll.svg"
    }
    else{
        repeatOne=true;
        repeat.src="Images/repeatOne.svg"
    }
}

async function main() {

    await getSongs("90's Songs");

    displayPlaylist();





    //Attach an event listener to play
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "Images/pause.svg"

        }
        else {
            currentSong.pause();
            play.src = "Images/play.svg"

        }
    }
    )
    //Add Event Listener to previous
    previous.addEventListener("click", () => {



        let index = songs.indexOf(currentSong.src.split("/").splice(-2).join("/"))
        if (index - 1 >= 0) {
            currentSong.pause();
            playMusic(songs[index - 1])
            resetMusicIcons();
            tracks[index - 1].querySelector(".music").src = "Images/playMusic.svg";
            tracks[index - 1].querySelector(".play").src = "Images/pause.svg";
        }

    }
    )

    //Add Event Listener to next
    next.addEventListener("click", () => {

        let index = songs.indexOf(currentSong.src.split("/").splice(-2).join("/"))
        if (index + 1 < songs.length) {
            currentSong.pause();
            playMusic(songs[index + 1])
            resetMusicIcons();
            tracks[index + 1].querySelector(".music").src = "Images/playMusic.svg";
            tracks[index + 1].querySelector(".play").src = "Images/pause.svg";
        }


    }
    )

    //Listen for timeUpdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songDuration").innerHTML = `<p>${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}</p>`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }
    )

    //Adding listener to the seekbar
    let seekbar = document.querySelector(".seekbar");

    seekbar.addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    }

    )

    //Adding listener to the hamburger
    let flag = true;
    hamburger.addEventListener("click", () => {

        if (flag) {
            flag = false;
            hamburger.src = "Images/close.svg";
            navRight.style.opacity = "0.2"
            leftSection.style.transform = "translateX(0)";

        }
        else {
            flag = true;
            hamburger.src = "Images/hamburger.svg";
            navRight.style.opacity = "1"
            leftSection.style.transform = "translateX(-120%)";

        }

    }
    )

    //Adding Listener to show left navbar
    let slideDown = document.querySelector(".slidedown");
    let slideDownImg = document.querySelector(".slidedown img");
    let slideFlag = true
    slideDown.addEventListener("click", () => {
        if (slideFlag) {
            slideFlag = false;
            navRight.classList.add("navRightActive");
            navRightButtons.classList.add("navRightButtonsActive");
            slideDownImg.src = "Images/upicon.svg";

        }
        else {
            slideFlag = true;
            navRight.classList.remove("navRightActive");
            navRightButtons.classList.remove("navRightButtonsActive");
            slideDownImg.src = "Images/downicon.svg";

        }
    }
    )

    //Add  an Event listener to volume
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log('Setting volume to', e.target.value, '/100');

        currentSong.volume = parseInt(e.target.value) / 100;
        if (e.target.value == 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "Images/mute.svg"
        }
        else if (e.target.value > 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "Images/volume.svg"
        }
    }
    )

    //Add listener to mute
    volflag = true;
    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click", (e) => {
        if (volflag && currentSong.volume > 0) {
            currentSong.volume = 0;
            volflag = false
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0;
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "Images/mute.svg"
        }
        else {
            currentSong.volume = .6;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 60;
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "Images/volume.svg"
            volflag = true;
        }
    }
    )

    //PlayNext Song after ending
    currentSong.addEventListener("ended", () => {



        let index = songs.indexOf(currentSong.src.split("/").splice(-2).join("/"))
        if(repeatOne==true){
            currentSong.pause();
            playMusic(songs[index])
            repeatOne=true;
            repeat.src="Images/repeatOne.svg"
        }
        else if (index + 1 < songs.length) {
            currentSong.pause();
            playMusic(songs[index + 1])
            resetMusicIcons();
            tracks[index + 1].querySelector(".music").src = "Images/playMusic.svg";
            tracks[index + 1].querySelector(".play").src = "Images/pause.svg";
        }
        else {
            currentSong.pause();
            playMusic(songs[0])
            resetMusicIcons();
            tracks[0].querySelector(".music").src = "Images/playMusic.svg";
            tracks[0].querySelector(".play").src = "Images/pause.svg";
        }
    });

    //Add event listener to the search button
    let searchBox = document.querySelector(".inputBox input")
    searchBox.addEventListener("input", () => {
        const searchtext = searchBox.value.toLowerCase();
        Array.from(tracks).forEach((song) => {
            const sName = song.innerText.toLowerCase();
            if (sName.includes(searchtext)) {
                song.style.display = "flex";
            }
            else {
                song.style.display = "none";
            }
        });
    }
    );



}
main();
