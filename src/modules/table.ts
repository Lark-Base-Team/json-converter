import { bitable } from '@lark-base-open/js-sdk';
import { useRecords } from './record';

export enum FieldType {
  Text = 1,
}

const { base } = bitable;

export const useTable = () => {
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
    useRecords().getRecords(table);
  }

  onMounted(updateTable);
  base.onTableDelete(updateTable);
  base.onTableAdd(updateTable);

  return {
    tableMetaList,
    activeTableId,
    activeTable
  }
}

export const useTableField = (table) => {
  const fieldMetaList = ref([]);

  const updateField = async () => {
    const list = await table.value?.getFieldMetaList() || [];
    fieldMetaList.value = list;
  }

  watch(table, updateField);

  return {
    fieldMetaList
  }
}
