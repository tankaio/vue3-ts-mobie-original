<!-- <template>
  <div class="red-packet-award-list ios-safe-pad">
    <div @click="$router.go(-1)" class="backBox">
      <span class="iconjiantou iconfont"></span>
      <img src="~images/common/sdy_back_white.png" />
    </div>
    <div class="desc-box">
      <div class="ads">
        {{ preRedPacketTime }}红包雨已结束，发出{{ sumData.maxCount }}封，领取{{ sumData.applyCount }}封，总金额{{ sumData.applyAmount }}元
        正点红包雨来袭，名额有限
      </div>
      <div class="next">
        敬请期待：<span>{{ nextRedPacketTime }}</span> 红包雨活动
      </div>
    </div>
    <div class="award-box">
      <div class="title">中奖名单</div>
      <table class="list">
        <thead>
          <th>序号</th>
          <th>会员账号</th>
          <th>金额</th>
        </thead>
        <tbody>
          <tr v-for="(item, i) in awardsList" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.loginName }}</td>
            <td>{{ item.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> -->

<!-- <script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'RedPacketAwardList',
  data() {
    return {
      sumData: {},
      awardsList: [],
      preRedPacketTime: '',
      nextRedPacketTime: ''
    }
  },
  created() {
    this.getNewRedPacketAwardList()
    this.getPreAndNextTime()
  },
  methods: {
    ...mapMutations('task', ['setNoticeArr']),
    ...mapActions('task', ['newRedPacketAwardList']),
    getPreAndNextTime() {
      const d = new Date()
      const hours = d.getHours()
      if (hours === 24) {
        this.nextRedPacketTime = '00:00'
      } else {
        this.preRedPacketTime = `${hours}:00`
        this.nextRedPacketTime = `${hours + 1}:00`
      }
    },
    getNewRedPacketAwardList() {
      this.newRedPacketAwardList().then((data) => {
        if (data) {
          this.sumData = data.data
          this.awardsList = data.data.newRedEnvelopeRewardDtoList.map((item) => {
            const len = item.loginName.length
            // eslint-disable-next-line
            const i = len === 6 ? 2 : len === 7 ? 3 : len === 8 ? 4 : 0
            item.loginName = `${item.loginName.slice(0, i)}****`
            return item
          })
        }
      })
    }
  }
}
</script> -->

<!-- <style lang="scss" scoped>
.ios-safe-pad {
  padding-top: constant(safe-area-inset-top); /* 兼容 iOS < 11.2 */
  padding-top: env(safe-area-inset-top); /* 兼容 iOS >= 11.2 */
}

.red-packet-award-list {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url('~images/task/redPacket/bg_award.png') no-repeat center;
  background-size: 100% 100%;

  .backBox {
    // position: fixed;
    // left: 5px;
    // top: 2px;
    padding: 5px 0;
    vertical-align: middle;

    .iconjiantou {
      display: inline-block;
      color: #fff;
      transform: rotateY(180deg);
    }

    img {
      margin: 6px 0 0 5px;
      width: auto;
      height: 11px;
    }
  }

  .desc-box {
    padding: 10px 20px;
    margin: 0 auto;
    width: 340px;
    font-size: 22px;
    font-family: HYYakuHei;
    text-align: center;
    background: url('~images/task/redPacket/bg_text.png') no-repeat center;
    background-size: 100% 100%;
    font-weight: 700;
    line-height: 20px;

    .ads {
      background: linear-gradient(180deg, #fdffa8 0%, #eec799 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    .next {
      margin-top: 4px;
      background: linear-gradient(180deg, #fdffa8 0%, #eec799 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    span {
      background: linear-gradient(180deg, #fff 0%, #fff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .award-box {
    display: flex;
    align-items: center;
    overflow: hidden;
    margin: 10px auto 0;
    width: 357px;

    // height: 608px;
    height: 70vh;

    // background-color: rgba($color: #000000, $alpha: 0.3);
    background: url('~images/task/redPacket/bg_award_bill.png') no-repeat center;
    background-size: 100% 100%;
    flex-direction: column;

    .title {
      margin: 11vw 0 5vw;
      font-size: 24px;
      font-family: HYYakuHei;
      color: #fff;
      font-weight: 700;
      line-height: 24px;
    }

    .list {
      width: 90%;
      text-align: center;
      color: #dfbebe;

      th {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style> -->
