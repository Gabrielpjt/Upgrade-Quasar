 <q-card class="my-card" flat bordered transparent>
            <q-card-section horizontal transparent>
              <q-card-section class="col-6" transparent>
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
              </q-card-section>

              <q-img
                class="col-6"
                src="../assets/images/login.png"
                width="50vh"
              />
            </q-card-section>
          </q-card>
