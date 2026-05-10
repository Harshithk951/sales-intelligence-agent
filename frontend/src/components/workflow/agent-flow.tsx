"use client";

import { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AgentInfo } from '@/lib/types';

import { AgentNode } from './agent-node';
import { AnimatedEdge } from './animated-edge';

const nodeTypes = {
  agentNode: AgentNode,
};

const edgeTypes = {
  animatedEdge: AnimatedEdge,
};

interface WorkflowNodeData extends Record<string, unknown> {
  agent: AgentInfo;
}

const baseNodes: Node<WorkflowNodeData>[] = [
  {
    id: 'research',
    type: 'agentNode',
    position: { x: 50, y: 150 },
    data: {
      agent: {
        id: 'research',
        name: 'Research Agent',
        description: 'Gathers company information including overview, industry, size, and recent news using web search.',
        icon: 'search',
        status: 'idle',
        duration: 3200,
        output: 'Found Salesforce overview and 4 recent news articles.'
      }
    }
  },
  {
    id: 'analysis',
    type: 'agentNode',
    position: { x: 450, y: 150 },
    data: {
      agent: {
        id: 'analysis',
        name: 'Analysis Agent',
        description: 'Analyzes company data to identify key business challenges and strategic opportunities.',
        icon: 'brain-circuit',
        status: 'idle',
        duration: 4100,
        output: 'Identified 5 key challenges including scaling infrastructure.'
      }
    }
  },
  {
    id: 'contact',
    type: 'agentNode',
    position: { x: 850, y: 150 },
    data: {
      agent: {
        id: 'contact',
        name: 'Contact Agent',
        description: 'Discovers and prioritizes key decision makers based on identified business challenges.',
        icon: 'users',
        status: 'idle',
        duration: 2100,
        output: 'Searching LinkedIn/web for CTO and VP Engineering...'
      }
    }
  },
  {
    id: 'outreach',
    type: 'agentNode',
    position: { x: 1250, y: 150 },
    data: {
      agent: {
        id: 'outreach',
        name: 'Outreach Agent',
        description: 'Generates highly personalized outreach emails tailored to each decision maker.',
        icon: 'mail',
        status: 'idle'
      }
    }
  }
];

const baseEdges: Edge[] = [
  { 
    id: 'e-research-analysis', 
    source: 'research', 
    target: 'analysis', 
    type: 'animatedEdge',
    data: { status: 'complete' } 
  },
  { 
    id: 'e-analysis-contact', 
    source: 'analysis', 
    target: 'contact', 
    type: 'animatedEdge',
    data: { status: 'running' } 
  },
  { 
    id: 'e-contact-outreach', 
    source: 'contact', 
    target: 'outreach', 
    type: 'animatedEdge',
    data: { status: 'idle' } 
  }
];

interface AgentFlowProps {
  activeStep: number;
}

export function AgentFlow({ activeStep }: AgentFlowProps) {
  const nodes = useMemo(
    () =>
      baseNodes.map((node, idx) => ({
        ...node,
        data: {
          ...node.data,
          agent: {
            ...node.data.agent,
            status:
              idx < activeStep ? 'complete' : idx === activeStep ? 'running' : 'idle',
          },
        },
      })),
    [activeStep]
  );

  const edges = useMemo(
    () =>
      baseEdges.map((edge, idx) => ({
        ...edge,
        data: {
          ...edge.data,
          status:
            idx < activeStep - 1 ? 'complete' : idx === activeStep - 1 ? 'running' : 'idle',
        },
      })),
    [activeStep]
  );

  return (
    <div className="w-full h-full bg-cohere-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,255,255,0.05)" gap={24} size={2} />
        <Controls className="!bg-near-black !border-white/10 !fill-canvas-white [&>button]:!border-white/10 [&>button:hover]:!bg-white/10" />
      </ReactFlow>
    </div>
  );
}
