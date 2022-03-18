<script lang="ts">
function upperFirst (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default defineComponent({
  name: 'ProviderIcon',

  props: {
    name: { type: String, required: true },
  },

  setup (props) {
    return () => h(defineAsyncComponent(() => import(`./providers/${upperFirst(props.name)}Icon.vue`)))
  },
})
</script>
