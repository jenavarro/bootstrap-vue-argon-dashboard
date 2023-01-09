<template>
  <router-view></router-view>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
}
import { supabase } from './supabase'

//const session = ref()

/*onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
}) */

</script>
