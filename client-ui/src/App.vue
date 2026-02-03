<script setup lang="ts">
import { ref, onMounted } from "vue";
import { QtBridge } from "./services/qtBridge";

// 响应式状态
const statusLog = ref<string>("Waiting for user action...");
const serverTime = ref<string>("--:--:--");
const inputMsg = ref<string>("Hello from Vue 3!");
const isReady = ref(false);

// 初始化连接
onMounted(async () => {
  // 预加载 Bridge，确认环境
  await QtBridge.getCore();
  isReady.value = true;
  statusLog.value = "Bridge Ready.";
});

const handleSendMessage = async () => {
  const core = await QtBridge.getCore();
  core.showMessage(inputMsg.value);
  statusLog.value = `Sent: ${inputMsg.value}`;
};

const handleGetTime = async () => {
  statusLog.value = "Fetching time...";
  const core = await QtBridge.getCore();

  core.getSystemTime((time: string) => {
    serverTime.value = time;
    statusLog.value = `Received time: ${time}`;
  });
};
</script>

<template>
  <!-- 使用 Tailwind 的 flex, grid, spacing, colors 类 -->
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-800 font-sans"
  >
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
      <div class="text-center">
        <h1
          class="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-500 to-blue-600"
        >
          Qt + Vue 3
        </h1>
        <p class="text-sm text-gray-400 mt-2">Modern Hybrid Client Demo</p>
      </div>

      <!-- 状态指示区 -->
      <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-semibold uppercase text-gray-500">System Time</span>
          <span class="font-mono text-blue-600 font-bold">{{ serverTime }}</span>
        </div>
        <div class="text-xs text-gray-400 border-t pt-2 mt-2 truncate">Log: {{ statusLog }}</div>
      </div>

      <!-- 交互区 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message to C++</label>
          <input
            v-model="inputMsg"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            @click="handleSendMessage"
            class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition transform hover:-translate-y-0.5"
          >
            Send Msg
          </button>

          <button
            @click="handleGetTime"
            class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition transform hover:-translate-y-0.5"
          >
            Get Time
          </button>
        </div>
      </div>
    </div>

    <!-- 底部环境标识 -->
    <div class="mt-8 text-gray-400 text-xs">Powered by Qt WebEngine & Vue 3 Composition API</div>
  </div>
</template>
