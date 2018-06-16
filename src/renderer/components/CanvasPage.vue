<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <main>
      <div class="left-side">
        <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
        <span class="title">
          Life game (evolutionary).
        </span>
        <system-information></system-information>
      </div>
      <div class="right-side">
        <div class="doc">
          <button class="alt" @click="random()">Random</button>
          <button class="alt" @click="clear()">Clear</button>
          <button class="alt" @click="start()">Start</button>
          <button class="alt" @click="pause()">Pause</button>
          <div style="display: inline-block;"> process:{{ process }}</div>
          <canvas id="lifeGraph" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" :width="row*pixel" :height="column*pixel"  style="border: 1px solid #4fc08d; background:#000000; cursor:pointer"></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import {init, random, addAlive, growup, equals} from '@/utils/life'

  export default {
    name: 'canvas-page',
    components: { SystemInformation },
    data () {
      return {
        now: [],
        pixel: 5,
        row: 180,
        column: 120,
        interval: null,
        process: 0,
        opt: {
          down: true,
          alive: new Set()
        }
      }
    },
    created () {
      // this.pixel = 4
      // this.row = 200
      // this.column = 200
      this.now = init(this.row, this.column)
      this.now = random(this.now, 0.3)
    },
    mounted () {
      this.print()
    },
    methods: {
      mousedown (e) {
        this.down = true
        this.opt.alive = new Set()
      },
      mousemove (e) {
        if (this.down) {
          const canvas = e.target
          const context = canvas.getContext('2d')
          // context.clearRect(0, 0, this.row * this.pixel, this.column * this.pixel)
          let x = Math.trunc(e.offsetX / this.pixel)
          let y = Math.trunc(e.offsetY / this.pixel)
          let point = {x: x, y: y}
          if (!equals(this.opt.alive, point)) {
            this.opt.alive.add(point)
            context.fillStyle = '#00ff8c'
            context.fillRect(x * this.pixel, y * this.pixel, this.pixel, this.pixel)
          }
        }
      },
      mouseup (e) {
        this.down = false
        if (this.opt.alive.size > 0) {
          addAlive(this.now, this.opt.alive)
        }
      },
      random () {
        this.pause()
        this.process = 0
        this.now = random(this.now, 0.3)
        this.print()
      },
      clear () {
        this.pause()
        this.process = 0
        this.now = init(this.row, this.column)
        const canvas = document.getElementById('lifeGraph')
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, this.row * this.pixel, this.column * this.pixel)
      },
      start () {
        if (this.interval == null) {
          this.interval = setInterval(this.refresh, 200)
        }
      },
      pause () {
        if (this.interval != null) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      refresh () {
        this.print()
        this.now = growup(this.now)
        this.process = this.process + 1
      },
      print () {
        const canvas = document.getElementById('lifeGraph')
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, this.row * this.pixel, this.column * this.pixel)
        this.now.forEach((sub, row) => {
          let i = row * this.pixel
          sub.forEach((value, column) => {
            let j = column * this.pixel
            if (value === 1) {
              context.fillStyle = '#00ff8c'
              context.fillRect(i, j, this.pixel, this.pixel)
            }
          })
        })
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 30px 40px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 220px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .6em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    margin-bottom: 5px;
  }

  .doc button.alt {
    color: #03f186;
    background-color: transparent;
  }
</style>
