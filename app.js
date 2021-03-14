const searchSongs = () =>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
   fetch(url)
   .then(res => res.json())
   .then(data => displaySongs(data.data)) 
   .catch(error => displayError("Something Went Wrong!! try again"))
}

const displaySongs = songs =>{   
const songsContainer = document.getElementById('songs-container');
songsContainer.innerHTML = '';    
    songs.forEach(song => {
        const songDiv = document.createElement('div');              
        songDiv.className = 'single-result row align-items-center my-3 p-3';    
        songDiv.innerHTML = `
                <div class="col-md-9">                                      
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                      <source src="${song.preview}" type="audio/ogg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                   <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>`;                           
        songsContainer.appendChild(songDiv);                        

    });
}
 
const getLyric = async(artist, title) =>{
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
   try {
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
   } catch (error) {
    displayError("Sorry!! try again");   
   }

}

const displayLyrics = lyrics =>{
const lyricsDiv = document.getElementById('song-lyrics');
lyricsDiv.innerText = lyrics;
}

const displayError = error =>{
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}