"use client";

import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';
import { AgentStatus } from '@/lib/types';

interface AnimatedEdgeProps extends EdgeProps {
  data?: {
    status?: AgentStatus;
  };
}

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: AnimatedEdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const status = data?.status || 'idle';
  
  // Base style for the path
  let strokeColor = 'rgba(255, 255, 255, 0.1)';
  let strokeWidth = 2;
  let isAnimated = false;
  
  if (status === 'complete') {
    strokeColor = 'rgba(255, 255, 255, 0.3)';
    strokeWidth = 2;
  } else if (status === 'running') {
    strokeColor = '#1863dc'; // action-blue
    strokeWidth = 2;
    isAnimated = true;
  }

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: strokeWidth + 4,
          stroke: 'transparent', // Invisible wider path for hit testing
        }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth,
        }}
        className={isAnimated ? 'react-flow__edge-path-animated' : ''}
      />
    </>
  );
}
