<template>
  <div :class="[ns.b(), ns.is('readonly')]">
    <label :class="ns.e('method')" :style="{ backgroundColor: getRequestMethodColor(nodeAttrs.method) }"> Mock </label>

    <div :class="ns.e('server')">
      <span class="copy_text">{{ mockServerPathRef }}</span>
    </div>
    <p :class="ns.e('path')" class="copy_text">{{ nodeAttrs.path }}</p>

    <el-tooltip :content="$t('app.common.fetchMockData')" :auto-close="2000">
      <i :class="ns.e('copy')" v-if="!isFetchMockData" @click="handlerMock(fullPath, nodeAttrs.method)">
        <ac-icon-quill:send />
      </i>
      <i :class="ns.e('copy')" v-if="isFetchMockData">
        <ac-icon-ep-loading class="animate-spin" />
      </i>
    </el-tooltip>
    <el-tooltip :content="$t('app.common.copyAllPath')">
      <i :class="ns.e('copy')" class="copy_text" :data-text="fullPath">
        <ac-icon-ic-outline-content-copy />
      </i>
    </el-tooltip>
  </div>
</template>
<script setup lang="tsx">
import { useNamespace } from '@/hooks'
import { HttpDocument } from '@/typings'
import { HTTP_URL_NODE_KEY, useNodeAttrs } from '@/hooks/useNodeAttrs'
import { getRequestMethodColor } from '@/commons'
import { mockServerPath, mockApiPath, getMockData } from '@/api/mock'
import { AsyncMsgBox } from './AsyncMessageBox'
import { CodeEditor } from './APIEditor'

const props = defineProps<{ doc: HttpDocument; code: string | number; projectId: string }>()
const ns = useNamespace('http-method')
const nodeAttrs = useNodeAttrs(props, HTTP_URL_NODE_KEY, 'doc')
const mockServerPathRef = computed(() => mockServerPath + mockApiPath(props.projectId as string))
const fullPath = computed(() => mockServerPathRef.value + nodeAttrs.value.path)

const isFetchMockData = ref(false)
const mockDataRef = ref({} as any)
const mockHeaderRef = ref({} as any)

const fetchMockData = async (path: string, method: string) => {
  try {
    isFetchMockData.value = true
    const { data, headers }: any = await getMockData(path, method, { mock_response_code: props.code as string })
    mockHeaderRef.value = headers
    mockDataRef.value = data
  } catch (error) {
  } finally {
    isFetchMockData.value = false
  }
}
const handlerMock = async (path: string, method: string) => {
  await fetchMockData(path, method)

  AsyncMsgBox({
    title: 'Preview Mock Data',
    width: '50vw',
    draggable: true,
    showCancelButton: false,
    showConfirmButton: false,
    customStyle: { '--el-messagebox-width': '50vw' },
    message: () => (
      <div>
        <h3 class="-mt-4px mb-6px fw500 text-14px">Response Header</h3>
        <CodeEditor style={{ maxHeight: '200px' }} modelValue={JSON.stringify(mockHeaderRef.value, null, 2)} lang="json" readonly />
        <h3 class="my-6px fw500 text-14px">Response Body</h3>
        <CodeEditor style={{ maxHeight: '400px' }} modelValue={JSON.stringify(mockDataRef.value, null, 2)} lang="json" readonly />
        <div class="text-right mt-20px">
          <el-button loading={isFetchMockData.value} onClick={() => fetchMockData(path, method)} icon={<ac-icon-ep-refresh />}>
            Refresh
          </el-button>
        </div>
      </div>
    ),
  })
}
</script>
