<template>
  <q-btn rounded dense :style="badge[type][level].style" size="sm" glossy :icon="badge[type][level].icon" class="q-mx-xs"  >
    <q-tooltip>{{badge[type][level].title}}</q-tooltip>
  </q-btn>
</template>

<script>

export default {
  name: 'Badge',
  props: ['type', 'level'],
  data() {
    return {
      visible: false,
      badge: {
        expert: {
          bronze: {
            title: 'Expert Bronze',
            icon: 'auto_awesome',
            style: {
              backgroundColor: '#CD7F32',
              color: '#000000'
            }
          },
          silver: {
            title: 'Expert Silver',
            icon: 'auto_awesome',
            style: {
              backgroundColor: '#C5D0D8',
              color: '#000000'
            }
          },
          gold: {
            title: 'Expert Gold',
            icon: 'auto_awesome',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          }
        },
        speaker: {
          bronze: {
            title: 'Speaker Bronze',
            icon: 'record_voice_over',
            style: {
              backgroundColor: '#CD7F32',
              color: '#000000'
            }
          },
          silver: {
            title: 'Speaker Silver',
            icon: 'record_voice_over',
            style: {
              backgroundColor: '#C5D0D8',
              color: '#000000'
            }
          },
          gold: {
            title: 'Speaker Gold',
            icon: 'record_voice_over',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          }
        },
        learner: {
          bronze: {
            title: 'Learner Bronze',
            icon: 'local_library',
            style: {
              backgroundColor: '#CD7F32',
              color: '#000000'
            }
          },
          silver: {
            title: 'Learner Silver',
            icon: 'local_library',
            style: {
              backgroundColor: '#C5D0D8',
              color: '#000000'
            }
          },
          gold: {
            title: 'Learner Gold',
            icon: 'local_library',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          },
          platinum: {
            title: 'Learner Platinum',
            icon: 'local_library',
            style: {
              backgroundColor: '#443A7D',
              color: '#ffffff'
            }
          },
          diamond: {
            title: 'Learner Diamond',
            icon: 'local_library',
            style: {
              backgroundColor: '#7F3834',
              color: '#ffffff'
            }
          }
        },
        knowledge: {
          bronze: {
            title: 'Knowledge Asset Bronze',
            icon: 'school',
            style: {
              backgroundColor: '#CD7F32',
              color: '#000000'
            }
          },
          silver: {
            title: 'Knowledge Asset Silver',
            icon: 'school',
            style: {
              backgroundColor: '#C5D0D8',
              color: '#000000'
            }
          },
          gold: {
            title: 'Knowledge Asset Gold',
            icon: 'school',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          }
        },
        post: {
          bronze: {
            title: 'Top Post Bronze',
            icon: 'drive_file_rename_outline',
            style: {
              backgroundColor: '#CD7F32',
              color: '#000000'
            }
          },
          silver: {
            title: 'Top Post Silver',
            icon: 'drive_file_rename_outline',
            style: {
              backgroundColor: '#C5D0D8',
              color: '#000000'
            }
          },
          gold: {
            title: 'Top Post Gold',
            icon: 'drive_file_rename_outline',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          }
        },
        asn: {
          gold: {
            title: 'Smart ASN',
            icon: 'drive_file_rename_outline',
            style: {
              backgroundColor: '#FEA33D',
              color: '#000000'
            }
          }
        }
      }
    };
  },
  methods: {
  }
};
</script>

