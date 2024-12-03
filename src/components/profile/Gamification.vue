<template>
  <div>
    <q-card class="my-card q-pa-lg desktop-only">
      <div class="row">
        <q-carousel
          v-model="slide"
          ref="carousel"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          height="300px"
          class="full-width"
        >
          <q-carousel-slide name="1" class="full-width q-pa-none">
            <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
              <div class="row q-mb-md q-py-md">
                <!--                <div class="desktop-only" style="min-width: 21.8%;"></div>-->
                <div class="desktop-only" style="min-width: 9.5%;"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Star 1" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 1').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Star 2" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 2').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Star 3" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 3').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Star 4" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 4').remark}}
                  </div>
                </div>
                <div class="desktop-only" style="min-width: 9.5%;"></div>
              </div>
              <div class="row justify-between">
                <q-linear-progress
                  size="12px"
                  :value="progress(99, point_user.point)"
                  :color="progress(99, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  :class="this.$q.platform.is.mobile ? 'line-badge-mobile' : 'line-badge-desktop'"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(99, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(99, point_user.point)) && !loading"
                    :progress_percent="progress(99, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(1,point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(1,point_user.point)"
                  :color="progress(1,point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(1,point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(1,point_user.point)) && !loading"
                    :progress_percent="progress(1,point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(2, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(2, point_user.point)"
                  :color="progress(2, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(2, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(2, point_user.point)) && !loading"
                    :progress_percent="progress(2, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(3, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(3, point_user.point)"
                  :color="progress(3, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                    :progress_percent="progress(3, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(4, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(4, point_user.point)"
                  :color="progress(4, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                    :progress_percent="progress(4, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
              </div>
              <div class="row q-mb-md q-mt-sm">
                <div
                  :class="this.$q.platform.is.mobile ? 'space-left-title-badge-mobile' : 'space-left-title-badge-desktop'"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">0</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">200</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">300</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">400</div>
                </div>
                <div
                  :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="2" class="full-width q-pa-none">
            <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
              <div class="row q-mb-md q-py-md">
                <div class="desktop-only" style="min-width: 9.5%;"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Star 5" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 5').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Shield 1" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 1').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Shield 2" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 2').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Shield 3" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 3').remark}}
                  </div>
                </div>
                <div class="desktop-only" style="min-width: 9.5%;"></div>
              </div>
              <div class="row justify-between">
                <!--                <q-linear-progress size="12px" :value="progress(6,point_user.point)" color="orange-4" class="col"/>-->
                <q-linear-progress
                  size="12px"
                  :value="progress(4, point_user.point)"
                  :color="progress(4, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                    :progress_percent="progress(4, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(5, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(5, point_user.point)"
                  :color="progress(5, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(5, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(5, point_user.point)) && !loading"
                    :progress_percent="progress(5, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(6, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(6, point_user.point)"
                  :color="progress(6, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                    :progress_percent="progress(6, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(7, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(7, point_user.point)"
                  :color="progress(7, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(7, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(7, point_user.point)) && !loading"
                    :progress_percent="progress(7, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(8, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(8, point_user.point)"
                  :color="progress(8, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                    :progress_percent="progress(8, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
              </div>
              <div class="row q-mb-md q-mt-sm">
                <div
                  :class="this.$q.platform.is.mobile ? 'space-left-title-badge-mobile' : 'space-left-title-badge-desktop'"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">500</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">600</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">1.200</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">2.000</div>
                </div>
                <div
                  :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="3" class="full-width q-pa-none">
            <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
              <div class="row q-mb-md q-py-md">
                <div class="desktop-only" style="min-width: 9.5%;"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Shield 4" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 4').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Shield 5" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 5').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Diamond 1" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 1').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Diamond 2" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 2').remark}}
                  </div>
                </div>
                <div class="desktop-only" style="min-width: 9.5%;"></div>
              </div>
              <div class="row justify-between">
                <q-linear-progress
                  size="12px"
                  :value="progress(8, point_user.point)"
                  :color="progress(8, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                    :progress_percent="progress(8, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(9, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(9, point_user.point)"
                  :color="progress(9, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                    :progress_percent="progress(9, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(10, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(10, point_user.point)"
                  :color="progress(10, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(10, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(10, point_user.point)) && !loading"
                    :progress_percent="progress(10, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(11, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(11, point_user.point)"
                  :color="progress(11, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(11, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(11, point_user.point)) && !loading"
                    :progress_percent="progress(11, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(12, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(12, point_user.point)"
                  :color="progress(12, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                    :progress_percent="progress(12, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
              </div>
              <div class="row q-mb-md q-mt-sm">
                <div
                  :class="this.$q.platform.is.mobile ? 'space-left-title-badge-mobile' : 'space-left-title-badge-desktop'"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">3.700</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">7.200</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">14.300</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">28.600</div>
                </div>
                <div
                  :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="4" class="full-width q-pa-none">
            <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
              <div class="row q-mb-md q-py-md">
                <div class="desktop-only" style="min-width: 9.5%;"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Diamond 3" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 3').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Diamond 4" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 4').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Diamond 5" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 5').remark}}
                  </div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <GamificationIcon level_name="Red Diamond" :size="35" />
                  <div class="text-weight-bold q-my-sm text-center"
                       :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Red Diamond').remark}}
                  </div>
                </div>
                <div class="desktop-only" style="min-width: 9.5%;"></div>
              </div>
              <div class="row justify-between">
                <q-linear-progress
                  size="12px"
                  :value="progress(12, point_user.point)"
                  :color="progress(12, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                    :progress_percent="progress(12, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(13, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(13, point_user.point)"
                  :color="progress(13, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(13, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(13, point_user.point)) && !loading"
                    :progress_percent="progress(13, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(14, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(14, point_user.point)"
                  :color="progress(14, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(14, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(14, point_user.point)) && !loading"
                    :progress_percent="progress(14, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(15, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(15, point_user.point)"
                  :color="progress(15, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                    :progress_percent="progress(15, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
                <q-btn
                  :class="progress(16, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                  class="col" size="12px" unelevated
                  style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                <q-linear-progress
                  size="12px"
                  :value="progress(16, point_user.point)"
                  :color="progress(16, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                  class="col"
                  style="overflow: visible">
                  <q-resize-observer
                    v-if="![0,1].includes(progress(16, point_user.point)) && !loading"
                    @resize="onProgressResize"/>
                  <GamificationBadge
                    v-if="![0,1].includes(progress(16, point_user.point)) && !loading"
                    :progress_percent="progress(16, point_user.point)"
                    :point_user="point_user"
                    :badge_position="badge_position"/>
                </q-linear-progress>
              </div>
              <div class="row q-mb-md q-mt-sm">
                <div
                  :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">58.800</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">113.300</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">226.400</div>
                </div>
                <div class="col q-pa-none column justify-center items-center">
                  <div class="q-my-sm kmp-font-md text-center">452.700</div>
<!--                  905.400-->
                </div>
                <div
                  :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
              </div>
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control
              style="left: 50%"
              position="bottom"
              :offset="[-20,16]"
              class="q-gutter-xs">
              <q-btn
                flat dense text-color="grey-8" icon="navigate_before" size="lg"
                @click="$refs.carousel.previous()"
              />
              <q-btn
                flat dense text-color="grey-8" icon="navigate_next" size="lg"
                @click="$refs.carousel.next()"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
      <div class="row">
        <div class="col-7 q-my-md q-px-none" style="border-right: 1px solid rgba(0, 0, 0, 0.08)">
          <div class="row justify-between q-mr-lg">
            <div class="text-subtitle1 text-weight-bold" v-if="data_user.id === getUserLogin().id">Your Level</div>
            <div class="text-subtitle1 text-weight-bold" v-else>{{data_user.name}}'s Level</div>
<!--            <div class="text-subtitle1 text-weight-bold" v-else>{{data_user.name.replace(/ .*/,'')}}'s Level</div>-->
            <div class="text-normal kmp-text-blue cursor-pointer" @click="point_table.dialog=true">Lihat Tabel Poin
              <q-icon name="chevron_right" size="sm"/>
            </div>
          </div>
          <div class="col-12 q-py-none q-mr-lg q-mt-md" style="border-radius: 10px">
            <div class="row">
              <div class="col">
                <div class="row items-center">
                  <div class="col" style="max-width: 86px">
                    <GamificationIcon :level_name="point_user.level_name" :size="35" />
                  </div>
                  <div class="col">
                    <div class="kmp-font-sm-2 text-grey-7">{{ point_user.remark }}</div>
                    <div class="kmp-font-xl text-weight-bold">{{ point_user.point }}</div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="kmp-font-sm bg-orange-1 text-orange-5 q-pa-sm kmp-rounded-2 text-center"
                     style="border: 1px solid rgb(255,217,166);">
                  {{ point_user.deduction }} points akan kadaluwarsa pada 30 Nov {{ (new Date().getMonth() >=11)? (new Date().getFullYear()) +1 : new Date().getFullYear()  }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 bg-deep-purple-1 text-purple-8 q-pa-md q-mr-lg q-mt-lg" style="border-radius: 10px">
            <div class="kmp-font-sm">Recommendation to Next Level</div>
            <div class="kmp-font-lg text-weight-bold">Get {{point_user.point_to_next_level}} more points by doing this activity</div>
            <q-separator color="purple-2" class="q-my-md"/>
            <div class="row justify-between items-center q-my-sm">
              <div class="bg-purple-8 text-white kmp-rounded q-px-md q-py-xs">2x</div>
              <div class="q-mx-md">Be a speaker in an event</div>
              <q-space/>
              <div>+30 pts</div>
            </div>
            <div class="row justify-between items-center q-my-sm">
              <div class="bg-purple-8 text-white kmp-rounded q-px-md q-py-xs">5x</div>
              <div class="q-mx-md">Post a content in channel #general, unit kerja, or CoP</div>
              <q-space/>
              <div>+50 pts</div>
            </div>
          </div>
        </div>
        <div class="col-5 q-my-md q-px-none">
          <div class="text-subtitle1 text-weight-bold q-ml-lg">History</div>
          <div class="col-12 bg-grey-2 q-py-md q-ml-lg q-mt-md" style="border-radius: 10px">
            <q-scroll-area style="height: 240px" class="q-pr-md">
              <LeaderboardHistories :data="point_history"/>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </q-card>

    <q-card class="mobile-only">
      <q-card-section>
        <div class="row">
          <q-carousel
            v-model="slide"
            ref="carousel"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            height="300px"
            class="full-width"
          >
            <q-carousel-slide name="1" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="" style="min-width: 9.5%;"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Star 1" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 1').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Star 2" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 2').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Star 3" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 3').remark}}
                    </div>
                  </div>
                  <div class="" style="min-width: 9.5%;"></div>
                </div>
                <div class="row justify-between">
                  <q-linear-progress
                    size="12px"
                    :value="progress(99, point_user.point)"
                    :color="progress(99, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    :class="this.$q.platform.is.mobile ? 'line-badge-mobile' : 'line-badge-desktop'"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(99, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(99, point_user.point)) && !loading"
                      :progress_percent="progress(99, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(1,point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(1,point_user.point)"
                    :color="progress(1,point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(1,point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(1,point_user.point)) && !loading"
                      :progress_percent="progress(1,point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(2, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(2, point_user.point)"
                    :color="progress(2, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(2, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(2, point_user.point)) && !loading"
                      :progress_percent="progress(2, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(3, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(3, point_user.point)"
                    :color="progress(3, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                      :progress_percent="progress(3, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div
                    :class="this.$q.platform.is.mobile ? 'space-left-title-badge-mobile' : 'space-left-title-badge-desktop'"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">0</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">200</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">300</div>
                  </div>
                  <div
                    :class="this.$q.platform.is.mobile ? 'space-right-title-badge-mobile' : 'space-right-title-badge-desktop'"></div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="2" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="" style="min-width: 9.5%;"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Star 4" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 4').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Star 5" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Star 5').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Shield 1" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 1').remark}}
                    </div>
                  </div>
                  <div class="" style="min-width: 9.5%;"></div>
                </div>
                <div class="row justify-between">
                  <!--                <q-linear-progress size="12px" :value="progress(6,point_user.point)" color="orange-4" class="col"/>-->
                  <q-linear-progress
                    size="12px"
                    :value="progress(3, point_user.point)"
                    :color="progress(3, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(3, point_user.point)) && !loading"
                      :progress_percent="progress(3, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(4, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(4, point_user.point)"
                    :color="progress(4, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(4, point_user.point)) && !loading"
                      :progress_percent="progress(4, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(5, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(5, point_user.point)"
                    :color="progress(5, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(5, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(5, point_user.point)) && !loading"
                      :progress_percent="progress(5, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(6, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(6, point_user.point)"
                    :color="progress(6, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                      :progress_percent="progress(6, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div
                    :class="'space-left-title-badge-desktop'"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">400</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">500</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">600</div>
                  </div>
                  <div
                    :class="'space-right-title-badge-desktop'"></div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="3" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="" style="min-width: 9.5%;"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Shield 2" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 2').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Shield 3" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 3').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Shield 4" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 4').remark}}
                    </div>
                  </div>
                  <div class="" style="min-width: 9.5%;"></div>
                </div>
                <div class="row justify-between">
                  <q-linear-progress
                    size="12px"
                    :value="progress(6, point_user.point)"
                    :color="progress(6, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(6, point_user.point)) && !loading"
                      :progress_percent="progress(6, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(7, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(7, point_user.point)"
                    :color="progress(7, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(7, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(7, point_user.point)) && !loading"
                      :progress_percent="progress(7, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(8, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(8, point_user.point)"
                    :color="progress(8, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(8, point_user.point)) && !loading"
                      :progress_percent="progress(8, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(9, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(9, point_user.point)"
                    :color="progress(9, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                      :progress_percent="progress(9, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div
                    :class="'space-left-title-badge-desktop'"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">1.200</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">2.000</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">3.700</div>
                  </div>
                  <div
                    :class="'space-right-title-badge-desktop'"></div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="4" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="" style="min-width: 9.5%;"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Shield 5" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Shield 5').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Diamond 1" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 1').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Diamond 2" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 2').remark}}
                    </div>
                  </div>
                  <div class="" style="min-width: 9.5%;"></div>
                </div>
                <div class="row justify-between">
                  <q-linear-progress
                    size="12px"
                    :value="progress(9, point_user.point)"
                    :color="progress(9, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(9, point_user.point)) && !loading"
                      :progress_percent="progress(9, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(10, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(10, point_user.point)"
                    :color="progress(10, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(10, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(10, point_user.point)) && !loading"
                      :progress_percent="progress(10, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(11, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(11, point_user.point)"
                    :color="progress(11, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(11, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(11, point_user.point)) && !loading"
                      :progress_percent="progress(11, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(12, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(12, point_user.point)"
                    :color="progress(12, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                      :progress_percent="progress(12, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div
                    :class="'space-left-title-badge-desktop'"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">7.200</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">14.300</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">28.600</div>
                  </div>
                  <div
                    :class="'space-right-title-badge-desktop'"></div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="5" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="" style="min-width: 9.5%;"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Diamond 3" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 3').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Diamond 4" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 4').remark}}
                    </div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Diamond 5" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Diamond 5').remark}}
                    </div>
                  </div>
                  <div class="" style="min-width: 9.5%;"></div>
                </div>
                <div class="row justify-between">
                  <q-linear-progress
                    size="12px"
                    :value="progress(12, point_user.point)"
                    :color="progress(12, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(12, point_user.point)) && !loading"
                      :progress_percent="progress(12, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(13, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(13, point_user.point)"
                    :color="progress(13, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(13, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(13, point_user.point)) && !loading"
                      :progress_percent="progress(13, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(14, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(14, point_user.point)"
                    :color="progress(14, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(14, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(14, point_user.point)) && !loading"
                      :progress_percent="progress(14, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(15, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(15, point_user.point)"
                    :color="progress(15, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                      :progress_percent="progress(15, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div
                    :class="'space-right-title-badge-desktop'"></div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">58.800</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">113.300</div>
                  </div>
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">226.400</div>
                  </div>
                  <div
                    :class="'space-right-title-badge-desktop'"></div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="6" class="full-width q-pa-none">
              <div class="col-12 bg-grey-2 q-pt-md q-pb-xl" style="border-radius: 10px">
                <div class="row q-mb-md q-py-md">
                  <div class="col q-pa-none column justify-center items-center">
                    <GamificationIcon level_name="Red Diamond" :size="35" />
                    <div class="text-weight-bold q-my-sm text-center"
                         :class="this.$q.platform.is.mobile ? 'kmp-font-xxs' : 'kmp-font-lg'">{{getPointConfig('Red Diamond').remark}}
                    </div>
                  </div>
                </div>
                <div class="row justify-between">
                  <q-linear-progress
                    size="12px"
                    :value="progress(15, point_user.point)"
                    :color="progress(15, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(15, point_user.point)) && !loading"
                      :progress_percent="progress(15, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                  <q-btn
                    :class="progress(16, point_user.point) === 0 ? 'bg-grey-4': 'bg-orange-4'"
                    class="col" size="12px" unelevated
                    style="border-radius: 30px; max-width: 32px; max-height: 32px; margin: -10px; z-index: 1!important;"/>
                  <q-linear-progress
                    size="12px"
                    :value="progress(16, point_user.point)"
                    :color="progress(16, point_user.point) === 0 ? 'grey-4': 'orange-4'"
                    class="col"
                    style="overflow: visible">
                    <q-resize-observer
                      v-if="![0,1].includes(progress(16, point_user.point)) && !loading"
                      @resize="onProgressResize"/>
                    <GamificationBadge
                      v-if="![0,1].includes(progress(16, point_user.point)) && !loading"
                      :progress_percent="progress(16, point_user.point)"
                      :point_user="point_user"
                      :badge_position="badge_position"/>
                  </q-linear-progress>
                </div>
                <div class="row q-mb-md q-mt-sm">
                  <div class="col q-pa-none column justify-center items-center">
                    <div class="q-my-sm kmp-font-md text-center">452.700</div>
                    <!--                  905.400-->
                  </div>
                </div>
              </div>
            </q-carousel-slide>

            <template v-slot:control>
              <q-carousel-control
                style="left: 50%"
                position="bottom"
                :offset="[-50,16]"
                class="q-gutter-xs">
                <q-btn
                  flat dense text-color="grey-8" icon="navigate_before" size="lg"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  flat dense text-color="grey-8" icon="navigate_next" size="lg"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md q-px-none">
            <div class="row justify-between">
              <div class="text-subtitle1 text-weight-bold" v-if="data_user.id === getUserLogin().id">Your Level</div>
              <div class="text-subtitle1 text-weight-bold" v-else>{{data_user.name}}'s Level</div>
              <div class="text-normal kmp-text-blue cursor-pointer" @click="point_table.dialog=true">Lihat Tabel Poin
                <q-icon name="chevron_right" size="sm"/>
              </div>
            </div>
            <div class="col-12 q-py-none q-mt-md" style="border-radius: 10px">
              <div class="row">
                <div class="col">
                  <div class="row items-center">
                    <div class="col" style="max-width: 76px">
                      <GamificationIcon :level_name="point_user.level_name" :size="35" />
                    </div>
                    <div class="col">
                      <div class="kmp-font-sm-2 text-grey-7">{{ point_user.remark }}</div>
                      <div class="kmp-font-xl text-weight-bold">{{ point_user.point }}</div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="kmp-font-sm bg-orange-1 text-orange-5 q-pa-sm kmp-rounded-2 text-center"
                       style="border: 1px solid rgb(255,217,166);">
                    {{ point_user.deduction }} points akan kadaluwarsa pada 30 Nov {{ (new Date().getMonth() >=11)? (new Date().getFullYear()) +1 : new Date().getFullYear()  }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 bg-deep-purple-1 text-purple-8 q-pa-md q-mt-lg" style="border-radius: 10px">
              <div class="kmp-font-sm">Recommendation to Next Level</div>
              <div class="kmp-font-lg text-weight-bold">Get {{point_user.point_to_next_level}} more points by doing this activity</div>
              <q-separator color="purple-2" class="q-my-md"/>
              <div class="row justify-between items-center q-my-sm">
                <div class="bg-purple-8 text-white kmp-rounded q-px-md q-py-xs">2x</div>
                <div class="q-mx-md">Be a speaker in an event</div>
                <q-space/>
                <div>+30 pts</div>
              </div>
              <div class="row justify-between items-center q-my-sm">
                <div class="bg-purple-8 text-white kmp-rounded q-px-md q-py-xs">5x</div>
                <div class="q-mx-md">Post a content in channel #general, unit kerja, or CoP</div>
                <q-space/>
                <div>+50 pts</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-mb-md q-px-none">
            <div class="text-subtitle1 text-weight-bold">History</div>
            <div class="col-12 bg-grey-2 q-py-md q-mt-md" style="border-radius: 10px">
              <q-scroll-area style="height: 240px" class="q-pr-md">
                <LeaderboardHistories :data="point_history"/>
              </q-scroll-area>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog persistent v-model="point_table.dialog">
      <q-card class="q-pa-none" :class="$q.platform.is.mobile ? 'kmp-modal-gamification-table-point' : 'modal-size'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 q-pl-sm q-mb-md">Tabel Poin</div>
          <q-space/>
          <q-btn icon="close" class="q-mb-md" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section class="row items-center q-py-none">
          <div class="full-width">
            <q-markup-table flat bordered class="desktop-only">
              <thead>
              <tr>
                <th class="text-left" style="width: 25%">Module</th>
                <th class="text-left" style="width: 60%">Activity</th>
                <!--                <th class="text-left">As an/a</th>-->
                <th class="text-left" style="width: 15%">Points</th>
              </tr>
              </thead>
            </q-markup-table>
            <q-scroll-area style="height: 465px; border: 1px solid rgba(128,128,128,.2)" class="">
              <q-markup-table flat>
                <thead :class="$q.platform.is.mobile ? '' : 'hidden'">
                <tr>
                  <th class="text-left" style="width: 25%">Module</th>
                  <th class="text-left" style="width: 60%">Activity</th>
                  <!--                <th class="text-left">As an/a</th>-->
                  <th class="text-left" style="width: 15%">Points</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in point_activity" :key="index" v-bind:class="(index % 2 >0)?'bg-grey-1':''">
                  <td style="width: 25%">{{ item.module }}</td>
                  <td style="width: 60%">{{ item.activity }}</td>
                  <!--                  <td>Author</td>-->
                  <td style="width: 15%">{{ item.point }} pts</td>
                </tr>
                </tbody>
              </q-markup-table>
            </q-scroll-area>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<style>


.line-badge-desktop {
  min-width: 30%;
}

.line-badge-mobile {

}

.space-left-title-badge-desktop {
  min-width: 9.5%;
}

.space-left-title-badge-mobile {
  min-width: 8%;
}

.space-right-title-badge-desktop {
  min-width: 9.6%;
}

.space-right-title-badge-mobile {
  min-width: 8%;
}

.square-badge-next-level-desktop {
  top: 22px;
  left: 60px;
}

.square-badge-next-level-mobile {
  top: 55px;
  left: 54px;
}

.arrow-badge-next-level-desktop {
  top: 20px;
  left: 60px;
}

.arrow-badge-next-level-mobile {
  top: 52px;
  left: 54px;
}

.modal-size {
  height: 600px;
  width: 800px;
  max-width: 60vw;
}
</style>
<script>

import {
  getPointActivity,
  leaderboardHistoriesByMemberIdPointHistory,
  leaderboardMemberByMemberIdPointHistory, poinConfig
} from 'src/lib/api';
// import { getLoginId } from 'src/lib/helper';
import LeaderboardHistories from 'components/leaderboard/LeaderboardHistories';
import GamificationBadge from 'components/profile/GamificationBadge';
import { colors } from 'quasar';
import GamificationIcon from 'components/profile/GamificationIcon';
import { getUserLogin } from 'src/lib/helper';

const { getPaletteColor } = colors;

export default {
  props: ['loading', 'data_user', 'data_level', 'data_own', 'data_channel', 'loginId'],
  components: { GamificationIcon, GamificationBadge, LeaderboardHistories },
  data() {
    return {
      getUserLogin,

      getPaletteColor,
      point_user: {},
      point_history: {
        data: []
      },
      slide: '2',
      autoplay: false,
      point_table: {
        data: [],
        dialog: false
      },
      point_config: [],
      point_activity: [],
      badge_position: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    getPointConfig(level_name) {
      const config = this.$store.getters['gamification/configByName'](level_name);
      if (!config) return { remark: '', icon_color: '', icon_name: '' };
      return config;
    },
    onProgressResize(size) {
      this.badge_position = size;
    },
    progress(level, point) {
      let ret = 0;
      if (level === 1) {
        if (point > 200) ret = 1;
        else ret = point / 200;
      } else if (level === 2) {
        if (point > 300) ret = 1;
        else ret = (point - 200) / 100;
      } else if (level === 3) {
        if (point > 400) ret = 1;
        else ret = (point - 300) / 100;
      } else if (level === 4) {
        if (point > 500) ret = 1;
        else ret = (point - 400) / 100;
      } else if (level === 5) {
        if (point > 600) ret = 1;
        else ret = (point - 500) / 100;
      } else if (level === 6) {
        if (point > 1200) ret = 1;
        else ret = (point - 600) / 600;
      } else if (level === 7) {
        if (point > 2000) ret = 1;
        else ret = (point - 1200) / 800;
      } else if (level === 8) {
        if (point > 3700) ret = 1;
        else ret = (point - 2000) / 1700;
      } else if (level === 9) {
        if (point > 7200) ret = 1;
        else ret = (point - 3700) / (7200 - 3700);
      } else if (level === 10) {
        if (point > 14300) ret = 1;
        else ret = (point - 7200) / (14300 - 7200);
      } else if (level === 11) {
        if (point > 28600) ret = 1;
        else ret = (point - 14300) / (28600 - 14300);
      } else if (level === 12) {
        if (point > 58800) ret = 1;
        else ret = (point - 28600) / (58800 - 28600);
      } else if (level === 13) {
        if (point > 113300) ret = 1;
        else ret = (point - 58800) / (113300 - 58800);
      } else if (level === 14) {
        if (point > 226400) ret = 1;
        else ret = (point - 113300) / (226400 - 113300);
      } else if (level === 15) {
        if (point > 452700) ret = 1;
        else ret = (point - 226400) / (452700 - 226400);
      } else if (level === 16) {
        if (point > 905400) ret = 1;
        else ret = (point - 452700) / (905400 - 452700);
      } else if (level === 17) {
        if (point > 10000000) ret = 1;
        else ret = (point - 905400) / (10000000 - 905400);
      } else if (level === 99) {
        ret = 1;
      } else {
        ret = 0;
      }
      return (ret < 0) ? 0 : ret;
    },
    async getPoint() {
      const res = await leaderboardMemberByMemberIdPointHistory(this.data_user.id);

      this.point_user = (res.data.length === 0) ? {
        point: 0,
        level_name: 'Star 1',
        remark: 'Newbie',
        icon_name: 'stars',
        icon_color: '#FEB82D',
        final_point: 200,
        percent_point: 0
      } : res.data[0];

      const point_config = this.point_config.find(x => this.point_user.point >= x.point_min && this.point_user.point <= x.point_max);

      let additional = {
        deduction: 0,
        point_to_next_level: 0
      };
      if (point_config) {
        additional = {
          ...additional,
          deduction: point_config.decrement,
          point_to_next_level: point_config.point_max - this.point_user.point
        };
      }
      this.point_user = {
        ...this.point_user,
        deduction: additional.deduction,
        point_to_next_level: additional.point_to_next_level
      };

      if (this.point_user.point <= 400) this.slide = '1';
      else if (this.point_user.point > 400 && this.point_user.point <= 2000) this.slide = '2';
      else if (this.point_user.point > 2000 && this.point_user.point <= 28600) this.slide = '3';
      else this.slide = '4';
    }
  },
  mounted() {
    getPointActivity()
      .then(res => {
        this.point_activity = res.data;
      });
  },
  watch: {
    data_user: {
      immediate: true,
      deep: true,
      handler(value) {
        if (Object.keys(value).length > 0) {
          leaderboardHistoriesByMemberIdPointHistory(this.data_user.id)
            .then(res => {
              this.point_history.data = res.data;
            });

          poinConfig()
            .then(res => {
              this.point_config = res.data.filter(x => x.level_type === 'exp');
              this.getPoint();
            });
        }
      }
    }
  }
};
</script>

