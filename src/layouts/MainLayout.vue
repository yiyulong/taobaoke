<template>
  <q-layout view="hHh lpR ffr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar class="cursor-pointer">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        </q-avatar>
        <q-toolbar-title class="cursor-pointer" :style="{ 'font-size': $q.screen.lt.md ? $q.screen.lt.sm ? '16px' : '18px' : ''}">淘宝客</q-toolbar-title>
        <q-space />
        <template v-if="$q.screen.gt.xs">
          <q-btn flat label="首页" to="/" />
          <q-btn flat label="公司介绍" to="introduce" />
          <q-btn flat label="新闻中心" to="news" />
          <q-btn-dropdown flat label="联系我们">
            <q-list>
              <q-item-label header>联系我们</q-item-label>
              <!-- <q-item clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="chat" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>投诉建议</q-item-label>
                  <q-item-label caption>caption</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item clickable v-close-popup tabindex="1">
                <q-item-section avatar>
                  <q-avatar icon="r_call" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>13111111111</q-item-label>
                  <q-item-label caption>(021)12345</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
        <template v-else>
          <q-btn flat round icon="r_menu" @click="drawerRight = !drawerRight" />
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawerRight"
        side="right"
        behavior="mobile"
        content-class="bg-white text-primary"
        :width="200"
      >
        <div class="full-height column no-wrap">
          <div>
            <!-- <q-toolbar class="bg-primary text-white shadow-6">
              <q-space />
              <q-btn flat round icon="r_close" @click="drawerRight = !drawerRight" />
            </q-toolbar> -->
          </div>
          <div class="col">
            <q-scroll-area class="fit">
              <q-list class="text-primary">
                <q-item
                  clickable
                  v-ripple
                  exact
                  to="/"
                  active-class="bg-primary text-white"
                >
                  <q-item-section avatar>
                    <q-icon name="r_apps" />
                  </q-item-section>

                  <q-item-section>首页</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact
                  to="introduce"
                  active-class="bg-primary text-white"
                >
                  <q-item-section avatar>
                    <q-icon name="r_next_week" />
                  </q-item-section>

                  <q-item-section>公司介绍</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  exact
                  to="news"
                  active-class="bg-primary text-white"
                >
                  <q-item-section avatar>
                    <q-icon name="r_import_contacts" />
                  </q-item-section>

                  <q-item-section>新闻中心</q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item>
                  <q-item-section top avatar>
                    <q-icon name="r_call" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>联系我们</q-item-label>
                    <q-item-label caption>13111111111</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </q-drawer>

    <q-page-container>
      <router-view :key="key" />
      <q-page-sticky position="bottom-right" :offset="[18, 100]">
        <q-btn
          class="animated tada delay-5s slower infinite"
          icon="r_assignment"
          label="申请加入"
          :size="$q.screen.lt.md ? $q.screen.lt.sm ? 'md' : 'lg' : 'xl'"
          padding="md"
          stack rounded
          color="primary"
          @click="show = true"
        />
      </q-page-sticky>
      <q-page-scroller position="bottom-right" :scroll-offset="500" :offset="[18, 18]">
        <q-btn round icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
      <q-dialog v-model="show" :full-width="$q.screen.lt.sm">
        <q-card>
          <q-card-section>
            <div :class="$q.screen.lt.md ? $q.screen.lt.sm ? 'text-subtitle2' : 'text-subtitle1' : 'text-h6'">申请加入</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="q-gutter-y-sm" :class="$q.screen.lt.sm ? 'dense' : 'input-box'">
              <q-input
                outlined
                clearable
                :dense="$q.screen.lt.sm"
                v-model="userName"
                :rules="[val => !!val || '请输入用户名']"
                placeholder="用户名"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                outlined
                clearable
                unmasked-value
                :dense="$q.screen.lt.sm"
                type="tel"
                mask="###-####-####"
                v-model="phoneNumber"
                :rules="[ val => val.length === 11 || '请正确输入手机号']"
                placeholder="联系方式"
              >
                <template v-slot:prepend>
                  <q-icon name="r_phone_iphone" />
                </template>
              </q-input>
            </div>
            <div class="q-py-sm">
              <q-btn class="full-width" unelevated size="md" padding="sm none" icon="r_done" label="立即加入" color="primary" :loading="loading" @click="join">
              <template v-slot:loading>
                <q-spinner-facebook />请稍后...
              </template>
            </q-btn>
            </div>
          </q-card-section>
          <!-- <q-separator />
          <q-card-actions align="around">
            <q-btn flat icon="r_close" label="取消" v-close-popup />
            <q-btn unelevated icon="r_done" label="立即加入" color="primary" :loading="loading" @click="join">
              <template v-slot:loading>
                <q-spinner-facebook />请稍后...
              </template>
            </q-btn>
          </q-card-actions> -->
        </q-card>
      </q-dialog>
    </q-page-container>

    <q-footer>
      <div class="text-white footer-box">
        <div class="container">
          <ul class="row no-wrap justify-center q-py-md">
            <li class="">
              <div class="text-center">
                <p :class="$q.screen.lt.sm ? 'text-subtitle2 q-pb-sm' : 'text-h6 q-mb-md'">网站地图</p>
                <div>
                  <router-link to="/" tag="p" class="q-py-xs cursor-pointer" :class="$q.screen.lt.sm ? 'text-caption' : ''">首页</router-link>
                  <router-link to="introduce" tag="p" class="q-py-xs cursor-pointer" :class="$q.screen.lt.sm ? 'text-caption' : ''">公司介绍</router-link>
                  <router-link to="news" tag="p" class="q-py-xs cursor-pointer" :class="$q.screen.lt.sm ? 'text-caption' : ''">新闻中心</router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p class="q-pb-xs text-center">&copy; 2020 taobaoke</p>
      </div>
    </q-footer>
  </q-layout>
</template>
<script>
import { saveCustomerInfo } from '../api'
// import getQueryVariable from '../utils/getQueryVariable'
export default {
  name: 'MainLayout',
  data () {
    return {
      show: false,
      userName: '',
      phoneNumber: '',
      loading: false,
      employeeNumber: '',
      drawerRight: false
    }
  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  created () {
    this.employeeNumber = this.$route.query?.employeeNumber || this.$q.sessionStorage.getItem('employeeNumber')
  },
  methods: {
    join () {
      if (!this.userName || this.phoneNumber.length !== 11) return
      const params = {
        userName: this.userName,
        phoneNumber: this.phoneNumber,
        employeeNumber: this.employeeNumber
      }
      saveCustomerInfo(params).then(() => {
        this.$q.notify({
          color: 'primary',
          position: 'right',
          icon: 'done',
          timeout: 2500,
          message: '申请成功！'
        })
      }).finally(() => {
        this.show = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.input-box {
  width: 360px;
}
.input-box.dense {
  width: 100%;
}
.footer-box {
  background: url(http://du.yyjic.com/images/img/footer_bg-1.jpg) no-repeat center;
  background-size: cover;
}
</style>
