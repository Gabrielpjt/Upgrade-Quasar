<q-page>
    <div
      class="row items-center full-width"
      style="height: 100vh"
      v-if="$q.screen.gt.sm"
    >
      <div class="page col-8 column items-center q-px-lg">
        <div
          class="text-h2 text-primary q-mb-lg cursor-pointer"
          @click="$router.push({ name: 'landing' })"
        >
          {{ appName }}
        </div>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          autoplay
          infinite
          control-color="accent"
          navigation
          padding
          height="50%"
        >
          <q-carousel-slide name="slide1" class="column no-wrap flex-center">
            <div class="text-h5 q-mt-xl text-secondary">
              apa Elit proident consequat tempor deserunt Lorem id et ullamco
              deserunt.
            </div>
            <object
              class="q-mt-xl"
              data="/undraw_Lighthouse_frb8.svg"
              type="image/svg+xml"
              height="250px"
            />
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-4 q-px-lg">
        <div class="rounded-borders shadow-2 relative-position">
          <div class="text-h6 q-pa-lg text-center text-white bg-primary">
            Selamat Datang
          </div>
          <q-separator />
          <div class="q-pa-lg">
            <q-input
              v-model="username"
              label="Username"
              @blur="$v.username.$touch"
              :error="$v.username.$error"
              error-message="Wajib diisi"
            ></q-input>
            <q-input
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
              @blur="$v.password.$touch"
              :error="$v.password.$error"
              error-message="Wajib diisi"
              v-on:keyup.enter="submit"
            ></q-input>
            <q-btn
              :disable="$v.$invalid || isLoading"
              icon="exit_to_app"
              class="q-mt-md full-width"
              :color="$v.$invalid ? 'grey' : 'primary'"
              label="Login"
              @click="submit"
            />
            <q-inner-loading :showing="isLoading">
              <q-spinner-bars size="50px" color="primary"></q-spinner-bars>
            </q-inner-loading>
          </div>
        </div>
      </div>
    </div>
    <div class="column items-center" v-else>
      <div
        class="text-h3 text-primary q-mt-xl cursor-pointer"
        @click="$router.push({ name: 'landing' })"
      >
        {{ appName }}
      </div>
      <div class="full-width q-px-lg">
        <div class="rounded-borders shadow-2 relative-position q-mt-xl">
          <div class="text-h6 q-pa-lg text-center text-white bg-primary">
            Selamat Datang
          </div>
          <q-separator />
          <div class="q-pa-lg">
            <q-input
              v-model="username"
              label="Username"
              @blur="$v.username.$touch"
              :error="$v.username.$error"
              error-message="Wajib diisi"
            ></q-input>
            <q-input
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
              @blur="$v.password.$touch"
              :error="$v.password.$error"
              error-message="Wajib diisi"
              v-on:keyup.enter="submit"
            ></q-input>
            <q-btn
              :disable="$v.$invalid || isLoading"
              icon="exit_to_app"
              class="q-mt-md full-width"
              :color="$v.$invalid ? 'grey' : 'primary'"
              label="Login"
              @click="submit"
            />
            <q-inner-loading :showing="isLoading">
              <q-spinner-bars size="50px" color="primary"></q-spinner-bars>
            </q-inner-loading>
          </div>
        </div>
      </div>
    </div>
  </q-page>
