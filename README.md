# 🎵 Spotify Clone — Frontend Music Player

A Spotify-inspired frontend music player built with HTML, CSS, and JavaScript.

This project recreates the core Spotify-style experience with a responsive interface, dynamically loaded playlists, local music playback, search, volume controls, seekbar, and previous/next song functionality.

Note: This is a frontend-only project. It does not use a backend, database, authentication, or the Spotify API. Music is loaded and played directly from the project's Songs folder.

## ✨ Features

- 🎵 Local music playback———Add .mp3 files to the Songs folder and play them directly in the browser.
- ▶️ Play and pause songs
- ⏮️ Previous song
- ⏭️ Next song
- 🔄 Automatically play the next song when the current song ends
- 🔊 Volume control
- 🔇 Mute/unmute functionality
- ⏱️ Real-time song duration
- 🎚️ Interactive music seekbar
- 🔍 Search songs dynamically
- 📂 Dynamically load playlists from folders
- 🖼️ Playlist cover images
- 📝 Playlist title and description using info.json
- 📱 Responsive Spotify-inspired UI
- 🍔 Mobile hamburger navigation
- 🎶 Active song indicators
- 📚 Dynamic song library

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- HTML5 Audio API
- Fetch API


## 📁 Project Structure

```
Spotify-Clone/
│
├── Images/
│   ├── play.svg
│   ├── pause.svg
│   ├── next.svg
│   ├── previous.svg
│   ├── volume.svg
│   ├── mute.svg
│   ├── hamburger.svg
│   └── ...
│
├── Songs/
│   ├── MyPlayList/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   ├── cover.jpg
│   │   └── info.json
│   │
│   ├── Playlist2/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   ├── cover.jpg
│   │   └── info.json
│   │
│   └── ...
│
├── CSS/
│   ├──style.css
│   └── utility.css
├── JavaScript/
│   └── script.js
├── .gitattributes
├── index.html
└── README.md
```

## 🎶 How to Add Music

Adding your own music is simple.

Place your .mp3 files inside any playlist folder in the Songs directory.

For example:
```
Songs/
└── MyPlayList/
    ├── song1.mp3
    ├── song2.mp3
    ├── song3.mp3
    ├── cover.jpg
    └── info.json
```

The application automatically detects .mp3 files from the playlist folder and adds them to the music library.

You don't need to manually add every song to the HTML.

You can therefore add new songs by placing them inside the appropriate playlist folder.

## 📂 Creating a New Playlist

Create a new folder inside Songs:
 ```
Songs/
└── MyNewPlaylist/
    ├── song1.mp3
    ├── song2.mp3
    ├── cover.jpg
    └── info.json
```

### 📝 info.json

The playlist information is loaded dynamically from info.json.

Example:
```
{
    "title": "My Favorite Songs",
    "description": "A collection of my favorite tracks."
}
```

The title and description are displayed on the playlist card.

### 🖼️ cover.jpg

Add a cover.jpg file to the playlist folder.

It will be displayed as the playlist's cover image:
```
Songs/MyNewPlaylist/cover.jpg
```
## 🎧 Music Player

The project uses the browser's HTML5 Audio API to play music.

The player supports:

- ▶️ Play / Pause
- ⏮️ Previous song
- ⏭️ Next song
- 🔄 Automatic next track
- 🎚️ Seek through the song
- 🔊 Volume adjustment
- 🔇 Mute / Unmute
- ⏱️ Current time and total duration

When a song finishes, the next song automatically starts playing.

When the last song finishes, the player starts again from the first song.

## 🔍 Search

The search bar filters the currently loaded playlist in real time.

For example, if the playlist contains:

```
Believer.mp3
Perfect.mp3
Shape of You.mp3
Faded.mp3
```

Searching for:
```
fade
```

will display:
```
Faded.mp3
```

while hiding the other songs.

## 📋 Dynamic Playlists

Playlists are not hardcoded into the JavaScript.

Playlists are dynamically loaded from the Songs directory.

The application detects playlist folders and loads:
```
🎵 Playlist title
📝 Playlist description
🖼️ Cover image
🎧 Available MP3 files
```
This means you can add a new playlist simply by creating a new folder inside Songs.

You don't need to manually create a new playlist card in the HTML.

This makes it easy to add new playlists without changing the main playlist UI.

## 🚀 Running the Project

Because the project uses JavaScript's fetch() API to access the Songs directory, it should be run using a local development server.

### Using VS Code Live Server
- Open the project in Visual Studio Code.
- Install the Live Server extension.
- Right-click on index.html.
- Select Open with Live Server.
The project will open in your browser.


 >** ⚠️ Opening index.html directly using file:// may prevent the fetch() requests from working correctly.

## ⚠️ Important
The project expects the following folders to be available from the website root:

/Songs/
/Images/

The JavaScript loads songs using paths such as:
```
fetch(`/Songs/${folder}`)
```
and:
```
currentSong.src = `/Songs/${currFolder}/` + track;
```
Therefore, make sure the project is running through a local web server and that the folder structure is correct. 


## 🎯 Project Scope

This project focuses on recreating the frontend experience of a music streaming application.

Implemented
- ✅ Spotify-inspired UI
- ✅ Local MP3 playback
- ✅ Dynamic playlists
- ✅ Dynamic song loading
- ✅ Play / Pause
- ✅ Previous / Next
- ✅ Automatic next song
- ✅ Seekbar
- ✅ Volume control
- ✅ Mute / Unmute
- ✅ Search
- ✅ Playlist covers
- ✅ Playlist metadata
- ✅ Responsive navigation
Not Implemented
- ❌ Backend
- ❌ Database
- ❌ User authentication
- ❌ User accounts
- ❌ Online music streaming
- ❌ Spotify API
- ❌ Cloud storage
- ❌ Server-side playlists

## ⚠️ Disclaimer

This project is created for educational and portfolio purposes. It is inspired by Spotify's user interface and functionality but **is not affiliated with, sponsored by, or endorsed by Spotify.**

Spotify and its related trademarks belong to their respective owners.

## 👨‍💻 Author

### Mohammad Akhtar Raza Chaudhary

### [👉🏻GitHub](https://github.com/BuildWithRaza)

⭐ If you found this project useful, consider giving the repository a star!