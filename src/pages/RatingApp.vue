<template>
  <q-page :style-fn="pageAdjust">
    <LeftBar/>
    <RatingBar/>
    <div class="row q-pa-lg kmp-content-channel">
      <div class="col">
        <div class="q-pb-md q-pr-md">
          <q-card class="kmp-card-rounded q-pt-none q-pb-sm q-px-md q-mb-md">
            <q-card-section>
              <div class="row">
                <span class="text-neutral">Ratings & Reviews are verified and are from people who use the same type of device that you use.</span>
                <q-space/>
                <span></span>
              </div>
              <div class="row">
                <div class="col-md-4 q-pr-md col-xs-12">
                  <div class="text-center q-pr-lg" v-show="data.list.length > 0">
                    <span style="font-size: 80px">{{ rating }}</span>
                    <div class="q-mb-xs" style="margin-top: -10px;">
                      <q-rating
                        :value="4.4"
                        size="2.5em"
                        color="#faea29"
                        icon="star_border"
                        icon-selected="star"
                        icon-half="star_half"
                        :readonly="true"
                      />
                    </div>
                    <span style="font-size: 15px">{{ data.list.length }}</span>
                  </div>
                </div>
                <div class="col-md-8 col-xs-12">
                  <div class="row">
                    <div class="col-1" style="padding-top: 13px">
                      5
                    </div>
                    <div class="col">
                      <q-linear-progress rounded size="15px" :value="rate.star5" color="yellow-14" class="q-mt-md" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-1" style="padding-top: 13px">
                      4
                    </div>
                    <div class="col">
                      <q-linear-progress rounded size="15px" :value="rate.star4" color="yellow-14" class="q-mt-md" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-1" style="padding-top: 13px">
                      3
                    </div>
                    <div class="col">
                      <q-linear-progress rounded size="15px" :value="rate.star3" color="yellow-14" class="q-mt-md" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-1" style="padding-top: 13px">
                      2
                    </div>
                    <div class="col">
                      <q-linear-progress rounded size="15px" :value="rate.star2" color="yellow-14" class="q-mt-md" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-1" style="padding-top: 13px">
                      1
                    </div>
                    <div class="col">
                      <q-linear-progress rounded size="15px" :value="rate.star1" color="yellow-14" class="q-mt-md" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <div class="row q-mb-md q-gutter-sm items-center">
            <span class="kmp-font-bold kmp-font-lg">Rate this app</span>
          </div>
          <q-card class="kmp-card-rounded q-py-sm q-px-md q-mb-md">
            <q-card-section class="q-pa-none">
              <q-item>
                <q-item-section top avatar>
                  <Avatar size="xl" class="cursor-pointer" :name="user.name" @click="openProfile(user.id)" />
                </q-item-section>
                <q-item-section>
                  <div class="q-pl-sm">
                    <div class="kmp-text-blue text-weight-bold text-uppercase cursor-pointer" @click="openProfile(user.id)" >{{ user.name }}</div>
                    <div class="text-caption">
                      {{
                        (user.organization && user.organization.organization.organization)
                          ? user.organization.organization.organization.name
                          : (
                            user.organization
                              ? user.organization.organization.name
                              : 'Unknown'
                          )
                      }}
                    </div>

                    <div class="q-pt-sm">
                      <div class="mobile-only" side v-show="isDisableEdit">
                          <div class="kmp-font-small">{{ time }}</div>
                          <q-rating
                            v-model="rating_star"
                            size="1.5em"
                            color="#faea29"
                            icon="star_border"
                            icon-selected="star"
                            :readonly="isDisableEdit"
                          />
                          <hr class="mobile-only">
                      </div>

                      <q-rating
                        v-show="!isDisableEdit"
                        v-model="rating_star"
                        size="2.5em"
                        color="#faea29"
                        icon="star_border"
                        icon-selected="star"
                        :readonly="isDisableEdit"
                      />

                      <div class="q-pt-sm" v-if="!isDisableEdit">
                        <textarea
                          ref="suggestions"
                          v-model="suggestions"
                          placeholder="Deskripsikan pengalaman Anda (Optional)"
                          rows="1"
                          style="width: 40%; resize: none; overflow: hidden"
                          class="q-pa-sm desktop-only"
                          :disabled="isDisableEdit"
                          @input="resize"
                          @focus="resize"
                        />
                        <textarea
                          ref="suggestions"
                          v-model="suggestions"
                          placeholder="Deskripsikan pengalaman Anda (Optional)"
                          rows="1"
                          style="width: 100%; resize: none; overflow: hidden"
                          class="q-pa-sm mobile-only"
                          :disabled="isDisableEdit"
                          @input="resize"
                          @focus="resize"
                        />
                      </div>
                      <q-item-label caption lines="2" class="q-pt-sm" v-else>
                        {{ suggestions }}
                      </q-item-label>

                      <div class="q-pt-sm" v-show="!isDisableEdit">
                        <q-btn no-caps unelevated
                               v-if="!isLoading"
                               color="primary"
                               text-color="white"
                               :label="isDisableEdit ? 'Edit' : 'Send'"
                               @click="handleUpdate"
                        />
                        <q-spinner
                          v-else
                          color="primary"
                          size="2.55em"
                        />
                        <q-btn v-show="suggestions !== ''" no-caps unelevated outline
                               class="q-ml-sm"
                               color="primary"
                               label="Cancel"
                               @click="isDisableEdit = true"
                        />
                      </div>

                      <div class="q-pt-md" v-show="isDisableEdit">
                        <q-btn outline no-caps unelevated
                               align="between"
                               class="btn-fixed-width"
                               color="grey"
                               label="Edit"
                               icon="edit"
                               size="sm"
                               @click="handleUpdate"
                        />
                      </div>
                    </div>
                  </div>
                </q-item-section>


                <q-item-section class="desktop-only" side v-show="isDisableEdit">
                  <q-item-label class="kmp-font-small">{{ time }}</q-item-label>
                  <q-rating
                    v-model="rating_star"
                    size="1.5em"
                    color="#faea29"
                    icon="star_border"
                    icon-selected="star"
                    :readonly="isDisableEdit"
                  />
                </q-item-section>
              </q-item>


            </q-card-section>

          </q-card>

          <div class="row q-mb-md q-gutter-sm items-center">
            <q-btn :outline="!filter.button.includes(0)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(0)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />All Star
            </q-btn>
            <q-btn :outline="!filter.button.includes(1)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(1)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />1
            </q-btn>
            <q-btn :outline="!filter.button.includes(2)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(2)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />2
            </q-btn>
            <q-btn :outline="!filter.button.includes(3)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(3)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />3
            </q-btn>
            <q-btn :outline="!filter.button.includes(4)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(4)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />4
            </q-btn>
            <q-btn :outline="!filter.button.includes(5)" unelevated no-caps
                   color="primary" size="md" style="border-radius: 20px;"
                   @click="addFilter(5)">
              <q-icon left size="1.5em" class="q-mr-xs" name="star" color="yellow" />5
            </q-btn>
          </div>

          <q-card v-show="data.list.length > 0" class="kmp-card-rounded q-pt-none q-pb-sm q-px-md q-mb-md">
            <q-card-section class="q-pb-none" >
              <div class="row items-center no-wrap">
                <div class="col">
                  <span class="text-neutral kmp-font-bold kmp-font-lg">List feedback</span>
                </div>
                <div class="col-auto" style="display: none">
                  <q-select
                    dense borderless color="primary" class="q-pa-none"
                    outlined
                    v-model="filter.selected"
                    :options="filter.options"
                    style="width: 170px"
                    @input="filter.onClick(filter.selected)"
                  >
                    <template v-slot:selected>
                      <q-rating
                        v-if="filter.selected.value > 0"
                        v-model="filter.selected.value"
                        size="1.5em"
                        color="#faea29"
                        icon="star_border"
                        icon-selected="star"
                        :readonly="true"
                      />
                      <span v-else class="text-caption">No Filter</span>
                    </template>
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                      >
                        <q-item-section>
                          <span v-if="scope.opt.value === 0" class="text-caption">No Filter</span>
                          <div v-else class="row">
                            <q-rating
                              v-model="scope.opt.value"
                              size="1.5em"
                              color="#faea29"
                              icon="star_border"
                              icon-selected="star"
                              :readonly="true"
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div v-if="data.list_filter.length > 0">
                <div v-for="(item, index) in data.list_filter" :key="index">
                  <q-item class="q-px-none">
                    <q-item-section top avatar>
                      <Avatar size="xl" class="cursor-pointer" @click="openProfile(item.user.id)" :name="item.user.name" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="kmp-text-blue text-weight-bold text-uppercase cursor-pointer" @click="openProfile(item.user.id)" >{{ item.user.name }}</q-item-label>
                      <q-item-label class="text-caption q-mb-sm">
                        {{
                          (item.user.organization && item.user.organization.organization.organization)
                            ? item.user.organization.organization.organization.name
                            : (
                              item.user.organization
                                ? item.user.organization.organization.name
                                : 'Unknown'
                            )
                        }}
                      </q-item-label>
                      <q-item-label caption lines="2">{{
                          item.suggestions
                        }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="kmp-font-small">{{ item.time }}</q-item-label>
                      <q-rating
                        v-model="item.rating_star"
                        size="1.5em"
                        color="#faea29"
                        icon="star_border"
                        icon-selected="star"
                        :readonly="isDisableEdit"
                      />
                    </q-item-section>
                  </q-item>
                  <q-separator spaced style="height: 0.5px;" />
                </div>
                <q-virtual-scroll
                  style="max-height: 320px; display: none;"
                  :items="data.list_filter"
                  separator
                >
                  <template v-slot="{ item, index }">
                    <q-item :key="index" class="q-pl-none desktop-only">
                      <q-item-section top avatar >
                        <Avatar size="xl" class="cursor-pointer" :name="item.user.name" @click="openProfile(item.user.id)" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="cursor-pointer" @click="openProfile(item.user.id)" >{{item.user.name}}</q-item-label>
                        <q-item-label caption lines="2">{{
                            item.suggestions
                          }}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-rating
                          v-model="item.rating_star"
                          size="1.5em"
                          color="#faea29"
                          icon="star_border"
                          icon-selected="star"
                          :readonly="isDisableEdit"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item :key="index" class="q-pl-none mobile-only">
                      <q-item-section top avatar>
                        <Avatar size="xl" class="cursor-pointer" :name="item.user.name" @click="openProfile(item.user.id)" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="cursor-pointer" @click="openProfile(item.user.id)">{{item.user.name}}</q-item-label>
                        <q-item-label><q-rating
                              v-model="item.rating_star"
                              size="1.5em"
                              color="#faea29"
                              icon="star_border"
                              icon-selected="star"
                              :readonly="isDisableEdit"
                            /></q-item-label>
                        <q-item-label caption lines="2">{{
                            item.suggestions
                          }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-virtual-scroll>
              </div>
              <div v-else class="text-center text-caption text-grey-7">Data feedback not found</div>
            </q-card-section>
          </q-card>

          <q-card class="kmp-card-rounded q-py-sm q-px-md">
            <q-card-section>
              <div class="row">
                <Avatar size="xl" class="cursor-pointer" :name="user.name" @click="openProfile(user.id)" />
                <div class="q-pl-sm">
                  <div class="kmp-text-blue text-weight-bold text-uppercase cursor-pointer" @click="openProfile(user.id)">{{ user.name }}</div>
                  <div class="text-caption">{{ user.organization ? user.organization.name : '-' }}</div>
                </div>
              </div>

              <div class="q-pt-sm">
                <q-rating
                  v-model="rating_star"
                  size="2.5em"
                  color="#faea29"
                  icon="star_border"
                  icon-selected="star"
                  :readonly="isDisableEdit"
                />
              </div>

              <div class="q-pt-sm desktop-only">
                <textarea
                  ref="suggestions"
                  v-model="suggestions"
                  placeholder="Deskripsikan pengalaman Anda (Optional)"
                  rows="1"
                  style="width: 40%; resize: none; overflow: hidden"
                  class="q-pa-sm"
                  :disabled="isDisableEdit"
                  @input="resize"
                  @focus="resize"
                />
              </div>

              <div class="q-pt-sm mobile-only">
                <textarea
                  ref="suggestions"
                  v-model="suggestions"
                  placeholder="Deskripsikan pengalaman Anda (Optional)"
                  rows="1"
                  style="width: 100%; resize: none; overflow: hidden"
                  class="q-pa-sm"
                  :disabled="isDisableEdit"
                  @input="resize"
                  @focus="resize"
                />
              </div>

              <div class="q-pt-sm">
                <q-btn
                  v-if="!isLoading"
                  color="blue"
                  text-color="white"
                  :label="isDisableEdit ? 'Edit' : 'Send'"
                  style="border-radius: 0px !important"
                  @click="handleUpdate"
                />
                <q-spinner
                  v-else
                  color="primary"
                  size="2.55em"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import Avatar from 'components/common/Avatar';
import { dateCustom1, getLoginId } from 'src/lib/helper';
import RatingBar from 'components/rating/RatingBar';
import { profileDetail, ratingApp, ratingAppList, ratingAppCreate } from '../lib/api';

export default {
  components: { RatingBar, LeftBar, Avatar },
  data() {
    return {
      isLoading: false,
      isDisableEdit: true,
      rating_star: 0,
      suggestions: '',
      time: null,
      user: {},
      rate: {
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0
      },
      data: {
        list: [],
        list_filter: []
      },
      filter: {
        selected: { value: 0, label: 'ALL STAR' },
        options: [
          { value: 0, label: 'ALL STAR' },
          { value: 1, label: 'STAR 1' },
          { value: 2, label: 'STAR 2' },
          { value: 3, label: 'STAR 3' },
          { value: 4, label: 'STAR 4' },
          { value: 5, label: 'STAR 5' }
        ],
        onClick: data => {
          // console.log(data.value);
          // const filter = data.value > 0 ? this.data.list.filter(f => {
          //   return f.rating_star === data.value;
          // }) : this.data.list;
          // this.data.list_filter = filter;
        },
        button: [0]
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.resize();
    }, 1);

    profileDetail(getLoginId()).then(({ data }) => {
      if (data) this.user = data;
    });
    ratingApp().then(response => {
      if (response) {
        const { data } = response;
        this.rating_star = data.rating_star;
        this.suggestions = data.suggestions;
        this.time = dateCustom1(data.created_at);

        setTimeout(() => {
          this.resize();
        }, 1);
      } else {
        this.isDisableEdit = false;
      }
    });
    this.getListRating();
  },
  methods: {
    pageAdjust(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset + 50}px)` : '100vh' };
    },
    resize() {
      this.$refs.suggestions.style.height = `${this.$refs.suggestions.scrollHeight}px`;
    },
    handleUpdate() {
      if (this.rating_star === 0) {
        this.$q.notify({
          message: 'Berikan rating anda',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else if (this.suggestions === '') {
        this.$q.notify({
          message: 'Berikan review anda',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        this.isDisableEdit = !this.isDisableEdit;
        if (this.isDisableEdit) {
          this.isLoading = true;
          this.handleRatingAppCreate();
        }
      }
    },
    handleRatingAppCreate() {
      const data = {
        rating_star: this.rating_star,
        suggestions: this.suggestions
      };
      ratingAppCreate(data).then(() => {
        setTimeout(() => {
          this.$q.notify({
            message: 'Sukses',
            timeout: 3000,
            color: 'positive',
            icon: 'done',
            caption: 'Rating berhasil dikirim',
            position: 'bottom'
          });
          this.isLoading = false;
          this.getListRating();
        }, 1000);
      });
    },
    getListRating() {
      ratingAppList().then(res => {
        if (res) {
          res.data.forEach(v => {
            v.time = dateCustom1(v.created_at);
          });
          this.data.list = res.data;
          this.data.list_filter = res.data;
        }
      });
    },
    addFilter(val) {
      const cek = this.filter.button.includes(val);
      if (!cek) {
        if (val === 0) {
          this.filter.button = [];
          this.filter.button.push(val);
        } else {
          const idx = this.filter.button.indexOf(0);
          if (idx !== -1) {
            this.filter.button.splice(idx, 1);
          }
          this.filter.button.push(val);
        }
      } else {
        const idx = this.filter.button.indexOf(val);
        if (idx !== -1) {
          if (this.filter.button.length === 1) {
            this.filter.button.splice(idx, 1);
            this.filter.button.push(0);
          } else {
            this.filter.button.splice(idx, 1);
          }
        }
      }

      const data = this.data.list.filter(f => {
        if (this.filter.button[0] === 0) {
          return f;
        }
        return this.filter.button.includes(f.rating_star);
      });
      this.data.list_filter = data;
    },
    openProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: { id }
      });
    }
  },
  computed: {
    rating: {
      get() {
        const sum = this.data.list.reduce((accumulator, object) => {
          return accumulator + object.rating_star;
        }, 0);
        const count = this.data.list.length > 0 ? this.data.list.length : 1;
        const data = (sum / count).toFixed(1);

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.rate.star1 = this.data.list.filter(f => f.rating_star === 1).length / count;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.rate.star2 = this.data.list.filter(f => f.rating_star === 2).length / count;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.rate.star3 = this.data.list.filter(f => f.rating_star === 3).length / count;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.rate.star4 = this.data.list.filter(f => f.rating_star === 4).length / count;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.rate.star5 = this.data.list.filter(f => f.rating_star === 5).length / count;

        return data;
      }
    }
  }
};
</script>
