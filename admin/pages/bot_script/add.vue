<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="aiScript" label="" required>
        <uni-easyinput placeholder="机器人执行的 AI 脚本内容" v-model="formData.aiScript"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="tokens" label="" required>
        <uni-easyinput placeholder="机器人执行过程中产生的代币数量" type="number" v-model="formData.tokens"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="beijingTime" label="" required>
        <uni-datetime-picker return-type="date" v-model="formData.beijingTime"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="traderWords" label="" required>
        <uni-easyinput placeholder="交易者的发言内容" v-model="formData.traderWords"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="roomId" label="" required>
        <uni-easyinput placeholder="直播房间ID" v-model="formData.roomId"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="userPhone" label="" required>
        <uni-easyinput placeholder="用户的手机号" v-model="formData.userPhone"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/bot_script.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'bot_script';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "aiScript": "",
        "tokens": 0,
        "beijingTime": null,
        "traderWords": "",
        "roomId": "",
        "userPhone": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>
