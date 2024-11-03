<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  title: string
}
const { title } = defineProps<Props>()

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
defineExpose({ openModal, closeModal })
</script>

<template>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" class="relative z-10" :open="isOpen" @close="closeModal">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="min-h-full flex items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all !relative lg:max-w-xl dark:bg-[#18181b]"
            >
              <PrimeButton class="right-0 top-0 !absolute" @click="closeModal">
                <span class="sr-only">close</span>
                <i class="i-tabler-x" />
              </PrimeButton>
              <HeadlessDialogTitle
                as="p"
                class="mb-4 text-lg font-medium"
              >
                {{ title }}
              </HeadlessDialogTitle>
              <slot />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>
