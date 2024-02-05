
document.getElementById('song-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addSong();
});

function addSong() {
    const song = document.getElementById('song').value.trim();
    const artist = document.getElementById('artist').value.trim(); 
    let isValid = true;
    
    document.getElementById('song').value = '';
    document.getElementById('artist').value = '';
    document.getElementById('songError').textContent = '';
    document.getElementById('artistError').textContent = '';


    if (!song) {
        document.getElementById('songError').textContent = 'Please enter a song';
        isValid = false;
    }
    if (!artist) {
        document.getElementById('artistError').textContent = 'Please enter an artist';
        isValid = false;
    }
    if (!isValid) {
        return
    }
    
    const songList = document.getElementById('song-list');
    const li = document.createElement('li');
    li.textContent = `${song} by ${artist}`;
    

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
        songList.removeChild(li);
    };

    li.appendChild(removeButton);
    songList.appendChild(li);

}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  

