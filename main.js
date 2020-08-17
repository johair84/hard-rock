const songName = document.getElementById('inputSongName');
const search = document.getElementById('search');
const result = document.getElementById('result');


const api = 'https://api.lyrics.ovh/';

//search by song or artis

async function searchSongs(term){
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();
    

    showData(data);   
}
//get lyrics 
async function getLyrics(artist, songTitle){
    try{
        const res = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|n)/g,'<br>');
    
    result.innerHTML = `
    <div class="single-lyrics text-center">
    <button class="btn go-back">&lsaquo;</button>
    <h2 class="text-success mb-4"><strong>${artist}</strong> -${songTitle}</h2>
    <span><pre class="lyric text-white">${lyrics}</pre></span>
    </div>`;

    } catch(err){
        alert("Sorry..No lyrics found!!");
    }
}

//display song and artist
function showData(data){
    let output = '';

    data.data.slice(0, 10).forEach(song=>{
        output +=`
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </div>
        </div>
        `;
    });

    result.innerHTML = `
        ${output}
    `;
}

//event lister
songName.addEventListener('submit', e =>{
    e.preventDefault();

    const searchTerm = search.value.trim();

    if(!searchTerm){
        alert('Please type in a search term');
    }else{
        searchSongs(searchTerm);
    }

    
});

//get lyrics button
result.addEventListener('click',e=>{
    const clicked = e.target;

    if (clicked.tagName === 'BUTTON'){
        const artist = clicked.getAttribute('data-artist');
        const songtitle = clicked.getAttribute('data-songtitle');

        getLyrics(artist, songtitle);
    }
})