<template>
    <div class="items-start q-mb-md">
        <q-card class="my-card">
            <q-card-section>
                <div>
                    <q-icon name="domain" class="text-neutral q-mr-sm" />
                    <q-icon name="more_vert" class="tools-icon float-right" size="24px" style="" />
                    <q-icon name="close" size="24px" class="text-neutral float-right" />
                </div>
            </q-card-section>
        </q-card>
        <q-card class="my-card q-pa-xs q-mt-md">
            <q-card-section>
                <div class="row">
                    <div class="col-1">
                        <q-avatar size="36px" class="q-mr-md">
                            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                        </q-avatar>
                    </div>
                    <div class="col-5 q-pl-sm">
                        <div class="text-nama" style="margin:0px">
                            Rahmat Reza <span class="time">10.10</span>
                        </div>
                        <div class="text-channel">
                            <q-icon name="public" class="check-icon" size="16px" style="" />
                            Public
                        </div>
                    </div>
                    <div class="col-6">
                        <q-icon name="close" size="24px" class="text-neutral float-right q-mt-xs q-ml-xs" />
                        <div class="float-right">
                            <div class="tabs-tool q-pa-xs" align="justify">
                                <q-icon name="add_reaction" class="tools-icon q-mx-sm" size="24px" style="" />
                                <q-icon name="push_pin" class="tools-icon q-mx-sm" size="24px" style="" />
                                <q-icon name="more_vert" class="tools-icon" size="24px" style="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-title q-mt-lg q-mb-sm">
                    This is title post
                </div>
                <div class="text-content">
                    The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend will understand that you are not asking about a specific type of gift or a specific item. “I am going to bring an apple pie,” your friend tells you. Again, the indefinite article indicates that she is not talking about a specific apple pie. Your friend probably doesn’t even have any pie yet. The indefinite article only appears with singular nouns. Consider the following examples of indefinite articles used in context.
                </div>
                <div class="row">
                    <div class="col q-mt-sm">
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/thumbs_up.svg" label="10" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/ok_hand.svg" label="9" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/wink.svg" label="8" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/heart_suit.svg" label="7" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/medal.svg" label="7" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/gift.svg" label="5" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/yellow_heart.svg" label=4 size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/zebra.svg" label="1" size="sm" dense/>
                        <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/gun.svg" label="1" size="sm" dense/>
                    </div>
                </div>
                <div class="row">
                    <div class="col q-mt-md">
                        <span class="text-rep-detail">12 Replies</span>
                    </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
                <div class="text-more q-mb-md">
                    Show earlier replies
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      tab: 'member'
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.text-rep-detail{
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #4F5A70;
}
</style>
