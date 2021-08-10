const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const PLAYER_KEY = 'F8-player';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const btnPlay = $('.btn-toggle-play');
const cd = $('.cd');
const progress = $('#progress');
const btnRepeat = $('.btn-repeat');
const btnPrev = $('.btn-prev');
const btnNext = $('.btn-next');
const btnRandom = $('.btn-random');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    config: JSON.parse(localStorage.getItem('PLAYER_KEY')) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'ViviD',
            singer: 'Heejin',
            path: 'https://aredir.nixcdn.com/NhacCuaTui932/ViViD-HeeJinLOONA-4693033.mp3?st=4ROGCB7uFOYFuLgEb1g-Pw&e=1628513557',
            img: 'assets/images/vivid.jpg'
        },
        {
            name: 'Around you',
            singer: 'Hyunjin',
            path: 'https://aredir.nixcdn.com/NhacCuaTui935/AroundYou-HyunJinLOONA-4725395.mp3?st=KASQNjoNo-yYAYJibJ8dMQ&e=1628514140',
            img: 'assets/images/around-you.jpg'
        },
        {
            name: 'Let me in',
            singer: 'Haseul',
            path: 'https://aredir.nixcdn.com/NhacCuaTui939/LetMeIn-HaseulLoona-4821678.mp3?st=r5m66zG__VP-7cpKx4KyoQ&e=1628514320',
            img: 'assets/images/let-me-in.jpg'
        },
        {
            name: 'Kiss later',
            singer: 'Yeojin',
            path: 'https://aredir.nixcdn.com/NhacCuaTui944/KissLater-YeoJinLOONA-5050226.mp3?st=BdRkVxVZAqycnjOhxzRGaQ&e=1628514413',
            img: 'assets/images/kiss-later.jpg'
        },
        {
            name: 'Everyday I love you',
            singer: 'ViVi',
            path: 'https://tainhacmienphi.biz/get/song/api/41045',
            img: 'assets/images/everyday-i-love-you.jpg'
        },
        {
            name: 'Eclipse',
            singer: 'Kim Lip',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui942/Eclipse-KimLipLOONA-4993327.mp3?st=vsQoC7h94s-kURg7Xlck8A&e=1628515393',
            img: 'assets/images/eclipse.jpg'
        },
        {
            name: 'Singing in the rain',
            singer: 'JinSoul',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui944/SingingInTheRain-JinsoulLOONA-5053936_hq.mp3?st=f7ClK7OvzOqTCoH8InRzag&e=1628515524',
            img: 'assets/images/singing-in-the-rain.jpg'
        },
        {
            name: 'Love cherry motion',
            singer: 'Choerry',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui946/LoveCherryMotion-ChoerryLOONA-5104688.mp3?st=mmis66NHsIogUvz39KGX6g&e=1628515574',
            img: 'assets/images/love-cherry-motion.jpg'
        },
        {
            name: 'new',
            singer: 'Yves',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui956/New-YvesLOONA-5298211.mp3?st=l7BPOjSGyOcbIKdHGdo-bg&e=1628520476',
            img: 'assets/images/new.jpg'
        },
        {
            name: 'Heart attack',
            singer: 'Chuu',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui956/HeartAttackChuu-Loona13-5328360.mp3?st=B6r_-I0w0XWDP9Xiusfh1Q&e=1628515688',
            img: 'assets/images/heart-attack.jpg'
        },
        {
            name: 'One & Only',
            singer: 'GoWon',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui959/OneOnly-GoWonLOONA-5380975.mp3?st=SqKnmlpMYoxcxKlcr2c4Fg&e=1628515724',
            img: 'assets/images/one-only.jpg'
        },
        {
            name: 'Egoist',
            singer: 'Olivia Hye',
            path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui962/Egoist-OliviaHyeLOONAJinsoulLOONA-5431377.mp3?st=pOsbxbUCk5hWzZlP0BJcJg&e=1628515770',
            img: 'assets/images/egoist.jpg'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''}">
                <div class="thumb">
                    <img src="${song.img}" alt="">
                </div>
                <div class="body">
                    <div class="title">${song.name}</div>
                    <div class="author">${song.singer}</div>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        });
    },

    handleEvents: function () {
        // Xử lý khi cd nhỏ dần
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Cd rotation
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Click play
        btnPlay.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // When the song is playing
        audio.onplay = function () {
            cdThumbAnimate.play()
            app.isPlaying = true;
            player.classList.add('playing');
        }

        // When the song is pausing
        audio.onpause = function () {
            cdThumbAnimate.pause();
            app.isPlaying = false;
            player.classList.remove('playing');
        }

        // Progress change
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Tua nhạc
        progress.oninput = function (e) {
            const songTime = Math.floor(e.target.value * audio.duration / 100)
            this.addEventListener('pointerup', (e) => { audio.currentTime = songTime })
            this.onmouseup = function () {
                audio.currentTime = songTime
            }
        }

        // Previous song
        btnPrev.onclick = function () {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.scrollToActiveSong()
        }

        // Next song
        btnNext.onclick = function () {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.scrollToActiveSong()
        }

        // Random song
        btnRandom.onclick = function () {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom);
            btnRandom.classList.toggle('active', app.isRandom)
        }

        // Repeat song
        btnRepeat.onclick = function () {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat);
            btnRepeat.classList.toggle('active', app.isRepeat)
        }

        // Choose song
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song
                if (songNode) {
                    app.currentIndex = songNode.dataset.index
                    app.loadCurrentSong()
                    audio.play()
                }
            }
        }

        // Xử lý khi kết thúc bài hát
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play()
            } 
            else if (app.isRandom) {
                app.randomSong()
            }
            else {
                app.nextSong()
            }
            audio.play()
        }
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
        audio.src = this.currentSong.path;

        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (song.getAttribute('data-index') == this.currentIndex) {
                song.classList.add('active');
            }
        });
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
            console.log(this.currentIndex)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 200)
    },

    start: function () {
        // Load config 
        this.loadConfig();

        // Defining object properties
        this.defineProperties();

        // Listen / handle events
        this.handleEvents();

        // Load current song to UI after running
        this.loadCurrentSong();

        // Render playlist
        this.render();
    },
};

app.start()