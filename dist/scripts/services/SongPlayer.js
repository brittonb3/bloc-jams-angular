(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /**
        * @desc gets the current album
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
         * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                 stopSong(song);
            }
                    
             currentBuzzObject = new buzz.sound(song.audioUrl,  {
                formats: ['mp3'],
                preload: true
            });
                    
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @scope private
        * @desc plays a song by playing the currentBuzzObject
        *@param {object} song
        */
        var playSong = function(song) {
                currentBuzzObject.play();
                song.playing = true;
        };
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        * @function getSongIndex
        * @scope private
        * @desc gets the index of current song
        * @param {object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
         /**
        * @desc Looks at selected song
        * @type {object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play
        * @scope public
        * @desc plays a song or plays a new song
        * @param {object} song
        */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @scope public
        * @desc pauses the currentBuzzObject
        * @param {object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function SongPlayer.previous
        * @scope public
        * @desc gets the previous song fromt the current song index
        * @param {object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
      
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();

