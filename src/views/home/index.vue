<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 10:11:26
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-04 08:56:16
-->
<template>
  <div class="pages">
    <div class="header">
      <van-nav-bar fixed>
        <template #left>
          <img :src="logo" alt="" />
        </template>
        <template #right>
          <div class="nav-bar-right" style="display: flex; align-items: center; gap: 4px" @click="routerGo('/account')">
            <img :src="getAssetsImgPath('profile.png')" style="width: 40px" alt="" />
            <span>{{ t('home.PROFILE') }}</span>
          </div>
        </template>
      </van-nav-bar>
      <van-notice-bar class="notice" :text="t('home.Announcement')">
        <template #left-icon>
          <img style="width: 24px; height: auto" :src="getAssetsImgPath('BG-08.png')" alt="" />
        </template>
      </van-notice-bar>
    </div>
    <!-- 主视角区域 -->
    <div class="main">
      <div class="content">
        <h2 style="color: #fff; margin-top: 30px">{{ t('home.welcomeBack') }}</h2>
        <div class="name">
          <div>{{ userInfo.nickname }}</div>
          <div class="photo">
            <img :src="userInfo.level.img" alt="" />
          </div>
        </div>
        <!-- 金刚区 -->
        <div class="Kong">
          <div class="kong-item" @click="routerGo('/vip')">
            <div class="photo"></div>
            <span>{{ t('home.VIP') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/profile-update-bank')">
            <div class="photo"></div>
            <span>{{ t('home.Recharge') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/withdraw')">
            <div class="photo"></div>
            <span>{{ t('home.Withdraw') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/support')">
            <div class="photo"></div>
            <span>{{ t('home.CONTACTUS') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/tnc')">
            <div class="photo"></div>
            <span>{{ t('home.TermsConditions') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/event')">
            <div class="photo"></div>
            <span>{{ t('home.LatestEvent') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/faq')">
            <div class="photo"></div>
            <span>{{ t('home.FAQ') }}</span>
          </div>
          <div class="kong-item" @click="routerGo('/aboutus')">
            <div class="photo"></div>
            <span>{{ t('home.AboutUs') }}</span>
          </div>
        </div>

        <div class="word-block">
          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-1.png')" />
            </div>
            <h3>SEO Services</h3>
            <div class="word-content">
              Straight North has conducted thousands of successful SEO campaigns for B2B and B2C firms of all kinds. Our
              experience, talent, transparency, depth and professionalism set us apart. With skilled specialists in all
              areas of campaign execution, we set the standard for excellence in the SEO industry.
            </div>
          </div>
          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-2.png')" />
            </div>
            <h3>The Right Words Are Your Key to Success</h3>
            <div class="word-content">
              Keyword strategy is based on the premise that to get people to visit your site, your content must
              incorporate the words people use when searching for what you offer. Our professional SEO team ensures that
              we use the right keywords for your campaign and target them in a way that maximizes your results. Steps
              include keyword research, content gap analysis and target page / keyword selection, mapping and
              prioritization.
            </div>
          </div>
          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-3.png')" />
            </div>
            <h3>Don’t Content Yourself with Mediocre Content</h3>
            <div class="word-content">
              Content optimization refers to the practice of writing or rewriting content in a way that maximizes the
              chances of achieving your goals - obtaining high rankings in search engines, driving targeted traffic, and
              increasing e commerce revenue or sales leads. Creating and optimizing informational pages give your
              website the ability to publish fresh content and strengthen its overall topical relevance.
            </div>
          </div>
          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-4.png')" />
            </div>
            <h3>Don’t Let a Technicality Derail Your SEO Campaign</h3>
            <div class="word-content">
              Technical SEO helps ensure that your website structure optimizes user experience, maintains an acceptable
              speed, is accessible to search engines, is mobile-friendly and is generally designed to positively impact
              its performance on Google. Straight North will help you identify and diagnose these common (and not so
              common) technical SEO issues.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-5.png')" />
            </div>
            <h3>Are Backlinks the Missing Link in Your SEO Strategy?</h3>
            <div class="word-content">
              Links from relevant websites are indicators that your site is authoritative, trusted and credible. Because
              your website’s backlink profile is an important SEO ranking factor, our search engine optimization company
              earns links that improve search engine rankings, increase brand awareness and grow organic traffic. Learn
              more about our link building services.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-6.png')" />
            </div>
            <h3>Business Vertical Expertise</h3>
            <div class="word-content">
              We provide leading SEO services to many different types of businesses across a wide range of industry
              verticals. B2B or B2C, ecommerce, local or national, large or small, we do it all!
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-7.png')" />
            </div>
            <h3>Proven Results</h3>
            <div class="word-content">
              We have delivered thousands of successful SEO campaigns for over two decades. We boast an A+ BBB rating
              and have over 100 full-time team members in multiple locations.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-8.png')" />
            </div>
            <h3>SEO Knowledge</h3>
            <div class="word-content">
              We keep our finger on the pulse of the SEO industry, ensuring that we always employ the latest proven
              methods. We test new techniques to keep you ahead of your competitors.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-9.png')" />
            </div>
            <h3>Link Acquisition</h3>
            <div class="word-content">
              Our SEO firm works hard to acquire powerful inbound links. Targeting relevant publisher websites helps
              earn valuable links that increase your website’s authority and visibility.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-10.png')" />
            </div>
            <h3>Expert Copywriting</h3>
            <div class="word-content">
              We have a large staff of talented content creators. Our ability to produce high-quality content for any
              type of business and publish on authoritative sites is second to none.
            </div>
          </div>

          <div class="item">
            <div class="photo">
              <img :src="getAssetsImgPath('home-assetsImg-11.png')" />
            </div>
            <h3>Reporting Technology</h3>
            <div class="word-content">
              The GoNorth! Reporting platform allows you to closely monitor your SEO campaign performance. Metrics are
              updated daily, so you always know what is happening.
            </div>
          </div>
        </div>

        <div class="photo-area-view">
          <div class="item" v-for="item in photoList">
            <img :src="item.url" />
          </div>
        </div>

        <div class="Copyright">
          <span>Copyright © 2023 {{ appName }} All Rights Reserved</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { photoListData } from './api';
const photoList = ref(photoListData);

import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import logo from '@/icons/logo.svg';
import { getAssetsImgPath } from '@/utils/index.js';
import { useIndexStore } from '@/store/index';
const appName = computed(() => {
  return import.meta.env.VITE_APP_TITLE || 'appName';
});
import useUserInfo from '@/hooks/useUserInfo';
const user = useUserInfo();
const userInfo = computed(() => {
  return user.userInfo.value;
});

const vipList = ref([]);
const index = useIndexStore();
const getIndexData = async () => {
  console.log('index', index);
  const res = await index.getIndex();
  vipList.value = res.data.vip_list;
};
getIndexData();

import { useRouter } from 'vue-router';
const router = useRouter();
const routerGo = (path) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.pages {
  width: 100%;
  height: 100%;
  background: #000;
  padding-bottom: 80px;
  padding-top: 55px;
  .header {
    margin: auto;
    :deep(.van-nav-bar) {
      color: #fff;
      img {
        width: auto;
      }
      &::after {
        display: none;
      }
      .van-nav-bar__title {
        display: flex;
      }
    }
  }
}
.notice {
  --van-notice-bar-background: #461c1c;
  --van-notice-bar-text-color: #fff;
}
.main {
  padding: 15px;
  position: relative;
  &::before {
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    content: ' ';
    display: block;
    width: var(--page-width);
    height: calc(100vh - 210px);
    background: url('@/assets/img/202307.gif') no-repeat;
    background-size: 100% auto;
    background-color: #000;
    background-position: center center;
  }
  .content {
    position: relative;
  }
  .name {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    img {
      width: auto;
      height: 48px;
    }
  }
}

// 金刚区
.Kong {
  --gap: 4px;
  --nums: 4;
  display: grid;
  // 两行显示，每行显示4个，每个宽度为1fr，间隔为10px,严格平均分配
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(
    var(--nums),
    calc(100% / var(--nums) - calc((var(--nums) - 1) * var(--gap) / var(--nums)))
  );

  grid-gap: var(--gap);
  text-align: center;
  align-items: start;
  .kong-item {
    padding: 10px 0;
    border-radius: 3px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    color: #fff;
    span {
      font-size: 14px;
    }
    .photo {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      overflow: hidden;
      border-radius: 200px;
    }
    // scss的循环语法
    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        .photo {
          background-image: url('@/assets/img/icon-#{$i}.png');
        }
      }
    }
  }
}
.photo-area-view {
  margin-top: 40px;
  // 一行4个
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  .item{
    display: flex;
    align-items: center;
    img{
    height: auto;

    }
  }
}
.word-block {
  background-color: rgba($color: #fff, $alpha: 1);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .word-content {
    font-size: 13px;
  }
}
.Copyright {
  margin-top: 40px;
  color: silver;
  font-size: 10px;
  text-align: center;
}
</style>
