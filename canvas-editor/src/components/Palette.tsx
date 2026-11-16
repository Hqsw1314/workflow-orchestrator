import type * as React from 'react'

const TASK_TEMPLATES = [
  { type: 'task', label: '设计任务', taskType: 'DESIGN' },
  { type: 'task', label: '开发任务', taskType: 'DEV' },
  { type: 'task', label: '测试任务', taskType: 'TEST' },
  { type: 'task', label: '部署任务', taskType: 'DEPLOY' },
]

export function Palette() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    template: (typeof TASK_TEMPLATES)[number],
  ) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(template),
    )
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="palette">
      <h3>任务节点</h3>
      {TASK_TEMPLATES.map((t) => (
        <div
          key={t.taskType}
          className="palette__item"
          draggable
          onDragStart={(e) => onDragStart(e, t)}
        >
          {t.label}
        </div>
      ))}
    </aside>
  )
}
