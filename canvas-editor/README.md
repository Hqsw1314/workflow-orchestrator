# SE Workflow Canvas Editor

画布编辑器模块：接收任务分解 JSON，支持节点拖拽、连线编排，导出标准编排 JSON。

## 运行

npm install
npm run dev

## 输入与输出

- 输入：设计规格解析后的任务节点数据（可参考 `src/data/sampleTasks.ts`）
- 输出：`{ version, exportedAt, nodes, edges }` JSON，供执行引擎与持久化模块使用

## 模块说明

- `src/nodes/TaskNode.tsx`：自定义任务节点
- `src/components/Palette.tsx`：侧边栏拖拽入口
- `src/App.tsx`：画布主组件
- `src/utils/connection.ts`：连线校验（防自连接、防重复、防循环）
- `src/data/sampleTasks.ts`：示例编排数据
