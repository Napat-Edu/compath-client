'use client'
import { MouseEvent, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node, Position, useEdgesState, useNodesState } from "reactflow";
import Icon from "./Icon";
import { ICareerNodeTree } from "@/interfaces/career-prediction.interface";
import { Button } from "./ui/button"

import 'reactflow/dist/base.css';
import './custom-node-tree/tailwind-reactflow-config'
import MainNode from "./custom-node-tree/MainNode";
import CareerpathNode from "./custom-node-tree/CareerpathNode";
import CareerNode from "./custom-node-tree/CareerNode";
import DomainSkillNode from "./custom-node-tree/DomainSkillNode";
import useSelectInsight from "@/hooks/useSelectInsight";

const nodeTypes = {
    main: MainNode,
    careerpath: CareerpathNode,
    career: CareerNode,
    domainskill: DomainSkillNode,
};

export default function NodeTree() {
    const selectInsight = useSelectInsight();

    const [isLoading, setIsLoading] = useState(true);
    const landingViewport = {
        x: 200,
        y: 0,
        zoom: 0,
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [expandNodes, setExpandNode] = useState<string[]>([]);
    const [nodeLayout, setNodeLayout] = useState<string[]>([]);
    const [careerPathData, setCareerPathData] = useState<ICareerNodeTree[]>([]);

    const getCareerPathData = async () => {
        const careerPathData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_EXPLORATION_ENDPOINT}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json());
        return careerPathData;
    };

    const initNodeTree = async (nodeLayout:string[] = []) => {
        // const careerPathData: ICareerNodeTree[] = await getCareerPathData();
        const focusCareer = selectInsight.focusCareer;

        const initialNodes: Node[] = [];
        const initialEdges: Edge[] = [];
        const posX = 0;
        let posY = 0;
        const nodeWidth = 400;
        careerPathData.map((careerPath, careerpathIdx) => {
            const newNodeData = {
                id: careerPath.career_path_name,
                position: { x: posX, y: posY },
                data: { career_path_name: careerPath.career_path_name },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                connectable: false,
                parentNode: '',
                type: 'careerpath',
                style: {
                    backgroundColor: '#fff',
                }
            }
            initialNodes.push(newNodeData);

            careerPath.related_careers.map((career, careerIdx) => {
                // const hiddenState = focusCareer === career.career ? false : true;
                const newNodeData = {
                    id: career.career,
                    position: { x: 200, y: posY },
                    data: { career: career.career },
                    targetPosition: Position.Left,
                    sourcePosition: Position.Right,
                    connectable: false,
                    parentNode: '',
                    type: 'career',
                    style: {
                        backgroundColor: '#fff',
                    }
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
                let sumPosY = 0;
                const averageCharactersPerLine = 30;
                career.skill_domains.map((domain, domainIdx) => {
                    const hiddenState = nodeLayout.includes(domain.name + careerpathIdx + careerIdx) ? false : true;
                    const newNodeData = {
                        id: domain.name + careerpathIdx + careerIdx,
                        position: { x: nodeWidth * 2, y: posY + (130 * domainIdx) + (estimatedLineCount * 10) },
                        data: { domain_name: domain.name, skill_list: domain.skill_list },
                        targetPosition: Position.Left,
                        type: 'domainskill',
                        hidden: hiddenState,
                        style: {
                            width: nodeWidth,
                            backgroundColor: '#fff',
                        },

                    }
                    initialNodes.push(newNodeData);
                    totalTextLength = domain.name.length + domain.skill_list.reduce((total, skill) => total + skill[0].length + 5, 0);
                    estimatedLineCount = Math.ceil(totalTextLength / averageCharactersPerLine);

                    const newEdgeData = {
                        id: `${career.career}->${domain.name + careerpathIdx + careerIdx + domainIdx}`,
                        source: career.career,
                        hidden: hiddenState,
                        target: domain.name + careerpathIdx + careerIdx,
                        style: {
                            stroke: '#e4e4e7'
                        }
                    }
                    
                    if (nodeLayout.includes(domain.name + careerpathIdx + careerIdx)) {
                        sumPosY += 130 + (estimatedLineCount * 10)
                    }
                    initialEdges.push(newEdgeData);
                });
                if(sumPosY > 0){
                    sumPosY -= 130 + (estimatedLineCount * 10)
                }
                posY += 60 + sumPosY
            });
            const newEdgeData = {
                id: `compath->${careerPath.career_path_name}`,
                source: 'compath',
                target: careerPath.career_path_name,
                style: {
                    stroke: '#e4e4e7',
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
            connectable: false,
            parentNode: '',
            style: {
                backgroundColor: '#fff',
            }
        }
        initialNodes.push(newNodeData)

        setNodes(initialNodes);
        setEdges(initialEdges);
        selectInsight.clearFocusCareer();
    };

    useEffect(() => {
        async function fetchingData(){
            const data = await getCareerPathData();
            setCareerPathData(data);
        }
        setIsLoading(true);
        // initNodeTree();
        fetchingData();
        setIsLoading(false);

        return () => { };
    }, []);

    useEffect(() => {
        autoLayout();
        return () => { };
    }, [nodeLayout, careerPathData]);

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
        setNodeLayout([])
    }
    
    const autoLayout = () => {
        nodes.forEach((node:Node) => {
            if(node.hidden !== undefined && !node.hidden){
                setNodeLayout((prev) => [...prev, node.id])
            }
        });
        initNodeTree(nodeLayout)
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
                draggable={false}
            >
                <Background />
                <Controls position="bottom-right" />
            </ReactFlow> :
            <div className="h-full w-full flex justify-center items-center">
                <Icon name={"Loader2"} className={`animate-spin`} size={64} />
            </div>
    );
}