const speaker = ['fas fa-volume-up','fas fa-volume-mute']

let audio = document.getElementById('audio')

let volume = document.getElementById('volume')
volume.className = speaker[0]

function mute() {
    if(audio.muted == false) {
        volume.className = speaker[1]
        audio.muted = true
    } else {
        volume.className = speaker[0]
        audio.muted = false
    }
}

