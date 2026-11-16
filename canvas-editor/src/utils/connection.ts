import type { Connection, Edge, Node } from '@xyflow/react'

export function isValidConnection(
  connection: Connection | Edge,
  _nodes: Node[],
  edges: Edge[],
): boolean {
  const { source, target } = connection
  // 不允许自连接
  if (source === target) return false
  // 不允许重复连线
  const duplicated = edges.some(
    (e) => e.source === source && e.target === target,
  )
  if (duplicated) return false
  // 不允许形成环：如果从 target 出发能到达 source，则再加这条边会成环
  return !hasPath(target!, source!, edges)
}

function hasPath(from: string, to: string, edges: Edge[]): boolean {
  const adj = new Map<string, string[]>()
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, [])
    adj.get(e.source)!.push(e.target)
  }
  const stack = [from]
  const visited = new Set<string>()
  while (stack.length) {
    const current = stack.pop()!
    if (current === to) return true
    if (visited.has(current)) continue
    visited.add(current)
    for (const next of adj.get(current) ?? []) stack.push(next)
  }
  return false
}
