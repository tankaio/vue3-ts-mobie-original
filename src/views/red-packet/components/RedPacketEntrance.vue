<!-- <template>
  <FloatThing @close="isAvailable = false">
    <div class="red-packet-entrance" @click.stop="goRedPacket">
      <div class="entrance">
        <span class="icon-close" @click.stop="isAvailable = false"></span>
      </div>
      <div class="entrance-text">{{ redPacketCountDown }}</div>
    </div>
  </FloatThing>
</template> -->

<!-- redPacketStatus: SessionStorage.has('redPacketStatus') ? SessionStorage.getItem('redPacketStatus') : 0, // 0:未开始，1:进行中（注：凡是带有redPacket的字段皆属于新版红包雨活动的属性） -->
<!-- setRedpacketStatus(state, payload) {
  state.redPacketStatus = payload
  SessionStorage.set('redPacketStatus', payload)
}, -->

<!-- <script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FloatThing from '../common/floatThing'

/* eslint-disable */
export default {
  name: 'RedPacketEntrance',
  components: {
    FloatThing
  },
  data() {
    return {
      isAvailable: false,
      redPacketCountDown: '',
      redPacketCountDownTimer: null
    }
  },
  computed: {
    ...mapState('task', ['redPacketStatus'])
  },
  // created() {
  //   this.redPacketClock()
  // },
  activated() {
    console.log('==========RedPacketEntrance-activated===========')
    this.redPacketClock()
  },
  deactivated() {
    console.log('deactivated-this.redPacketCountDownTimer-front', this.redPacketCountDownTimer)
    clearInterval(this.redPacketCountDownTimer)
    console.log('deactivated-this.redPacketCountDownTimer-behind', this.redPacketCountDownTimer)
  },
  methods: {
    ...mapMutations('task', ['setRedpacketStatus']),
    ...mapActions('task', ['newRedPacketInfo']),
    redPacketClock() {
      this.newRedPacketInfo().then((data) => {
        console.log('newRedPacketInfo---', data)
        if (data) {
          const { start, endMinute } = data.data
          let { validDates } = data.data
          // const start = true
          // const endMinute = 34
          // const validDates = [1, 2, 3, 4, 5, 7]
          this.isAvailable = start
          if (!validDates || !validDates.length) {
            this.isAvailable = false
          }
          const d = new Date()
          const year = d.getFullYear()
          const month = d.getMonth() + 1
          const date = d.getDate()
          const hours = d.getHours()
          const minutes = d.getMinutes()
          const seconds = d.getSeconds()
          let weekDay = d.getDay()
          if (weekDay === 0) {
            weekDay = 7
          }

          if (!validDates.find((item) => item === weekDay)) {
            this.isAvailable = false
          }
          if (!this.isAvailable) return

          validDates = validDates.sort()

          // 当前时间时间戳
          const curDateStamp = d.getTime()
          // 当前小时的红包雨开始时间 eg：2022-02-11 10:00:00
          const redPacketStartStamp = new Date(`${year}/${month}/${date} ${hours}:00:00`).getTime()
          // 当前小时的红包雨结束时间 eg：2022-02-11 10:05:00
          const redPacketEndStamp = redPacketStartStamp + endMinute * 60 * 1000

          const targetDay = validDates.find((item) => item >= weekDay)
          let timeDiff // 红包雨距离下次开始时间，单位秒
          let restTime = endMinute * 60 // 红包雨活动持续时间，单位秒
          if (targetDay === weekDay) {
            // console.log('targetDay === weekDay')
            if (curDateStamp < redPacketStartStamp) {
              // 说明红包雨未开始
              // console.log('说明红包雨未开始')
              this.setRedpacketStatus(0)
              timeDiff = (redPacketStartStamp - curDateStamp) / 1000
            }
            if (curDateStamp >= redPacketStartStamp && curDateStamp < redPacketEndStamp) {
              // 说明红包雨已开始
              // console.log('说明红包雨已开始')
              this.setRedpacketStatus(1)
              restTime = (redPacketEndStamp - curDateStamp) / 1000
            }
            if (curDateStamp >= redPacketEndStamp) {
              // console.log('说明红包雨已结束，开始计算下一次倒计时')
              this.setRedpacketStatus(0)
              timeDiff = 60 * 60 - (curDateStamp - redPacketStartStamp) / 1000
            }
          } else if (!targetDay) {
            // console.log('!targetDay')
            this.setRedpacketStatus(0)
            timeDiff =
              (7 - weekDay + validDates[0]) * 24 * 3600 - hours * 3600 - minutes * 60 - seconds
          } else {
            // console.log('targetDay > weekDay')
            this.setRedpacketStatus(0)
            timeDiff = (targetDay - weekDay) * 24 * 3600 - hours * 3600 - minutes * 60 - seconds
          }
          console.log('==================')
          console.log('timeDiff---', timeDiff)
          console.log('restTime---', restTime)
          console.log('redPacketStatus---', this.redPacketStatus)
          console.log('==================')
          if (this.redPacketStatus === 1) {
            this.redPacketCountDown = '进行中'
            this.redPacketCountDownTimer = setInterval(() => {
              // console.log('at redPacketStatus === 1-restTime', restTime)
              if (restTime > 0) {
                restTime--
              } else {
                // this.setRedpacketStatus(0)
                console.log('========clearInterval at redPacketStatus === 1-front==========')
                clearInterval(this.redPacketCountDownTimer)
                console.log('========clearInterval at redPacketStatus === 1-behind==========')
                // 递归
                this.redPacketClock()
              }
            }, 1000)
          } else {
            this.redPacketCountDownTimer = setInterval(() => {
              // console.log('at redPacketStatus === 0-timeDiff', timeDiff)
              // this.redPacketCountDown = this.countDown(timeDiff)
              // sdy要求去掉红包雨入口的倒计时
              this.redPacketCountDown = ''
              if (timeDiff > 0) {
                timeDiff--
              } else {
                // this.setRedpacketStatus(1)
                console.log('========clearInterval at redPacketStatus === 0-front==========')
                clearInterval(this.redPacketCountDownTimer)
                console.log('========clearInterval at redPacketStatus === 0-behind==========')
                // 递归
                this.redPacketClock()
              }
            }, 1000)
          }
        }
      })
    },
    // 倒计时 timestamp：单位秒
    countDown(timestamp) {
      // 如果是 10 以下的数，进行补零
      function addZero(i) {
        return i < 10 ? `0${i}` : i
      }
      // let day = parseInt(timestamp / (24 * 60 * 60), 10)
      let hour = parseInt(timestamp / (60 * 60) / 24, 10)
      let minute = parseInt((timestamp / 60) % 60, 10)
      let second = parseInt(timestamp % 60, 10)
      // day = addZero(day)
      hour = addZero(hour)
      minute = addZero(minute)
      second = addZero(second)
      // return `${day}天 ${hour}时 ${minute}分 ${second}秒`
      // return `${hour}:${minute}:${second}`
      return `${minute}:${second}`
    },
    goRedPacket() {
      if (this.redPacketStatus === 0) {
        this.$router.push('/redPacketAwardList')
      } else {
        this.$router.push('/redPacket')
      }
    }
  }
}
</script> -->

<!-- <script setup lang="ts">
const isAvailable = ref<boolean>(false)
const redPacketCountDown = ref<string>('')
const redPacketCountDownTimer = null
</script> -->

<style lang="scss">
.red-packet-entrance {
  margin-left: -25px;

  // position: fixed;
  // top: 480px;
  // right: 15px;
  // z-index: 9999;
  min-width: 66px;

  .entrance {
    margin: 0 auto;
    width: 42px;
    height: 52px;
    background: url('~images/task/redPacket/red-packet-1.png') no-repeat center;
    background-size: cover;
  }

  .icon-close {
    position: absolute;
    top: -5px;
    right: -8px;
    width: 14px;
    height: 14px;
    background: url('~images/task/redPacket/close.png') no-repeat center;
    background-size: 100% 100%;
  }

  .entrance-text {
    font-size: 12px;
    text-align: center;
    color: #d3c294;
  }
}
</style>
