<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noopener noreferrer" href="https://github.com/heartbeatLV/yahtzee" target="_blank">
        Yahtzee
      </a>
    </p>
    <p>
      <em text-sm op75>Vite + UnoCss + Vue3</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go()"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go()"
      >
        Go
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>
