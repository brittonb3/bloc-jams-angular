(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Looks at selected song
        * @type {object}
        */
        var currentSong = null;
        
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
                 currentBuzzObject.stop();
                 currentSong.playing = null;
            }
                    
             currentBuzzObject = new buzz.sound(song.audioUrl,  {
                formats: ['mp3'],
                preload: true
            });
                    
            currentSong = song;
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
        
        /**
        * @function SongPlayer.play
        * @scope public
        * @desc plays a song or plays a new song
        * @param {object} song
        */
         SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
      
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();

