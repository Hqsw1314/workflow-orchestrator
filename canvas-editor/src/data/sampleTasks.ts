import type { Edge, Node } from '@xyflow/react'

export const sampleNodes: Node[] = [
  {
    id: 'task-req',
    type: 'task',
    position: { x: 80, y: 60 },
    data: { label: '需求分析与验收标准', taskType: 'REQ', status: 'pending' },
  },
  {
    id: 'task-design',
    type: 'task',
    position: { x: 320, y: 60 },
    data: { label: '系统架构设计', taskType: 'DESIGN', status: 'pending' },
  },
  {
    id: 'task-frontend',
    type: 'task',
    position: { x: 160, y: 240 },
    data: { label: '前端画布与交互', taskType: 'DEV', status: 'pending' },
  },
  {
    id: 'task-backend',
    type: 'task',
    position: { x: 480, y: 240 },
    data: { label: '执行引擎与状态接口', taskType: 'DEV', status: 'pending' },
  },
  {
    id: 'task-test',
    type: 'task',
    position: { x: 320, y: 420 },
    data: { label: '集成测试与验收', taskType: 'TEST', status: 'pending' },
  },
]

export const sampleEdges: Edge[] = [
  { id: 'e-req-design', source: 'task-req', target: 'task-design' },
  { id: 'e-design-frontend', source: 'task-design', target: 'task-frontend' },
  { id: 'e-design-backend', source: 'task-design', target: 'task-backend' },
  { id: 'e-frontend-test', source: 'task-frontend', target: 'task-test' },
  { id: 'e-backend-test', source: 'task-backend', target: 'task-test' },
]
