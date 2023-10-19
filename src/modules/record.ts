import { defineStore } from 'pinia';

export const useRecords = defineStore('record', {
  state: () => {
    return {
      records: []
    }
  },

  actions: {
    async getRecords(table) {
      const result = await table.getRecords({});
      this.records = result.records;
    },
    
    setRecords(records) {
      this.records = records;
    },

    getFieldRecords(fieldId) {
      return this.records
        .map((record) => record.fields[fieldId]?.[0])
        .filter((record) => !!record);
    }
  }
});

export const transTwoFieldRecordsToJson = (oneFieldRecords, twoFieldRecords) => {
  const result = {};
  for (let i = 0; i < oneFieldRecords.length; i++) {
    const oneFieldRecord = oneFieldRecords[i];
    const twoFieldRecord = twoFieldRecords[i];
    if (!oneFieldRecord?.text) continue;
    result[oneFieldRecord.text] = twoFieldRecord?.text || '';
  }
  return result;
}
