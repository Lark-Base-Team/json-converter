import { base, PermissionEntity, OperationType } from '@lark-base-open/js-sdk';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

function downloadJsonbyName(jsonContent, fileName) {

  // 创建一个 Blob 对象
  const blob = new Blob([jsonContent], { type: "application/json" });

  // 创建一个链接元素
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName + ".json";

  // 模拟点击下载链接
  link.click();
}

/** 
{
    ["EN", "CN"]: {},
    ["EN", "JA"]: {}
}
*/
async function downloadJson(jsonMap) {
  // 获取下载权限（下载和打印归属一个权限）
  const canDownload = await base.getPermission({
    entity: PermissionEntity.Base,
    type: OperationType.Printable
  })

  if (!canDownload) {
    ElMessage('没有权限下载文件');
    return;
  }

  for (let [key, value] of jsonMap.entries()) {
    const fileName = `${key[0]}_to_${key[1]}`;
    downloadJsonbyName(JSON.stringify(value, null, 2), fileName);
  }
}
export { downloadJson }