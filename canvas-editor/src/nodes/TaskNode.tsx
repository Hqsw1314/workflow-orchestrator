import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

export type TaskNodeData = {
  label: string
  taskType?: string
  assignee?: string
  status?: 'pending' | 'running' | 'done' | 'failed'
}

const statusLabel: Record<string, string> = {
  pending: '待执行',
  running: '执行中',
  done: '已完成',
  failed: '失败',
}

export const TaskNode = memo(function TaskNode({
  data,
  selected,
}: NodeProps & { data: TaskNodeData }) {
  return (
    <div className={`task-node ${selected ? 'task-node--selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="task-node__header">
        <span className="task-node__type">{data.taskType ?? 'TASK'}</span>
        {data.status && (
          <span className={`task-node__status task-node__status--${data.status}`}>
            {statusLabel[data.status]}
          </span>
        )}
      </div>
      <div className="task-node__label">{data.label}</div>
      {data.assignee && (
        <div className="task-node__assignee">{data.assignee}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})
