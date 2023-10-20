import { bitable } from '@lark-base-open/js-sdk';
import { defineStore } from 'pinia';
import { useViews } from './view';

export enum FieldType {
  Text = 1,
}

const { base } = bitable;

export const useTable = defineStore('table', () => {
  const tableMetaList = ref([]);
  const activeTableStore = ref(null);
  const activeTable = computed(() => toRaw(activeTableStore.value));
  const activeTableId = computed(() => activeTable.value?.id || '');

  const updateTable = async () => {
    const [list, table] = await Promise.all([
      base.getTableMetaList(),
      base.getActiveTable()
    ]);
    tableMetaList.value = list;
    activeTableStore.value = table;
  }

  return {
    tableMetaList,
    activeTableId,
    activeTable,
    updateTable,
  }
});

export const useTableField = () => {
  const fieldMetaList = ref([]);
  const viewStore = useViews();

  const updateField = async () => {
    const list = await viewStore.view?.getFieldMetaList() || [];
    fieldMetaList.value = list;
  }

  const getFieldNameById = (fieldId) => {
    return fieldMetaList.value.find((fieldMeta) => fieldMeta.id === fieldId)?.name || '';
  }

  watch(() => viewStore.view, updateField);

  return {
    fieldMetaList,
    getFieldNameById,
    updateField
  }
}
