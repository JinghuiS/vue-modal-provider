# vue-modal-provider
[nice-modal-react](https://github.com/eBay/nice-modal-react) vue implementation.  Simple to use and manage modal. 

benefit：
- Create modal without losing context
- No need to maintain show variables
- Using promise interact

## Installation
```bash
$ npm install vue-modal-provider
```
## Examples
Embed your application with ModalProvider
```vue
<!--App.vue -->
<script setup lang="ts">
import { RouterView } from "vue-router";
import { ModalProvider } from "vue-modal-provider";
</script>

<template>
  <ModalProvider>
    <RouterView />
  </ModalProvider>
</template>
```
Create modal component 
```vue
<!-- Modal.vue -->
<template>
  <el-dialog v-model="visible">
    {{ args }}
    <el-button @click="hide(), resolve(1111), remove()">close</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useModalRef } from "vue-modal-provider";
const { 
    // show variables
    visible, 
    // close modal
    hide, 
    args,
    // remove modal lose animation
    remove, 
    resolve,
    reject
    } = useModalRef();
</script>

```
Use in the view
```vue
<script lang="ts"  setup>
import { useModal } from "vue-modal-provider";
import TestModal from './Modal.vue'
const {show} = useModal(TestModal)

function showModal() {
    show('test msg').then(c=>{
         console.log(c);
    })
}

</script>

<template>
  <el-button @click="showModal">open modal</el-button>
</template>

```