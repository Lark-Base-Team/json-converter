<script setup>
  import { useTable, useTableField, FieldType } from '@/modules/table';
  import { useRecords, transTwoFieldRecordsToJson } from '@/modules/record';
  import { setJson } from '@/modules/json';

  const { getFieldRecords } = useRecords();
  const { tableMetaList, activeTableId, activeTable } = useTable();
  const { fieldMetaList } = useTableField(activeTable);
  const formData = reactive({ tableId: '', keyCol: '', valueCol: '' });
  const textFieldMetaList = computed(() => fieldMetaList.value.filter(item => item.type === FieldType.Text ));
  watch(activeTableId, () => {
    if (activeTableId.value) formData.tableId = activeTableId.value;
  });

  const click = async () => {
    const keyRecords = getFieldRecords(formData.keyCol);
    const valueRecords = getFieldRecords(formData.valueCol);
    const result = transTwoFieldRecordsToJson(keyRecords, valueRecords);
    setJson(JSON.stringify(result, null, 4));
  }
</script>

<template>
  <div text-center>
    <ElForm label-position="top">
      <ElFormItem label="选择数据表">
        <ElSelect v-model="formData.tableId" class="w-100%">
          <ElOption
            v-for="item in tableMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="选择 Key 列">
        <ElSelect v-model="formData.keyCol" class="w-100%">
          <ElOption
            v-for="item in textFieldMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem label="选择 Value 列">
        <ElSelect v-model="formData.valueCol" class="w-100%">
          <ElOption
            v-for="item in textFieldMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" round @click="click">转成 JSON</ElButton>
  </div>
</template>
