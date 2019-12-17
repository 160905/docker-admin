<template>
   <div class='main'>
     <LayoutContent>
       <div slot='content'><slot name='main'></slot></div>
     </LayoutContent>
   </div>
</template>
<style>
</style>
<script type='babel'>
  import LayoutContent from './content/content';
  export default {
    components: {
      LayoutContent
    }
  };
</script>
