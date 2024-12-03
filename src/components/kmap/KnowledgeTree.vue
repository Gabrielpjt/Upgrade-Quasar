<template>
  <div>
    <q-tree
      ref="knowledgeTree"
      :nodes="simple"
      node-key="key"
      :filter="filter"
      :selected.sync="selected"
      accordion
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div v-if="prop.node.label">
            <div v-if="prop.node.story === 'Unit Kerja'">
              <q-icon :name="prop.node.icon || 'domain'" size="17px" class="q-mr-sm uk-ico"/>
            </div>
            <div v-else-if="prop.node.story === 'Business Process'">
              <q-icon :name="prop.node.icon || 'article'" size="17px" class="q-mr-sm bp-ico"/>
            </div>
            <div v-else-if="prop.node.story === 'Strategic Activity'">
              <q-icon :name="prop.node.icon || 'lightbulb'" size="17px" class="q-mr-sm sa-ico"/>
            </div>
            <div v-else-if="['Core Knowledge','Basic Knowledge'].includes(prop.node.story)">
              <q-icon :name="prop.node.icon || 'content_paste'" size="17px" class="q-mr-sm ck-ico"/>
            </div>
            <div v-else-if="['Advance Knowledge'].includes(prop.node.story)">
              <q-icon :name="prop.node.icon || 'receipt_long'" size="17px" class="q-mr-sm ck-ico"/>
            </div>
            <div v-else-if="['Innovative Knowledge'].includes(prop.node.story)">
              <q-icon :name="prop.node.icon || 'document_scanner'" size="17px" class="q-mr-sm ck-ico"/>
            </div>
            <div v-else>
              <div v-if="prop.node.label === 'Subject Matter Expert'">
                <q-icon :name="prop.node.icon || 'group'" size="17px" class="q-mr-sm child-ico"/>
              </div>
              <div v-else-if="prop.node.label === 'Explicit Knowledge'">
                <q-icon :name="prop.node.icon || 'attach_file'" size="17px" class="q-mr-sm child-ico"/>
              </div>
              <div v-else-if="prop.node.label === 'Best Practice'">
                <q-icon :name="prop.node.icon || 'format_list_bulleted'" size="17px" class="q-mr-sm child-ico"/>
              </div>
              <div v-else-if="prop.node.label === 'Development Needed'">
                <q-icon :name="prop.node.icon || 'insert_chart'" size="17px" class="q-mr-sm child-ico"/>
              </div>
              <div v-else-if="prop.node.level === 93">
                <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico ck-add"/>
              </div>
              <div v-else-if="prop.node.level === 92">
                <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico sa-add"/>
              </div>
              <div v-else-if="prop.node.level === 91">
                <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico bp-add"/>
              </div>
            </div>
          </div>
          <div v-if="prop.node.add_label">
            <div class="text-weight-bold title-tree text-capitalize">{{ prop.node.add_label }}</div>
          </div>
          <div v-if="prop.node.label">
            <div class="title-tree text-capitalize">
              {{ prop.node.label }}
              <q-btn-group class="q-ml-sm"
                           v-if="user.name === 'admin' && selected === prop.node.key && prop.node.level !== 0 && prop.node.level !== 4 && prop.node.level < 90"
                           push flat>
                <q-btn flat dense color="primary" icon="mode"
                       class="tools-icon q-ma-none action-select"
                       @click="opendialogs('add');"></q-btn>
                <q-btn flat dense color="primary" icon="delete"
                       class="tools-icon q-ma-none action-select"
                       @click="opendialogs('delete');"></q-btn>
              </q-btn-group>
              <br>
              <span class="subtitle-tree text-capitalize">{{ prop.node.story }}</span>
            </div>
          </div>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>

export default {
  data () {
    return {
      simple: [
        {
          key: '0_1',
          label: 'level 0',
          level: 0,
          story: 'Unit Kerja',
          children: [
            {
              key: '0_1_1',
              label: 'level 1',
              level: 1,
              story: 'Business Process',
              children: [
                {
                  key: '0_1_1_1',
                  label: 'level 3',
                  level: 2,
                  story: 'Strategic Activity',
                  children: [
                    {
                      key: '0_1_1_1_1',
                      label: 'level 4',
                      level: 3,
                      story: 'Basic Knowledge',
                      parent_id: 658,
                      parent_label: 'Penyusunan Usulan Angka Dasar',
                      state: 'no'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  props: ['keyword'],
  methods: {
    resetFilter () {
      this.filter = '';
      this.$refs.filter.focus();
    },
    getTree() {
      this.simple = [
        {
          key: '0_1',
          label: 'level 0',
          level: 0,
          story: 'Unit Kerja',
          children: [
            {
              key: '0_1_1',
              label: 'level 1',
              level: 1,
              story: 'Business Process',
              children: [
                {
                  key: '0_1_1_1',
                  label: 'level 3',
                  level: 2,
                  story: 'Strategic Activity',
                  children: [
                    {
                      key: '0_1_1_1_1',
                      label: 'level 4',
                      level: 3,
                      story: 'Basic Knowledge',
                      parent_id: 658,
                      parent_label: 'Penyusunan Usulan Angka Dasar',
                      state: 'no'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
    }
  }
};
</script>

