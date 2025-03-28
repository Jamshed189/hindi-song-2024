new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
                {
          name: "Ishq Jaisa Kuch ",
          artist: "Hrithik Roshan, Deepika Padukone",
          cover: "https://pagalnew.com/coverimages/ishq-jaisa-kuch-fighter-500-500.jpg",
          source: "https://pagalnew.com/128-download/50325",
          url: "https://www.youtube.com/watch?v=TGpG56pg3UU",
          favorited: false
        },
        {
          name: "Sher Khul Gaye",
          artist: "Hrithik Roshan, Deepika Padukone",
          cover: "https://pagalnew.com/coverimages/sher-khul-gaye-fighter-500-500.jpg",
          source: "https://pagalnew.com/128-download/50325",
          url: "https://www.youtube.com/watch?v=2S24-y0Ij3Y&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "Sooraj Hi Chhaon Banke ",
          artist: " Prabhas, Shruthi Haasan, Prithviraj",
          cover: "https://pagalnew.com/coverimages/sooraj-hi-chhaon-banke-salaar-500-500.jpg",
          source: "https://pagalnew.com/download128/44844",
          url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
          favorited: true
        },

        {
          name: "Nikle The Kabhi Hum Ghar Se",
          artist: "Pritam",
          cover: "https://pagalnew.com/coverimages/nikle-the-kabhi-hum-ghar-se-dunki-500-500.jpg",
          source: "https://pagalnew.com/download128/44550",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false
        },

        {
          name: "Arjan Vailly",
          artist: "Manan Bhardwaj",
          cover: "https://pagalnew.com/coverimages/arjan-vailly-animal-500-500.jpg",
          source: "https://pagalnew.com/download128/44477",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false
        },

        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGFK7.jpg",
          source: "https://audio.jukehost.co.uk/9t8OuMg1bqsR0JtyADcqKaXbTaLvGOkl",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "As If It's Your Last",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGKl9.jpg",
          source: "https://audio.jukehost.co.uk/cXSnf1QxAl4N7keT52hTID5wZC8Nmfu1",
          url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
          favorited: true
        },
        {
          name: "Boy with Love",
          artist: "BTS",
          cover: "https://iili.io/H1hG2PS.jpg",
          source: "https://audio.jukehost.co.uk/k1H7J0lBSzjvK8pGe5pb3lPJeBCfcJUz",
          url: "https://www.youtube.com/watch?v=XsX3ATc3FbA&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "https://iili.io/H1hGfSe.jpg",
          source: "https://audio.jukehost.co.uk/w5el9uHEuw5yFJ1dPjeP5lMO78BbtRdr",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "https://iili.io/H1hGCAb.jpg",
          source: "https://audio.jukehost.co.uk/hhWaUJpcCrCCPi1S2wWup9uL1uVNjvOb",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "https://iili.io/H1hGBHu.jpg",
          source: "https://audio.jukehost.co.uk/X2kcaQZROQIikDD5P65ZetiaqdrZNX77",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
