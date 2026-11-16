import { useCallback, useMemo, useRef } from 'react'
import type * as React from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react'
import { nodeTypes } from './nodes'
import { Palette } from './components/Palette'
import { Toolbar } from './components/Toolbar'
import { sampleNodes, sampleEdges } from './data/sampleTasks'
import { isValidConnection } from './utils/connection'

let idCounter = 0
const nextId = () => `task-${Date.now()}-${++idCounter}`

export default function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (params: Connection) => {
      if (!isValidConnection(params, nodes, edges)) return
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds))
    },
    [nodes, edges, setEdges],
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const raw = event.dataTransfer.getData('application/reactflow')
      if (!raw) return
      const template = JSON.parse(raw) as {
        type: string
        label: string
        taskType: string
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })
      const newNode: Node = {
        id: nextId(),
        type: template.type,
        position,
        data: {
          label: template.label,
          taskType: template.taskType,
          status: 'pending',
        },
      }
      setNodes((nds) => [...nds, newNode])
    },
    [screenToFlowPosition, setNodes],
  )

  const onExport = useCallback(() => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      nodes,
      edges,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'se-workflow-orchestration.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const onLoadSample = useCallback(() => {
    setNodes(sampleNodes)
    setEdges(sampleEdges)
  }, [setNodes, setEdges])

  const onClear = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [setNodes, setEdges])

  const isValid = useMemo(
    () => (connection: Connection | Edge) =>
      isValidConnection(connection, nodes, edges),
    [nodes, edges],
  )

  return (
    <div className="app-layout">
      <Palette />
      <div className="canvas-wrapper" ref={reactFlowWrapper}>
        <Toolbar
          onExport={onExport}
          onLoadSample={onLoadSample}
          onClear={onClear}
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          isValidConnection={isValid}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  )
}
