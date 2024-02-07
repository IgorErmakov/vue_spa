<script setup lang="ts">
import SupportIcon from './icons/IconSupport.vue'
import {onMounted, ref} from 'vue'
import TodoForm from './TodoForm.vue'
import { store } from '../stores/todo'
import axios from "axios";

interface Item {
  id: number
  item: string
  completed: boolean
}

  onMounted(async () => {
    console.log('in')

    const {data} = await axios.get('http://localhost:8000/api/todo')
    store.setItems(data as Item[])
  })




  // const items = ref([
  //   {id: 1, item: 'First', completed: false}
  // ])

  // defineProps({
  //   items: {
  //     type: Array,
  //   },
  // });

  // const form = useForm({
  //   id: 0,
  // });

  const deleteItem = (item: Item) => {
    store.deleteItem(item.id)
  }

  const toggleCompleted = (item: Item) => {
    store.toggleCompleted(item.id)
  }
</script>

<style>
  .completed {
    text-decoration: line-through;
  }
  .ms-4 {
    margin-left: 30px;
  }
  article {
    cursor: pointer;
  }
</style>

<template>

  <TodoForm/>
  <h4 class="space-x-2 p-4">Items: {{ store.items.filter((itm: any) => !itm.completed).length }}</h4>

  <ul class="divide-y divide-slate-100">

    <article class="flex items-start space-x-6 p-6" v-for="item in store.items" :key="item.id">

      <div class="min-w-0 relative flex-auto">
        <h2 class="font-semibold text-slate-900 truncate pr-20" @click="toggleCompleted(item)" :class="item.completed ? 'completed' : ''">
          {{item.item.toString()}}
        </h2>
        <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div class="absolute top-0 right-0 flex items-center space-x-1">
            <dt class="text-sky-500">
            </dt>
            <dd>
                <span class="ms-4" @click="deleteItem(item)">
                    X
                </span>
            </dd>
          </div>
        </dl>
      </div>
    </article>

  </ul>
</template>