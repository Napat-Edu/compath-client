'use client'
import { MouseEvent, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node, Position, useEdgesState, useNodesState } from "reactflow";
import Icon from "./Icon";
import { ICareerNodeTree } from "@/interfaces/career-prediction.interface";

import 'reactflow/dist/base.css';
import './custom-node-tree/tailwind-reactflow-config'
import MainNode from "./custom-node-tree/MainNode";
import CareerpathNode from "./custom-node-tree/CareerpathNode";
import CareerNode from "./custom-node-tree/CareerNode";
import DomainSkillNode from "./custom-node-tree/DomainSkillNode";

const nodeTypes = {
    main: MainNode,
    careerpath: CareerpathNode,
    career: CareerNode,
    domainskill: DomainSkillNode,
};

export default function NodeTree() {

    const [isLoading, setIsLoading] = useState(true);
    const landingViewport = {
        x: 200,
        y: 0,
        zoom: 0,
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [expandNodes, setExpandNode] = useState<string[]>([]);

    const getCareerPathData = async () => {
        const careerPathData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_EXPLORATION_ENDPOINT}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json());
        return careerPathData;
    };

    const initNodeTree = async () => {
        const careerPathData: ICareerNodeTree[] = await getCareerPathData();

        const initialNodes: Node[] = [];
        const initialEdges: Edge[] = [];
        const posX = 0;
        let posY = 0;
        const nodeWidth = 400;
        const nodeHeight = 30;
        careerPathData.map((careerPath, careerpathIdx) => {
            const newNodeData = {
                id: careerPath.career_path_name,
                position: { x: posX, y: posY },
                data: { career_path_name: careerPath.career_path_name },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                draggable: false,
                connectable: false,
                parentNode: '',
                type: 'careerpath'
            }
            initialNodes.push(newNodeData);

            careerPath.related_careers.map((career, careerIdx) => {
                const newNodeData = {
                    id: career.career,
                    position: { x: 200, y: posY + 5 },
                    data: { career: career.career },
                    targetPosition: Position.Left,
                    sourcePosition: Position.Right,
                    draggable: false,
                    connectable: false,
                    parentNode: '',
                    type: 'career',
                }
                initialNodes.push(newNodeData);
                const newEdgeData = {
                    id: `${careerPath.career_path_name}->${career.career}`,
                    source: careerPath.career_path_name,
                    target: career.career,
                    style: {
                        stroke: '#e4e4e7'
                    }
                }
                initialEdges.push(newEdgeData);

                let totalTextLength = 0;
                let estimatedLineCount = 0;
                const averageCharactersPerLine = 30;
                career.skill_domains.map((domain, domainIdx) => {
                    const newNodeData = {
                        id: domain.name + careerpathIdx + careerIdx,
                        position: { x: nodeWidth * 2, y: posY + (domainIdx * 130) + (estimatedLineCount * 10) },
                        data: { domain_name: domain.name, skill_list: domain.skill_list },
                        targetPosition: Position.Left,
                        type: 'domainskill',
                        hidden: true,
                        style: {
                            width: nodeWidth
                        }
                    }
                    initialNodes.push(newNodeData);
                    totalTextLength = domain.name.length + domain.skill_list.reduce((total, skill) => total + skill[0].length + 5, 0);
                    estimatedLineCount = Math.ceil(totalTextLength / averageCharactersPerLine);

                    const newEdgeData = {
                        id: `${career.career}->${domain.name + careerpathIdx + careerIdx + domainIdx}`,
                        source: career.career,
                        hidden: true,
                        target: domain.name + careerpathIdx + careerIdx,
                        style: {
                            stroke: '#e4e4e7'
                        }
                    }
                    initialEdges.push(newEdgeData);
                });
                posY += 60
            });
            posY += 80

            const newEdgeData = {
                id: `compath->${careerPath.career_path_name}`,
                source: 'compath',
                target: careerPath.career_path_name,
                style: {
                    stroke: '#e4e4e7'
                }
            }
            initialEdges.push(newEdgeData)
        });

        const newNodeData = {
            id: 'compath',
            position: { x: -nodeWidth, y: posY / 2 },
            data: { label: 'Compath' },
            sourcePosition: Position.Right,
            type: 'main',
            draggable: false,
            connectable: false,
            parentNode: '',
        }
        initialNodes.push(newNodeData)

        setNodes(initialNodes);
        setEdges(initialEdges);
    };

    useEffect(() => {
        setIsLoading(true);
        initNodeTree();
        setIsLoading(false);

        return () => { };
    }, []);

    const hideNode = (isHidden: boolean, nodeId: string) => (nodeOrEdge: Node) => {
        if (nodeOrEdge.id == nodeId || nodeOrEdge.parentNode == nodeId) {
            nodeOrEdge.hidden = isHidden;
            setEdges((eds: Edge[]) => eds.map(hideEdge(isHidden, nodeId)))
        }
        return nodeOrEdge;
    };

    const hideEdge = (isHidden: boolean, source: string) => (nodeOrEdge: Edge) => {
        if (nodeOrEdge.source == source) {
            setNodes((nds: Node[]) => nds.map(hideNode(isHidden, nodeOrEdge.target)));
            nodeOrEdge.hidden = isHidden;
        }
        return nodeOrEdge;
    };

    const handleHidden = (event: MouseEvent<Element, globalThis.MouseEvent>, n: Node) => {
        if (n.type == 'career') {
            const isHidden = expandNodes.some((expandNode) => expandNode == n.id);
            if (isHidden) {
                setExpandNode((prev) => prev.filter((oldExpandNode) => oldExpandNode != n.id));
            } else {
                setExpandNode((prev) => [...prev, n.id]);
            }
            setEdges((eds: Edge[]) => eds.map(hideEdge(isHidden, n.id)))
        }
    }

    return (
        !isLoading ?
            <ReactFlow
                defaultViewport={landingViewport}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesConnectable={false}
                nodesDraggable={false}
                nodeTypes={nodeTypes}
                onNodeClick={(e, n) => handleHidden(e, n)}
            >
                <Background />
                <Controls position="bottom-right" />
            </ReactFlow> :
            <div className="h-full w-full flex justify-center items-center">
                <Icon name={"Loader2"} className={`animate-spin`} size={64} />
            </div>
    );
}