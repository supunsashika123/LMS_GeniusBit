<template>
  <div class="w-full h-12 bg-red fixed flex items-center bottom-0">
    <div class="w-1/3"></div>
    <div class="w-1/3 flex-row justify-center text-white footer-font-size">
      <div class="flex text-center justify-center">© 2021 GeniusBit</div>
      <div
        onclick=" window.open('https://www.teamoo7.com', '_blank'); return false;"
        class="flex justify-center font-semibold cursor-pointer text-center"
      >
        Powered by Team oo7
      </div>
    </div>
    <div class="w-1/3 flex justify-end pr-6">
      <div>
        <SvgIcon
          onclick=" window.open('https://www.facebook.com/Pradeep-Gamage-295846930972098', '_blank'); return false;"
          name="facebook"
          class="h-6 w-6 mt-2 fill-white cursor-pointer"
        />
      </div>
      <div>
        <SvgIcon
          onclick=" window.open('https://www.youtube.com/channel/UCHmVlrNr1co3xvEPoAjanJw', '_blank'); return false;"
          name="youtube"
          class="h-10 w-10 ml-4 fill-white cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'FooterBar',
  components: { SvgIcon },
}
</script>

<style scoped>
.footer-font-size {
  font-size: 10px;
}
</style>
